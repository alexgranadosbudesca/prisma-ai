'use client'

import { motion } from 'framer-motion'
import { ChatMessage, type MessageRole } from '@/components/molecules/ChatMessage'
import { useEffect, useRef } from 'react'

export interface Message {
    id: string
    role: MessageRole
    content: string
    timestamp: Date
}

interface ChatCanvasProps {
    messages: Message[]
    isGenerating?: boolean
}

export function ChatCanvas({ messages, isGenerating = false }: ChatCanvasProps) {
    const canvasRef = useRef<HTMLDivElement>(null)
    const lastMessageRef = useRef<HTMLDivElement>(null)

    // Auto-scroll to bottom with smooth animation
    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
            })
        }
    }, [messages])

    // Filter out system messages (don't show to user)
    const visibleMessages = messages.filter(msg => msg.role !== 'system')

    return (
        <div
            ref={canvasRef}
            className="flex-1 overflow-y-auto px-6 pt-4 pb-8 scroll-smooth"
            style={{
                scrollBehavior: 'smooth',
                WebkitOverflowScrolling: 'touch',
            }}
        >
            {/* Canvas container - creates floating effect */}
            <motion.div
                className="max-w-4xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Messages */}
                {visibleMessages.map((message, index) => (
                    <div
                        key={message.id}
                        ref={index === visibleMessages.length - 1 ? lastMessageRef : null}
                    >
                        <ChatMessage
                            role={message.role}
                            content={message.content}
                            isTyping={index === visibleMessages.length - 1 && message.role === 'assistant'}
                            isNew={index === visibleMessages.length - 1}
                        />
                    </div>
                ))}

                {/* Generating indicator */}
                {isGenerating && (
                    <motion.div
                        className="flex justify-start mb-6"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-soft">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                />
                            </div>
                            <div className="backdrop-blur-md bg-white/70 dark:bg-slate-800/70 px-6 py-4 rounded-2xl rounded-tl-sm shadow-soft border border-slate-200/50 dark:border-slate-700/50">
                                <div className="flex items-center gap-2">
                                    <motion.div
                                        className="w-2 h-2 bg-slate-400 rounded-full"
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
                                    />
                                    <motion.div
                                        className="w-2 h-2 bg-slate-400 rounded-full"
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
                                    />
                                    <motion.div
                                        className="w-2 h-2 bg-slate-400 rounded-full"
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Spacer to ensure last message is not hidden behind input */}
                <div className="h-32" />
            </motion.div>
        </div>
    )
}
