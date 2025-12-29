import { ScreeningSession } from '@/Contexts/Screening/Domain/ScreeningSession/ScreeningSession'
import { SessionStatus } from '@/Contexts/Screening/Domain/ScreeningSession/SessionStatus'
import type { CognitiveTrait } from '@/Contexts/Screening/Domain/ScreeningSession/CognitiveTrait'
import type { ScreeningRepository } from '@/Contexts/Screening/Domain/ScreeningSession/ScreeningRepository'
import type {
    ProcessMessageRequest,
    ProcessMessageResponse,
} from '@/Contexts/Screening/Application/ProcessMessage/ProcessMessage.request'
import type { ScreeningResponseGenerator } from '@/Contexts/Screening/Domain/ScreeningSession/ScreeningResponseGenerator'

export class ProcessMessageUseCase {
    constructor(
        private readonly repository: ScreeningRepository,
        private readonly screeningResponseGenerator: ScreeningResponseGenerator
    ) {}

    async execute(request: ProcessMessageRequest): Promise<ProcessMessageResponse> {
        let session = await this.repository.findById(request.sessionId)

        if (!session) {
            session = ScreeningSession.create(request.userId)
        }

        session.addUserMessage(request.content)

        const screeningResponse = await this.screeningResponseGenerator.generateResponse(
            session.messages
        )

        const newTraits: CognitiveTrait[] = []
        let shouldConclude = false

        for (const toolCall of screeningResponse.toolCalls) {
            if (toolCall.name === 'registerTrait') {
                const trait = this.screeningResponseGenerator.parseTraitFromToolCall(
                    toolCall.name,
                    toolCall.arguments
                )
                if (trait) {
                    session.registerTrait(trait)
                    newTraits.push(trait)
                }
            } else if (toolCall.name === 'concludeScreening') {
                shouldConclude = true
            }
        }

        session.addAssistantMessage(screeningResponse.message, {
            toolCallsExecuted: screeningResponse.toolCalls.length,
        })

        if (shouldConclude && session.canConclude()) {
            session.complete()
        }

        await this.repository.save(session)

        return {
            sessionId: session.id.toString(),
            assistantMessage: screeningResponse.message,
            isSessionCompleted: session.status === SessionStatus.COMPLETED,
            detectedTraits: newTraits.map(trait => ({
                category: trait.category,
                name: trait.name,
                confidence: trait.confidence,
            })),
        }
    }
}
