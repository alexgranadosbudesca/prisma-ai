import type { Message } from '@/Contexts/Screening/Domain/ScreeningSession/Message'
import type { CognitiveTrait } from '@/Contexts/Screening/Domain/ScreeningSession/CognitiveTrait'

export interface AIStreamChunk {
    type: 'text' | 'tool_call' | 'completion'
    content?: string
    toolName?: string
    toolArgs?: unknown
}

export interface ScreeningResponse {
    message: string
    toolCalls: {
        name: string
        arguments: unknown
    }[]
}

export interface ScreeningResponseGenerator {
    generateResponse(
        messages: readonly Message[],
        onStream?: (chunk: AIStreamChunk) => void
    ): Promise<ScreeningResponse>

    parseTraitFromToolCall(toolName: string, args: unknown): CognitiveTrait | null
}
