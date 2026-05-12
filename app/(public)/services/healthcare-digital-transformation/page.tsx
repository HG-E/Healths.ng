import type { Metadata } from 'next'
import Link from 'next/link'
import { Monitor, CheckCircle, Globe, MapPin, Share2, BarChart2, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { CTASection } from '@/components/sections/CTASection'
import { buildMetadata } from '@/lib/utils/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Healthcare Digital Transformation',
  description: 'Professional websites, Google Business optimization, social media management, and digital marketing for clinics, hospitals, and health professionals in Nigeria.',
  path: '/services/healthcare-digital-transformation',
})

const features = [
  { icon: Globe, title: 'Website Design & Development', description: 'Professional, mobile-first websites built for clinics, hospitals, and health practices. SEO-optimized and patient-friendly.' },
  { icon: MapPin, title: 'Google My Business Optimization', description: 'Get found by patients searching for healthcare services near them. We set up and optimize your Google Business profile.' },
  { icon: Share2, title: 'Healthcare Social Media Management', description: 'Consistent, professional social media content that builds trust and grows your patient community on Facebook, Instagram, and LinkedIn.' },
  { icon: BarChart2, title: 'Digital Marketing Campaigns', description: 'Targeted digital ads that bring patients to your practice. Google Ads, Facebook Ads, and more — managed by health marketing experts.' },
  { icon: Calendar, title: 'Online Appointment Booking', description: 'Integrate seamless online booking systems into your website. Reduce no-shows and streamline patient scheduling.' },
  { icon: Monitor, title: 'Healthcare SEO', description: 'Rank higher on Google for health-related searches in your area. We optimize your entire digital presence for search engines.' },
]

const forWho = [
  'Private clinics and specialist practices',
  'Hospitals and health centers',
  'Pharmacies and pharmaceutical companies',
  'Dental, eye care, and specialist clinics',
  'Individual doctors, nurses, and health professionals',
  'Health NGOs and public health organizations',
]

const results = [
  { metric: '200%', label: 'Average increase in online inquiries' },
  { metric: '3x', label: 'More patient reviews on Google' },
  { metric: '60%', label: 'Reduction in missed appointments' },
]

export default function HealthcareDigitalPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-brand-teal to-brand-teal-dark text-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-white/60 text-sm">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/services" className="hover:text-white">Services</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white">Healthcare Digital Transformation</li>
            </ol>
          </nav>
          <div className="max-w-2xl">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
              <Monitor size={28} />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl leading-tight mb-4">
              Healthcare Digital Transformation
            </h1>
            <p className="text-white/85 text-xl leading-relaxed mb-8">
              Build a powerful digital presence that attracts patients, builds trust, and grows your practice — all managed by experts who understand healthcare.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact#booking">
                <Button className="bg-white text-brand-teal hover:bg-brand-teal-50 font-bold px-8">
                  Get a Free Consultation
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-white/60 text-white hover:bg-white/10 bg-transparent font-semibold px-8">
                  Request a Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 bg-brand-gold" aria-labelledby="results-heading">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <h2 id="results-heading" className="sr-only">Results</h2>
          <div className="grid grid-cols-3 gap-8 text-white text-center">
            {results.map(({ metric, label }) => (
              <div key={label}>
                <div className="font-display font-bold text-3xl md:text-4xl">{metric}</div>
                <div className="text-white/80 text-sm mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white" aria-labelledby="features-heading">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <SectionHeading
            id="features-heading"
            label="What's Included"
            title="A Complete Digital Presence for Your Healthcare Practice"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="p-6 rounded-2xl bg-brand-warm-gray border border-gray-100 hover:border-brand-teal/30 transition-colors">
                <div className="w-10 h-10 bg-brand-teal-50 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={20} className="text-brand-teal" />
                </div>
                <h3 className="font-display font-bold text-brand-charcoal mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-20 bg-brand-warm-gray" aria-labelledby="audience-heading">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                id="audience-heading"
                label="Who This Is For"
                title="Built for Every Type of Healthcare Organization"
                align="left"
              />
              <ul className="mt-8 space-y-3">
                {forWho.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle size={18} className="text-brand-teal shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-brand-teal/20">
              <p className="text-brand-teal font-semibold text-sm uppercase tracking-widest mb-2">Pricing</p>
              <h3 className="font-display font-bold text-2xl text-brand-charcoal mb-4">
                Starting from ₦150,000
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Every healthcare practice is unique. We build custom packages based on your specific needs and goals. Request a free consultation to get an accurate quote.
              </p>
              <Link href="/contact#booking">
                <Button className="w-full bg-brand-teal hover:bg-brand-teal-dark text-white font-bold">
                  Book a Free Discovery Call
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Transform Your Healthcare Practice Online?"
        subtitle="Book a free 30-minute discovery call. No commitment required."
      />
    </>
  )
}
