import { Monitor, Newspaper, GraduationCap, Megaphone } from 'lucide-react'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { ServiceCard } from '@/components/shared/ServiceCard'

const services = [
  {
    icon: <Monitor size={22} />,
    title: 'Healthcare Digital Transformation',
    description:
      'Websites, Google Business, social media, and digital marketing tailored for clinics, hospitals, and health professionals.',
    href: '/services/healthcare-digital-transformation',
    color: 'teal' as const,
  },
  {
    icon: <Newspaper size={22} />,
    title: 'Health Media & Content',
    description:
      'Professional health articles, awareness campaigns, infographics, and email newsletters that inform and engage.',
    href: '/services/health-media-content',
    color: 'green' as const,
  },
  {
    icon: <GraduationCap size={22} />,
    title: 'Training & Capacity Building',
    description:
      'Digital literacy, research visibility, LinkedIn branding, and healthcare marketing training for professionals.',
    href: '/services/training-capacity-building',
    color: 'gold' as const,
  },
  {
    icon: <Megaphone size={22} />,
    title: 'Brand & Media Consulting',
    description:
      'Strategic positioning, content strategy, campaign planning, and personal branding for health professionals.',
    href: '/services/brand-media-consulting',
    color: 'teal' as const,
  },
]

export function ServicesSection() {
  return (
    <section className="py-20 bg-brand-warm-gray" aria-labelledby="services-heading">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <SectionHeading
          id="services-heading"
          label="What We Do"
          title="Four Ways We Grow Nigerian Healthcare Professionals"
          subtitle="From building your digital presence to creating trusted health content, we provide end-to-end support for Nigerian clinics, hospitals, and health professionals."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {services.map((service) => (
            <ServiceCard key={service.href} {...service} />
          ))}
        </div>
      </div>
    </section>
  )
}
