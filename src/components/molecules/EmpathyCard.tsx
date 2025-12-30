import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { IconWrapper } from '@/components/atoms/IconWrapper'
import { LucideIcon } from 'lucide-react'

interface EmpathyCardProps {
    icon: LucideIcon
    iconColor: string
    title: string
    description: string
}

export function EmpathyCard({ icon, iconColor, title, description }: EmpathyCardProps) {
    return (
        <Card className="border-slate-200 bg-white/50 backdrop-blur-sm transition-shadow hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/50">
            <CardHeader>
                <IconWrapper icon={icon} className={iconColor} />
                <CardTitle className="text-slate-900 dark:text-slate-50">{title}</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                    {description}
                </CardDescription>
            </CardHeader>
        </Card>
    )
}
