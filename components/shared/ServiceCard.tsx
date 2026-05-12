import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  href: string
  color?: 'teal' | 'gold' | 'green'
}

const colorMap = {
  teal: {
    bg: 'bg-brand-teal-50',
    icon: 'bg-brand-teal text-white',
    link: 'text-brand-teal hover:text-brand-teal-dark',
    border: 'hover:border-brand-teal',
  },
  gold: {
    bg: 'bg-amber-50',
    icon: 'bg-brand-gold text-white',
    link: 'text-brand-gold-dark hover:text-brand-gold',
    border: 'hover:border-brand-gold',
  },
  green: {
    bg: 'bg-emerald-50',
    icon: 'bg-brand-green text-white',
    link: 'text-brand-green-dark hover:text-brand-green',
    border: 'hover:border-brand-green',
  },
}

export function ServiceCard({ icon, title, description, href, color = 'teal' }: ServiceCardProps) {
  const c = colorMap[color]

  return (
    <div
      className={cn(
        'group bg-white rounded-2xl p-6 border border-gray-100 transition-all duration-300',
        'hover:shadow-lg hover:-translate-y-1',
        c.border
      )}
    >
      <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mb-4', c.icon)}>
        {icon}
      </div>
      <h3 className="font-display font-bold text-lg text-brand-charcoal mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">{description}</p>
      <Link
        href={href}
        className={cn(
          'inline-flex items-center gap-1 text-sm font-semibold transition-colors',
          c.link
        )}
      >
        Learn More
        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  )
}
