'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { useState } from 'react'

interface SuggestionCardProps {
    icon: LucideIcon
    title: string
    description: string
    onClick: () => void
    delay?: number
}

export function SuggestionCard({ icon: Icon, title, description, onClick, delay = 0 }: SuggestionCardProps) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.button
            className="relative group w-full text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={onClick}
        >
            {/* Card container */}
            <div className="relative p-6 rounded-2xl backdrop-blur-md bg-white/60 dark:bg-slate-900/60 shadow-soft transition-shadow duration-300 group-hover:shadow-soft-lg">
                {/* Spectral border on hover */}
                <motion.div
                    className="absolute inset-0 rounded-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        background:
                            'linear-gradient(90deg, #EF4444, #F97316, #EAB308, #22C55E, #06B6D4, #3B82F6, #8B5CF6, #EF4444)',
                        backgroundSize: '400% 100%',
                        padding: '1px',
                    }}
                >
                    <motion.div
                        className="w-full h-full bg-white dark:bg-slate-900 rounded-2xl"
                        animate={
                            isHovered
                                ? {
                                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                  }
                                : {}
                        }
                        transition={{
                            duration: 3,
                            ease: 'linear',
                            repeat: isHovered ? Infinity : 0,
                        }}
                    />
                </motion.div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center">
                    {/* Icon with glow effect */}
                    <motion.div
                        className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 mb-4"
                        animate={{
                            boxShadow: isHovered
                                ? '0 0 30px rgba(139, 92, 246, 0.6)'
                                : '0 0 0px rgba(139, 92, 246, 0)',
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <Icon className="w-6 h-6 text-white" />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2 tracking-premium">
                        {title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{description}</p>

                    {/* Arrow indicator */}
                    <motion.div
                        className="absolute bottom-4 right-4 text-slate-400 dark:text-slate-600"
                        animate={{
                            x: isHovered ? 4 : 0,
                            opacity: isHovered ? 1 : 0.5,
                        }}
                        transition={{ duration: 0.2 }}
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </motion.div>
                </div>
            </div>
        </motion.button>
    )
}
