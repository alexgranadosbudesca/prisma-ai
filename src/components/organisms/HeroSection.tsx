import { SectionBadge } from '@/components/atoms/SectionBadge'
import { GradientText } from '@/components/atoms/GradientText'
import { CTAButton } from '@/components/molecules/CTAButton'
import { Brain } from 'lucide-react'

export function HeroSection() {
    return (
        <section className="relative overflow-hidden px-6 pt-20 pb-24 sm:px-8 lg:px-12 lg:pt-32 lg:pb-32">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-100/40 via-transparent to-transparent dark:from-indigo-900/20" />

            <div className="relative mx-auto max-w-7xl">
                <div className="flex flex-col items-center text-center">
                    <SectionBadge icon={Brain} text="Análisis basado en IA y evidencia científica" />

                    <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-6xl lg:text-7xl">
                        Tu mente no es un problema,
                        <br />
                        <GradientText>es un potencial por descubrir</GradientText>
                    </h1>

                    <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300 sm:text-xl">
                        Transformamos la sospecha en evidencia científica. Un análisis conversacional que
                        utiliza inteligencia artificial para detectar rasgos de Altas Capacidades y generar
                        informes fundamentados para tu especialista.
                    </p>

                    <div className="mt-10">
                        <CTAButton text="Iniciar sesión de desahogo" />
                    </div>

                    <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                        Primera sesión gratuita · Sin compromiso · Confidencial
                    </p>
                </div>
            </div>
        </section>
    )
}
