import { Message } from '@/Contexts/Screening/Domain/ScreeningSession/Message'
import { MessageRole } from '@/Contexts/Screening/Domain/ScreeningSession/MessageRole'

export class MessageMother {
    static create(params?: {
        content?: string
        role?: MessageRole
        metadata?: Record<string, unknown>
    }): Message {
        return Message.create({
            content: params?.content ?? 'Default message content',
            role: params?.role ?? MessageRole.USER,
            metadata: params?.metadata,
        })
    }

    static user(content?: string): Message {
        return Message.create({
            content: content ?? 'User message',
            role: MessageRole.USER,
        })
    }

    static assistant(content?: string, metadata?: Record<string, unknown>): Message {
        return Message.create({
            content: content ?? 'Assistant message',
            role: MessageRole.ASSISTANT,
            metadata,
        })
    }

    static system(content?: string): Message {
        return Message.create({
            content: content ?? 'System prompt',
            role: MessageRole.SYSTEM,
        })
    }
}
