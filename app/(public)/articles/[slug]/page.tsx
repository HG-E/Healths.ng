import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Clock, Calendar, ArrowLeft, Share2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { ArticleCard } from '@/components/articles/ArticleCard'
import { NewsletterSection } from '@/components/sections/NewsletterSection'
import { mdxComponents } from '@/components/mdx'
import {
  getArticleBySlug,
  getAllSlugs,
  getRelatedArticles,
  CATEGORY_COLORS,
  CATEGORY_LABELS,
} from '@/lib/content/articles'
import { formatDate } from '@/lib/utils/formatDate'

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return {}
  const image = article.coverImage ?? '/og/default-og.jpg'
  return {
    title: article.seoTitle ?? article.title,
    description: article.seoDescription ?? article.excerpt,
    openGraph: {
      title: article.seoTitle ?? article.title,
      description: article.seoDescription ?? article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
      authors: article.author ? [article.author] : [],
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.seoTitle ?? article.title,
      description: article.seoDescription ?? article.excerpt,
      images: [image],
    },
  }
}

export const revalidate = 60

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()

  const related = await getRelatedArticles(slug, article.category, 3)
  const authorInitials = article.author
    ? article.author.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'HN'

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt ?? '',
    image: article.coverImage ? `https://healths.ng${article.coverImage}` : 'https://healths.ng/og/default-og.jpg',
    datePublished: article.publishedAt ?? '',
    author: article.author
      ? { '@type': 'Person', name: article.author, jobTitle: article.authorRole }
      : { '@type': 'Organization', name: 'Healths.ng' },
    publisher: {
      '@type': 'Organization',
      name: 'Healths.ng Media Limited',
      url: 'https://healths.ng',
    },
    keywords: article.tags?.join(', '),
  }

  const categoryLabel = article.category ? CATEGORY_LABELS[article.category] : undefined
  const categoryColor = article.category ? CATEGORY_COLORS[article.category] : undefined

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article>
        {/* Header */}
        <header className="pt-12 pb-8 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-gray-500 text-sm">
                <li><Link href="/" className="hover:text-brand-teal">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/articles" className="hover:text-brand-teal">Articles</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-brand-charcoal truncate max-w-[200px]">{article.title}</li>
              </ol>
            </nav>

            {categoryLabel && (
              <div className="mb-4">
                <Link href={`/articles?category=${article.category}`}>
                  <Badge
                    className="text-xs font-semibold text-white border-0 hover:opacity-90"
                    style={{ backgroundColor: categoryColor ?? '#0B6E6E' }}
                  >
                    {categoryLabel}
                  </Badge>
                </Link>
              </div>
            )}

            <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-brand-charcoal leading-tight mb-6">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  {article.authorAvatar && (
                    <AvatarImage src={article.authorAvatar} alt={article.author ?? 'Author'} />
                  )}
                  <AvatarFallback className="bg-brand-teal-50 text-brand-teal text-xs font-semibold">
                    {authorInitials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <span className="font-medium text-brand-charcoal">{article.author ?? 'Healths.ng'}</span>
                  {article.authorRole && (
                    <span className="text-gray-400 text-xs ml-2">{article.authorRole}</span>
                  )}
                </div>
              </div>
              {article.publishedAt && (
                <span className="flex items-center gap-1">
                  <Calendar size={13} />{formatDate(article.publishedAt)}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Clock size={13} />{article.readingTimeMinutes} min read
              </span>
            </div>
          </div>
        </header>

        {/* Cover image */}
        {article.coverImage && (
          <div className="bg-gray-100">
            <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
              <div className="relative aspect-[16/7] overflow-hidden rounded-b-2xl">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 896px) 100vw, 896px"
                />
              </div>
            </div>
          </div>
        )}

        {/* Body */}
        <div className="py-12 bg-white">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-12">
              <div className="prose prose-lg prose-headings:font-display prose-headings:text-brand-charcoal prose-a:text-brand-teal max-w-none">
                <MDXRemote source={article.content} components={mdxComponents} />
              </div>

              {/* Sidebar */}
              <aside className="space-y-6">
                <div className="p-5 bg-brand-warm-gray rounded-2xl">
                  <h3 className="font-display font-bold text-brand-charcoal mb-3 flex items-center gap-2">
                    <Share2 size={16} /> Share
                  </h3>
                  <div className="space-y-2">
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(`https://healths.ng/articles/${slug}`)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="block w-full text-center py-2 px-4 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
                    >
                      Share on X
                    </a>
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://healths.ng/articles/${slug}`)}&title=${encodeURIComponent(article.title)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="block w-full text-center py-2 px-4 rounded-lg bg-[#0077B5] text-white text-sm font-medium hover:bg-[#006097] transition-colors"
                    >
                      Share on LinkedIn
                    </a>
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(`${article.title} https://healths.ng/articles/${slug}`)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="block w-full text-center py-2 px-4 rounded-lg bg-[#25D366] text-white text-sm font-medium hover:bg-[#1da851] transition-colors"
                    >
                      Share on WhatsApp
                    </a>
                  </div>
                </div>

                {article.tags && article.tags.length > 0 && (
                  <div className="p-5 bg-brand-warm-gray rounded-2xl">
                    <h3 className="font-display font-bold text-brand-charcoal mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs text-gray-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </aside>
            </div>

            {/* Author bio */}
            {article.author && (
              <div className="mt-12 p-6 bg-brand-teal-50 rounded-2xl border border-brand-teal/10 flex flex-col sm:flex-row gap-4">
                <Avatar className="h-16 w-16 shrink-0">
                  {article.authorAvatar && (
                    <AvatarImage src={article.authorAvatar} alt={article.author} />
                  )}
                  <AvatarFallback className="bg-brand-teal text-white font-bold text-lg">
                    {authorInitials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-display font-bold text-brand-charcoal text-lg">{article.author}</div>
                  {article.authorRole && (
                    <div className="text-brand-teal text-sm mb-2">{article.authorRole}</div>
                  )}
                  {article.authorBio && (
                    <p className="text-gray-600 text-sm leading-relaxed">{article.authorBio}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="py-16 bg-brand-warm-gray" aria-labelledby="related-heading">
          <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
            <SectionHeading id="related-heading" label="Keep Reading" title="Related Articles" align="left" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {related.map((ra) => (
                <ArticleCard
                  key={ra.slug}
                  title={ra.title}
                  excerpt={ra.excerpt}
                  slug={ra.slug}
                  coverImageUrl={ra.coverImage}
                  author={{ name: ra.author ?? 'Healths.ng' }}
                  publishedAt={ra.publishedAt}
                  readingTime={ra.readingTimeMinutes}
                  category={ra.category ? CATEGORY_LABELS[ra.category] : undefined}
                  categoryColor={ra.category ? CATEGORY_COLORS[ra.category] : undefined}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <NewsletterSection />

      <div className="py-8 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <Link href="/articles" className="inline-flex items-center gap-2 text-brand-teal font-semibold hover:text-brand-teal-dark transition-colors">
            <ArrowLeft size={16} /> Back to All Articles
          </Link>
        </div>
      </div>
    </>
  )
}
