import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, Target, Eye, Heart, Globe } from 'lucide-react'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { CTASection } from '@/components/sections/CTASection'
import { getTeamMembers } from '@/lib/sanity/queries'
import { urlFor } from '@/sanity/lib/image'
import { buildMetadata } from '@/lib/utils/seo'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const metadata: Metadata = buildMetadata({
  title: 'About Us',
  description: 'Learn about Healths.ng Media Limited — Nigeria\'s leading health media and digital empowerment platform helping healthcare professionals grow their practice and reach.',
  path: '/about',
})

const pillars = [
  { icon: Heart, title: 'Health First', description: 'Every decision we make is guided by what\'s best for health outcomes in Nigeria. We will never compromise on accuracy or patient safety for any business reason.' },
  { icon: Globe, title: 'Nigeria-Centred', description: 'We build for the Nigerian context — understanding NHIS, MDCN regulations, NMA dynamics, state health systems, and the real challenges Nigerian professionals face daily.' },
  { icon: Target, title: 'Practical Impact', description: 'We don\'t just create content — we drive measurable results. More patient inquiries, more professional visibility, more practice growth for Nigerian healthcare providers.' },
  { icon: CheckCircle, title: 'Professional Excellence', description: 'We hold ourselves to the highest standards of accuracy, integrity, and professionalism. Our content is reviewed by Nigerian healthcare professionals before it goes live.' },
]

const values = [
  'Accuracy and evidence-based health communication',
  'Accessibility of health information for all Nigerians',
  'Empowerment of Nigerian health professionals',
  'Integrity and transparency in all our work',
  'Innovation in Nigerian health communication',
  'Commitment to Nigeria\'s health sector growth',
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
    description: 'Nigeria\'s leading health media and digital empowerment platform for healthcare professionals.',
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
            <SectionHeading label="About Us" title="Making Nigerian Health Knowledge Accessible, Visible, and Actionable" subtitle="We are Nigeria's health media and digital empowerment platform — connecting healthcare professionals with the patients and communities they serve, one digital touchpoint at a time." inverted align="left" />
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
              <p className="text-gray-700 leading-relaxed">To make health knowledge accessible, visible, and actionable for every Nigerian — by empowering healthcare professionals with the digital tools and skills they need, and by delivering trusted health content that informs, protects, and educates the Nigerian public.</p>
            </div>
            <div className="p-8 rounded-2xl bg-emerald-50 border border-brand-green/10">
              <div className="w-12 h-12 bg-brand-green rounded-xl flex items-center justify-center mb-4">
                <Eye size={24} className="text-white" />
              </div>
              <h2 className="font-display font-bold text-2xl text-brand-charcoal mb-4">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed">A Nigeria where every citizen has access to reliable health information, and every Nigerian healthcare professional has the digital tools, visibility, and community to deliver quality care, grow their practice, and drive positive health outcomes across the country.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-brand-warm-gray" aria-labelledby="story-heading">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading id="story-heading" label="Our Story" title="Built for Nigeria's Healthcare Reality" align="left" />
              <div className="mt-6 space-y-4 text-gray-700 leading-relaxed">
                <p>Healths.ng Media Limited was born from a clear observation: Nigerian healthcare professionals are among the most resilient and capable in the world — but many are invisible online, underequipped digitally, and unable to scale their reach or impact beyond their immediate environment.</p>
                <p>At the same time, millions of Nigerians are making life-and-death health decisions based on WhatsApp forwards, hearsay, and misinformation — because credible, accessible health content in a Nigerian context is scarce.</p>
                <p>We built Healths.ng to solve both problems at once — by equipping healthcare professionals with the digital presence and skills they need to thrive, and by producing the trusted health content that every Nigerian deserves to have access to.</p>
                <p>Today, we serve doctors, nurses, pharmacists, hospital administrators, health NGOs, and everyday Nigerians who care about their health — helping them grow, connect, and make better decisions.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '2019', label: 'Year Founded' },
                { value: '10K+', label: 'Professionals Reached' },
                { value: '500+', label: 'Articles Published' },
                { value: '50+', label: 'Organizations Served' },
              ].map(({ value, label }) => (
                <div key={label} className="bg-white rounded-2xl p-6 text-center border border-gray-100">
                  <div className="font-display font-bold text-3xl text-brand-teal mb-1">{value}</div>
                  <div className="text-gray-600 text-sm">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20 bg-white" aria-labelledby="pillars-heading">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <SectionHeading id="pillars-heading" label="Brand Pillars" title="What We Stand For in Nigerian Healthcare" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {pillars.map(({ icon: Icon, title, description }) => (
              <div key={title} className="p-6 rounded-2xl bg-brand-warm-gray border border-gray-100 text-center">
                <div className="w-12 h-12 bg-brand-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon size={22} className="text-brand-teal" />
                </div>
                <h3 className="font-display font-bold text-brand-charcoal mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-brand-warm-gray" aria-labelledby="values-heading">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <SectionHeading id="values-heading" label="Core Values" title="The Principles That Guide Everything We Do" align="left" />
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {values.map((val) => (
                <li key={val} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-100">
                  <CheckCircle size={18} className="text-brand-teal shrink-0" />
                  <span className="text-gray-700 text-sm">{val}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Team preview */}
      {teamMembers.length > 0 && (
        <section className="py-20 bg-white" aria-labelledby="team-preview-heading">
          <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
            <SectionHeading id="team-preview-heading" label="Our Team" title="The People Behind Healths.ng" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {teamMembers.slice(0, 4).map((member) => (
                <div key={member._id} className="text-center">
                  <Avatar className="h-20 w-20 mx-auto mb-3">
                    <AvatarImage src={member.image ? urlFor(member.image).width(160).height(160).url() : undefined} alt={member.name} />
                    <AvatarFallback className="bg-brand-teal-50 text-brand-teal font-bold text-lg">
                      {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
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

      <CTASection title="Ready to Work With Nigeria's Health Media Platform?" subtitle="Whether you're a solo practitioner in Port Harcourt, a clinic in Abuja, or an NGO running health campaigns — let's talk about how Healths.ng can help you grow." />
    </>
  )
}
