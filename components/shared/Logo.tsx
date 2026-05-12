import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LogoProps {
  /** 'icon' = icon-only mark (default). 'full' = full lockup with text (footer). */
  variant?: 'icon' | 'full'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const iconPx = { sm: 28, md: 36, lg: 48 }
const fullWidthPx = { sm: 120, md: 160, lg: 210 }

export function Logo({ variant = 'icon', size = 'md', className }: LogoProps) {
  if (variant === 'full') {
    return (
      <Link href="/" aria-label="Healths.ng — Home" className={cn('inline-flex', className)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-full.png"
          alt="Healths.ng Media Limited"
          width={fullWidthPx[size]}
          style={{ height: 'auto' }}
          draggable={false}
        />
      </Link>
    )
  }

  return (
    <Link href="/" aria-label="Healths.ng — Home" className={cn('inline-flex', className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-icon-trimmed.png"
        alt="Healths.ng"
        width={iconPx[size]}
        style={{ height: 'auto' }}
        draggable={false}
      />
    </Link>
  )
}
