import type { Metadata } from 'next'
import Link from 'next/link'
import { Newspaper, CheckCircle, PenLine, Megaphone, Mail, Share, ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { CTASection } from '@/components/sections/CTASection'
import { buildMetadata } from '@/lib/utils/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Health Media & Content Creation',
  description: 'Professional health articles, awareness campaigns, infographics, and email newsletters for healthcare organizations in Nigeria and Africa.',
  path: '/services/health-media-content',
})

const features = [
  { icon: PenLine, title: 'Health Blog Articles & Copywriting', description: 'SEO-optimized, evidence-based articles written by health communication experts that rank on Google and educate your audience.' },
  { icon: Megaphone, title: 'Awareness Campaign Content', description: 'Compelling campaigns around health days, seasonal health issues, and public health priorities — designed to go viral and drive action.' },
  { icon: ImageIcon, title: 'Infographics & Educational Materials', description: 'Visually stunning infographics that simplify complex health information for patients, students, and the general public.' },
  { icon: Share, title: 'Social Media Health Content', description: 'Consistent social media content calendars with health posts, tips, and stories that build your following and engagement.' },
  { icon: Mail, title: 'Email Newsletters', description: 'Regular newsletters that keep your patients, subscribers, and stakeholders informed, engaged, and coming back.' },
  { icon: Newspaper, title: 'Press Releases & Media Outreach', description: 'Get your health news, research, and announcements featured in media outlets across Nigeria and Africa.' },
]

export default function HealthMediaPage() {
  return (
    <>
      <section className="py-20 bg-gradient-to-br from-brand-green to-brand-teal text-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-white/60 text-sm">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/services" className="hover:text-white">Services</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white">Health Media & Content</li>
            </ol>
          </nav>
          <div className="max-w-2xl">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
              <Newspaper size={28} />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl leading-tight mb-4">
              Health Media & Content Creation
            </h1>
            <p className="text-white/85 text-xl leading-relaxed mb-8">
              Professional health content that educates, informs, and builds trust — from blog articles to awareness campaigns and everything in between.
            </p>
            <Link href="/contact#booking">
              <Button className="bg-white text-brand-green hover:bg-brand-teal-50 font-bold px-8">
                Start Your Content Journey
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white" aria-labelledby="hm-features-heading">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <SectionHeading id="hm-features-heading" label="What's Included" title="Full-Service Health Content Creation" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="p-6 rounded-2xl bg-brand-warm-gray border border-gray-100 hover:border-brand-green/30 transition-colors">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={20} className="text-brand-green" />
                </div>
                <h3 className="font-display font-bold text-brand-charcoal mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-brand-warm-gray" aria-labelledby="hm-audience-heading">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading id="hm-audience-heading" label="Who This Is For" title="Content Solutions for Every Health Organization" align="left" />
              <ul className="mt-8 space-y-3">
                {['Health NGOs and public health organizations', 'Hospitals and clinics with online presence', 'Health startups and digital health companies', 'Research institutions and universities', 'Pharmaceutical and medical device companies', 'Individual health professionals and bloggers'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle size={18} className="text-brand-green shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-brand-green/20">
              <p className="text-brand-green font-semibold text-sm uppercase tracking-widest mb-2">Pricing</p>
              <h3 className="font-display font-bold text-2xl text-brand-charcoal mb-4">Starting from ₦80,000/month</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">We offer flexible content packages from one-time article creation to full monthly content management. Let's discuss what fits your needs.</p>
              <Link href="/contact#booking">
                <Button className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-bold">Get a Custom Quote</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection title="Ready to Tell Your Health Story?" subtitle="Great content builds trust. Let's create content that positions you as a health authority in Africa." />
    </>
  )
}
