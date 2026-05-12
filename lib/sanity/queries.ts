import { groq } from 'next-sanity'
import { sanityClient } from './client'
import type { SanityArticle, SanityTeamMember, SanityTestimonial, SanityEvent } from './types'

const articleFields = groq`
  _id,
  title,
  slug,
  excerpt,
  coverImage,
  publishedAt,
  featured,
  seoTitle,
  seoDescription,
  tags,
  "author": author->{_id, name, slug, image, role},
  "categories": categories[]->{_id, title, slug, color}
`

const articleBodyFields = groq`
  ${articleFields},
  body
`

export async function getFeaturedArticles(limit = 3): Promise<SanityArticle[]> {
  return sanityClient.fetch(
    groq`*[_type == "article" && featured == true] | order(publishedAt desc)[0...$limit]{${articleFields}}`,
    { limit: limit - 1 },
    { next: { tags: ['articles'], revalidate: 3600 } }
  )
}

export async function getLatestArticles(limit = 9, offset = 0): Promise<SanityArticle[]> {
  return sanityClient.fetch(
    groq`*[_type == "article"] | order(publishedAt desc)[$offset...$end]{${articleFields}}`,
    { offset, end: offset + limit - 1 },
    { next: { tags: ['articles'], revalidate: 3600 } }
  )
}

export async function getArticleBySlug(slug: string): Promise<SanityArticle | null> {
  return sanityClient.fetch(
    groq`*[_type == "article" && slug.current == $slug][0]{${articleBodyFields}}`,
    { slug },
    { next: { tags: [`article-${slug}`], revalidate: 3600 } }
  )
}

export async function getArticlesByCategory(categorySlug: string, limit = 9): Promise<SanityArticle[]> {
  return sanityClient.fetch(
    groq`*[_type == "article" && $categorySlug in categories[]->slug.current] | order(publishedAt desc)[0...$limit]{${articleFields}}`,
    { categorySlug, limit: limit - 1 },
    { next: { tags: ['articles'], revalidate: 3600 } }
  )
}

export async function getRelatedArticles(articleId: string, categoryIds: string[], limit = 3): Promise<SanityArticle[]> {
  return sanityClient.fetch(
    groq`*[_type == "article" && _id != $articleId && count(categories[@._ref in $categoryIds]) > 0] | order(publishedAt desc)[0...$limit]{${articleFields}}`,
    { articleId, categoryIds, limit: limit - 1 },
    { next: { tags: ['articles'], revalidate: 3600 } }
  )
}

export async function getAllArticleSlugs(): Promise<{ slug: { current: string } }[]> {
  return sanityClient.fetch(
    groq`*[_type == "article"]{slug}`,
    {},
    { cache: 'force-cache' }
  )
}

export async function getArticlesCount(): Promise<number> {
  return sanityClient.fetch(
    groq`count(*[_type == "article"])`,
    {},
    { next: { tags: ['articles'], revalidate: 3600 } }
  )
}

export async function getTeamMembers(): Promise<SanityTeamMember[]> {
  return sanityClient.fetch(
    groq`*[_type == "teamMember"] | order(order asc){_id, name, slug, role, image, bio, linkedinUrl, twitterUrl}`,
    {},
    { next: { tags: ['team'], revalidate: 3600 } }
  )
}

export async function getTestimonials(limit = 6): Promise<SanityTestimonial[]> {
  return sanityClient.fetch(
    groq`*[_type == "testimonial"] | order(_createdAt desc)[0...$limit]{_id, author, role, organization, content, image, rating}`,
    { limit: limit - 1 },
    { next: { tags: ['testimonials'], revalidate: 3600 } }
  )
}

export async function getUpcomingEvents(limit = 6): Promise<SanityEvent[]> {
  return sanityClient.fetch(
    groq`*[_type == "event" && date > now()] | order(date asc)[0...$limit]{_id, title, slug, description, coverImage, date, endDate, location, isOnline, registrationUrl, price, capacity, status}`,
    { limit: limit - 1 },
    { next: { tags: ['events'], revalidate: 3600 } }
  )
}
