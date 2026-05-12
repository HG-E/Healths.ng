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
  description: 'Learn about Healths.ng Media Limited — Africa\'s health media and digital empowerment platform based in Nigeria.',
  path: '/about',
})

const pillars = [
  { icon: Heart, title: 'Health First', description: 'Every decision we make is guided by what\'s best for health outcomes and the communities we serve.' },
  { icon: Globe, title: 'Africa-Centred', description: 'We build for the African context — understanding the unique challenges and opportunities in our healthcare landscape.' },
  { icon: Target, title: 'Practical Impact', description: 'We don\'t just create content — we drive real change. Our work translates into measurable outcomes for professionals and patients.' },
  { icon: CheckCircle, title: 'Professional Excellence', description: 'We hold ourselves to the highest standards of accuracy, integrity, and professionalism in everything we produce.' },
]

const values = [
  'Accuracy and evidence-based communication',
  'Accessibility of health information for all',
  'Empowerment of health professionals',
  'Integrity in all our partnerships',
  'Innovation in health communication',
  'Pan-African perspective and pride',
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
    description: 'Africa\'s leading health media and digital empowerment platform.',
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
            <SectionHeading label="About Us" title="Making Health Knowledge Accessible, Visible, and Actionable" subtitle="We are Africa's health media and digital empowerment platform — building the bridge between healthcare professionals and the communities they serve." inverted align="left" />
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
              <p className="text-gray-700 leading-relaxed">To make health knowledge accessible, visible, and actionable for every Nigerian and African — by empowering healthcare professionals with digital tools and skills, and by delivering trusted health content that reaches and educates the public.</p>
            </div>
            <div className="p-8 rounded-2xl bg-emerald-50 border border-brand-green/10">
              <div className="w-12 h-12 bg-brand-green rounded-xl flex items-center justify-center mb-4">
                <Eye size={24} className="text-white" />
              </div>
              <h2 className="font-display font-bold text-2xl text-brand-charcoal mb-4">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed">A future where every African has access to reliable health information, and every African healthcare professional has the digital tools and visibility to deliver quality care, grow their practice, and lead positive health outcomes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-brand-warm-gray" aria-labelledby="story-heading">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading id="story-heading" label="Our Story" title="Built from a Deep Belief in African Health" align="left" />
              <div className="mt-6 space-y-4 text-gray-700 leading-relaxed">
                <p>Healths.ng Media Limited was founded with a clear observation: Nigerian and African healthcare professionals are among the most talented and dedicated in the world — but many lack the digital presence, tools, and communication skills to maximize their impact.</p>
                <p>At the same time, millions of Nigerians are making critical health decisions based on misinformation, rumor, and inadequate access to expert guidance.</p>
                <p>We built Healths.ng to solve both problems simultaneously — by creating a platform that empowers health professionals digitally, while also producing the trusted health content that everyday Africans need.</p>
                <p>Today, we are proud to serve healthcare professionals, organizations, students, and patients across Nigeria and Africa — helping them grow, connect, and thrive.</p>
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
          <SectionHeading id="pillars-heading" label="Brand Pillars" title="What We Stand For" />
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

      <CTASection title="Ready to Work With Us?" subtitle="Let's talk about how Healths.ng can help your healthcare practice or organization grow." />
    </>
  )
}
