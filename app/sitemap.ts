import type { MetadataRoute } from 'next'
import { getAllSlugs } from '@/lib/content/articles'

const BASE = 'https://healths.ng'
const now = new Date()

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllSlugs()

  const articleUrls: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${BASE}/articles/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [
    { url: BASE, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/services/healthcare-digital-transformation`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/services/health-media-content`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/services/training-capacity-building`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/services/brand-media-consulting`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/articles`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/training`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/success-stories`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    ...articleUrls,
  ]
}
