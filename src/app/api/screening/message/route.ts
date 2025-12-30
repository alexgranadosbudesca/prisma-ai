import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { ProcessMessageUseCase } from '@/Contexts/Screening/Application/ProcessMessage/ProcessMessage.use-case'
import { SupabaseScreeningRepository } from '@/Contexts/Screening/Infrastructure/Persistence/SupabaseScreeningRepository'
import { GenerateScreeningResponseWithAnthropic } from '@/Contexts/Screening/Infrastructure/Ai/GenerateScreeningResponse'

export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as { sessionId?: string; userId: string; content: string }
        const { sessionId, userId, content } = body

        if (!userId || !content) {
            return NextResponse.json({ error: 'userId and content are required' }, { status: 400 })
        }

        const repository = new SupabaseScreeningRepository(
            process.env.SUPABASE_URL!,
            process.env.SUPABASE_ANON_KEY!
        )
        const responseGenerator = new GenerateScreeningResponseWithAnthropic()
        const useCase = new ProcessMessageUseCase(repository, responseGenerator)

        const result = await useCase.execute({
            sessionId: sessionId ?? crypto.randomUUID(),
            userId,
            content,
        })

        return NextResponse.json(result)
    } catch (error) {
        console.error('Error processing message:', error)

        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
