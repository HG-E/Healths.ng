import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { ArticleCard } from '@/components/articles/ArticleCard'
import { getFeaturedArticles } from '@/lib/sanity/queries'
import { readingTime } from '@/lib/utils/readingTime'
import { urlFor } from '@/sanity/lib/image'

export async function ArticlesSection() {
  let articles: Awaited<ReturnType<typeof getFeaturedArticles>> = []

  try {
    articles = await getFeaturedArticles(3)
  } catch {
    // Articles section renders empty gracefully until Sanity is configured
  }

  return (
    <section className="py-20 bg-brand-warm-gray" aria-labelledby="articles-heading">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeading
            id="articles-heading"
            label="Health Articles"
            title="Stay Informed. Stay Healthy."
            subtitle="Evidence-based health content written by professionals, for everyone."
            align="left"
          />
          <Link
            href="/articles"
            className="shrink-0 inline-flex items-center gap-2 text-brand-teal font-semibold hover:text-brand-teal-dark transition-colors"
          >
            View all articles <ArrowRight size={16} />
          </Link>
        </div>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard
                key={article._id}
                title={article.title}
                excerpt={article.excerpt}
                slug={article.slug.current}
                coverImageUrl={
                  article.coverImage
                    ? urlFor(article.coverImage).width(600).height(340).url()
                    : undefined
                }
                author={{
                  name: article.author?.name ?? 'Healths.ng',
                  avatarUrl: article.author?.image
                    ? urlFor(article.author.image).width(56).height(56).url()
                    : undefined,
                }}
                publishedAt={article.publishedAt}
                readingTime={article.body ? readingTime(article.body as Parameters<typeof readingTime>[0]) : undefined}
                category={article.categories?.[0]?.title}
                categoryColor={article.categories?.[0]?.color}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
                <div className="aspect-[16/9] bg-gray-100" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-100 rounded w-3/4" />
                  <div className="h-4 bg-gray-100 rounded w-full" />
                  <div className="h-4 bg-gray-100 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
