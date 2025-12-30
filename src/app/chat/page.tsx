'use client'

import { ChatHeader } from '@/components/organisms/ChatHeader'
import { ChatEmptyState } from '@/components/organisms/ChatEmptyState'
import { ChatCanvas } from '@/components/organisms/ChatCanvas'
import { MessageInput } from '@/components/molecules/MessageInput'
import { useChat } from '@/hooks/useChat'
import { motion, AnimatePresence } from 'framer-motion'

export default function ChatPage() {
    const { messages, isGenerating, sendMessage } = useChat()

    const hasMessages = messages.length > 0

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 relative overflow-hidden">
            {/* Subtle mesh gradient background */}
            <div className="fixed inset-0 bg-mesh-light dark:bg-mesh-dark pointer-events-none" />

            {/* Radial gradient overlay */}
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,var(--tw-gradient-stops))] from-indigo-100/40 via-transparent to-transparent dark:from-indigo-900/20 pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 flex flex-col min-h-screen">
                {/* Header */}
                <ChatHeader />

                {/* Main chat area */}
                <AnimatePresence mode="wait">
                    {!hasMessages ? (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex-1 flex items-center justify-center"
                        >
                            <ChatEmptyState onSuggestionClick={(message) => void sendMessage(message)} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex-1 flex flex-col"
                        >
                            <ChatCanvas messages={messages} isGenerating={isGenerating} />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Input (always visible) */}
                <MessageInput
                    onSend={(message, files) => void sendMessage(message, files)}
                    disabled={false}
                    isGenerating={isGenerating}
                />
            </div>
        </div>
    )
}
