import type { ScreeningRepository } from '@/Contexts/Screening/Domain/ScreeningSession/ScreeningRepository'
import type { ScreeningSessionSnapshot } from '@/Contexts/Screening/Domain/ScreeningSession/ScreeningSession'
import { ScreeningSession } from '@/Contexts/Screening/Domain/ScreeningSession/ScreeningSession'
import { Uuid } from '@/Contexts/Screening/Domain/ScreeningSession/Uuid'
import { Message } from '@/Contexts/Screening/Domain/ScreeningSession/Message'
import { CognitiveTrait } from '@/Contexts/Screening/Domain/ScreeningSession/CognitiveTrait'
import type { MessageRole } from '@/Contexts/Screening/Domain/ScreeningSession/MessageRole'
import type { TraitCategory } from '@/Contexts/Screening/Domain/ScreeningSession/TraitCategory'
import type { SessionStatus } from '@/Contexts/Screening/Domain/ScreeningSession/SessionStatus'
import type { SupabaseClient } from '@supabase/supabase-js'
import { createClient } from '@supabase/supabase-js'

interface SessionRow {
    id: string
    user_id: string
    status: string
    started_at: string
    completed_at: string | null
    metadata: Record<string, unknown>
}

interface MessageRow {
    id: string
    session_id: string
    content: string
    role: string
    created_at: string
    metadata: Record<string, unknown> | null
}

interface TraitRow {
    id: string
    session_id: string
    category: string
    name: string
    description: string
    evidence: string
    confidence: number
    detected_at: string
}

export class SupabaseScreeningRepository implements ScreeningRepository {
    private client: SupabaseClient

    constructor(supabaseUrl: string, supabaseKey: string) {
        this.client = createClient(supabaseUrl, supabaseKey)
    }

    async save(session: ScreeningSession): Promise<void> {
        const snapshot = session.toSnapshot()

        // Upsert session
        await this.client.from('screening_sessions').upsert({
            id: snapshot.id,
            user_id: snapshot.userId,
            status: snapshot.status,
            started_at: snapshot.startedAt.toISOString(),
            completed_at: snapshot.completedAt?.toISOString() || null,
            metadata: snapshot.metadata,
        })

        // Upsert messages
        if (snapshot.messages.length > 0) {
            await this.client.from('screening_messages').upsert(
                snapshot.messages.map(message => ({
                    id: message.id.toString(),
                    session_id: snapshot.id,
                    content: message.content,
                    role: message.role,
                    created_at: message.createdAt.toISOString(),
                    metadata: message.metadata || null,
                }))
            )
        }

        // Upsert traits
        if (snapshot.traits.length > 0) {
            await this.client.from('cognitive_traits').upsert(
                snapshot.traits.map(trait => ({
                    id: trait.id.toString(),
                    session_id: snapshot.id,
                    category: trait.category,
                    name: trait.name,
                    description: trait.description,
                    evidence: trait.evidence,
                    confidence: trait.confidence,
                    detected_at: trait.detectedAt.toISOString(),
                }))
            )
        }
    }

    async findById(id: string): Promise<ScreeningSession | null> {
        const { data: sessionData } = await this.client
            .from('screening_sessions')
            .select('*')
            .eq('id', id)
            .single()

        if (!sessionData) return null

        return this.hydrateSession(sessionData as SessionRow)
    }

    async findByUserId(userId: string): Promise<ScreeningSession[]> {
        const { data } = await this.client
            .from('screening_sessions')
            .select('*')
            .eq('user_id', userId)
            .order('started_at', { ascending: false })

        if (!data) return []

        return Promise.all(data.map(row => this.hydrateSession(row as SessionRow)))
    }

    async findActiveByUserId(userId: string): Promise<ScreeningSession | null> {
        const { data } = await this.client
            .from('screening_sessions')
            .select('*')
            .eq('user_id', userId)
            .eq('status', 'ACTIVE')
            .single()

        if (!data) return null

        return this.hydrateSession(data as SessionRow)
    }

    private async hydrateSession(row: SessionRow): Promise<ScreeningSession> {
        const [messagesData, traitsData] = await Promise.all([
            this.client
                .from('screening_messages')
                .select('*')
                .eq('session_id', row.id)
                .order('created_at', { ascending: true }),
            this.client
                .from('cognitive_traits')
                .select('*')
                .eq('session_id', row.id)
                .order('detected_at', { ascending: true }),
        ])

        const snapshot: ScreeningSessionSnapshot = {
            id: row.id,
            userId: row.user_id,
            status: row.status as SessionStatus,
            messages: (messagesData.data || []).map(row => this.mapMessage(row)),
            traits: (traitsData.data || []).map(row => this.mapTrait(row)),
            startedAt: new Date(row.started_at),
            completedAt: row.completed_at ? new Date(row.completed_at) : undefined,
            metadata: row.metadata,
        }

        return ScreeningSession.fromSnapshot(snapshot)
    }

    private mapMessage(row: MessageRow): Message {
        return new Message(
            Uuid.from(row.id),
            row.content,
            row.role as MessageRole,
            new Date(row.created_at),
            row.metadata || undefined
        )
    }

    private mapTrait(row: TraitRow): CognitiveTrait {
        return new CognitiveTrait(
            Uuid.from(row.id),
            row.category as TraitCategory,
            row.name,
            row.description,
            row.evidence,
            row.confidence,
            new Date(row.detected_at)
        )
    }
}
