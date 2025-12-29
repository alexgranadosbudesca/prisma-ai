import type { MessageRole } from './MessageRole'
import { Uuid } from '@/Contexts/Shared/Domain/Uuid'

export class Message {
    constructor(
        public readonly id: Uuid,
        public readonly content: string,
        public readonly role: MessageRole,
        public readonly createdAt: Date,
        public readonly metadata?: Record<string, unknown>
    ) {}

    static create(params: {
        content: string
        role: MessageRole
        metadata?: Record<string, unknown>
    }): Message {
        return new Message(
            Uuid.generate(),
            params.content,
            params.role,
            new Date(),
            params.metadata
        )
    }
}
