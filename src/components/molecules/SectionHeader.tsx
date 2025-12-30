interface SectionHeaderProps {
    title: string
    subtitle?: string
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
    return (
        <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
                {title}
            </h2>
            {subtitle && (
                <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
                    {subtitle}
                </p>
            )}
        </div>
    )
}
