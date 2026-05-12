import { ShieldCheck, Users, TrendingUp } from 'lucide-react'
import { SectionHeading } from '@/components/shared/SectionHeading'

const reasons = [
  {
    icon: ShieldCheck,
    title: 'Nigeria-Verified Health Content',
    description:
      'Every article and resource is reviewed by Nigerian-trained healthcare professionals. Accurate, evidence-based, and relevant to Nigeria\'s unique health challenges.',
    color: 'text-brand-teal',
    bg: 'bg-brand-teal-50',
  },
  {
    icon: Users,
    title: 'Built for Nigerian Professionals',
    description:
      'We understand Nigeria\'s healthcare environment — from NHIS to NMA, MDCN regulations to state-level challenges. Our services are designed for your specific context.',
    color: 'text-brand-green',
    bg: 'bg-emerald-50',
  },
  {
    icon: TrendingUp,
    title: 'Real, Measurable Growth',
    description:
      'We don\'t just create content or build websites — we deliver outcomes. More patient inquiries, more professional visibility, more practice growth for Nigerian health professionals.',
    color: 'text-brand-gold-dark',
    bg: 'bg-amber-50',
  },
]

export function WhyUsSection() {
  return (
    <section className="py-20 bg-white" aria-labelledby="why-us-heading">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <SectionHeading
          id="why-us-heading"
          label="Why Healths.ng"
          title="The Platform Built for Nigerian Healthcare"
          subtitle="We understand the unique realities of building a healthcare presence in Nigeria. Everything we do is designed around your environment, your patients, and your growth."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {reasons.map(({ icon: Icon, title, description, color, bg }) => (
            <div key={title} className="text-center group">
              <div className={`w-16 h-16 ${bg} rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform`}>
                <Icon size={28} className={color} />
              </div>
              <h3 className="font-display font-bold text-xl text-brand-charcoal mb-3">{title}</h3>
              <p className="text-gray-600 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
