import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { IconWrapper } from '@/components/atoms/IconWrapper'
import { BookOpen } from 'lucide-react'

const scientificModels = ['Dabrowski', 'Modelo de Renzulli', 'Columbus Group', 'Asincronía evolutiva']

export function RigorSection() {
    return (
        <section className="px-6 py-20 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-4xl">
                <Card className="border-slate-200 bg-gradient-to-br from-white to-slate-50 dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
                    <CardHeader className="pb-8 pt-10">
                        <div className="mb-4 flex justify-center">
                            <IconWrapper
                                icon={BookOpen}
                                size="lg"
                                className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white"
                            />
                        </div>
                        <CardTitle className="text-center text-3xl text-slate-900 dark:text-slate-50">
                            Fundamento científico
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-10">
                        <p className="text-center text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                            PRISMA utiliza arquitectura RAG (Retrieval-Augmented Generation) para contrastar
                            tus respuestas con literatura científica actualizada sobre Altas Capacidades. Cada
                            rasgo identificado está vinculado a constructos teóricos validados:
                            sobreexcitabilidades de Dabrowski, modelos de desarrollo asíncrono, perfiles
                            cognitivos complejos.
                        </p>
                        <div className="mt-8 flex flex-wrap justify-center gap-3">
                            {scientificModels.map((model) => (
                                <Badge
                                    key={model}
                                    variant="outline"
                                    className="border-emerald-300 text-emerald-700 dark:border-emerald-700 dark:text-emerald-400"
                                >
                                    {model}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}
