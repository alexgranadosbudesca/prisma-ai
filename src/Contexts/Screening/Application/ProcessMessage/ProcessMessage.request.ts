export interface ProcessMessageRequest {
    sessionId: string
    userId: string
    content: string
}

export interface ProcessMessageResponse {
    sessionId: string
    assistantMessage: string
    isSessionCompleted: boolean
    detectedTraits?: {
        category: string
        name: string
        confidence: number
    }[]
}
