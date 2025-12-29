import { ScreeningSession } from '@/Contexts/Screening/Domain/ScreeningSession/ScreeningSession'
import { CognitiveTraitMother } from './CognitiveTraitMother'

export class ScreeningSessionMother {
    static create(userId?: string): ScreeningSession {
        return ScreeningSession.create(userId ?? 'test-user-id')
    }

    static withTraits(userId?: string, traitCount: number = 3): ScreeningSession {
        const session = ScreeningSession.create(userId ?? 'test-user-id')

        for (let index = 0; index < traitCount; index++) {
            const trait = CognitiveTraitMother.create({
                name: `Trait ${index}`,
                confidence: 0.8,
            })
            session.registerTrait(trait)
        }

        return session
    }

    static readyToConclude(userId?: string): ScreeningSession {
        const session = ScreeningSession.create(userId ?? 'test-user-id')

        // Add 5 traits with confidence >= 0.7
        for (let index = 0; index < 5; index++) {
            session.registerTrait(
                CognitiveTraitMother.create({
                    name: `Trait ${index}`,
                    confidence: 0.8,
                }),
            )
        }

        return session
    }

    static completed(userId?: string): ScreeningSession {
        const session = ScreeningSession.create(userId ?? 'test-user-id')

        // Add 5 traits with confidence >= 0.7
        for (let index = 0; index < 5; index++) {
            session.registerTrait(
                CognitiveTraitMother.create({
                    name: `Trait ${index}`,
                    confidence: 0.8,
                }),
            )
        }

        session.complete()

        return session
    }
}
