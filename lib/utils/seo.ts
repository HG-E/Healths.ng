import type { Metadata } from 'next'

interface SeoConfig {
  title: string
  description: string
  path?: string
  ogImage?: string
  noIndex?: boolean
}

export function buildMetadata({
  title,
  description,
  path = '',
  ogImage = '/og/default-og.jpg',
  noIndex = false,
}: SeoConfig): Metadata {
  const url = `https://healths.ng${path}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: { title, description, images: [ogImage] },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  }
}
