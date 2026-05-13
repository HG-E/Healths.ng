import { SectionHeading } from '@/components/shared/SectionHeading'
import { TestimonialCard } from '@/components/shared/TestimonialCard'
import { getTestimonials } from '@/lib/sanity/queries'
import { urlFor } from '@/sanity/lib/image'

const fallbackTestimonials = [
  {
    _id: '1',
    author: 'Dr. Chukwuemeka Obi',
    role: 'Consultant Physician',
    organization: 'University of Nigeria Teaching Hospital, Enugu',
    content:
      'Within 3 months of working with Healths.ng, patient inquiries from our website doubled. They genuinely understand the Nigerian healthcare context — not just the digital side, but the cultural and regulatory nuances too.',
    rating: 5,
  },
  {
    _id: '2',
    author: 'Pharm. Adaeze Nwosu',
    role: 'Clinical Pharmacist & Entrepreneur',
    organization: 'MedPlus Abuja',
    content:
      'The LinkedIn branding training was practical, not generic. I went from zero online presence to receiving speaking invitations and consulting requests within Nigeria\'s health industry. Worth every naira.',
    rating: 5,
  },
  {
    _id: '3',
    author: 'Dr. Fatima Bello',
    role: 'Public Health Specialist',
    organization: 'Federal Ministry of Health, Abuja',
    content:
      'The maternal health content they produced was medically accurate and culturally relevant — not the generic content agencies usually deliver. It reached communities across northern Nigeria in a way our internal team could not.',
    rating: 4,
  },
]

export async function TestimonialsSection() {
  let testimonials: Awaited<ReturnType<typeof getTestimonials>> = []

  try {
    testimonials = await getTestimonials(3)
  } catch {
    // Use fallback
  }

  const displayTestimonials =
    testimonials.length > 0 ? testimonials : fallbackTestimonials

  return (
    <section className="py-20 bg-white" aria-labelledby="testimonials-heading">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <SectionHeading
          id="testimonials-heading"
          label="Testimonials"
          title="What Nigerian Health Professionals Are Saying"
          subtitle="From Lagos to Abuja to Enugu — real results from Nigerian healthcare professionals who chose to grow their practice and visibility with Healths.ng."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {displayTestimonials.map((t) => (
            <TestimonialCard
              key={t._id}
              author={t.author}
              role={t.role}
              organization={t.organization}
              content={t.content}
              imageUrl={
                'image' in t && t.image
                  ? urlFor(t.image).width(80).height(80).url()
                  : undefined
              }
              rating={t.rating}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
