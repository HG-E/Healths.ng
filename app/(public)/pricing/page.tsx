import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Phone, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { CTASection } from '@/components/sections/CTASection'
import { buildMetadata } from '@/lib/utils/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Pricing',
  description:
    'Transparent pricing for Nigerian healthcare professionals and organizations. Monthly retainer plans, training programs, and one-time setup services — in Nigerian Naira.',
  path: '/pricing',
})

const retainerPlans = [
  {
    name: 'Starter',
    price: '₦95,000',
    period: '/month',
    tagline: 'Everything you need to get found online.',
    idealFor: 'Solo practitioners, small private clinics, individual health professionals',
    features: [
      'Professional 5-page website (built in month one)',
      'Google Business Profile setup & ongoing management',
      'Facebook + Instagram: 3 posts per week',
      'Monthly performance & analytics report',
      'Email and WhatsApp support',
      '1 strategy review call per quarter',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Growth',
    price: '₦220,000',
    period: '/month',
    tagline: 'More content, more patients, more reach.',
    idealFor: 'Group practices, specialist clinics, growing health businesses',
    features: [
      'Everything in Starter',
      '2 expert health articles per month (SEO-optimised)',
      'Patient-facing email newsletter (bi-monthly)',
      'Facebook & Google Ads management',
      '₦50,000 ad spend budget included',
      'Bi-weekly strategy call with your account manager',
      'Competitor visibility report (quarterly)',
    ],
    cta: 'Start Growing',
    highlight: true,
  },
  {
    name: 'Authority',
    price: 'Custom',
    period: '',
    tagline: 'Full-service digital transformation for large organisations.',
    idealFor: 'Hospitals, health NGOs, teaching institutions, pharmaceutical brands',
    features: [
      'Everything in Growth',
      'Dedicated senior account manager',
      'PR & media placements (TV, radio, online publications)',
      'Full content production at scale',
      'Multi-channel campaign planning & execution',
      'Brand positioning & strategy consulting',
      'Staff digital skills training (included)',
    ],
    cta: 'Request a Proposal',
    highlight: false,
  },
]

const trainingOptions = [
  {
    name: 'Individual Enrolment',
    price: '₦35,000',
    description: 'Per person, per programme. Join our scheduled cohorts covering LinkedIn branding, digital literacy, research visibility, or healthcare marketing.',
  },
  {
    name: 'Group Cohort',
    price: '₦250,000',
    description: 'For 5–15 participants from the same organisation. Delivered on our standard schedule. Includes post-training resource pack.',
  },
  {
    name: 'In-House Training',
    price: '₦450,000',
    description: 'We come to your facility and deliver a full-day training session for up to 20 of your staff. Curriculum customised to your team\'s needs.',
  },
]

const oneTimeServices = [
  { service: 'Website design & development', price: 'From ₦180,000' },
  { service: 'Brand identity kit (logo, colours, style guide)', price: 'From ₦120,000' },
  { service: 'Google Business Profile setup', price: '₦45,000' },
  { service: 'Social media profile audit & setup', price: '₦35,000' },
  { service: 'Health content writing (per article)', price: 'From ₦25,000' },
  { service: 'Email newsletter template & setup', price: '₦60,000' },
]

const faqs = [
  {
    q: 'Do I need to sign a long-term contract?',
    a: 'No. Our retainer plans are month-to-month. We ask for a minimum of 3 months so we can show meaningful results — but there are no annual lock-ins. Most clients stay because results speak for themselves.',
  },
  {
    q: 'Are there setup or onboarding fees?',
    a: 'No hidden setup fees. For Starter and Growth plans, the first month\'s investment covers your website build, profile setups, and onboarding. What you see is what you pay.',
  },
  {
    q: 'Do prices include VAT?',
    a: 'All listed prices are exclusive of 7.5% VAT (as required by Nigerian law). Your invoice will reflect the applicable VAT. USD pricing is available for diaspora clients.',
  },
  {
    q: 'Do you offer discounts for NGOs and nonprofits?',
    a: 'Yes. Registered health NGOs and nonprofit organisations qualify for a 20% discount across all plans. Send us your CAC registration and we\'ll apply it immediately.',
  },
  {
    q: 'What if I need to pause my plan?',
    a: 'Life happens. You can pause your retainer once per year (for up to 30 days) without losing your account setup or historical work. Just notify us 14 days in advance.',
  },
  {
    q: 'Can I upgrade or downgrade my plan?',
    a: 'Yes, at any time. Upgrades take effect immediately. Downgrades take effect at the start of the next billing cycle.',
  },
]

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-brand-teal to-brand-green text-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-white/60 text-sm">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white font-medium">Pricing</li>
            </ol>
          </nav>
          <div className="max-w-2xl">
            <SectionHeading
              label="Transparent Pricing"
              title="No Surprises. Just Clear Pricing for Real Results."
              subtitle="Every plan is priced for the Nigerian healthcare market — not a generic agency rate card. Choose a retainer, book a training, or get a one-off project done."
              inverted
              align="left"
            />
          </div>
          <p className="mt-6 text-white/60 text-sm">
            All prices in Nigerian Naira (₦) · Exclusive of 7.5% VAT · NGO discount available
          </p>
        </div>
      </section>

      {/* Monthly Retainer Plans */}
      <section className="py-20 bg-brand-warm-gray" aria-labelledby="plans-heading">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <SectionHeading
            id="plans-heading"
            label="Monthly Retainer Plans"
            title="Pick the Plan That Fits Your Practice"
            subtitle="All plans include a dedicated point of contact, transparent reporting, and the option to cancel with 30 days notice."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {retainerPlans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 flex flex-col ${
                  plan.highlight
                    ? 'bg-brand-teal text-white ring-4 ring-brand-teal shadow-xl scale-[1.02]'
                    : 'bg-white border border-gray-200'
                }`}
              >
                {plan.highlight && (
                  <span className="inline-block bg-brand-gold text-white text-xs font-bold px-3 py-1 rounded-full mb-4 self-start">
                    Most Popular
                  </span>
                )}
                <h3 className={`font-display font-bold text-2xl mb-1 ${plan.highlight ? 'text-white' : 'text-brand-charcoal'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-4 ${plan.highlight ? 'text-white/80' : 'text-gray-500'}`}>
                  {plan.tagline}
                </p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className={`font-display font-bold text-4xl ${plan.highlight ? 'text-white' : 'text-brand-charcoal'}`}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className={`text-sm ${plan.highlight ? 'text-white/70' : 'text-gray-500'}`}>
                      {plan.period}
                    </span>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle
                        size={16}
                        className={`shrink-0 mt-0.5 ${plan.highlight ? 'text-brand-gold' : 'text-brand-teal'}`}
                      />
                      <span className={plan.highlight ? 'text-white/90' : 'text-gray-700'}>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className={`text-xs mb-5 ${plan.highlight ? 'text-white/60' : 'text-gray-400'}`}>
                  Ideal for: {plan.idealFor}
                </div>

                <Link href="/contact#booking">
                  <Button
                    className={`w-full font-bold ${
                      plan.highlight
                        ? 'bg-white text-brand-teal hover:bg-brand-teal-50'
                        : 'bg-brand-teal text-white hover:bg-brand-teal-dark'
                    }`}
                  >
                    {plan.cta} <ArrowRight size={15} className="ml-1" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-gray-500 mt-8">
            Not sure which plan fits?{' '}
            <Link href="/contact#booking" className="text-brand-teal font-semibold hover:underline">
              Book a free 30-minute discovery call
            </Link>{' '}
            and we'll recommend the right starting point for you.
          </p>
        </div>
      </section>

      {/* Training Programs */}
      <section className="py-20 bg-white" aria-labelledby="training-heading">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <SectionHeading
            id="training-heading"
            label="Training Programs"
            title="Hands-On Skills for Healthcare Professionals"
            subtitle="Covering digital literacy, LinkedIn branding, research visibility, and healthcare marketing. Available as individual enrolment, group cohorts, or in-house delivery."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {trainingOptions.map((option) => (
              <div key={option.name} className="rounded-2xl bg-brand-warm-gray border border-gray-200 p-7">
                <div className="font-display font-bold text-2xl text-brand-gold mb-1">{option.price}</div>
                <h3 className="font-display font-bold text-brand-charcoal text-lg mb-3">{option.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{option.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/training">
              <Button variant="outline" className="border-brand-teal text-brand-teal hover:bg-brand-teal-50">
                View Upcoming Training Dates <ArrowRight size={14} className="ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* One-time services */}
      <section className="py-20 bg-brand-warm-gray" aria-labelledby="onetime-heading">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionHeading
                id="onetime-heading"
                label="One-Time Services"
                title="Just Need Something Specific Done?"
                subtitle="No monthly commitment required. Pay once, own the result."
                align="left"
              />
              <Link href="/contact" className="mt-8 inline-flex items-center gap-2 text-brand-teal font-semibold hover:underline text-sm">
                <Phone size={14} /> Contact us for a custom quote
              </Link>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              {oneTimeServices.map((item, i) => (
                <div
                  key={item.service}
                  className={`flex items-center justify-between px-6 py-4 ${
                    i !== oneTimeServices.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <span className="text-gray-700 text-sm">{item.service}</span>
                  <span className="font-semibold text-brand-charcoal text-sm whitespace-nowrap ml-4">{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white" aria-labelledby="faq-heading">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <SectionHeading
            id="faq-heading"
            label="FAQ"
            title="Common Pricing Questions"
          />
          <div className="mt-10 divide-y divide-gray-100">
            {faqs.map(({ q, a }) => (
              <details key={q} className="group py-5 cursor-pointer">
                <summary className="flex items-center justify-between gap-4 list-none">
                  <span className="font-display font-semibold text-brand-charcoal text-base">{q}</span>
                  <HelpCircle size={18} className="text-brand-teal shrink-0 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Start? Let's Talk."
        subtitle="Book a free 30-minute discovery call. We'll listen to where you are, tell you exactly what we'd do, and give you a clear proposal — no pressure, no fluff."
        primaryCTA={{ label: 'Book Your Free Discovery Call', href: '/contact#booking' }}
        secondaryCTA={{ label: 'View Our Services', href: '/services' }}
      />
    </>
  )
}
