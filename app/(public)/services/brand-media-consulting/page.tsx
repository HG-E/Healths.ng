import type { Metadata } from 'next'
import Link from 'next/link'
import { Megaphone, CheckCircle, Compass, Layers, Target, UserCircle, Mic } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { CTASection } from '@/components/sections/CTASection'
import { buildMetadata } from '@/lib/utils/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Brand & Media Consulting',
  description: 'Strategic health brand positioning, visibility strategy, campaign planning, and personal branding for healthcare professionals and organizations in Nigeria.',
  path: '/services/brand-media-consulting',
})

const services = [
  { icon: Compass, title: 'Health Brand Positioning Strategy', description: 'Define what makes your health brand unique and how to communicate your value proposition clearly and consistently across all channels.' },
  { icon: Layers, title: 'Visibility & Content Strategy', description: 'A comprehensive roadmap for building your digital presence — which platforms to prioritize, what content to create, and how to measure success.' },
  { icon: Target, title: 'Campaign Planning & Execution', description: 'End-to-end management of health campaigns — from concept and creative to distribution and results analysis.' },
  { icon: UserCircle, title: 'Personal Branding for Health Professionals', description: 'Build the professional reputation you deserve. We help doctors, nurses, and pharmacists become recognized authorities in their field.' },
  { icon: Mic, title: 'Media Relations & PR', description: 'Get your health expertise, research, and organization featured in Nigerian media, health publications, and on radio and TV.' },
  { icon: Megaphone, title: 'Thought Leadership Development', description: 'Develop your voice as a health expert — speaking opportunities, podcast appearances, guest articles, and conference positioning.' },
]

export default function BrandConsultingPage() {
  return (
    <>
      <section className="py-20 bg-gradient-to-br from-purple-700 to-brand-teal text-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-white/60 text-sm">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/services" className="hover:text-white">Services</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white">Brand & Media Consulting</li>
            </ol>
          </nav>
          <div className="max-w-2xl">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
              <Megaphone size={28} />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl leading-tight mb-4">Brand & Media Consulting</h1>
            <p className="text-white/85 text-xl leading-relaxed mb-8">
              Strategic consulting to define, position, and amplify your health brand. For professionals who want to be known, trusted, and sought after across Africa.
            </p>
            <Link href="/contact#booking">
              <Button className="bg-white text-purple-700 hover:bg-purple-50 font-bold px-8">Book a Strategy Session</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white" aria-labelledby="brand-services-heading">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <SectionHeading id="brand-services-heading" label="Consulting Services" title="Build a Health Brand That Commands Attention" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {services.map(({ icon: Icon, title, description }) => (
              <div key={title} className="p-6 rounded-2xl bg-brand-warm-gray border border-gray-100 hover:border-purple-200 transition-colors">
                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={20} className="text-purple-600" />
                </div>
                <h3 className="font-display font-bold text-brand-charcoal mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-brand-warm-gray" aria-labelledby="brand-audience-heading">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading id="brand-audience-heading" label="Who This Is For" title="For Professionals Who Want to Lead Their Industry" align="left" />
              <ul className="mt-8 space-y-3">
                {['Senior doctors and specialist physicians', 'Healthcare entrepreneurs and founders', 'Pharmaceutical and biotech companies', 'Health NGOs and advocacy organizations', 'Hospital and clinic groups', 'Health academics and researchers building public profiles'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle size={18} className="text-purple-600 shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-purple-200">
              <p className="text-purple-600 font-semibold text-sm uppercase tracking-widest mb-2">Pricing</p>
              <h3 className="font-display font-bold text-2xl text-brand-charcoal mb-4">Request a Custom Quote</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">Brand consulting is highly tailored. Pricing depends on the scope, duration, and deliverables. Book a free 30-minute strategy session to discuss your needs.</p>
              <Link href="/contact#booking">
                <Button className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold">Book a Free Strategy Session</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection title="Build the Health Brand You Deserve" subtitle="Your expertise is valuable. Let's make sure the world knows it." />
    </>
  )
}
