import { describe, it, expect } from 'vitest'
import { MessageRole } from '@/Contexts/Screening/Domain/ScreeningSession/MessageRole'
import { MessageMother } from './MessageMother'

describe('Message', () => {
    describe('create', () => {
        it('should create a new message with generated UUID', () => {
            const message = MessageMother.user('Hello world')

            expect(message.id).toBeDefined()
            expect(message.content).toBe('Hello world')
            expect(message.role).toBe(MessageRole.USER)
            expect(message.createdAt).toBeInstanceOf(Date)
        })

        it('should create message with metadata', () => {
            const message = MessageMother.assistant('Test message', { toolCallsExecuted: 2 })

            expect(message.metadata).toEqual({ toolCallsExecuted: 2 })
        })

        it('should create message without metadata', () => {
            const message = MessageMother.system('Test message')

            expect(message.metadata).toBeUndefined()
        })
    })

    describe('message roles', () => {
        it('should create USER message', () => {
            const message = MessageMother.user('User input')

            expect(message.role).toBe(MessageRole.USER)
        })

        it('should create ASSISTANT message', () => {
            const message = MessageMother.assistant('AI response')

            expect(message.role).toBe(MessageRole.ASSISTANT)
        })

        it('should create SYSTEM message', () => {
            const message = MessageMother.system('System prompt')

            expect(message.role).toBe(MessageRole.SYSTEM)
        })
    })
})
