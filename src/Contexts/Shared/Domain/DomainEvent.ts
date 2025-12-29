import {Uuid} from "@/Contexts/Shared/Domain/Uuid";

export abstract class DomainEvent {
	static EVENT_NAME: string

	readonly aggregateId: string
	readonly eventId: string
	readonly occurredOn: Date
	readonly eventName: string

	protected constructor({
		aggregateId,
		eventName,
		eventId = Uuid.generate().value,
		occurredOn = new Date(),
	}: {
		eventName: string
		aggregateId: string
		eventId?: string
		occurredOn?: Date
	}) {
		this.aggregateId = aggregateId
		this.eventId = eventId
		this.occurredOn = occurredOn
		this.eventName = eventName
	}

	abstract toPrimitives(): DomainEventAttributes

	genericPrimitives(): {
		aggregateId: string
		eventId: string
		occurredOn: Date
	} {
		return {
			aggregateId: this.aggregateId,
			eventId: this.eventId,
			occurredOn: this.occurredOn,
		}
	}
}

export type DomainEventClass<
	T extends DomainEvent = DomainEvent,
	P extends DomainEventAttributes = DomainEventAttributes,
> = {
	EVENT_NAME: string
	fromPrimitives(params: { aggregateId: string; eventId: string; occurredOn: Date; attributes: P }): T
}

export type DomainEventAttributes = object

export type DomainEventPrimitive = {
	aggregateId: string
	eventId: string
	occurredOn: Date
	attributes: DomainEventAttributes
	tracing?: { [key: string]: string | undefined }
}
