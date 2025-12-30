import type { EventBus } from '@/Contexts/Shared/Domain/EventBus'
import type { DomainEvent, DomainEventClass } from '@/Contexts/Shared/Domain/DomainEvent'
import type { DomainEventSubscriber } from '@/Contexts/Shared/Domain/DomainEventSubscriber'

export class InMemoryAsyncEventBus implements EventBus {
    private subscribers: Map<string, DomainEventSubscriber[]> = new Map()

    constructor(subscribers: DomainEventSubscriber[] = []) {
        this.registerSubscribers(subscribers)
    }

    async publish(events: DomainEvent[]): Promise<void> {
        const promises = events.flatMap(event => this.publishEvent(event))
        await Promise.all(promises)
    }

    addSubscribers(subscribers: DomainEventSubscriber[]): void {
        this.registerSubscribers(subscribers)
    }

    private registerSubscribers(subscribers: DomainEventSubscriber[]): void {
        subscribers.forEach(subscriber => {
            subscriber.subscribedTo().forEach(eventClass => {
                this.subscribe(eventClass.EVENT_NAME, subscriber)
            })
        })
    }

    private subscribe(eventName: string, subscriber: DomainEventSubscriber): void {
        const currentSubscribers = this.subscribers.get(eventName) ?? []
        currentSubscribers.push(subscriber)
        this.subscribers.set(eventName, currentSubscribers)
    }

    private publishEvent(event: DomainEvent): Promise<void>[] {
        const eventName = event.eventName
        const subscribers = this.subscribers.get(eventName) ?? []

        return subscribers.map(subscriber => {
            return subscriber.on(event).catch(error => {
                console.error(`Error in subscriber for event ${eventName}:`, error)
            })
        })
    }
}
