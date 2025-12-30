'use client'

import { motion } from 'framer-motion'
import { SuggestionCard } from '@/components/molecules/SuggestionCard'
import { Brain, Lightbulb, MessageSquare } from 'lucide-react'

interface ChatEmptyStateProps {
    onSuggestionClick: (suggestion: string) => void
}

const suggestions = [
    {
        icon: Brain,
        title: 'Exploración cognitiva',
        description: '¿Cómo procesas información compleja? ¿Ves conexiones que otros no ven?',
        prompt: 'Me gustaría explorar cómo proceso información y qué patrones de pensamiento tengo.',
    },
    {
        icon: Lightbulb,
        title: 'Intensidad emocional',
        description: '¿Experimentas emociones con mayor profundidad o intensidad que otros?',
        prompt: 'Quiero hablar sobre mi experiencia emocional y cómo vivo las emociones.',
    },
    {
        icon: MessageSquare,
        title: 'Sensibilidad sensorial',
        description: '¿Eres muy sensible a luces, sonidos, texturas o estímulos del entorno?',
        prompt: 'Me interesa explorar mi sensibilidad sensorial y cómo me afectan los estímulos.',
    },
]

export function ChatEmptyState({ onSuggestionClick }: ChatEmptyStateProps) {
    return (
        <div className="flex-1 flex items-start justify-center px-6 pt-8 pb-12">
            <motion.div
                className="max-w-4xl w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Hero section */}
                <div className="text-center mb-10">
                    <motion.h1
                        className="text-5xl md:text-6xl font-bold mb-4 tracking-tighter"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <span className="bg-gradient-to-r from-dark-blue via-cobalt to-dark-blue bg-clip-text text-transparent">
                            Tu inteligencia,
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-dark-blue via-cobalt to-dark-blue bg-clip-text text-transparent">
                            proyectada con claridad
                        </span>
                    </motion.h1>

                    <motion.p
                        className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Inicia una conversación para explorar tus rasgos cognitivos, emocionales y sensoriales.
                        PRISMA te guiará a través de un análisis personalizado.
                    </motion.p>
                </div>

                {/* Suggestion cards */}
                <div className="grid md:grid-cols-3 gap-6">
                    {suggestions.map((suggestion, index) => (
                        <SuggestionCard
                            key={index}
                            icon={suggestion.icon}
                            title={suggestion.title}
                            description={suggestion.description}
                            onClick={() => onSuggestionClick(suggestion.prompt)}
                            delay={0.3 + index * 0.1}
                        />
                    ))}
                </div>

                {/* Additional info */}
                <motion.div
                    className="mt-12 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                >
                    <p className="text-sm text-slate-500 dark:text-slate-600">
                        💡 <span className="font-medium">Tip:</span> Sé honesto y detallado en tus respuestas.
                        Cuanta más información compartas, más preciso será el análisis.
                    </p>
                </motion.div>
            </motion.div>
        </div>
    )
}
