import type { Metadata } from 'next'
import Link from 'next/link'
import { GraduationCap, CheckCircle, Laptop, Users, Network, TrendingUp, Video } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { CTASection } from '@/components/sections/CTASection'
import { buildMetadata } from '@/lib/utils/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Training & Capacity Building',
  description: 'Digital literacy, LinkedIn branding, research visibility, and healthcare marketing training for health professionals in Nigeria.',
  path: '/services/training-capacity-building',
})

const programs = [
  { icon: Laptop, title: 'Digital Literacy for Healthcare Workers', description: 'Practical workshops on using digital tools effectively — from telemedicine to social media to productivity apps. Online and in-person options available.' },
  { icon: TrendingUp, title: 'Research Visibility & Publication', description: 'Learn how to amplify your research, build a scholarly profile, use ResearchGate and Google Scholar effectively, and write for health media.' },
  { icon: Network, title: 'LinkedIn & Personal Branding', description: 'Build a powerful LinkedIn profile, create thought leadership content, and grow your professional network as a health professional.' },
  { icon: Video, title: 'Healthcare Marketing Training', description: 'Learn how to market your health practice, grow your patient base, and build a healthcare brand that stands out in Nigeria.' },
  { icon: Users, title: 'Organizational Capacity Building', description: 'Tailored workshops for health organizations on digital transformation, staff training, and implementing digital tools across departments.' },
  { icon: GraduationCap, title: 'Custom Training Programs', description: 'We design bespoke training programs for universities, hospitals, and health organizations based on their specific learning objectives.' },
]

export default function TrainingPage() {
  return (
    <>
      <section className="py-20 bg-gradient-to-br from-brand-gold-dark to-brand-gold text-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-white/70 text-sm">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/services" className="hover:text-white">Services</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white">Training & Capacity Building</li>
            </ol>
          </nav>
          <div className="max-w-2xl">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
              <GraduationCap size={28} />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl leading-tight mb-4">Training & Capacity Building</h1>
            <p className="text-white/90 text-xl leading-relaxed mb-8">
              Practical, hands-on training programs that equip healthcare professionals with the digital skills, visibility strategies, and communication tools they need to thrive in modern healthcare.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/training">
                <Button className="bg-white text-brand-gold-dark hover:bg-amber-50 font-bold px-8">View Upcoming Trainings</Button>
              </Link>
              <Link href="/contact#booking">
                <Button variant="outline" className="border-white/60 text-white hover:bg-white/10 bg-transparent font-semibold px-8">Request Custom Training</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white" aria-labelledby="training-programs-heading">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <SectionHeading id="training-programs-heading" label="Our Programs" title="Training That Transforms Healthcare Careers" subtitle="All programs are available online and in-person, and can be tailored for groups or organizations." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {programs.map(({ icon: Icon, title, description }) => (
              <div key={title} className="p-6 rounded-2xl bg-brand-warm-gray border border-gray-100 hover:border-brand-gold/30 transition-colors">
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={20} className="text-brand-gold-dark" />
                </div>
                <h3 className="font-display font-bold text-brand-charcoal mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-brand-warm-gray" aria-labelledby="training-audience-heading">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading id="training-audience-heading" label="Who Should Attend" title="For Healthcare Professionals at Every Stage" align="left" />
              <ul className="mt-8 space-y-3">
                {['Medical doctors, nurses, and pharmacists', 'Early and mid-career health professionals', 'Healthcare students and interns', 'Health department staff', 'Hospital and clinic administrators', 'Health researchers and academics'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle size={18} className="text-brand-gold-dark shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-brand-gold/30">
              <p className="text-brand-gold-dark font-semibold text-sm uppercase tracking-widest mb-2">Pricing</p>
              <h3 className="font-display font-bold text-2xl text-brand-charcoal mb-4">From ₦25,000 per participant</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">Group discounts available for organizations. Custom enterprise packages for hospitals and health institutions. Contact us for organizational pricing.</p>
              <Link href="/contact#booking">
                <Button className="w-full bg-brand-gold hover:bg-brand-gold-dark text-white font-bold">Inquire About Training</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection title="Upskill Your Healthcare Team Today" subtitle="Whether you're an individual professional or a health organization, we have the right training program for you." />
    </>
  )
}
