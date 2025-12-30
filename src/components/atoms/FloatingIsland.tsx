'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface FloatingIslandProps {
    children: ReactNode
    className?: string
    elevated?: boolean
    blurStrength?: 'light' | 'medium' | 'strong'
    float?: boolean
}

export function FloatingIsland({
    children,
    className = '',
    elevated = true,
    blurStrength = 'medium',
    float = false,
}: FloatingIslandProps) {
    const blurClasses = {
        light: 'backdrop-blur-sm',
        medium: 'backdrop-blur-md',
        strong: 'backdrop-blur-xl',
    }

    const shadowClass = elevated ? 'shadow-soft-lg' : 'shadow-soft'

    return (
        <motion.div
            className={`
                relative
                ${blurClasses[blurStrength]}
                ${shadowClass}
                bg-white/80
                dark:bg-slate-900/80
                rounded-2xl
                border
                border-slate-200/50
                dark:border-slate-700/50
                ${className}
            `}
            initial={{ opacity: 0, y: 20 }}
            animate={{
                opacity: 1,
                y: float ? [0, -10, 0] : 0,
            }}
            transition={{
                opacity: { duration: 0.4 },
                y: float
                    ? {
                          duration: 6,
                          repeat: Infinity,
                          ease: 'easeInOut',
                      }
                    : { duration: 0.4 },
            }}
            whileHover={
                elevated
                    ? {
                          y: -4,
                          transition: { duration: 0.2 },
                      }
                    : {}
            }
        >
            {/* Glass effect overlay */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent dark:from-white/5 pointer-events-none" />

            {/* Content */}
            <div className="relative z-10">{children}</div>
        </motion.div>
    )
}
