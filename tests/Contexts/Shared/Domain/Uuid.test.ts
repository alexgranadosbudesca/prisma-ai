import { describe, it, expect } from 'vitest'
import { UuidMother } from './UuidMother'

describe('Uuid', () => {
    describe('generate', () => {
        it('should generate a new UUID', () => {
            const uuid = UuidMother.random()
            expect(uuid.toString()).toMatch(
                /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
            )
        })

        it('should generate different UUIDs on each call', () => {
            const uuid1 = UuidMother.random()
            const uuid2 = UuidMother.random()
            expect(uuid1.toString()).not.toBe(uuid2.toString())
        })
    })

    describe('from', () => {
        it('should create UUID from valid string', () => {
            const uuid = UuidMother.example1()
            expect(uuid.toString()).toBe('550e8400-e29b-41d4-a716-446655440000')
        })

        it('should throw error for invalid UUID string', () => {
            const invalidUuid = UuidMother.invalid()
            expect(() => UuidMother.fromValue(invalidUuid)).toThrow(
                '<Uuid> does not allow the value <not-a-valid-uuid>',
            )
        })

        it('should throw error for empty string', () => {
            expect(() => UuidMother.fromValue('')).toThrow('<Uuid> does not allow the value <>')
        })

        it('should throw error for malformed UUID', () => {
            const malformedUuid = '550e8400-e29b-41d4-a716-44665544000'
            expect(() => UuidMother.fromValue(malformedUuid)).toThrow(
                `<Uuid> does not allow the value <${malformedUuid}>`,
            )
        })
    })

    describe('toString', () => {
        it('should return string representation of UUID', () => {
            const uuid = UuidMother.example1()
            expect(uuid.toString()).toBe('550e8400-e29b-41d4-a716-446655440000')
        })
    })

    describe('equals', () => {
        it('should return true for equal UUIDs', () => {
            const uuid1 = UuidMother.example1()
            const uuid2 = UuidMother.fromValue('550e8400-e29b-41d4-a716-446655440000')
            expect(uuid1.equals(uuid2)).toBe(true)
        })

        it('should return false for different UUIDs', () => {
            const uuid1 = UuidMother.example1()
            const uuid2 = UuidMother.example2()
            expect(uuid1.equals(uuid2)).toBe(false)
        })

        it('should return false when comparing with newly generated UUID', () => {
            const uuid1 = UuidMother.random()
            const uuid2 = UuidMother.random()
            expect(uuid1.equals(uuid2)).toBe(false)
        })
    })

    describe('value property', () => {
        it('should expose the UUID value', () => {
            const uuid = UuidMother.example1()
            expect(uuid.value).toBe('550e8400-e29b-41d4-a716-446655440000')
        })
    })
})
