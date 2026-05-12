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
          src="/logo-full.svg"
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
        src="/logo-icon.svg"
        alt="Healths.ng"
        width={iconPx[size]}
        height={iconPx[size]}
        draggable={false}
      />
    </Link>
  )
}
