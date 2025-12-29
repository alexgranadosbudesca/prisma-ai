import { DomainEvent } from '@/Contexts/Shared/Domain/DomainEvent'

type ScreeningSessionCompletedAttributes = {
    userId: string
    traitCount: number
    completedAt: Date
}

export class ScreeningSessionCompletedDomainEvent extends DomainEvent {
    static override readonly EVENT_NAME = 'screening.session.completed'

    readonly userId: string
    readonly traitCount: number
    readonly completedAt: Date

    constructor({
        aggregateId,
        userId,
        traitCount,
        completedAt,
        eventId,
        occurredOn,
    }: {
        aggregateId: string
        userId: string
        traitCount: number
        completedAt: Date
        eventId?: string
        occurredOn?: Date
    }) {
        super({ aggregateId, eventName: ScreeningSessionCompletedDomainEvent.EVENT_NAME, eventId, occurredOn })
        this.userId = userId
        this.traitCount = traitCount
        this.completedAt = completedAt
    }

    toPrimitives(): ScreeningSessionCompletedAttributes {
        return {
            userId: this.userId,
            traitCount: this.traitCount,
            completedAt: this.completedAt,
        }
    }

    static fromPrimitives(params: {
        aggregateId: string
        eventId: string
        occurredOn: Date
        attributes: ScreeningSessionCompletedAttributes
    }): ScreeningSessionCompletedDomainEvent {
        return new ScreeningSessionCompletedDomainEvent({
            aggregateId: params.aggregateId,
            userId: params.attributes.userId,
            traitCount: params.attributes.traitCount,
            completedAt: params.attributes.completedAt,
            eventId: params.eventId,
            occurredOn: params.occurredOn,
        })
    }
}
