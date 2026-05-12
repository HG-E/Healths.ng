import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CTASectionProps {
  title?: string
  subtitle?: string
  primaryCTA?: { label: string; href: string }
  secondaryCTA?: { label: string; href: string }
}

export function CTASection({
  title = 'Ready to Grow Your Healthcare Practice?',
  subtitle = 'Book a free 30-minute discovery call and find out how Healths.ng can help you reach more patients and grow your impact.',
  primaryCTA = { label: 'Book a Free Discovery Call', href: '/contact#booking' },
  secondaryCTA = { label: 'Explore Our Services', href: '/services' },
}: CTASectionProps) {
  return (
    <section className="py-20 bg-brand-teal relative overflow-hidden" aria-labelledby="cta-heading">
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-white -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative container mx-auto px-4 lg:px-8 max-w-4xl text-center text-white">
        <h2
          id="cta-heading"
          className="font-display font-bold text-3xl md:text-4xl leading-tight mb-4"
        >
          {title}
        </h2>
        <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">{subtitle}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={primaryCTA.href}>
            <Button
              size="lg"
              className="bg-white text-brand-teal hover:bg-brand-teal-50 font-bold px-8 w-full sm:w-auto"
            >
              <Phone size={16} className="mr-2" />
              {primaryCTA.label}
            </Button>
          </Link>
          <Link href={secondaryCTA.href}>
            <Button
              size="lg"
              variant="outline"
              className="border-white/60 text-white hover:bg-white/10 bg-transparent font-semibold px-8 w-full sm:w-auto"
            >
              {secondaryCTA.label}
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>

        <p className="mt-6 text-white/60 text-sm">
          No commitment required. We respond within 24 hours.
        </p>
      </div>
    </section>
  )
}
