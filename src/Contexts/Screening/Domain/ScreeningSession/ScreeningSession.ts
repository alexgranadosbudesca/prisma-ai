import { SessionStatus } from './SessionStatus'
import { Message } from './Message'
import type { CognitiveTrait } from './CognitiveTrait'
import { MessageRole } from './MessageRole'
import { Uuid } from '@/Contexts/Shared/Domain/Uuid'
import { AggregateRoot } from '@/Contexts/Shared/Domain/AggregateRoot'
import { ScreeningSessionCompletedDomainEvent } from './ScreeningSessionCompletedDomainEvent'

export interface ScreeningSessionSnapshot {
    id: string
    userId: string
    status: SessionStatus
    messages: Message[]
    traits: CognitiveTrait[]
    startedAt: Date
    completedAt?: Date
    metadata: Record<string, unknown>
}

export class ScreeningSession extends AggregateRoot {
    private constructor(
        private readonly _id: Uuid,
        private readonly _userId: string,
        private _status: SessionStatus,
        private readonly _messages: Message[],
        private readonly _traits: CognitiveTrait[],
        private readonly _startedAt: Date,
        private _completedAt?: Date,
        private readonly _metadata: Record<string, unknown> = {}
    ) {
        super()
    }

    static create(userId: string): ScreeningSession {
        const systemMessage = Message.create({
            content: this.getSystemPrompt(),
            role: MessageRole.SYSTEM,
        })

        return new ScreeningSession(
            Uuid.generate(),
            userId,
            SessionStatus.ACTIVE,
            [systemMessage],
            [],
            new Date()
        )
    }

    static fromSnapshot(snapshot: ScreeningSessionSnapshot): ScreeningSession {
        return new ScreeningSession(
            Uuid.from(snapshot.id),
            snapshot.userId,
            snapshot.status,
            snapshot.messages,
            snapshot.traits,
            snapshot.startedAt,
            snapshot.completedAt,
            snapshot.metadata
        )
    }

    get id(): Uuid {
        return this._id
    }
    get userId(): string {
        return this._userId
    }
    get status(): SessionStatus {
        return this._status
    }
    get messages(): readonly Message[] {
        return this._messages
    }
    get traits(): readonly CognitiveTrait[] {
        return this._traits
    }
    get startedAt(): Date {
        return this._startedAt
    }
    get completedAt(): Date | undefined {
        return this._completedAt
    }

    addUserMessage(content: string): void {
        this.ensureActive()
        const message = Message.create({
            content,
            role: MessageRole.USER,
        })
        this._messages.push(message)
    }

    addAssistantMessage(content: string, metadata?: Record<string, unknown>): void {
        this.ensureActive()
        const message = Message.create({
            content,
            role: MessageRole.ASSISTANT,
            metadata,
        })
        this._messages.push(message)
    }

    registerTrait(trait: CognitiveTrait): void {
        this.ensureActive()
        const exists = this._traits.some(
            existingTrait =>
                existingTrait.name === trait.name && existingTrait.category === trait.category
        )
        if (!exists) {
            this._traits.push(trait)
        }
    }

    complete(): void {
        this.ensureActive()
        this._status = SessionStatus.COMPLETED
        this._completedAt = new Date()

        this.record(
            new ScreeningSessionCompletedDomainEvent({
                aggregateId: this._id.toString(),
                userId: this._userId,
                traitCount: this._traits.length,
                completedAt: this._completedAt,
            }),
        )
    }

    canConclude(): boolean {
        const significantTraits = this._traits.filter(trait => trait.confidence >= 0.7)

        return significantTraits.length >= 5
    }

    toSnapshot(): ScreeningSessionSnapshot {
        return {
            id: this._id.toString(),
            userId: this._userId,
            status: this._status,
            messages: [...this._messages],
            traits: [...this._traits],
            startedAt: this._startedAt,
            completedAt: this._completedAt,
            metadata: { ...this._metadata },
        }
    }

    private ensureActive(): void {
        if (this._status !== SessionStatus.ACTIVE) {
            throw new Error('Session is not active')
        }
    }

    private static getSystemPrompt(): string {
        return `Eres Prisma Guide, un psicólogo clínico experto especializado en la identificación de Altas Capacidades (AACC) y perfiles neurodivergentes.

TU MISIÓN:
Realizar un screening conversacional profundo para detectar rasgos cognitivos, emocionales y sensoriales característicos de:
- Altas Capacidades Intelectuales
- Superdotación
- Doble excepcionalidad
- Perfiles 2e (twice-exceptional)
- Neurodivergencia (TDAH, TEA, alta sensibilidad, etc.)

METODOLOGÍA:
1. Mantén una conversación fluida, empática y profesional
2. Explora dimensiones clave: pensamiento abstracto, creatividad, intensidad emocional, hipersensibilidad sensorial, perfeccionismo, asincronías
3. Usa preguntas abiertas y seguimiento estratégico
4. NO interrogues mecánicamente - adapta tu estilo a cada usuario
5. Detecta patrones y contradicciones sutiles

HERRAMIENTAS DISPONIBLES:
- registerTrait: Registra rasgos detectados de forma silenciosa (sin interrumpir la conversación)
- concludeScreening: Finaliza la sesión cuando tengas evidencia suficiente (mínimo 5 rasgos con confianza ≥0.7)
- askFollowUpQuestion: Profundiza en áreas que requieren más exploración

ESTILO:
- Profesional pero cercano
- Validador pero no complaciente
- Curioso y profundo
- Respetuoso con la experiencia del usuario

IMPORTANTE:
- NO des diagnósticos clínicos
- NO generes informes hasta que concluyas
- REGISTRA rasgos en tiempo real usando registerTrait
- GUÍA proactivamente la conversación hacia áreas inexploradas
- FINALIZA cuando tengas evidencia sólida de al menos 5 rasgos`
    }
}
