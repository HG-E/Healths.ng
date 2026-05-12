import type { Metadata } from 'next'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { CTASection } from '@/components/sections/CTASection'
import { getTeamMembers } from '@/lib/sanity/queries'
import { urlFor } from '@/sanity/lib/image'
import { buildMetadata } from '@/lib/utils/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Our Team',
  description: 'Meet the dedicated team behind Healths.ng Media Limited — health professionals, digital experts, and media specialists.',
  path: '/team',
})

export const revalidate = 3600

export default async function TeamPage() {
  let teamMembers: Awaited<ReturnType<typeof getTeamMembers>> = []
  try {
    teamMembers = await getTeamMembers()
  } catch {}

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-brand-teal to-brand-green text-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-white/60 text-sm">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white">Our Team</li>
            </ol>
          </nav>
          <SectionHeading label="Our Team" title="The People Behind Healths.ng" subtitle="A passionate team of health communicators, digital strategists, and media professionals dedicated to transforming African healthcare." inverted />
        </div>
      </section>

      <section className="py-20 bg-white" aria-labelledby="team-grid-heading">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <h2 id="team-grid-heading" className="sr-only">Team Members</h2>
          {teamMembers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {teamMembers.map((member) => {
                const initials = member.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
                return (
                  <div key={member._id} className="text-center group">
                    <div className="relative mb-4">
                      <Avatar className="h-28 w-28 mx-auto ring-4 ring-brand-teal-50 group-hover:ring-brand-teal transition-all">
                        <AvatarImage src={member.image ? urlFor(member.image).width(224).height(224).url() : undefined} alt={member.name} />
                        <AvatarFallback className="bg-brand-teal-50 text-brand-teal font-bold text-2xl">{initials}</AvatarFallback>
                      </Avatar>
                    </div>
                    <h3 className="font-display font-bold text-brand-charcoal text-lg">{member.name}</h3>
                    <p className="text-brand-teal text-sm font-medium mb-2">{member.role}</p>
                    {member.bio && <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-3">{member.bio}</p>}
                    <div className="flex items-center justify-center gap-2">
                      {member.linkedinUrl && (
                        <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on LinkedIn`} className="w-8 h-8 bg-brand-warm-gray hover:bg-brand-teal rounded-lg flex items-center justify-center transition-colors group/icon">
                          <ExternalLink size={13} className="text-gray-500 group-hover/icon:text-white" />
                        </a>
                      )}
                      {member.twitterUrl && (
                        <a href={member.twitterUrl} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on X/Twitter`} className="w-8 h-8 bg-brand-warm-gray hover:bg-brand-teal rounded-lg flex items-center justify-center transition-colors group/icon">
                          <ExternalLink size={13} className="text-gray-500 group-hover/icon:text-white" />
                        </a>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">Team profiles coming soon.</p>
              <p className="text-gray-400 text-sm mt-2">Connect your Sanity CMS to display team members.</p>
            </div>
          )}
        </div>
      </section>

      <CTASection title="Interested in Joining Our Team?" subtitle="We're always looking for passionate health communicators, digital strategists, and creatives. Reach out to us." primaryCTA={{ label: 'Get in Touch', href: '/contact' }} />
    </>
  )
}
