import type { Metadata } from 'next'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { ArticleCard } from '@/components/articles/ArticleCard'
import { NewsletterSection } from '@/components/sections/NewsletterSection'
import { getAllArticles, getArticlesCount, CATEGORY_COLORS } from '@/lib/content/articles'
import { buildMetadata } from '@/lib/utils/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Health Articles & Resources',
  description: 'Evidence-based health articles, tips, and resources for healthcare professionals and the general public in Nigeria.',
  path: '/articles',
})

export const revalidate = 60

const categories = [
  { label: 'All', value: '' },
  { label: 'Health Tips', value: 'health-tips' },
  { label: 'Professional Growth', value: 'professional-growth' },
  { label: 'Digital Skills', value: 'digital-skills' },
  { label: 'Research', value: 'research' },
  { label: 'Community Health', value: 'community-health' },
]

interface ArticlesPageProps {
  searchParams: Promise<{ category?: string; page?: string }>
}

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const params = await searchParams
  const currentPage = Math.max(1, parseInt(params.page ?? '1', 10))
  const pageSize = 9
  const offset = (currentPage - 1) * pageSize

  const allArticles = await getAllArticles()
  const filtered = params.category
    ? allArticles.filter((a) => a.category === params.category)
    : allArticles

  const totalCount = await getArticlesCount()
  const articles = filtered.slice(offset, offset + pageSize)
  const totalPages = Math.ceil(filtered.length / pageSize)

  return (
    <>
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-brand-teal to-brand-green text-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-white/60 text-sm">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white">Articles</li>
            </ol>
          </nav>
          <SectionHeading
            label="Health Articles"
            title="Evidence-Based Health Content for Nigerian Professionals"
            subtitle={`${totalCount > 0 ? `${totalCount} articles` : 'Articles'} written by healthcare professionals, for everyone. Stay informed, stay healthy.`}
            inverted
            align="left"
          />
          <div className="mt-8 max-w-xl relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search articles..."
              aria-label="Search health articles"
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white/60 focus:bg-white/20 transition-all"
            />
          </div>
        </div>
      </section>

      {/* Category filters */}
      <section className="py-4 bg-white border-b border-gray-100 sticky top-16 md:top-20 z-10">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="flex items-center gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Article categories">
            {categories.map(({ label, value }) => {
              const isActive = (params.category ?? '') === value
              return (
                <Link
                  key={value}
                  href={value ? `/articles?category=${value}` : '/articles'}
                  role="tab"
                  aria-selected={isActive}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-brand-teal text-white'
                      : 'text-gray-600 hover:text-brand-teal hover:bg-brand-teal-50 bg-brand-warm-gray'
                  }`}
                >
                  {label}
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Articles grid */}
      <section className="py-16 bg-brand-warm-gray" aria-labelledby="articles-grid-heading">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <h2 id="articles-grid-heading" className="sr-only">Health Articles</h2>

          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard
                  key={article.slug}
                  title={article.title}
                  excerpt={article.excerpt}
                  slug={article.slug}
                  coverImageUrl={article.coverImage}
                  author={{ name: article.author ?? 'Healths.ng' }}
                  publishedAt={article.publishedAt}
                  readingTime={article.readingTimeMinutes}
                  category={article.category ? categories.find(c => c.value === article.category)?.label : undefined}
                  categoryColor={article.category ? CATEGORY_COLORS[article.category] : undefined}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg mb-4">No articles yet. Check back soon!</p>
              <Link href="/" className="text-brand-teal font-semibold hover:underline">Go back home</Link>
            </div>
          )}

          {totalPages > 1 && (
            <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-2">
              {currentPage > 1 && (
                <Link href={`/articles?page=${currentPage - 1}${params.category ? `&category=${params.category}` : ''}`} className="px-4 py-2 rounded-lg border border-gray-200 text-brand-charcoal hover:border-brand-teal hover:text-brand-teal transition-colors text-sm">
                  ← Previous
                </Link>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Link
                  key={page}
                  href={`/articles?page=${page}${params.category ? `&category=${params.category}` : ''}`}
                  aria-current={page === currentPage ? 'page' : undefined}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${page === currentPage ? 'bg-brand-teal text-white' : 'border border-gray-200 text-brand-charcoal hover:border-brand-teal hover:text-brand-teal'}`}
                >
                  {page}
                </Link>
              ))}
              {currentPage < totalPages && (
                <Link href={`/articles?page=${currentPage + 1}${params.category ? `&category=${params.category}` : ''}`} className="px-4 py-2 rounded-lg border border-gray-200 text-brand-charcoal hover:border-brand-teal hover:text-brand-teal transition-colors text-sm">
                  Next →
                </Link>
              )}
            </nav>
          )}
        </div>
      </section>

      <NewsletterSection />
    </>
  )
}
