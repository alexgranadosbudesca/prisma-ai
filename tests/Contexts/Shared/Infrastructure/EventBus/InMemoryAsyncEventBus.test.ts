import { describe, it, expect, vi } from 'vitest'
import { InMemoryAsyncEventBus } from '@/Contexts/Shared/Infrastructure/EventBus/InMemoryAsyncEventBus'
import type { DomainEvent, DomainEventClass } from '@/Contexts/Shared/Domain/DomainEvent'
import type { DomainEventSubscriber } from '@/Contexts/Shared/Domain/DomainEventSubscriber'
import { ScreeningSessionCompletedDomainEvent } from '@/Contexts/Screening/Domain/ScreeningSession/ScreeningSessionCompletedDomainEvent'

describe('InMemoryAsyncEventBus', () => {
    it('should publish events to subscribed handlers', async () => {
        const mockHandler = vi.fn().mockResolvedValue(undefined)
        const subscriber: DomainEventSubscriber = {
            subscribedTo: () => [ScreeningSessionCompletedDomainEvent as DomainEventClass],
            on: mockHandler,
        }

        const eventBus = new InMemoryAsyncEventBus([subscriber])

        const event = new ScreeningSessionCompletedDomainEvent({
            aggregateId: 'session-123',
            userId: 'user-456',
            traitCount: 5,
            completedAt: new Date(),
        })

        await eventBus.publish([event])

        expect(mockHandler).toHaveBeenCalledTimes(1)
        expect(mockHandler).toHaveBeenCalledWith(event)
    })

    it('should publish multiple events', async () => {
        const mockHandler = vi.fn().mockResolvedValue(undefined)
        const subscriber: DomainEventSubscriber = {
            subscribedTo: () => [ScreeningSessionCompletedDomainEvent as DomainEventClass],
            on: mockHandler,
        }

        const eventBus = new InMemoryAsyncEventBus([subscriber])

        const event1 = new ScreeningSessionCompletedDomainEvent({
            aggregateId: 'session-1',
            userId: 'user-1',
            traitCount: 5,
            completedAt: new Date(),
        })

        const event2 = new ScreeningSessionCompletedDomainEvent({
            aggregateId: 'session-2',
            userId: 'user-2',
            traitCount: 7,
            completedAt: new Date(),
        })

        await eventBus.publish([event1, event2])

        expect(mockHandler).toHaveBeenCalledTimes(2)
        expect(mockHandler).toHaveBeenCalledWith(event1)
        expect(mockHandler).toHaveBeenCalledWith(event2)
    })

    it('should handle multiple subscribers for the same event', async () => {
        const mockHandler1 = vi.fn().mockResolvedValue(undefined)
        const mockHandler2 = vi.fn().mockResolvedValue(undefined)

        const subscriber1: DomainEventSubscriber = {
            subscribedTo: () => [ScreeningSessionCompletedDomainEvent as DomainEventClass],
            on: mockHandler1,
        }

        const subscriber2: DomainEventSubscriber = {
            subscribedTo: () => [ScreeningSessionCompletedDomainEvent as DomainEventClass],
            on: mockHandler2,
        }

        const eventBus = new InMemoryAsyncEventBus([subscriber1, subscriber2])

        const event = new ScreeningSessionCompletedDomainEvent({
            aggregateId: 'session-123',
            userId: 'user-456',
            traitCount: 5,
            completedAt: new Date(),
        })

        await eventBus.publish([event])

        expect(mockHandler1).toHaveBeenCalledTimes(1)
        expect(mockHandler2).toHaveBeenCalledTimes(1)
        expect(mockHandler1).toHaveBeenCalledWith(event)
        expect(mockHandler2).toHaveBeenCalledWith(event)
    })

    it('should not fail if no subscribers are registered', async () => {
        const eventBus = new InMemoryAsyncEventBus()

        const event = new ScreeningSessionCompletedDomainEvent({
            aggregateId: 'session-123',
            userId: 'user-456',
            traitCount: 5,
            completedAt: new Date(),
        })

        await expect(eventBus.publish([event])).resolves.not.toThrow()
    })

    it('should handle subscriber errors gracefully', async () => {
        const mockHandler = vi.fn().mockRejectedValue(new Error('Subscriber error'))
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

        const subscriber: DomainEventSubscriber = {
            subscribedTo: () => [ScreeningSessionCompletedDomainEvent as DomainEventClass],
            on: mockHandler,
        }

        const eventBus = new InMemoryAsyncEventBus([subscriber])

        const event = new ScreeningSessionCompletedDomainEvent({
            aggregateId: 'session-123',
            userId: 'user-456',
            traitCount: 5,
            completedAt: new Date(),
        })

        await expect(eventBus.publish([event])).resolves.not.toThrow()

        expect(mockHandler).toHaveBeenCalledTimes(1)
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining('Error in subscriber'),
            expect.any(Error),
        )

        consoleErrorSpy.mockRestore()
    })

    it('should allow adding subscribers dynamically', async () => {
        const mockHandler = vi.fn().mockResolvedValue(undefined)
        const subscriber: DomainEventSubscriber = {
            subscribedTo: () => [ScreeningSessionCompletedDomainEvent as DomainEventClass],
            on: mockHandler,
        }

        const eventBus = new InMemoryAsyncEventBus()
        eventBus.addSubscribers([subscriber])

        const event = new ScreeningSessionCompletedDomainEvent({
            aggregateId: 'session-123',
            userId: 'user-456',
            traitCount: 5,
            completedAt: new Date(),
        })

        await eventBus.publish([event])

        expect(mockHandler).toHaveBeenCalledTimes(1)
        expect(mockHandler).toHaveBeenCalledWith(event)
    })
})
