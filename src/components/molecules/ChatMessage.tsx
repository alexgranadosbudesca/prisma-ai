'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { TypewriterText } from '@/components/atoms/TypewriterText'
import { useState } from 'react'
import { User, Sparkles } from 'lucide-react'

export type MessageRole = 'user' | 'assistant'

interface ChatMessageProps {
    role: MessageRole
    content: string
    isTyping?: boolean
    isNew?: boolean
}

export function ChatMessage({ role, content, isTyping = false, isNew = false }: ChatMessageProps) {
    const [isExpanded, setIsExpanded] = useState(true)
    const isUser = role === 'user'

    if (isUser) {
        return (
            <motion.div
                className="flex justify-end mb-6"
                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
            >
                <div className="flex items-start gap-3 max-w-[80%]">
                    <div className="backdrop-blur-xl bg-dark-blue/90 text-white px-6 py-4 rounded-2xl rounded-tr-sm shadow-soft">
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
                    </div>
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-soft">
                        <User className="w-5 h-5 text-white" />
                    </div>
                </div>
            </motion.div>
        )
    }

    // Assistant message with accordion and typewriter effect
    return (
        <motion.div
            className="flex justify-start mb-6"
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
        >
            <div className="flex items-start gap-3 max-w-[85%]">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-soft">
                    <Sparkles className="w-5 h-5 text-white" />
                </div>

                <div className="flex-1">
                    {/* Header (collapsible) */}
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center gap-2 mb-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                    >
                        <span>PRISMA</span>
                        <motion.svg
                            className="w-4 h-4"
                            animate={{ rotate: isExpanded ? 0 : -180 }}
                            transition={{ duration: 0.3 }}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </motion.svg>
                    </button>

                    {/* Content with accordion animation */}
                    <AnimatePresence initial={false}>
                        {isExpanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="overflow-hidden"
                            >
                                <div className="backdrop-blur-md bg-white/70 dark:bg-slate-800/70 px-6 py-4 rounded-2xl rounded-tl-sm shadow-soft border border-slate-200/50 dark:border-slate-700/50">
                                    {isTyping && isNew ? (
                                        <TypewriterText
                                            text={content}
                                            className="text-sm leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-wrap"
                                            speed={20}
                                            blurToClear={true}
                                        />
                                    ) : (
                                        <motion.p
                                            className="text-sm leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-wrap"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {content}
                                        </motion.p>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    )
}
