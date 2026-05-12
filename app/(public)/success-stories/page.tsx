import type { Metadata } from 'next'
import Link from 'next/link'
import { Quote } from 'lucide-react'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { CTASection } from '@/components/sections/CTASection'
import { buildMetadata } from '@/lib/utils/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Success Stories',
  description: 'Real results from healthcare professionals and organizations who grew their digital presence and impact with Healths.ng.',
  path: '/success-stories',
})

const fallbackStories = [
  {
    _id: '1',
    clientType: 'Private Clinic',
    clientName: 'Sunshine Medical Centre',
    challenge: 'The clinic had no online presence and was losing potential patients to competitors with better digital visibility.',
    solution: 'We built a professional website, set up and optimized Google Business Profile, and launched a local SEO campaign.',
    result: '200% increase in patient inquiries within 3 months. Ranked #1 on Google for their specialty in the local area.',
    testimonial: 'Healths.ng completely transformed how patients find us. Our appointment book is always full now.',
  },
  {
    _id: '2',
    clientType: 'Individual Doctor',
    clientName: 'Dr. Emmanuel Obi',
    challenge: 'A specialist physician with no social media presence and difficulty attracting referrals from colleagues outside his city.',
    solution: 'LinkedIn profile optimization, personal branding strategy, and a content calendar for thought leadership articles.',
    result: 'Gained 5,000+ LinkedIn connections in 6 months, 3 speaking invitations, and 12 new institutional partnerships.',
    testimonial: 'I never thought LinkedIn could change my career. The training paid for itself in the first month.',
  },
  {
    _id: '3',
    clientType: 'Health NGO',
    clientName: 'Community Health Initiative',
    challenge: 'An NGO running important health campaigns but unable to reach beyond their immediate geographic community.',
    solution: 'Developed a multi-channel content strategy, created social media health content, and produced awareness campaign materials.',
    result: 'Reached 150,000+ people with their malaria awareness campaign. Secured 2 new donor partnerships.',
    testimonial: 'Our content finally resonates with the communities we serve. The impact has been remarkable.',
  },
]

export default function SuccessStoriesPage() {
  return (
    <>
      <section className="py-20 bg-gradient-to-br from-brand-teal to-brand-green text-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-white/60 text-sm">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white">Success Stories</li>
            </ol>
          </nav>
          <SectionHeading label="Success Stories" title="Real Results. Real Healthcare Professionals." subtitle="See how we've helped clinics, individual professionals, and health organizations across Nigeria grow their digital presence and impact." inverted align="left" />
        </div>
      </section>

      <section className="py-20 bg-white" aria-labelledby="stories-heading">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <h2 id="stories-heading" className="sr-only">Success Stories</h2>
          <div className="space-y-10">
            {fallbackStories.map((story, i) => (
              <article key={story._id} className={`grid grid-cols-1 lg:grid-cols-2 gap-8 rounded-2xl overflow-hidden border border-gray-100 ${i % 2 === 0 ? '' : 'lg:grid-flow-dense'}`}>
                <div className="p-8 bg-brand-warm-gray">
                  <span className="inline-block bg-brand-teal text-white text-xs font-bold px-3 py-1 rounded-full mb-4">{story.clientType}</span>
                  <h3 className="font-display font-bold text-xl text-brand-charcoal mb-6">{story.clientName}</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-brand-teal mb-1">The Challenge</p>
                      <p className="text-gray-700 text-sm leading-relaxed">{story.challenge}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-brand-green mb-1">Our Solution</p>
                      <p className="text-gray-700 text-sm leading-relaxed">{story.solution}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold-dark mb-1">The Result</p>
                      <p className="text-gray-700 text-sm leading-relaxed font-medium">{story.result}</p>
                    </div>
                  </div>
                </div>
                {story.testimonial && (
                  <div className={`p-8 bg-brand-teal flex flex-col justify-center ${i % 2 !== 0 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                    <Quote size={32} className="text-white/30 mb-4" />
                    <blockquote className="text-white text-lg leading-relaxed font-accent italic">&ldquo;{story.testimonial}&rdquo;</blockquote>
                    <cite className="mt-6 text-white/70 text-sm not-italic">— {story.clientName}, {story.clientType}</cite>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Ready to Write Your Own Success Story?" subtitle="Join the growing list of healthcare professionals and organizations who have transformed their digital presence with Healths.ng." />
    </>
  )
}
