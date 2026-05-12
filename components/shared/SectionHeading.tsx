import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  id?: string
  label?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
  inverted?: boolean
}

export function SectionHeading({
  id,
  label,
  title,
  subtitle,
  align = 'center',
  className,
  inverted = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      {label && (
        <span
          className={cn(
            'inline-block text-sm font-semibold uppercase tracking-widest mb-3',
            inverted ? 'text-brand-gold-light' : 'text-brand-teal'
          )}
        >
          {label}
        </span>
      )}
      <h2
        id={id}
        className={cn(
          'font-display font-bold text-3xl md:text-4xl leading-tight',
          inverted ? 'text-white' : 'text-brand-charcoal'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-4 text-lg leading-relaxed',
            inverted ? 'text-white/80' : 'text-gray-600'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
