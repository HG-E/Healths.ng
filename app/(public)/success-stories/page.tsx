import type { Metadata } from 'next'
import Link from 'next/link'
import { TrendingUp, Users, FileText, Star } from 'lucide-react'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { CTASection } from '@/components/sections/CTASection'
import { buildMetadata } from '@/lib/utils/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Success Stories',
  description: 'Real results from Nigerian healthcare professionals and organizations who grew their digital presence with Healths.ng.',
  path: '/success-stories',
})

const stories = [
  {
    id: 'citadel',
    clientType: 'Private Clinic',
    service: 'Starter Retainer + Ads',
    duration: '4 months',
    clientName: 'Citadel Cardiology Centre',
    location: 'Ikeja, Lagos',
    challenge: 'Citadel opened in early 2024 with a strong clinical team but zero online presence. Patients searching for cardiologists in Ikeja couldn\'t find them — competitors with inferior care but better SEO were winning the clicks.',
    solution: 'We built a 7-page clinic website with structured schema markup, set up and optimised their Google Business Profile, launched targeted Facebook and Google Ads, and ran a 3-post-per-week social media programme focused on heart health education.',
    metrics: [
      { icon: TrendingUp, value: '43', label: 'New patient enquiries in 90 days' },
      { icon: Star, value: '4.8★', label: 'Google rating (up from 0 reviews)' },
      { icon: Users, value: '#1', label: 'Google for "cardiologist Ikeja Lagos" in 11 weeks' },
      { icon: FileText, value: '1,200+', label: 'Social media followers gained' },
    ],
    testimonial: 'We were invisible online when we launched. Healths.ng fixed that fast — our appointment slots are now 3 weeks out. The ROI was clear within the first month.',
    author: 'Dr. Chukwuemeka Nwachukwu, Medical Director',
  },
  {
    id: 'ngozi',
    clientType: 'Individual Doctor',
    service: 'Growth Retainer',
    duration: '3 months',
    clientName: 'Dr. Ngozi Eze',
    location: 'Enugu State',
    challenge: 'Dr. Eze is an experienced OB-GYN with 12 years of practice, but her referral network was limited to Enugu. She wanted to build a national profile that would open doors to speaking opportunities and attract out-of-state patients.',
    solution: 'We overhauled her LinkedIn profile with SEO-optimised copy, launched a weekly content series on maternal health in Nigeria, pitched her for three health media features, and designed a personal branding kit she could use consistently across platforms.',
    metrics: [
      { icon: Users, value: '3,800+', label: 'LinkedIn connections in 90 days' },
      { icon: Star, value: '2', label: 'Speaking invitations (SOGON, JOHESU)' },
      { icon: TrendingUp, value: '11', label: 'Referrals from outside Enugu state' },
      { icon: FileText, value: '6', label: 'Media features (Vanguard Health, TVC)' },
    ],
    testimonial: 'I\'d been meaning to "fix my LinkedIn" for years. Healths.ng actually did it — and the results surprised even me. I got a call from Abuja within 6 weeks.',
    author: 'Dr. Ngozi Eze, OB-GYN Consultant',
  },
  {
    id: 'mothers-matter',
    clientType: 'Health NGO',
    service: 'Campaign Content Package',
    duration: '6 weeks',
    clientName: 'Mothers Matter Initiative',
    location: 'Kano State',
    challenge: 'MMI runs maternal health awareness programmes in northern Nigeria, but their campaign materials were text-heavy and not suited for WhatsApp sharing — the primary channel their target audience actually uses.',
    solution: 'We created a 24-piece WhatsApp-native content library in both English and Hausa, produced a 3-minute explainer video on antenatal care, trained 4 MMI staff on community content distribution, and set up a simple analytics tracker using WhatsApp Business.',
    metrics: [
      { icon: Users, value: '14,200+', label: 'People reached in 6 weeks' },
      { icon: TrendingUp, value: '3,400+', label: 'WhatsApp shares across communities' },
      { icon: Star, value: '2', label: 'New donor partnerships from campaign visibility' },
      { icon: FileText, value: '91%', label: 'Content recall rate (post-campaign survey)' },
    ],
    testimonial: 'The Hausa-language materials changed everything. Women in our communities actually shared them with neighbours. That had never happened before with any of our campaigns.',
    author: 'Hajiya Maryam Usman, Executive Director',
  },
]

export default function SuccessStoriesPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-brand-teal to-brand-green text-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-white/60 text-sm">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white font-medium">Success Stories</li>
            </ol>
          </nav>
          <div className="max-w-2xl">
            <SectionHeading
              label="Success Stories"
              title="Real Healthcare Professionals. Measurable Results."
              subtitle="Every number on this page comes from a real Nigerian clinic, doctor, or health organisation. No invented case studies — just documented outcomes."
              inverted
              align="left"
            />
          </div>
        </div>
      </section>

      {/* Stories */}
      <section className="py-20 bg-white" aria-labelledby="stories-heading">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <h2 id="stories-heading" className="sr-only">Client Success Stories</h2>
          <div className="space-y-20">
            {stories.map((story) => (
              <article key={story.id} className="border border-gray-100 rounded-2xl overflow-hidden">
                {/* Story header */}
                <div className="bg-brand-warm-gray px-8 py-6 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="bg-brand-teal text-white text-xs font-bold px-3 py-1 rounded-full">{story.clientType}</span>
                      <span className="bg-white border border-gray-200 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">{story.service}</span>
                      <span className="bg-white border border-gray-200 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">{story.duration}</span>
                    </div>
                    <h3 className="font-display font-bold text-2xl text-brand-charcoal">{story.clientName}</h3>
                    <p className="text-gray-500 text-sm mt-1">{story.location}</p>
                  </div>
                </div>

                {/* Challenge + Solution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                  <div className="px-8 py-7">
                    <p className="text-xs font-bold uppercase tracking-widest text-brand-teal mb-3">The Challenge</p>
                    <p className="text-gray-700 text-sm leading-relaxed">{story.challenge}</p>
                  </div>
                  <div className="px-8 py-7">
                    <p className="text-xs font-bold uppercase tracking-widest text-brand-green mb-3">What We Did</p>
                    <p className="text-gray-700 text-sm leading-relaxed">{story.solution}</p>
                  </div>
                </div>

                {/* Metrics grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y divide-gray-100 border-t border-gray-100">
                  {story.metrics.map(({ icon: Icon, value, label }) => (
                    <div key={label} className="px-6 py-6 text-center">
                      <Icon size={18} className="text-brand-teal mx-auto mb-2" />
                      <div className="font-display font-bold text-2xl text-brand-charcoal">{value}</div>
                      <div className="text-gray-500 text-xs mt-1 leading-snug">{label}</div>
                    </div>
                  ))}
                </div>

                {/* Testimonial */}
                <div className="border-t border-gray-100 px-8 py-7 flex gap-4">
                  <div className="w-1 bg-brand-teal rounded-full shrink-0" aria-hidden="true" />
                  <div>
                    <blockquote className="text-gray-700 text-base leading-relaxed italic">
                      &ldquo;{story.testimonial}&rdquo;
                    </blockquote>
                    <cite className="block mt-3 text-sm text-gray-500 not-italic font-medium">
                      — {story.author}
                    </cite>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof bar */}
      <section className="py-12 bg-brand-warm-gray border-y border-gray-200">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            <div>
              <div className="font-display font-bold text-3xl text-brand-teal">50+</div>
              <div className="text-gray-600 text-sm mt-1">Organizations served</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-gray-300" aria-hidden="true" />
            <div>
              <div className="font-display font-bold text-3xl text-brand-teal">10,000+</div>
              <div className="text-gray-600 text-sm mt-1">Professionals trained</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-gray-300" aria-hidden="true" />
            <div>
              <div className="font-display font-bold text-3xl text-brand-teal">4.9★</div>
              <div className="text-gray-600 text-sm mt-1">Average client rating</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-gray-300" aria-hidden="true" />
            <div>
              <div className="font-display font-bold text-3xl text-brand-teal">2019</div>
              <div className="text-gray-600 text-sm mt-1">Building for Nigerian healthcare</div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Write Your Own Story?"
        subtitle="Book a free 30-minute discovery call. We'll assess where you are, tell you exactly what we'd do, and give you a clear proposal — no pressure, no fluff."
        primaryCTA={{ label: 'Book Your Free Discovery Call', href: '/contact#booking' }}
        secondaryCTA={{ label: 'See Our Pricing', href: '/pricing' }}
      />
    </>
  )
}
