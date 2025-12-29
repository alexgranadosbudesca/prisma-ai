import type { ScreeningSession } from './ScreeningSession'

export interface ScreeningRepository {
    save(session: ScreeningSession): Promise<void>
    findById(id: string): Promise<ScreeningSession | null>
    findByUserId(userId: string): Promise<ScreeningSession[]>
    findActiveByUserId(userId: string): Promise<ScreeningSession | null>
}
