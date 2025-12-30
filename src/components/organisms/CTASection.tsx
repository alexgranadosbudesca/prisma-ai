import { CTAButton } from '@/components/molecules/CTAButton'

export function CTASection() {
    return (
        <section className="px-6 py-24 sm:px-8 lg:px-12 bg-gradient-to-b from-indigo-50 to-violet-100 dark:from-indigo-950 dark:to-violet-950">
            <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl">
                    Empieza a darle sentido a tu mente
                </h2>
                <p className="mt-6 text-xl text-slate-600 dark:text-slate-300">
                    Una conversación puede ser el primer paso hacia la comprensión. Sin presión, sin juicio,
                    solo claridad.
                </p>
                <div className="mt-10">
                    <CTAButton text="Comenzar análisis" />
                </div>
                <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
                    Tu información está protegida y es completamente confidencial
                </p>
            </div>
        </section>
    )
}
