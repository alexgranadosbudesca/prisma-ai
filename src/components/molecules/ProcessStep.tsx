import { StepNumber } from '@/components/atoms/StepNumber'

interface ProcessStepProps {
    number: number
    title: string
    description: string
    gradientClass: string
}

export function ProcessStep({ number, title, description, gradientClass }: ProcessStepProps) {
    return (
        <div className="flex flex-col md:flex-row gap-6 items-start">
            <StepNumber number={number} className={gradientClass} />
            <div className="flex-1">
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-3">
                    {title}
                </h3>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    )
}
