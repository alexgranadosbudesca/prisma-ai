import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface IconWrapperProps {
    icon: LucideIcon
    className?: string
    size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
    sm: 'h-10 w-10',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
}

const iconSizes = {
    sm: 'h-5 w-5',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
}

export function IconWrapper({ icon: Icon, className, size = 'md' }: IconWrapperProps) {
    return (
        <div className={cn('flex items-center justify-center rounded-lg', sizeClasses[size], className)}>
            <Icon className={iconSizes[size]} />
        </div>
    )
}
