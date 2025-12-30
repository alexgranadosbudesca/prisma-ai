'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface PrismaIconProps {
    size?: number
    className?: string
    animate?: boolean
}

export function PrismaIcon({ size = 60, className = '', animate = true }: PrismaIconProps) {
    const [shouldGlow, setShouldGlow] = useState(false)

    useEffect(() => {
        if (!animate) return

        const interval = setInterval(() => {
            setShouldGlow(true)
            setTimeout(() => setShouldGlow(false), 2000)
        }, 10000)

        return () => clearInterval(interval)
    }, [animate])

    return (
        <motion.div
            className={`relative inline-block ${className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Glow effect background */}
            {shouldGlow && (
                <motion.div
                    className="absolute inset-0 blur-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.6, 0] }}
                    transition={{ duration: 2, ease: 'easeInOut' }}
                    style={{
                        background:
                            'linear-gradient(135deg, rgba(59, 130, 246, 0.5), rgba(139, 92, 246, 0.5))',
                    }}
                />
            )}

            {/* Triangle/Pyramid SVG with animated edges */}
            <svg
                width={size}
                height={size * 0.866} // Aspect ratio for equilateral triangle
                viewBox="0 0 100 87"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative z-10"
            >
                {/* Main triangle fill */}
                <motion.path
                    d="M50 2 L98 85 L2 85 Z"
                    fill="url(#prisma-gradient)"
                    initial={{ opacity: 0.8 }}
                    animate={{
                        opacity: shouldGlow ? [0.8, 1, 0.8] : 0.8,
                    }}
                    transition={{ duration: 2 }}
                />

                {/* Animated edges with spectrum glow */}
                <motion.path
                    d="M50 2 L98 85 L2 85 Z"
                    stroke="url(#edge-gradient)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 1 }}
                    animate={{
                        pathLength: shouldGlow ? [1, 1, 1] : 1,
                        opacity: shouldGlow ? [0.6, 1, 0.6] : 0.6,
                    }}
                    transition={{ duration: 2 }}
                />

                {/* Inner lines for 3D effect */}
                <motion.line
                    x1="50"
                    y1="2"
                    x2="50"
                    y2="85"
                    stroke="url(#inner-gradient)"
                    strokeWidth="1"
                    opacity="0.4"
                    animate={{
                        opacity: shouldGlow ? [0.4, 0.8, 0.4] : 0.4,
                    }}
                    transition={{ duration: 2 }}
                />

                <defs>
                    {/* Gradient definitions */}
                    <linearGradient id="prisma-gradient" x1="50" y1="2" x2="50" y2="85">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.9" />
                        <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.7" />
                    </linearGradient>

                    <linearGradient id="edge-gradient" x1="0" y1="0" x2="100" y2="100">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="33%" stopColor="#8B5CF6" />
                        <stop offset="66%" stopColor="#06B6D4" />
                        <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>

                    <linearGradient id="inner-gradient" x1="50" y1="2" x2="50" y2="85">
                        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.2" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Letter Delta (Δ) overlay */}
            <div
                className="absolute inset-0 flex items-center justify-center text-white font-bold opacity-0 hover:opacity-100 transition-opacity duration-300"
                style={{ fontSize: size * 0.3 }}
            >
                Δ
            </div>
        </motion.div>
    )
}
