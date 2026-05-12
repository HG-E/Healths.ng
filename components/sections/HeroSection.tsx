import Link from 'next/link'
import { ArrowRight, BookOpen, TrendingUp, Users, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-teal via-brand-teal/90 to-brand-green/80" />
      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-white/5 blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-brand-gold/10 blur-3xl" aria-hidden="true" />
      <div className="absolute top-1/2 right-1/4 w-48 h-48 rounded-full bg-white/5 blur-2xl" aria-hidden="true" />

      <div className="relative container mx-auto px-4 lg:px-8 max-w-7xl py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div className="text-white animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
              <span className="text-sm font-medium text-white/90">Nigeria&apos;s Health Media Platform</span>
            </div>

            <h1 className="font-display font-bold text-4xl md:text-5xl xl:text-6xl leading-tight mb-6">
              Nigeria&apos;s Health Knowledge{' '}
              <span className="text-brand-gold">&</span> Digital Growth Platform
            </h1>

            <p className="text-white/85 text-lg md:text-xl leading-relaxed mb-3 max-w-lg">
              We publish expert health content that millions of Nigerians rely on for accurate
              medical guidance.
            </p>
            <p className="text-white/75 text-base md:text-lg leading-relaxed mb-3 max-w-lg">
              We help Nigerian healthcare professionals build their digital presence, attract
              more patients, and grow their practice.
            </p>
            <p className="text-white/65 text-sm md:text-base leading-relaxed mb-8 max-w-lg italic">
              Because when health professionals thrive, every Nigerian gets better access to
              the care they deserve.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/services">
                <Button
                  size="lg"
                  className="bg-white text-brand-teal hover:bg-brand-teal-50 font-bold px-8 w-full sm:w-auto"
                >
                  Grow Your Practice
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
              <Link href="/articles">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/60 text-white hover:bg-white/10 font-semibold px-8 w-full sm:w-auto bg-transparent"
                >
                  <BookOpen size={16} className="mr-2" />
                  Read Health Articles
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: Stats widget */}
          <div className="grid grid-cols-2 gap-4 animate-slide-up">
            {[
              { icon: Users, value: '10,000+', label: 'Professionals Reached', color: 'bg-white/15' },
              { icon: BookOpen, value: '500+', label: 'Health Articles Published', color: 'bg-brand-gold/20' },
              { icon: Shield, value: '50+', label: 'Organizations Served', color: 'bg-brand-green/20' },
              { icon: TrendingUp, value: '2019', label: 'Serving Nigeria Since', color: 'bg-white/10' },
            ].map(({ icon: Icon, value, label, color }) => (
              <div
                key={label}
                className={`${color} backdrop-blur-sm rounded-2xl p-5 border border-white/20 text-white`}
              >
                <Icon size={24} className="mb-3 text-brand-gold" />
                <div className="font-display font-bold text-2xl md:text-3xl">{value}</div>
                <div className="text-white/70 text-sm mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 animate-bounce" aria-hidden="true">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-0.5 h-8 bg-white/30 rounded" />
        </div>
      </div>
    </section>
  )
}
