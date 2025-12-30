interface GradientTextProps {
    children: React.ReactNode
}

export function GradientText({ children }: GradientTextProps) {
    return (
        <span className="bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400">
            {children}
        </span>
    )
}
