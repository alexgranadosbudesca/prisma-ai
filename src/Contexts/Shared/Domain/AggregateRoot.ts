import type {DomainEvent} from "@/Contexts/Shared/Domain/DomainEvent";

export abstract class AggregateRoot {
	private domainEvents: DomainEvent[] = []

	protected constructor() {}

	pullDomainEvents(): DomainEvent[] {
		const domainEvents = this.domainEvents.slice()
		this.domainEvents = []

		return domainEvents
	}

	record(event: DomainEvent): void {
		this.domainEvents.push(event)
	}
}
