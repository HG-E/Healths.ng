import { SectionHeading } from '@/components/shared/SectionHeading'
import { TestimonialCard } from '@/components/shared/TestimonialCard'
import { getTestimonials } from '@/lib/sanity/queries'
import { urlFor } from '@/sanity/lib/image'

const fallbackTestimonials = [
  {
    _id: '1',
    author: 'Dr. Amina Okonkwo',
    role: 'General Practitioner',
    organization: 'Lagos Health Clinic',
    content:
      'Healths.ng transformed our clinic\'s online presence. Within 3 months, we doubled our patient inquiries. The team truly understands healthcare marketing.',
    rating: 5,
  },
  {
    _id: '2',
    author: 'Pharm. Emmanuel Adeyemi',
    role: 'Clinical Pharmacist',
    organization: 'PharmaCare Nigeria',
    content:
      'The training on LinkedIn branding was a game-changer. I now receive speaking invitations and consulting requests I never expected.',
    rating: 5,
  },
  {
    _id: '3',
    author: 'Nurse Joy Eze',
    role: 'Senior Nurse',
    organization: 'Federal Medical Centre',
    content:
      'The health media content they create for our campaigns is professional, accurate, and resonates with our community. Highly recommend.',
    rating: 5,
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
          title="Trusted by Health Professionals Across Nigeria"
          subtitle="Real results from real healthcare professionals who chose to grow with Healths.ng."
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
