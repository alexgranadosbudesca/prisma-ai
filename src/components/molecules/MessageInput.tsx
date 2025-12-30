'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { PrismaIcon } from '@/components/atoms/PrismaIcon'
import { Paperclip, X } from 'lucide-react'

interface MessageInputProps {
    onSend: (message: string, files?: File[]) => void
    disabled?: boolean
    isGenerating?: boolean
}

export function MessageInput({ onSend, disabled = false, isGenerating = false }: MessageInputProps) {
    const [message, setMessage] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [attachedFiles, setAttachedFiles] = useState<File[]>([])
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
        }
    }, [message])

    const handleSend = () => {
        if (message.trim() && !disabled && !isGenerating) {
            onSend(message, attachedFiles.length > 0 ? attachedFiles : undefined)
            setMessage('')
            setAttachedFiles([])
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto'
            }
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            handleSend()
        }
    }

    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (event: React.DragEvent) => {
        event.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault()
        setIsDragging(false)
        const files = Array.from(event.dataTransfer.files)
        setAttachedFiles(prev => [...prev, ...files])
    }

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const files = Array.from(event.target.files)
            setAttachedFiles(prev => [...prev, ...files])
        }
    }

    const removeFile = (index: number) => {
        setAttachedFiles(prev => prev.filter((_, i) => i !== index))
    }

    return (
        <>
            {/* Drag & Drop Overlay */}
            <AnimatePresence>
                {isDragging && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-blue-500/10 backdrop-blur-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <motion.div
                            className="flex flex-col items-center gap-4"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            <PrismaIcon size={80} animate={false} />
                            <p className="text-xl font-medium text-slate-700 dark:text-slate-300">
                                Suelta los archivos aquí
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Island Input */}
            <motion.div
                className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4 z-40"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <motion.div
                    className="backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 rounded-3xl shadow-soft-lg border border-slate-200/50 dark:border-slate-700/50 overflow-hidden"
                    animate={{
                        scale: isFocused ? 1.02 : 1,
                        boxShadow: isFocused
                            ? '0 20px 70px -12px rgba(0, 0, 0, 0.25)'
                            : '0 8px 60px -12px rgba(0, 0, 0, 0.15)',
                    }}
                    transition={{ duration: 0.3, ease: [0.68, -0.55, 0.265, 1.55] }}
                    onDragOver={handleDragOver}
                >
                    {/* Attached files */}
                    <AnimatePresence>
                        {attachedFiles.length > 0 && (
                            <motion.div
                                className="px-4 pt-3 pb-2 border-b border-slate-200/50 dark:border-slate-700/50"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                            >
                                <div className="flex flex-wrap gap-2">
                                    {attachedFiles.map((file, index) => (
                                        <motion.div
                                            key={index}
                                            className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm"
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0, opacity: 0 }}
                                        >
                                            <Paperclip className="w-3 h-3" />
                                            <span className="max-w-[150px] truncate">{file.name}</span>
                                            <button
                                                onClick={() => removeFile(index)}
                                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Input container */}
                    <div className="flex items-end gap-3 p-4">
                        {/* Attach file button */}
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="flex-shrink-0 w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
                            disabled={disabled || isGenerating}
                        >
                            <Paperclip className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            className="hidden"
                            onChange={handleFileSelect}
                        />

                        {/* Textarea */}
                        <textarea
                            ref={textareaRef}
                            value={message}
                            onChange={event => setMessage(event.target.value)}
                            onKeyDown={handleKeyDown}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            placeholder="Escribe tu mensaje..."
                            disabled={disabled || isGenerating}
                            className="flex-1 resize-none bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none min-h-[44px] max-h-[200px] py-2.5"
                            rows={1}
                        />

                        {/* Send button with Prisma pyramid */}
                        <motion.button
                            type="button"
                            onClick={handleSend}
                            disabled={!message.trim() || disabled || isGenerating}
                            className="flex-shrink-0 relative w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
                            whileTap={{ scale: 0.95 }}
                        >
                            {isGenerating ? (
                                <motion.div
                                    className="relative"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                >
                                    <PrismaIcon size={24} animate={false} />
                                    {/* Light beam effect */}
                                    <motion.div
                                        className="absolute -top-8 left-1/2 -translate-x-1/2 w-1 h-8 bg-gradient-to-t from-violet-400 to-transparent"
                                        animate={{
                                            opacity: [0.3, 1, 0.3],
                                            scaleY: [0.8, 1.2, 0.8],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                        }}
                                    />
                                </motion.div>
                            ) : (
                                <PrismaIcon size={24} animate={false} />
                            )}
                        </motion.button>
                    </div>
                </motion.div>

                {/* Privacy notice */}
                <motion.p
                    className="text-center text-xs text-slate-400 dark:text-slate-600 mt-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    Tu privacidad está protegida por encriptación local
                </motion.p>
            </motion.div>
        </>
    )
}
