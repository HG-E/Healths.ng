'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, X, Phone } from 'lucide-react'
import { Logo } from '@/components/shared/Logo'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const serviceLinks = [
  { href: '/services/healthcare-digital-transformation', label: 'Healthcare Digital Transformation' },
  { href: '/services/health-media-content', label: 'Health Media & Content' },
  { href: '/services/training-capacity-building', label: 'Training & Capacity Building' },
  { href: '/services/brand-media-consulting', label: 'Brand & Media Consulting' },
]

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services', children: serviceLinks },
  { href: '/pricing', label: 'Pricing' },
  { href: '/articles', label: 'Articles' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setServicesOpen(false)
  }, [pathname])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-transparent'
      )}
    >
      <nav className="container mx-auto px-4 lg:px-8 max-w-7xl" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Logo />

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1" role="list">
            {navLinks.map((link) =>
              link.children ? (
                <li key={link.href} className="relative">
                  <button
                    className={cn(
                      'flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                      'text-brand-charcoal hover:text-brand-teal hover:bg-brand-teal-50'
                    )}
                    onClick={() => setServicesOpen((v) => !v)}
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={cn('transition-transform', servicesOpen && 'rotate-180')}
                    />
                  </button>
                  {servicesOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setServicesOpen(false)}
                        aria-hidden="true"
                      />
                      <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-100 z-20 py-2 animate-slide-up">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-3 text-sm text-brand-charcoal hover:text-brand-teal hover:bg-brand-teal-50 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                        <div className="border-t border-gray-100 mt-2 pt-2">
                          <Link
                            href="/services"
                            className="block px-4 py-2 text-sm font-semibold text-brand-teal hover:bg-brand-teal-50 transition-colors"
                          >
                            All Services →
                          </Link>
                        </div>
                      </div>
                    </>
                  )}
                </li>
              ) : (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                      pathname === link.href
                        ? 'text-brand-teal bg-brand-teal-50'
                        : 'text-brand-charcoal hover:text-brand-teal hover:bg-brand-teal-50'
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            <Link href="/contact#booking">
              <Button className="bg-brand-teal hover:bg-brand-teal-dark text-white font-semibold px-5">
                Book a Free Call
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-lg text-brand-charcoal hover:bg-brand-teal-50 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden fixed inset-0 top-16 md:top-20 bg-white z-40 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="container mx-auto px-4 py-6 max-w-7xl">
            <ul className="space-y-1" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  {link.children ? (
                    <div>
                      <button
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-brand-charcoal font-medium hover:bg-brand-teal-50 hover:text-brand-teal transition-colors"
                        onClick={() => setServicesOpen((v) => !v)}
                        aria-expanded={servicesOpen}
                      >
                        {link.label}
                        <ChevronDown
                          size={16}
                          className={cn('transition-transform', servicesOpen && 'rotate-180')}
                        />
                      </button>
                      {servicesOpen && (
                        <ul className="mt-1 ml-4 space-y-1" role="list">
                          {link.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className="block px-4 py-2 text-sm text-gray-600 hover:text-brand-teal hover:bg-brand-teal-50 rounded-lg transition-colors"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className={cn(
                        'block px-4 py-3 rounded-xl font-medium transition-colors',
                        pathname === link.href
                          ? 'text-brand-teal bg-brand-teal-50'
                          : 'text-brand-charcoal hover:text-brand-teal hover:bg-brand-teal-50'
                      )}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
              <Link href="/contact#booking" className="block">
                <Button className="w-full bg-brand-teal hover:bg-brand-teal-dark text-white font-semibold">
                  Book a Free Call
                </Button>
              </Link>
              <a
                href="https://wa.me/2347030515183"
                className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl border border-gray-200 text-brand-charcoal hover:border-brand-teal hover:text-brand-teal transition-colors text-sm font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone size={16} />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
