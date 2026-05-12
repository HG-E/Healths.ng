import type { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, MapPin, Users, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { CTASection } from '@/components/sections/CTASection'
import { getUpcomingEvents } from '@/lib/sanity/queries'
import { formatDate } from '@/lib/utils/formatDate'
import { buildMetadata } from '@/lib/utils/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Training & Capacity Building Programs',
  description: 'Upcoming training programs, workshops, and courses for healthcare professionals in Nigeria. Digital skills, personal branding, and healthcare marketing.',
  path: '/training',
})

export const revalidate = 3600

const trainingCategories = [
  { title: 'Digital Literacy for Healthcare', description: 'Learn to use digital tools — telemedicine, EHRs, social media — confidently and professionally.' },
  { title: 'Research Visibility & Publication', description: 'Amplify your research impact. Learn to use scholarly platforms and write for health media.' },
  { title: 'LinkedIn & Personal Branding', description: 'Build a powerful online presence as a healthcare professional.' },
  { title: 'Healthcare Marketing', description: 'Grow your patient base and practice with proven digital marketing strategies.' },
]

export default async function TrainingPage() {
  let events: Awaited<ReturnType<typeof getUpcomingEvents>> = []
  try {
    events = await getUpcomingEvents(6)
  } catch {}

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-brand-gold-dark to-brand-gold text-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-white/70 text-sm">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white">Training</li>
            </ol>
          </nav>
          <SectionHeading label="Training Programs" title="Grow Your Skills. Grow Your Impact." subtitle="Practical, hands-on training programs designed specifically for African healthcare professionals. Online and in-person options available." inverted align="left" />
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/contact#booking">
              <Button className="bg-white text-brand-gold-dark hover:bg-amber-50 font-bold px-8">Request Custom Training</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming events */}
      <section className="py-20 bg-white" aria-labelledby="events-heading">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <SectionHeading id="events-heading" label="Upcoming" title="Upcoming Training Programs & Workshops" />
          {events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {events.map((event) => (
                <div key={event._id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="bg-brand-teal-50 p-6">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <Badge className={event.price === 0 ? 'bg-brand-green text-white border-0' : 'bg-brand-gold text-white border-0'}>
                        {event.price === 0 ? 'Free' : `₦${event.price?.toLocaleString()}`}
                      </Badge>
                      <Badge variant="outline" className="text-xs">{event.isOnline ? 'Online' : 'In-Person'}</Badge>
                    </div>
                    <h3 className="font-display font-bold text-brand-charcoal text-lg leading-snug">{event.title}</h3>
                  </div>
                  <div className="p-5 space-y-2">
                    {event.description && <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{event.description}</p>}
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar size={13} className="text-brand-teal" />
                      <span>{formatDate(event.date, 'EEE, MMM d yyyy · h:mm a')}</span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MapPin size={13} className="text-brand-teal" />
                        <span>{event.location}</span>
                      </div>
                    )}
                    {event.capacity && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Users size={13} className="text-brand-teal" />
                        <span>{event.capacity} spots available</span>
                      </div>
                    )}
                    {event.registrationUrl && (
                      <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center justify-center gap-2 w-full py-2 bg-brand-teal text-white rounded-lg text-sm font-semibold hover:bg-brand-teal-dark transition-colors">
                        Register Now <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-brand-warm-gray rounded-2xl mt-12">
              <Calendar size={40} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg font-medium">No upcoming events scheduled yet.</p>
              <p className="text-gray-400 text-sm mt-2 mb-6">Request a custom training for your team or organization.</p>
              <Link href="/contact#booking">
                <Button className="bg-brand-teal hover:bg-brand-teal-dark text-white font-bold">Request Custom Training</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Training categories */}
      <section className="py-20 bg-brand-warm-gray" aria-labelledby="categories-heading">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <SectionHeading id="categories-heading" label="Training Areas" title="What We Train On" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {trainingCategories.map(({ title, description }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100">
                <h3 className="font-display font-bold text-brand-charcoal text-lg mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Can't Find What You're Looking For?" subtitle="We design custom training programs for organizations and healthcare institutions. Tell us what you need." primaryCTA={{ label: 'Request Custom Training', href: '/contact#booking' }} />
    </>
  )
}
