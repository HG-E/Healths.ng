import { ShieldCheck, Users, TrendingUp } from 'lucide-react'
import { SectionHeading } from '@/components/shared/SectionHeading'

const reasons = [
  {
    icon: ShieldCheck,
    title: 'Trusted Health Information',
    description:
      'All our content is reviewed by healthcare professionals. We uphold accuracy, evidence-based guidance, and responsible communication.',
    color: 'text-brand-teal',
    bg: 'bg-brand-teal-50',
  },
  {
    icon: Users,
    title: 'Professional Network',
    description:
      'We connect healthcare professionals, organizations, and the public through a thriving community focused on health empowerment.',
    color: 'text-brand-green',
    bg: 'bg-emerald-50',
  },
  {
    icon: TrendingUp,
    title: 'Digital Transformation',
    description:
      'From website design to digital marketing, we provide the tools and training to make healthcare organizations thrive online.',
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
          title="The Platform Built for African Healthcare"
          subtitle="We understand the unique challenges of building a healthcare presence in Africa. That's why everything we do is designed for your context."
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
