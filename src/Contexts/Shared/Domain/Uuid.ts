import { ValueObject } from './ValueObject'
import { randomUUID } from 'crypto'
import { validate } from 'uuid'

export class Uuid extends ValueObject<string> {
    protected constructor(value: string) {
        super(value)
		this.ensureIsValidUuid(value)
	}

    static from(value: string): Uuid {
        return new Uuid(value)
    }

    static generate(): Uuid {
        return new Uuid(randomUUID())
    }

    private ensureIsValidUuid(value: string): void {
        if (!validate(value)) {
            throw new Error(`<${this.constructor.name}> does not allow the value <${value}>`)
        }
    }

    toString(): string {
        return this.value
    }
}
