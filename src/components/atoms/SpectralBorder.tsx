'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface SpectralBorderProps {
    children: ReactNode
    className?: string
    active?: boolean
    borderWidth?: number
    animationDuration?: number
}

export function SpectralBorder({
    children,
    className = '',
    active = false,
    borderWidth = 1,
    animationDuration = 3,
}: SpectralBorderProps) {
    return (
        <div className={`relative ${className}`}>
            {/* Content */}
            <div className="relative z-10">{children}</div>

            {/* Animated spectral border */}
            {active && (
                <motion.div
                    className="absolute inset-0 rounded-lg pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        padding: `${borderWidth}px`,
                        background:
                            'linear-gradient(90deg, #EF4444, #F97316, #EAB308, #22C55E, #06B6D4, #3B82F6, #8B5CF6, #EF4444)',
                        backgroundSize: '400% 100%',
                    }}
                >
                    <motion.div
                        className="w-full h-full rounded-lg"
                        animate={{
                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                        }}
                        transition={{
                            duration: animationDuration,
                            ease: 'linear',
                            repeat: Infinity,
                        }}
                        style={{
                            backgroundImage:
                                'linear-gradient(90deg, #EF4444, #F97316, #EAB308, #22C55E, #06B6D4, #3B82F6, #8B5CF6, #EF4444)',
                            backgroundSize: '400% 100%',
                        }}
                    />
                </motion.div>
            )}
        </div>
    )
}
