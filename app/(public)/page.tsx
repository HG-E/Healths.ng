import type { Metadata } from 'next'
import { HeroSection } from '@/components/sections/HeroSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { StatsSection } from '@/components/sections/StatsSection'
import { ArticlesSection } from '@/components/sections/ArticlesSection'
import { WhyUsSection } from '@/components/sections/WhyUsSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { NewsletterSection } from '@/components/sections/NewsletterSection'
import { CTASection } from '@/components/sections/CTASection'

export const metadata: Metadata = {
  title: 'Healths.ng Media Limited — Nigeria\'s Health Knowledge & Digital Growth Platform',
  description:
    'Nigeria\'s trusted health media platform. We publish expert health content Nigerians rely on, and help Nigerian healthcare professionals build their digital presence, attract more patients, and grow their practice.',
  openGraph: {
    title: 'Healths.ng Media Limited',
    description: 'Nigeria\'s Health Knowledge & Digital Growth Platform',
  },
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <ArticlesSection />
      <WhyUsSection />
      <TestimonialsSection />
      <CTASection />
      <NewsletterSection />
    </>
  )
}
