import type { Metadata } from 'next'
import Link from 'next/link'
import { Monitor, Newspaper, GraduationCap, Megaphone, CheckCircle, ArrowRight, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { CTASection } from '@/components/sections/CTASection'
import { buildMetadata } from '@/lib/utils/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Our Services',
  description:
    'Healthcare digital transformation, health media content, training & capacity building, and brand & media consulting — built specifically for Nigeria\'s health sector.',
  path: '/services',
})

const services = [
  {
    icon: Monitor,
    title: 'Healthcare Digital Transformation',
    href: '/services/healthcare-digital-transformation',
    color: 'text-brand-teal',
    bg: 'bg-brand-teal-50',
    border: 'border-brand-teal/20',
    description:
      'We help Nigerian clinics, hospitals, and health professionals establish and grow their digital presence — from professional websites to full digital marketing management built for the Nigerian market.',
    includes: [
      'Professional website design & development',
      'Google My Business setup & optimization',
      'Social media management (Facebook, Instagram, X)',
      'Digital marketing campaigns for Nigerian audiences',
      'Online appointment booking systems',
    ],
    audience: 'Nigerian clinics, hospitals, pharmacies, private practitioners',
  },
  {
    icon: Newspaper,
    title: 'Health Media & Content',
    href: '/services/health-media-content',
    color: 'text-brand-green',
    bg: 'bg-emerald-50',
    border: 'border-brand-green/20',
    description:
      'Nigeria-focused health content that educates, informs, and builds trust. We create medically accurate content that speaks to Nigerian patients and communities in a way they understand and trust.',
    includes: [
      'Health blog articles & medical copywriting',
      'Awareness campaign content (malaria, hypertension, diabetes & more)',
      'Infographics & educational materials',
      'Social media health content for Nigerian audiences',
      'Email newsletters for patients and professionals',
    ],
    audience: 'Nigerian health organizations, NGOs, clinics, research institutions',
  },
  {
    icon: GraduationCap,
    title: 'Training & Capacity Building',
    href: '/services/training-capacity-building',
    color: 'text-brand-gold-dark',
    bg: 'bg-amber-50',
    border: 'border-brand-gold/30',
    description:
      'Practical, hands-on training programs that equip Nigerian healthcare workers with modern digital and communication skills to advance their careers, grow their practice, and lead their field.',
    includes: [
      'Digital literacy for Nigerian healthcare workers',
      'Research visibility & academic publication training',
      'LinkedIn & personal branding for health professionals',
      'Healthcare marketing for Nigerian practices',
      'Online and in-person workshops across Nigeria',
    ],
    audience: 'Nigerian healthcare professionals, students, health organizations',
  },
  {
    icon: Megaphone,
    title: 'Brand & Media Consulting',
    href: '/services/brand-media-consulting',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    description:
      'Strategic consulting to define, position, and amplify your health brand across Nigerian media — for practitioners who want to become the trusted voice in their specialty and location.',
    includes: [
      'Health brand positioning strategy for Nigeria',
      'Visibility & content strategy',
      'Campaign planning & execution',
      'Personal branding for Nigerian doctors, nurses & pharmacists',
      'Media relations & PR (TV, radio, online publications)',
    ],
    audience: 'Nigerian health professionals, organizations, pharma companies',
  },
]

const process = [
  { step: '01', title: 'Free Discovery Call', description: 'We start with a free 30-minute call to understand your goals, your current challenges, and what growth looks like for your specific Nigerian healthcare context.' },
  { step: '02', title: 'Strategy & Proposal', description: 'We design a tailored strategy for your practice or organization and present a clear proposal with deliverables, timelines, and transparent pricing.' },
  { step: '03', title: 'Execution', description: 'Our Nigerian health media team gets to work, keeping you informed at every step with regular updates, drafts, and progress reports.' },
  { step: '04', title: 'Results & Growth', description: 'We measure what matters — patient inquiries, visibility, engagement, and revenue — and optimize continuously to ensure lasting impact for your practice.' },
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-brand-teal to-brand-green text-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-white/60 text-sm">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white font-medium">Services</li>
            </ol>
          </nav>
          <SectionHeading
            label="Our Services"
            title="Everything Your Nigerian Healthcare Practice Needs to Thrive Online"
            subtitle="Four integrated service lines built specifically for Nigerian health professionals — to help you grow your impact, reach more patients, and build the practice you deserve."
            align="left"
            inverted
          />
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/contact#booking">
              <Button className="bg-white text-brand-teal hover:bg-brand-teal-50 font-bold px-8">
                <Phone size={16} className="mr-2" /> Book a Free Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20 bg-white" aria-labelledby="services-list-heading">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <h2 id="services-list-heading" className="sr-only">Our Service Lines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map(({ icon: Icon, title, href, color, bg, border, description, includes, audience }) => (
              <div key={href} className={`rounded-2xl border ${border} p-8 hover:shadow-lg transition-shadow`}>
                <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mb-5`}>
                  <Icon size={24} className={color} />
                </div>
                <h3 className="font-display font-bold text-xl text-brand-charcoal mb-3">{title}</h3>
                <p className="text-gray-600 leading-relaxed mb-5">{description}</p>
                <ul className="space-y-2 mb-6">
                  {includes.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle size={14} className="text-brand-teal shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500">For: {audience}</p>
                  <Link
                    href={href}
                    className={`inline-flex items-center gap-1 text-sm font-semibold ${color} hover:opacity-80 transition-opacity`}
                  >
                    Learn More <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="py-20 bg-brand-warm-gray" aria-labelledby="process-heading">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <SectionHeading
            id="process-heading"
            label="Our Process"
            title="How We Work With You"
            subtitle="Simple, transparent, and designed around your schedule — even if you're a busy clinician or hospital administrator."
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12 relative">
            <div className="hidden md:block absolute top-8 left-16 right-16 h-0.5 bg-brand-teal/20" aria-hidden="true" />
            {process.map(({ step, title, description }) => (
              <div key={step} className="relative text-center">
                <div className="w-16 h-16 bg-brand-teal text-white font-display font-bold text-xl rounded-2xl flex items-center justify-center mx-auto mb-4 relative z-10">
                  {step}
                </div>
                <h3 className="font-display font-bold text-brand-charcoal mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
