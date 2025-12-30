import Image from 'next/image'

export function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-white px-6 py-12 dark:border-slate-800 dark:bg-slate-950">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                    <div className="flex items-center">
                        <Image
                            src="/prisma-logo.svg"
                            alt="Prisma Logo"
                            width={60}
                            height={20}
                            className="h-5 w-auto"
                        />
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        © 2026 PRISMA. Mentes extraordinarias.
                    </p>
                </div>
            </div>
        </footer>
    )
}
