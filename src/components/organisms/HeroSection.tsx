'use client'

import { GradientText } from '@/components/atoms/GradientText'
import { CTAButton } from '@/components/molecules/CTAButton'
import { Brain, Sparkles, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'

export function HeroSection() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <section className="relative overflow-hidden px-6 pt-20 pb-24 sm:px-8 lg:px-12 lg:pt-32 lg:pb-32">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,var(--tw-gradient-stops))] from-indigo-100/40 via-transparent to-transparent dark:from-indigo-900/20" />

            <div className="relative mx-auto max-w-7xl">
                <div
                    className={`flex flex-col items-center text-center transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
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

                    <div className="mt-10 group">
                        <CTAButton text="Iniciar conversación" />
                    </div>

                    {/* Trust indicators */}
                    <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-slate-400 dark:text-slate-600">
                        <div className="flex items-center gap-2">
                            <Brain className="h-4 w-4" />
                            <span className="text-xs font-medium">IA Avanzada</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4" />
                            <span className="text-xs font-medium">Base Científica</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Zap className="h-4 w-4" />
                            <span className="text-xs font-medium">Análisis Inmediato</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
