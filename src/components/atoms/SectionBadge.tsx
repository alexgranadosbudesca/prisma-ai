import { Badge } from '@/components/ui/badge'
import type { LucideIcon } from 'lucide-react'

interface SectionBadgeProps {
    icon: LucideIcon
    text: string
}

export function SectionBadge({ icon: Icon, text }: SectionBadgeProps) {
    return (
        <Badge
            variant="secondary"
            className="mb-6 border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950 dark:text-indigo-300"
        >
            <Icon className="mr-1.5 h-3.5 w-3.5" />
            {text}
        </Badge>
    )
}
