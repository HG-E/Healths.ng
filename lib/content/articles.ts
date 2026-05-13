import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const ARTICLES_DIR = path.join(process.cwd(), 'content/articles')

export const CATEGORY_COLORS: Record<string, string> = {
  'health-tips': '#0B6E6E',
  'professional-growth': '#2EAE7D',
  'digital-skills': '#E8A020',
  'research': '#1A1A2E',
  'community-health': '#059669',
}

export const CATEGORY_LABELS: Record<string, string> = {
  'health-tips': 'Health Tips',
  'professional-growth': 'Professional Growth',
  'digital-skills': 'Digital Skills',
  'research': 'Research',
  'community-health': 'Community Health',
}

export interface ArticleMeta {
  slug: string
  title: string
  excerpt?: string
  coverImage?: string
  publishedAt?: string
  author?: string
  authorRole?: string
  authorBio?: string
  authorAvatar?: string
  category?: string
  featured?: boolean
  seoTitle?: string
  seoDescription?: string
  tags?: string[]
  readingTimeMinutes: number
}

export interface Article extends ArticleMeta {
  content: string
}

function getSlugDirs(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return []
  return fs.readdirSync(ARTICLES_DIR).filter((name) => {
    const full = path.join(ARTICLES_DIR, name)
    return fs.statSync(full).isDirectory() && fs.existsSync(path.join(full, 'index.mdx'))
  })
}

function parseArticle(slug: string): Article | null {
  const filePath = path.join(ARTICLES_DIR, slug, 'index.mdx')
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const words = content.trim().split(/\s+/).length
  return {
    slug,
    title: data.title ?? slug,
    excerpt: data.excerpt,
    coverImage: data.coverImage,
    publishedAt: data.publishedAt,
    author: data.author,
    authorRole: data.authorRole,
    authorBio: data.authorBio,
    authorAvatar: data.authorAvatar,
    category: data.category,
    featured: data.featured ?? false,
    seoTitle: data.seoTitle,
    seoDescription: data.seoDescription,
    tags: Array.isArray(data.tags) ? data.tags : [],
    readingTimeMinutes: Math.max(1, Math.ceil(words / 200)),
    content,
  }
}

function sortByDate(articles: ArticleMeta[]): ArticleMeta[] {
  return [...articles].sort((a, b) =>
    (b.publishedAt ?? '') > (a.publishedAt ?? '') ? 1 : -1
  )
}

export async function getAllArticles(limit?: number, offset = 0): Promise<ArticleMeta[]> {
  const slugs = getSlugDirs()
  const articles = slugs
    .map(parseArticle)
    .filter((a): a is Article => a !== null)
    .map(({ content: _c, ...meta }) => meta)
  const sorted = sortByDate(articles)
  const paged = sorted.slice(offset)
  return limit ? paged.slice(0, limit) : paged
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return parseArticle(slug)
}

export async function getFeaturedArticles(limit = 3): Promise<ArticleMeta[]> {
  const all = await getAllArticles()
  return all.filter((a) => a.featured).slice(0, limit)
}

export async function getRelatedArticles(slug: string, category?: string, limit = 3): Promise<ArticleMeta[]> {
  const all = await getAllArticles()
  return all.filter((a) => a.slug !== slug && !!category && a.category === category).slice(0, limit)
}

export async function getAllSlugs(): Promise<string[]> {
  return getSlugDirs()
}

export async function getArticlesCount(): Promise<number> {
  return getSlugDirs().length
}
