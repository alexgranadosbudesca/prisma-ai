'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export function ChatHeader() {
    return (
        <motion.header
            className="sticky top-0 z-30 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/50 dark:border-slate-700/50"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <div className="max-w-7xl mx-auto px-6 py-3">
                {/* Logo */}
                <Link href="/" className="flex items-center group w-fit">
                    <Image
                        src="/prisma-logo.svg"
                        alt="Prisma Logo"
                        width={60}
                        height={20}
                        className="h-5 w-auto sm:h-6"
                        priority
                    />
                </Link>
            </div>
        </motion.header>
    )
}
