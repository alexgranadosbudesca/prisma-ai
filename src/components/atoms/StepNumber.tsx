import { cn } from '@/lib/utils'

interface StepNumberProps {
    number: number
    className?: string
}

export function StepNumber({ number, className }: StepNumberProps) {
    return (
        <div
            className={cn(
                'flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-2xl font-bold text-white shadow-lg',
                className
            )}
        >
            {number}
        </div>
    )
}
