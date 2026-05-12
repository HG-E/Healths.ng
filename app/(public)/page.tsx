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
  title: 'Healths.ng Media Limited — Africa\'s Health Media & Digital Empowerment Platform',
  description:
    'We help healthcare professionals grow their digital presence and make health knowledge accessible to everyone across Africa. Health articles, digital services, and training.',
  openGraph: {
    title: 'Healths.ng Media Limited',
    description: 'Africa\'s Health Media & Digital Empowerment Platform',
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
