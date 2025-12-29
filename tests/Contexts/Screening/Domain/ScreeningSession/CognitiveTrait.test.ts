import { describe, it, expect } from 'vitest'
import { CognitiveTraitMother } from './CognitiveTraitMother'

describe('CognitiveTrait', () => {
    describe('create', () => {
        it('should create a new cognitive trait with valid data', () => {
            const trait = CognitiveTraitMother.intellectual('Abstract thinking', 0.85)

            expect(trait.id).toBeDefined()
            expect(trait.category).toBe('INTELLECTUAL')
            expect(trait.name).toBe('Abstract thinking')
            expect(trait.description).toBe('Ability to think in abstract terms')
            expect(trait.evidence).toBe('User demonstrated abstract reasoning')
            expect(trait.confidence).toBe(0.85)
            expect(trait.detectedAt).toBeInstanceOf(Date)
        })

        it('should throw error if confidence is less than 0', () => {
            expect(CognitiveTraitMother.withInvalidConfidence(-0.1)).toThrow(
                'Confidence must be between 0 and 1',
            )
        })

        it('should throw error if confidence is greater than 1', () => {
            expect(CognitiveTraitMother.withInvalidConfidence(1.5)).toThrow(
                'Confidence must be between 0 and 1',
            )
        })

        it('should accept confidence of 0', () => {
            const trait = CognitiveTraitMother.withLowConfidence(0)

            expect(trait.confidence).toBe(0)
        })

        it('should accept confidence of 1', () => {
            const trait = CognitiveTraitMother.withHighConfidence(1)

            expect(trait.confidence).toBe(1)
        })
    })

    describe('trait categories', () => {
        it('should create INTELLECTUAL trait', () => {
            const trait = CognitiveTraitMother.intellectual('Logical reasoning', 0.8)

            expect(trait.category).toBe('INTELLECTUAL')
        })

        it('should create CREATIVE trait', () => {
            const trait = CognitiveTraitMother.creative('Divergent thinking', 0.9)

            expect(trait.category).toBe('CREATIVE')
        })

        it('should create SOCIO_EMOTIONAL trait', () => {
            const trait = CognitiveTraitMother.socioEmotional('Empathy', 0.75)

            expect(trait.category).toBe('SOCIO_EMOTIONAL')
        })

        it('should create SENSORY trait', () => {
            const trait = CognitiveTraitMother.sensory('Heightened sensitivity', 0.7)

            expect(trait.category).toBe('SENSORY')
        })

        it('should create EXECUTIVE_FUNCTION trait', () => {
            const trait = CognitiveTraitMother.executiveFunction('Planning ability', 0.85)

            expect(trait.category).toBe('EXECUTIVE_FUNCTION')
        })
    })
})
