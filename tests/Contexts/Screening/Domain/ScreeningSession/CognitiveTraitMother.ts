import {CognitiveTrait} from '@/Contexts/Screening/Domain/ScreeningSession/CognitiveTrait'
import {TraitCategory} from '@/Contexts/Screening/Domain/ScreeningSession/TraitCategory'

export class CognitiveTraitMother {
    static create(params?: {
        category?: TraitCategory
        name?: string
        description?: string
        evidence?: string
        confidence?: number
    }): CognitiveTrait {
        return CognitiveTrait.create({
            category: params?.category ?? TraitCategory.INTELLECTUAL,
            name: params?.name ?? 'Default trait name',
            description: params?.description ?? 'Default trait description',
            evidence: params?.evidence ?? 'Default evidence',
            confidence: params?.confidence ?? 0.8,
        })
    }

    static intellectual(name?: string, confidence?: number): CognitiveTrait {
        return CognitiveTrait.create({
            category: TraitCategory.INTELLECTUAL,
            name: name ?? 'Abstract thinking',
            description: 'Ability to think in abstract terms',
            evidence: 'User demonstrated abstract reasoning',
            confidence: confidence ?? 0.85,
        })
    }

    static creative(name?: string, confidence?: number): CognitiveTrait {
        return CognitiveTrait.create({
            category: TraitCategory.CREATIVE,
            name: name ?? 'Divergent thinking',
            description: 'Creative problem solving',
            evidence: 'User showed creative solutions',
            confidence: confidence ?? 0.9,
        })
    }

    static socioEmotional(name?: string, confidence?: number): CognitiveTrait {
        return CognitiveTrait.create({
            category: TraitCategory.SOCIO_EMOTIONAL,
            name: name ?? 'Empathy',
            description: 'High emotional intelligence',
            evidence: 'User demonstrated empathy',
            confidence: confidence ?? 0.75,
        })
    }

    static sensory(name?: string, confidence?: number): CognitiveTrait {
        return CognitiveTrait.create({
            category: TraitCategory.SENSORY,
            name: name ?? 'Heightened sensitivity',
            description: 'Sensory awareness',
            evidence: 'User mentioned sensory details',
            confidence: confidence ?? 0.7,
        })
    }

    static executiveFunction(name?: string, confidence?: number): CognitiveTrait {
        return CognitiveTrait.create({
            category: TraitCategory.EXECUTIVE_FUNCTION,
            name: name ?? 'Planning ability',
            description: 'Strong planning skills',
            evidence: 'User demonstrated planning',
            confidence: confidence ?? 0.85,
        })
    }

    static withLowConfidence(confidence: number = 0.5): CognitiveTrait {
        return CognitiveTrait.create({
            category: TraitCategory.INTELLECTUAL,
            name: 'Low confidence trait',
            description: 'Test trait',
            evidence: 'Test evidence',
            confidence,
        })
    }

    static withHighConfidence(confidence: number = 0.95): CognitiveTrait {
        return CognitiveTrait.create({
            category: TraitCategory.INTELLECTUAL,
            name: 'High confidence trait',
            description: 'Test trait',
            evidence: 'Test evidence',
            confidence,
        })
    }

    static withInvalidConfidence(confidence: number): () => CognitiveTrait {
        return () =>
            CognitiveTrait.create({
                category: TraitCategory.INTELLECTUAL,
                name: 'Test',
                description: 'Test',
                evidence: 'Test',
                confidence,
            })
    }
}
