import { anthropic } from '@ai-sdk/anthropic'
import { generateText, streamText } from 'ai'
import type {
    ScreeningResponseGenerator,
    ScreeningResponse,
    AIStreamChunk,
} from '@/Contexts/Screening/Domain/ScreeningSession/ScreeningResponseGenerator'
import type { Message } from '@/Contexts/Screening/Domain/ScreeningSession/Message'
import { CognitiveTrait } from '@/Contexts/Screening/Domain/ScreeningSession/CognitiveTrait'
import type { TraitCategory } from '@/Contexts/Screening/Domain/ScreeningSession/TraitCategory'
import { z } from 'zod'

const registerTraitTool = {
    description: 'Registra un rasgo cognitivo detectado durante la conversación',
    inputSchema: z.object({
        category: z.enum([
            'INTELLECTUAL',
            'CREATIVE',
            'SOCIO_EMOTIONAL',
            'SENSORY',
            'EXECUTIVE_FUNCTION',
        ]),
        name: z.string().describe('Nombre del rasgo (ej: "Pensamiento divergente")'),
        description: z.string().describe('Descripción detallada del rasgo'),
        evidence: z.string().describe('Cita textual o paráfrasis de lo que dijo el usuario'),
        confidence: z.number().min(0).max(1).describe('Nivel de confianza (0-1)'),
    }),
}

const concludeScreeningTool = {
    description: 'Finaliza la sesión de screening cuando hay evidencia suficiente',
    inputSchema: z.object({
        reason: z.string().describe('Justificación de por qué se concluye'),
    }),
}

const askFollowUpTool = {
    description:
        'Solicita profundizar en un área específica (opcional, para guiar tu propia conversación)',
    inputSchema: z.object({
        area: z.string().describe('Área a explorar'),
        rationale: z.string().describe('Por qué es importante explorarla'),
    }),
}

export class GenerateScreeningResponseWithAnthropic implements ScreeningResponseGenerator {
    private readonly model = anthropic('claude-3-5-sonnet-20241022')

    async generateResponse(
        messages: readonly Message[],
        onStream?: (chunk: AIStreamChunk) => void
    ): Promise<ScreeningResponse> {
        const formattedMessages = this.formatMessages(messages)

        if (onStream) {
            return this.generateStreamingResponse(formattedMessages, onStream)
        }

        return this.generateStaticResponse(formattedMessages)
    }

    private async generateStaticResponse(
        messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>
    ): Promise<ScreeningResponse> {
        const result = await generateText({
            model: this.model,
            messages,
            tools: {
                registerTrait: registerTraitTool,
                concludeScreening: concludeScreeningTool,
                askFollowUp: askFollowUpTool,
            },
        })

        return {
            message: result.text,
            toolCalls:
                result.toolCalls?.map(toolCall => ({
                    name: toolCall.toolName,
                    arguments: (toolCall as any).args,
                })) || [],
        }
    }

    private async generateStreamingResponse(
        messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>,
        onStream: (chunk: AIStreamChunk) => void
    ): Promise<ScreeningResponse> {
        const result = streamText({
            model: this.model,
            messages,
            tools: {
                registerTrait: registerTraitTool,
                concludeScreening: concludeScreeningTool,
                askFollowUp: askFollowUpTool,
            },
        })

        let fullText = ''
        const toolCalls: { name: string; arguments: unknown }[] = []

        for await (const chunk of result.fullStream) {
            if (chunk.type === 'text-delta') {
                fullText += chunk.text
                onStream({ type: 'text', content: chunk.text })
            } else if (chunk.type === 'tool-call') {
                toolCalls.push({
                    name: chunk.toolName,
                    arguments: (chunk as any).args,
                })
                onStream({
                    type: 'tool_call',
                    toolName: chunk.toolName,
                    toolArgs: (chunk as any).args,
                })
            } else if (chunk.type === 'finish') {
                onStream({ type: 'completion' })
            }
        }

        return { message: fullText, toolCalls }
    }

    parseTraitFromToolCall(toolName: string, args: unknown): CognitiveTrait | null {
        if (toolName !== 'registerTrait') return null

        const parsed = args as {
            category: string
            name: string
            description: string
            evidence: string
            confidence: number
        }

        return CognitiveTrait.create({
            category: parsed.category as TraitCategory,
            name: parsed.name,
            description: parsed.description,
            evidence: parsed.evidence,
            confidence: parsed.confidence,
        })
    }

    private formatMessages(messages: readonly Message[]): Array<{ role: 'user' | 'assistant' | 'system'; content: string }> {
        return messages.map(message => ({
            role: message.role.toLowerCase() as 'user' | 'assistant' | 'system',
            content: message.content,
        }))
    }
}
