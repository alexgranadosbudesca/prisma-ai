'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface TypewriterTextProps {
    text: string
    className?: string
    speed?: number
    onComplete?: () => void
    blurToClear?: boolean
}

export function TypewriterText({
    text,
    className = '',
    speed = 30,
    onComplete,
    blurToClear = true,
}: TypewriterTextProps) {
    const [displayedText, setDisplayedText] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex])
                setCurrentIndex(prev => prev + 1)
            }, speed)

            return () => clearTimeout(timeout)
        } else if (currentIndex === text.length && onComplete) {
            onComplete()
        }
    }, [currentIndex, text, speed, onComplete])

    // Reset when text changes
    useEffect(() => {
        setDisplayedText('')
        setCurrentIndex(0)
    }, [text])

    return (
        <motion.span
            className={className}
            initial={blurToClear ? { filter: 'blur(8px)', opacity: 0 } : { opacity: 0 }}
            animate={
                blurToClear
                    ? { filter: 'blur(0px)', opacity: 1 }
                    : { opacity: 1 }
            }
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            {displayedText}
            {currentIndex < text.length && (
                <motion.span
                    className="inline-block w-[2px] h-[1em] bg-current ml-[2px] align-middle"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                />
            )}
        </motion.span>
    )
}
