import { HeroSection } from '@/components/organisms/HeroSection'
import { EmpathySection } from '@/components/organisms/EmpathySection'
import { ProcessSection } from '@/components/organisms/ProcessSection'
import { RigorSection } from '@/components/organisms/RigorSection'
import { CTASection } from '@/components/organisms/CTASection'
import { Footer } from '@/components/organisms/Footer'

export default function Home() {
    return (
        <div className="min-h-screen bg-linear-to-b from-indigo-50 via-white to-violet-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
            <HeroSection />
            <EmpathySection />
            <ProcessSection />
            <RigorSection />
            <CTASection />
            <Footer />
        </div>
    )
}
