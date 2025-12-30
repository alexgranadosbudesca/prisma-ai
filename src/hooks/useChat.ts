'use client'

import { useState, useCallback, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'

export interface Message {
    id: string
    role: 'user' | 'assistant' | 'system'
    content: string
    timestamp: Date
}

interface UseChatOptions {
    userId?: string
}

export function useChat(options: UseChatOptions = {}) {
    const [messages, setMessages] = useState<Message[]>([])
    const [isGenerating, setIsGenerating] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const sessionIdRef = useRef<string>(uuidv4())
    const userIdRef = useRef<string>(options.userId || `guest-${uuidv4()}`)

    const sendMessage = useCallback(
        async (content: string, files?: File[]) => {
            if (!content.trim()) return

            // Clear any previous error
            setError(null)

            // Add user message
            const userMessage: Message = {
                id: uuidv4(),
                role: 'user',
                content: content.trim(),
                timestamp: new Date(),
            }

            setMessages(prev => [...prev, userMessage])
            setIsGenerating(true)

            try {
                // Call the API
                const response = await fetch('/api/screening/message', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        sessionId: sessionIdRef.current,
                        userId: userIdRef.current,
                        content: content.trim(),
                    }),
                })

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`)
                }

                const data = await response.json()

                // Add assistant message
                const assistantMessage: Message = {
                    id: uuidv4(),
                    role: 'assistant',
                    content: data.response || 'Lo siento, no pude generar una respuesta.',
                    timestamp: new Date(),
                }

                setMessages(prev => [...prev, assistantMessage])
            } catch (err) {
                console.error('Error sending message:', err)
                setError(
                    err instanceof Error
                        ? err.message
                        : 'Ocurrió un error al enviar el mensaje. Por favor, intenta de nuevo.'
                )

                // Add error message to chat
                const errorMessage: Message = {
                    id: uuidv4(),
                    role: 'assistant',
                    content:
                        'Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo en unos momentos.',
                    timestamp: new Date(),
                }

                setMessages(prev => [...prev, errorMessage])
            } finally {
                setIsGenerating(false)
            }
        },
        []
    )

    const clearMessages = useCallback(() => {
        setMessages([])
        setError(null)
        // Generate new session ID for fresh start
        sessionIdRef.current = uuidv4()
    }, [])

    const retryLastMessage = useCallback(() => {
        // Find the last user message and resend it
        const lastUserMessage = [...messages]
            .reverse()
            .find(msg => msg.role === 'user')

        if (lastUserMessage) {
            // Remove all messages after the last user message
            const lastUserIndex = messages.findIndex(msg => msg.id === lastUserMessage.id)
            setMessages(messages.slice(0, lastUserIndex + 1))

            // Resend
            sendMessage(lastUserMessage.content)
        }
    }, [messages, sendMessage])

    return {
        messages,
        isGenerating,
        error,
        sendMessage,
        clearMessages,
        retryLastMessage,
        sessionId: sessionIdRef.current,
        userId: userIdRef.current,
    }
}
