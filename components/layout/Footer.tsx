import Link from 'next/link'
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react'
import { Logo } from '@/components/shared/Logo'

const serviceLinks = [
  { href: '/services/healthcare-digital-transformation', label: 'Healthcare Digital' },
  { href: '/services/health-media-content', label: 'Health Media & Content' },
  { href: '/services/training-capacity-building', label: 'Training & Capacity Building' },
  { href: '/services/brand-media-consulting', label: 'Brand & Media Consulting' },
]

const companyLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/team', label: 'Our Team' },
  { href: '/success-stories', label: 'Success Stories' },
  { href: '/events', label: 'Events' },
  { href: '/contact', label: 'Contact' },
]

const resourceLinks = [
  { href: '/articles', label: 'Health Articles' },
  { href: '/training', label: 'Training Programs' },
  { href: '/resources', label: 'Resources' },
  { href: '/newsletter', label: 'Newsletter' },
]

const socialLinks = [
  { href: 'https://linkedin.com/company/healthsng', label: 'LinkedIn' },
  { href: 'https://twitter.com/healthsng', label: 'Twitter/X' },
  { href: 'https://instagram.com/healthsng', label: 'Instagram' },
  { href: 'https://facebook.com/healthsng', label: 'Facebook' },
]

export function Footer() {
  return (
    <footer className="bg-brand-charcoal text-white" role="contentinfo">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Logo variant="full" size="lg" />
            <p className="mt-4 text-white/70 text-sm leading-relaxed max-w-sm">
              Africa&apos;s health media and digital empowerment platform. We make health knowledge
              accessible, visible, and actionable for everyone.
            </p>

            {/* Contact */}
            <div className="mt-6 space-y-2">
              <a
                href="mailto:hello@healths.ng"
                className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors"
              >
                <Mail size={14} /> hello@healths.ng
              </a>
              <a
                href="https://wa.me/2347030515183"
                className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone size={14} /> +234 703 051 5183
              </a>
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <MapPin size={14} /> Lagos, Nigeria
              </div>
            </div>

            {/* Social */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-brand-teal flex items-center justify-center transition-colors text-white/70 hover:text-white text-xs font-bold"
                >
                  {label.charAt(0)}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-widest text-white/50 mb-4">
              Services
            </h3>
            <ul className="space-y-2" role="list">
              {serviceLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-white/70 hover:text-white text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-widest text-white/50 mb-4">
              Company
            </h3>
            <ul className="space-y-2" role="list">
              {companyLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-white/70 hover:text-white text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-widest text-white/50 mb-4">
              Resources
            </h3>
            <ul className="space-y-2" role="list">
              {resourceLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-white/70 hover:text-white text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mini newsletter */}
            <div className="mt-6">
              <p className="text-white/70 text-xs mb-2">Stay updated:</p>
              <Link
                href="/newsletter"
                className="inline-block bg-brand-teal hover:bg-brand-teal-light text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                Subscribe to Newsletter →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            &copy; {new Date().getFullYear()} Healths.ng Media Limited. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-white/50 text-sm">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
