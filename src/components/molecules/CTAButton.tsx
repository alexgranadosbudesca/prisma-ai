import { Button } from '@/components/ui/button'
import { MessageCircle, ChevronRight } from 'lucide-react'

interface CTAButtonProps {
    text: string
    size?: 'default' | 'sm' | 'lg'
}

export function CTAButton({ text, size = 'lg' }: CTAButtonProps) {
    return (
        <Button
            size={size}
            className="h-14 gap-2 rounded-full bg-indigo-600 px-8 text-base font-semibold hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >
            <MessageCircle className="h-5 w-5" />
            {text}
            <ChevronRight className="h-5 w-5" />
        </Button>
    )
}
