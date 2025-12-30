import { SectionHeader } from '@/components/molecules/SectionHeader'
import { ProcessStep } from '@/components/molecules/ProcessStep'

const processSteps = [
    {
        number: 1,
        title: 'Desahogo',
        description:
            'Conversación libre y guiada. Cuenta tu historia sin presión. La IA escucha, pregunta y explora contigo las dimensiones de tu experiencia cognitiva y emocional.',
        gradientClass: 'bg-gradient-to-br from-indigo-500 to-violet-600',
    },
    {
        number: 2,
        title: 'Insight',
        description:
            'Análisis inmediato durante la conversación. Recibes retroalimentación que conecta tus experiencias con constructos científicos validados en la literatura sobre AACC.',
        gradientClass: 'bg-gradient-to-br from-violet-500 to-purple-600',
    },
    {
        number: 3,
        title: 'Evidencia',
        description:
            'Informe estructurado para tu especialista. Rasgos detectados, citas de tu conversación y referencias bibliográficas que sustentan cada hipótesis. No diagnóstico, sino orientación clínica.',
        gradientClass: 'bg-gradient-to-br from-purple-500 to-pink-600',
    },
]

export function ProcessSection() {
    return (
        <section className="px-6 py-20 sm:px-8 lg:px-12 bg-slate-50 dark:bg-slate-900/50">
            <div className="mx-auto max-w-5xl">
                <SectionHeader
                    title="Cómo funciona PRISMA"
                    subtitle="Tres pasos simples para transformar intuición en evidencia"
                />

                <div className="space-y-8">
                    {processSteps.map((step) => (
                        <ProcessStep key={step.number} {...step} />
                    ))}
                </div>
            </div>
        </section>
    )
}
