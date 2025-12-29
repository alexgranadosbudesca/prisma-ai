import { Uuid } from '@/Contexts/Shared/Domain/Uuid'

export class UuidMother {
    static create(value?: string): Uuid {
        if (value) {
            return Uuid.from(value)
        }

        return Uuid.generate()
    }

    static fromValue(value: string): Uuid {
        return Uuid.from(value)
    }

    static random(): Uuid {
        return Uuid.generate()
    }

    static example1(): Uuid {
        return Uuid.from('550e8400-e29b-41d4-a716-446655440000')
    }

    static example2(): Uuid {
        return Uuid.from('550e8400-e29b-41d4-a716-446655440001')
    }

    static invalid(): string {
        return 'not-a-valid-uuid'
    }
}
