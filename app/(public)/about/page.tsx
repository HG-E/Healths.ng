import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, Target, Eye, Heart, Globe, Lightbulb, Shield } from 'lucide-react'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { CTASection } from '@/components/sections/CTASection'
import { getTeamMembers } from '@/lib/sanity/queries'
import { urlFor } from '@/sanity/lib/image'
import { buildMetadata } from '@/lib/utils/seo'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const metadata: Metadata = buildMetadata({
  title: 'About Us',
  description: "Learn about Healths.ng Media Limited — Nigeria's leading health media and digital empowerment platform helping healthcare professionals grow their practice and reach.",
  path: '/about',
})

const pillars = [
  {
    icon: Heart,
    title: 'Health First',
    description: "Every decision is guided by what's best for health outcomes in Nigeria. We never compromise on accuracy or patient safety for any business reason.",
    bg: 'bg-brand-teal-50',
    color: 'text-brand-teal',
  },
  {
    icon: Globe,
    title: 'Nigeria-Centred',
    description: 'We build for the Nigerian context — understanding NHIS, MDCN regulations, NMA dynamics, and the real challenges professionals face daily.',
    bg: 'bg-emerald-50',
    color: 'text-brand-green',
  },
  {
    icon: Target,
    title: 'Practical Impact',
    description: "We don't just create content — we drive measurable results: more patient inquiries, more visibility, and more practice growth.",
    bg: 'bg-amber-50',
    color: 'text-brand-gold-dark',
  },
  {
    icon: Shield,
    title: 'Professional Excellence',
    description: 'We hold ourselves to the highest standards of accuracy, integrity, and professionalism. Every piece of content is reviewed by Nigerian healthcare professionals.',
    bg: 'bg-brand-teal-50',
    color: 'text-brand-teal',
  },
  {
    icon: Lightbulb,
    title: 'Accessible Knowledge',
    description: 'We believe every Nigerian deserves access to reliable health information — not just those who can afford private care or hold a degree.',
    bg: 'bg-amber-50',
    color: 'text-brand-gold-dark',
  },
  {
    icon: CheckCircle,
    title: 'Transparency',
    description: 'We are honest with clients, partners, and our audience — about what we do, how we do it, and what results you can realistically expect.',
    bg: 'bg-emerald-50',
    color: 'text-brand-green',
  },
]

export const revalidate = 3600

export default async function AboutPage() {
  let teamMembers: Awaited<ReturnType<typeof getTeamMembers>> = []
  try {
    teamMembers = await getTeamMembers()
  } catch {}

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Healths.ng Media Limited',
    url: 'https://healths.ng',
    logo: 'https://healths.ng/og/default-og.jpg',
    description: "Nigeria's leading health media and digital empowerment platform for healthcare professionals.",
    address: { '@type': 'PostalAddress', addressLocality: 'Lagos', addressCountry: 'NG' },
    contactPoint: { '@type': 'ContactPoint', email: 'hello@healths.ng', contactType: 'customer service' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-brand-teal to-brand-green text-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-white/60 text-sm">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white">About</li>
            </ol>
          </nav>
          <div className="max-w-3xl">
            <SectionHeading
              label="About Us"
              title="Built to Solve Nigeria's Healthcare Visibility Crisis"
              subtitle="Nigerian healthcare professionals are among the world's most capable — yet most are invisible online, underequipped digitally, and unable to scale their impact. We're here to change that."
              inverted
              align="left"
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white" aria-labelledby="mission-heading">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="p-8 rounded-2xl bg-brand-teal-50 border border-brand-teal/10">
              <div className="w-12 h-12 bg-brand-teal rounded-xl flex items-center justify-center mb-4">
                <Target size={24} className="text-white" />
              </div>
              <h2 id="mission-heading" className="font-display font-bold text-2xl text-brand-charcoal mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                To make health knowledge accessible, visible, and actionable for every Nigerian — by equipping healthcare professionals with the digital tools they need to thrive, and by publishing the trusted health content every Nigerian deserves.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-emerald-50 border border-brand-green/10">
              <div className="w-12 h-12 bg-brand-green rounded-xl flex items-center justify-center mb-4">
                <Eye size={24} className="text-white" />
              </div>
              <h2 className="font-display font-bold text-2xl text-brand-charcoal mb-4">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed">
                A Nigeria where every citizen has access to reliable health information, and every healthcare professional has the digital tools and visibility to deliver quality care, grow their practice, and drive positive health outcomes nationwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-brand-warm-gray" aria-labelledby="story-heading">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading id="story-heading" label="Our Story" title="Born from Nigeria's Healthcare Reality" align="left" />
              <div className="mt-6 space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Healths.ng was born from a clear observation: Nigerian healthcare professionals are among the most resilient and capable in the world — but many remain invisible online, underequipped digitally, and unable to scale their reach or impact beyond their immediate environment.
                </p>
                <p>
                  Meanwhile, millions of Nigerians are making life-and-death health decisions based on WhatsApp forwards and misinformation — because credible, context-relevant health content is scarce.
                </p>
                <p>
                  We built Healths.ng to solve both problems simultaneously — equipping professionals with the digital presence they need to thrive, while producing the trusted health content that every Nigerian deserves access to.
                </p>
                <p>
                  Since 2019, we have worked with doctors, nurses, pharmacists, hospital administrators, and health NGOs across Nigeria — helping them grow, connect, and make a measurable difference.
                </p>
              </div>
            </div>

            {/* Key milestones — not repeated stats, but a timeline feel */}
            <div className="space-y-4">
              {[
                { year: '2019', milestone: 'Founded in Lagos with a single mission: make Nigerian healthcare visible.' },
                { year: '2021', milestone: 'Launched training programmes reaching healthcare professionals across 12 states.' },
                { year: '2023', milestone: 'Crossed 500+ expert-reviewed health articles and 50+ organisations served.' },
                { year: '2024', milestone: 'Expanded digital transformation services to clinics, hospitals, and NGOs nationwide.' },
              ].map(({ year, milestone }) => (
                <div key={year} className="flex gap-4 bg-white rounded-xl p-5 border border-gray-100">
                  <div className="font-display font-bold text-brand-teal text-lg w-12 shrink-0">{year}</div>
                  <p className="text-gray-700 text-sm leading-relaxed">{milestone}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pillars & Values — merged into one section */}
      <section className="py-20 bg-white" aria-labelledby="pillars-heading">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <SectionHeading
            id="pillars-heading"
            label="What We Stand For"
            title="The Principles Behind Everything We Do"
            subtitle="Six commitments that shape how we work, what we build, and who we serve."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {pillars.map(({ icon: Icon, title, description, bg, color }) => (
              <div key={title} className="p-6 rounded-2xl bg-brand-warm-gray border border-gray-100">
                <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon size={20} className={color} />
                </div>
                <h3 className="font-display font-bold text-brand-charcoal mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team preview */}
      {teamMembers.length > 0 && (
        <section className="py-20 bg-brand-warm-gray" aria-labelledby="team-preview-heading">
          <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
            <SectionHeading id="team-preview-heading" label="Our Team" title="The People Behind Healths.ng" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {teamMembers.slice(0, 4).map((member) => (
                <div key={member._id} className="text-center">
                  <Avatar className="h-20 w-20 mx-auto mb-3">
                    <AvatarImage src={member.image ? urlFor(member.image).width(160).height(160).url() : undefined} alt={member.name} />
                    <AvatarFallback className="bg-brand-teal-50 text-brand-teal font-bold text-lg">
                      {member.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="font-display font-bold text-brand-charcoal">{member.name}</div>
                  <div className="text-brand-teal text-sm">{member.role}</div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/team" className="text-brand-teal font-semibold hover:underline">Meet the full team →</Link>
            </div>
          </div>
        </section>
      )}

      <CTASection
        title="Ready to Work With Nigeria's Health Media Platform?"
        subtitle="Whether you're a solo practitioner in Port Harcourt, a clinic in Abuja, or an NGO running health campaigns — let's talk about how Healths.ng can help you grow."
      />
    </>
  )
}
