import { describe, it, expect } from 'vitest'
import { ScreeningSession } from '@/Contexts/Screening/Domain/ScreeningSession/ScreeningSession'
import { SessionStatus } from '@/Contexts/Screening/Domain/ScreeningSession/SessionStatus'
import { MessageRole } from '@/Contexts/Screening/Domain/ScreeningSession/MessageRole'
import { ScreeningSessionMother } from './ScreeningSessionMother'
import { CognitiveTraitMother } from './CognitiveTraitMother'

describe('ScreeningSession', () => {
    describe('create', () => {
        it('should create a new screening session with ACTIVE status', () => {
            const session = ScreeningSessionMother.create('user-123')

            expect(session.status).toBe(SessionStatus.ACTIVE)
            expect(session.userId).toBe('user-123')
            expect(session.messages.length).toBe(1)
            expect(session.messages[0].role).toBe(MessageRole.SYSTEM)
            expect(session.traits.length).toBe(0)
        })

        it('should include system prompt as first message', () => {
            const session = ScreeningSessionMother.create('user-123')

            expect(session.messages[0].content).toContain('Prisma Guide')
        })
    })

    describe('addUserMessage', () => {
        it('should add user message to session', () => {
            const session = ScreeningSessionMother.create('user-123')

            session.addUserMessage('Hello, I love solving puzzles')

            expect(session.messages.length).toBe(2)
            expect(session.messages[1].role).toBe(MessageRole.USER)
            expect(session.messages[1].content).toBe('Hello, I love solving puzzles')
        })

        it('should throw error if session is not active', () => {
            const session = ScreeningSessionMother.completed('user-123')

            expect(() => session.addUserMessage('test')).toThrow('Session is not active')
        })
    })

    describe('addAssistantMessage', () => {
        it('should add assistant message to session', () => {
            const session = ScreeningSessionMother.create('user-123')

            session.addAssistantMessage('Interesting! Tell me more', { toolCallsExecuted: 1 })

            expect(session.messages.length).toBe(2)
            expect(session.messages[1].role).toBe(MessageRole.ASSISTANT)
            expect(session.messages[1].content).toBe('Interesting! Tell me more')
        })
    })

    describe('registerTrait', () => {
        it('should register a new cognitive trait', () => {
            const session = ScreeningSessionMother.create('user-123')
            const trait = CognitiveTraitMother.intellectual('Abstract thinking', 0.85)

            session.registerTrait(trait)

            expect(session.traits.length).toBe(1)
            expect(session.traits[0].name).toBe('Abstract thinking')
        })

        it('should not register duplicate traits with same name and category', () => {
            const session = ScreeningSessionMother.create('user-123')
            const trait1 = CognitiveTraitMother.intellectual('Abstract thinking', 0.85)
            const trait2 = CognitiveTraitMother.intellectual('Abstract thinking', 0.9)

            session.registerTrait(trait1)
            session.registerTrait(trait2)

            expect(session.traits.length).toBe(1)
        })

        it('should throw error if session is not active', () => {
            const session = ScreeningSessionMother.completed('user-123')
            const trait = CognitiveTraitMother.create()

            expect(() => session.registerTrait(trait)).toThrow('Session is not active')
        })
    })

    describe('canConclude', () => {
        it('should return true when session has 5 traits with confidence >= 0.7', () => {
            const session = ScreeningSessionMother.readyToConclude('user-123')

            expect(session.canConclude()).toBe(true)
        })

        it('should return false when session has less than 5 traits', () => {
            const session = ScreeningSessionMother.withTraits('user-123', 3)

            expect(session.canConclude()).toBe(false)
        })

        it('should return false when traits have low confidence', () => {
            const session = ScreeningSessionMother.create('user-123')

            for (let index = 0; index < 5; index++) {
                session.registerTrait(CognitiveTraitMother.withLowConfidence(0.5))
            }

            expect(session.canConclude()).toBe(false)
        })
    })

    describe('complete', () => {
        it('should change status to COMPLETED', () => {
            const session = ScreeningSessionMother.create('user-123')

            session.complete()

            expect(session.status).toBe(SessionStatus.COMPLETED)
            expect(session.completedAt).toBeDefined()
        })

        it('should throw error if session is not active', () => {
            const session = ScreeningSessionMother.completed('user-123')

            expect(() => session.complete()).toThrow('Session is not active')
        })
    })

    describe('toSnapshot and fromSnapshot', () => {
        it('should serialize and deserialize session correctly', () => {
            const session = ScreeningSessionMother.create('user-123')
            session.addUserMessage('Test message')
            session.registerTrait(CognitiveTraitMother.creative('Creative thinking', 0.9))

            const snapshot = session.toSnapshot()
            const restoredSession = ScreeningSession.fromSnapshot(snapshot)

            expect(restoredSession.userId).toBe('user-123')
            expect(restoredSession.status).toBe(SessionStatus.ACTIVE)
            expect(restoredSession.messages.length).toBe(2)
            expect(restoredSession.traits.length).toBe(1)
        })
    })
})
