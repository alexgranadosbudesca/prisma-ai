import type { TraitCategory } from './TraitCategory'
import { Uuid } from '@/Contexts/Shared/Domain/Uuid'

export class CognitiveTrait {
    constructor(
        public readonly id: Uuid,
        public readonly category: TraitCategory,
        public readonly name: string,
        public readonly description: string,
        public readonly evidence: string,
        public readonly confidence: number,
        public readonly detectedAt: Date
    ) {
        if (confidence < 0 || confidence > 1) {
            throw new Error('Confidence must be between 0 and 1')
        }
    }

    static create(params: {
        category: TraitCategory
        name: string
        description: string
        evidence: string
        confidence: number
    }): CognitiveTrait {
        return new CognitiveTrait(
            Uuid.generate(),
            params.category,
            params.name,
            params.description,
            params.evidence,
            params.confidence,
            new Date()
        )
    }
}
