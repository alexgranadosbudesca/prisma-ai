import { SectionHeader } from '@/components/molecules/SectionHeader'
import { EmpathyCard } from '@/components/molecules/EmpathyCard'
import { Zap, Sparkles, Brain } from 'lucide-react'

const empathyCards = [
    {
        icon: Zap,
        iconColor: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400',
        title: 'Asincronía',
        description:
            'Tu mente procesa a velocidades que tu entorno no comprende. Piensas en múltiples dimensiones mientras otros avanzan linealmente.',
    },
    {
        icon: Sparkles,
        iconColor: 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400',
        title: 'Intensidad emocional',
        description:
            'Sientes con una profundidad que asusta. Lo que otros experimentan como brisa, para ti es tormenta. Y eso tiene nombre.',
    },
    {
        icon: Brain,
        iconColor: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400',
        title: 'Pensamiento incesante',
        description:
            'Tu mente nunca descansa. Conectas ideas constantemente, ves patrones donde otros ven ruido. No es ansiedad, es tu arquitectura cognitiva.',
    },
]

export function EmpathySection() {
    return (
        <section className="px-6 py-20 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-7xl">
                <SectionHeader
                    title="Si te has sentido así, no estás solo"
                    subtitle="Reconocemos estas señales porque están documentadas en la literatura científica"
                />

                <div className="grid gap-6 md:grid-cols-3">
                    {empathyCards.map((card) => (
                        <EmpathyCard key={card.title} {...card} />
                    ))}
                </div>
            </div>
        </section>
    )
}
