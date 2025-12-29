import { describe, it, expect } from 'vitest'
import { Uuid } from '@/Contexts/Shared/Domain/Uuid'

describe('Uuid', () => {
    describe('generate', () => {
        it('should generate a new UUID', () => {
            const uuid = Uuid.generate()
            expect(uuid).toBeInstanceOf(Uuid)
            expect(uuid.toString()).toMatch(
                /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
            )
        })

        it('should generate different UUIDs on each call', () => {
            const uuid1 = Uuid.generate()
            const uuid2 = Uuid.generate()
            expect(uuid1.toString()).not.toBe(uuid2.toString())
        })
    })

    describe('from', () => {
        it('should create UUID from valid string', () => {
            const validUuid = '550e8400-e29b-41d4-a716-446655440000'
            const uuid = Uuid.from(validUuid)
            expect(uuid).toBeInstanceOf(Uuid)
            expect(uuid.toString()).toBe(validUuid)
        })

        it('should throw error for invalid UUID string', () => {
            const invalidUuid = 'not-a-valid-uuid'
            expect(() => Uuid.from(invalidUuid)).toThrow(
                '<Uuid> does not allow the value <not-a-valid-uuid>',
            )
        })

        it('should throw error for empty string', () => {
            expect(() => Uuid.from('')).toThrow('<Uuid> does not allow the value <>')
        })

        it('should throw error for malformed UUID', () => {
            const malformedUuid = '550e8400-e29b-41d4-a716-44665544000'
            expect(() => Uuid.from(malformedUuid)).toThrow(
                `<Uuid> does not allow the value <${malformedUuid}>`,
            )
        })
    })

    describe('toString', () => {
        it('should return string representation of UUID', () => {
            const uuidString = '550e8400-e29b-41d4-a716-446655440000'
            const uuid = Uuid.from(uuidString)
            expect(uuid.toString()).toBe(uuidString)
        })
    })

    describe('equals', () => {
        it('should return true for equal UUIDs', () => {
            const uuidString = '550e8400-e29b-41d4-a716-446655440000'
            const uuid1 = Uuid.from(uuidString)
            const uuid2 = Uuid.from(uuidString)
            expect(uuid1.equals(uuid2)).toBe(true)
        })

        it('should return false for different UUIDs', () => {
            const uuid1 = Uuid.from('550e8400-e29b-41d4-a716-446655440000')
            const uuid2 = Uuid.from('550e8400-e29b-41d4-a716-446655440001')
            expect(uuid1.equals(uuid2)).toBe(false)
        })

        it('should return false when comparing with newly generated UUID', () => {
            const uuid1 = Uuid.generate()
            const uuid2 = Uuid.generate()
            expect(uuid1.equals(uuid2)).toBe(false)
        })
    })

    describe('value property', () => {
        it('should expose the UUID value', () => {
            const uuidString = '550e8400-e29b-41d4-a716-446655440000'
            const uuid = Uuid.from(uuidString)
            expect(uuid.value).toBe(uuidString)
        })
    })
})
