import { Brain } from 'lucide-react'

export function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-white px-6 py-12 dark:border-slate-800 dark:bg-slate-950">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                    <div className="flex items-center gap-2">
                        <Brain className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                        <span className="text-xl font-bold text-slate-900 dark:text-slate-50">PRISMA</span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        © 2024 PRISMA. Arquitectura de mentes extraordinarias.
                    </p>
                </div>
            </div>
        </footer>
    )
}
