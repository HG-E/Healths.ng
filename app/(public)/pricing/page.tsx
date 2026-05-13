import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, ArrowRight, MessageCircle, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { CTASection } from '@/components/sections/CTASection'
import { buildMetadata } from '@/lib/utils/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Pricing',
  description: 'Transparent service plans for Nigerian healthcare professionals and organizations. Retainer plans, training programs, and one-time services — contact us for a personalised quote.',
  path: '/pricing',
})

const WA = '2347030515183'

const retainerPlans = [
  {
    name: 'Starter',
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
    highlight: false,
    waText: `Hi Healths.ng 👋

I'm interested in the *Starter Plan*.

I run a healthcare practice and I'd like to know the pricing and what's included so I can get started. Can we have a quick chat?`,
  },
  {
    name: 'Growth',
    tagline: 'More content, more patients, more reach.',
    idealFor: 'Group practices, specialist clinics, growing health businesses',
    features: [
      'Everything in Starter',
      '2 expert health articles per month (SEO-optimised)',
      'Patient-facing email newsletter (bi-monthly)',
      'Facebook & Google Ads management',
      'Ad spend budget included',
      'Bi-weekly strategy call with your account manager',
      'Competitor visibility report (quarterly)',
    ],
    highlight: true,
    waText: `Hi Healths.ng 👋

I'm looking at the *Growth Plan* and I'd like to understand the pricing.

I want to grow my practice's online reach — articles, paid ads, and a dedicated account manager sounds exactly like what I need. What does it cost and how do we get started?`,
  },
  {
    name: 'Authority',
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
    highlight: false,
    waText: `Hi Healths.ng 👋

I represent a healthcare organisation and we're interested in the *Authority Plan*.

We're looking for full digital transformation — PR, content at scale, brand strategy, and staff training. I'd like to receive a custom proposal. Can we schedule a call?`,
  },
]

const trainingOptions = [
  {
    name: 'Individual Enrolment',
    description: 'Join our scheduled cohorts covering LinkedIn branding, digital literacy, research visibility, or healthcare marketing. Great for solo practitioners and early-career professionals.',
    waText: `Hi Healths.ng 👋

I'm interested in enrolling individually in one of your training programmes.

Could you share the upcoming schedule, topics covered, and the pricing for individual enrolment? I'd like to secure my spot.`,
  },
  {
    name: 'Group Cohort',
    description: 'For teams from the same organisation. Delivered on our standard schedule and includes a post-training resource pack. Ideal for clinic teams of 5–15.',
    waText: `Hi Healths.ng 👋

I'd like to enrol a group from our organisation in one of your training cohorts.

We have a team of healthcare professionals who need digital skills training. Can you share the group pricing, available dates, and what the curriculum covers?`,
  },
  {
    name: 'In-House Training',
    description: 'We come to your facility and deliver a full-day training session for your staff. Curriculum customised to your team\'s specific needs and goals.',
    waText: `Hi Healths.ng 👋

We're interested in in-house training at our facility.

We want a full-day session customised for our healthcare team. Can you share the pricing, what the programme covers, and how we go about booking a date?`,
  },
]

const oneTimeServices = [
  {
    service: 'Website design & development',
    waText: `Hi Healths.ng 👋

I need a professional healthcare website designed and built.

Could you give me a pricing quote? I'd also like to know how long it takes, what's included, and what information you'll need from me to get started.`,
  },
  {
    service: 'Brand identity kit (logo, colours, style guide)',
    waText: `Hi Healths.ng 👋

I need a brand identity kit for my healthcare practice — logo, colour palette, and a style guide.

Can you share the pricing for this and what the design process looks like from start to finish?`,
  },
  {
    service: 'Google Business Profile setup',
    waText: `Hi Healths.ng 👋

I'd like to get my Google Business Profile properly set up and optimised so patients can find me easily.

What does this service cost and what exactly is included in the setup?`,
  },
  {
    service: 'Social media profile audit & setup',
    waText: `Hi Healths.ng 👋

I need a social media audit and full setup for my healthcare practice.

Can you share the pricing, which platforms are covered, and what the audit report includes?`,
  },
  {
    service: 'Health content writing (per article)',
    waText: `Hi Healths.ng 👋

I'm interested in having Healths.ng write health articles for my website.

Could you share your content writing pricing per article, the topics you cover, and your turnaround time?`,
  },
  {
    service: 'Email newsletter template & setup',
    waText: `Hi Healths.ng 👋

I want to start sending a patient email newsletter and need a professional template and full setup.

What does this cost and what platform do you set it up on? I'd love to see an example of your work.`,
  },
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
    a: 'All fees are quoted exclusive of 7.5% VAT as required by Nigerian law. Your invoice will reflect the applicable VAT clearly. USD pricing is available for diaspora clients — just ask.',
  },
  {
    q: 'Do you offer discounts for NGOs and nonprofits?',
    a: 'Yes. Registered health NGOs and nonprofit organisations qualify for a discount across all plans. Send us your CAC registration details and we\'ll apply it immediately.',
  },
  {
    q: 'What if I need to pause my plan?',
    a: 'Life happens. You can pause your retainer once per year without losing your account setup or historical work. Just notify us 14 days in advance.',
  },
  {
    q: 'Can I upgrade or downgrade my plan?',
    a: 'Yes, at any time. Upgrades take effect immediately. Downgrades take effect at the start of the next billing cycle.',
  },
]

function waHref(text: string) {
  return `https://wa.me/${WA}?text=${encodeURIComponent(text)}`
}

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
              label="Plans & Services"
              title="Built for Nigerian Healthcare — Priced to Match."
              subtitle="We offer monthly retainer plans, training programmes, and one-time services. Tap any plan to chat with us on WhatsApp and get a clear, no-pressure quote within 24 hours."
              inverted
              align="left"
            />
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={waHref(`Hi Healths.ng 👋\n\nI visited your pricing page and I'd like to learn more about your plans and services. Can you help me find the right option for my healthcare practice?`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-white text-brand-teal hover:bg-brand-teal-50 font-bold px-6">
                <MessageCircle size={16} className="mr-2" /> Chat With Us on WhatsApp
              </Button>
            </a>
          </div>
          <p className="mt-6 text-white/60 text-sm">
            All fees are in Nigerian Naira (₦) · Exclusive of 7.5% VAT · NGO discount available
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
            subtitle="All plans include a dedicated point of contact, transparent reporting, and the option to cancel with 30 days notice. Tap a plan to chat with us and get your personalised quote."
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
                <p className={`text-sm mb-6 ${plan.highlight ? 'text-white/80' : 'text-gray-500'}`}>
                  {plan.tagline}
                </p>

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

                <a href={waHref(plan.waText)} target="_blank" rel="noopener noreferrer">
                  <Button
                    className={`w-full font-bold ${
                      plan.highlight
                        ? 'bg-white text-brand-teal hover:bg-brand-teal-50'
                        : 'bg-brand-teal text-white hover:bg-brand-teal-dark'
                    }`}
                  >
                    <MessageCircle size={15} className="mr-2" /> Get Pricing
                  </Button>
                </a>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-gray-500 mt-8">
            Not sure which plan fits?{' '}
            <a
              href={waHref(`Hi Healths.ng 👋\n\nI'm not sure which plan is right for me. Can we have a quick 30-minute discovery call so you can recommend the best starting point for my practice?`)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-teal font-semibold hover:underline"
            >
              Chat with us on WhatsApp
            </a>{' '}
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
            subtitle="Covering digital literacy, LinkedIn branding, research visibility, and healthcare marketing. Tap any option to get pricing sent directly to your WhatsApp."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {trainingOptions.map((option) => (
              <div key={option.name} className="rounded-2xl bg-brand-warm-gray border border-gray-200 p-7 flex flex-col">
                <h3 className="font-display font-bold text-brand-charcoal text-lg mb-3">{option.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-1">{option.description}</p>
                <div className="mt-6">
                  <a href={waHref(option.waText)} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-brand-teal text-white hover:bg-brand-teal-dark font-semibold">
                      <MessageCircle size={14} className="mr-2" /> Get Pricing
                    </Button>
                  </a>
                </div>
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
                subtitle="No monthly commitment required. Pay once, own the result. Tap any service to get a personalised quote on WhatsApp within 24 hours."
                align="left"
              />
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              {oneTimeServices.map((item, i) => (
                <a
                  key={item.service}
                  href={waHref(item.waText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between px-6 py-4 group hover:bg-brand-teal-50 transition-colors ${
                    i !== oneTimeServices.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <span className="text-gray-700 text-sm group-hover:text-brand-charcoal transition-colors">
                    {item.service}
                  </span>
                  <span className="flex items-center gap-1.5 text-brand-teal text-xs font-semibold whitespace-nowrap ml-4 border border-brand-teal/30 bg-brand-teal-50 group-hover:bg-brand-teal group-hover:text-white group-hover:border-brand-teal rounded-full px-3 py-1 transition-colors">
                    <MessageCircle size={11} /> Get Pricing
                  </span>
                </a>
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
            title="Common Questions"
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
