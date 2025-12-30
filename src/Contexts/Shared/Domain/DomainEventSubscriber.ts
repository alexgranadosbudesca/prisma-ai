import type { DomainEvent, DomainEventClass } from './DomainEvent'

export interface DomainEventSubscriber<T extends DomainEvent = DomainEvent> {
    subscribedTo(): DomainEventClass[]
    on(event: T): Promise<void>
}
