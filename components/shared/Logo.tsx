import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  inverted?: boolean
}

export function Logo({ className, size = 'md', inverted = false }: LogoProps) {
  const sizes = { sm: 'text-lg', md: 'text-xl', lg: 'text-2xl' }
  const iconSizes = { sm: 20, md: 24, lg: 30 }

  return (
    <Link
      href="/"
      className={cn('flex items-center gap-2 font-display font-bold', sizes[size], className)}
      aria-label="Healths.ng — Home"
    >
      <PulseIcon
        size={iconSizes[size]}
        className={inverted ? 'text-white' : 'text-brand-teal'}
      />
      <span className={inverted ? 'text-white' : 'text-brand-teal'}>
        Healths<span className={inverted ? 'text-brand-gold-light' : 'text-brand-gold'}>.ng</span>
      </span>
    </Link>
  )
}

function PulseIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <path
        d="M2 12h4l2-5 4 10 3-7 2 4h5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
