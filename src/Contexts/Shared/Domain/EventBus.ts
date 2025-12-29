import type {DomainEvent} from "@/Contexts/Shared/Domain/DomainEvent";

export interface EventBus {
	publish(events: DomainEvent[]): Promise<void>
}
