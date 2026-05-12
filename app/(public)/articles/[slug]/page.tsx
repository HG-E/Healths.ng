import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { Clock, Calendar, ArrowLeft, Share2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { ArticleCard } from '@/components/articles/ArticleCard'
import { NewsletterSection } from '@/components/sections/NewsletterSection'
import { getArticleBySlug, getAllArticleSlugs, getRelatedArticles } from '@/lib/sanity/queries'
import { readingTime } from '@/lib/utils/readingTime'
import { formatDate } from '@/lib/utils/formatDate'
import { urlFor } from '@/sanity/lib/image'

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllArticleSlugs()
    return slugs.map(({ slug }) => ({ slug: slug.current }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  try {
    const article = await getArticleBySlug(slug)
    if (!article) return {}
    const imageUrl = article.coverImage ? urlFor(article.coverImage).width(1200).height(630).url() : '/og/default-og.jpg'
    return {
      title: article.seoTitle ?? article.title,
      description: article.seoDescription ?? article.excerpt,
      openGraph: {
        title: article.seoTitle ?? article.title,
        description: article.seoDescription ?? article.excerpt,
        type: 'article',
        publishedTime: article.publishedAt,
        authors: article.author ? [article.author.name] : [],
        images: [{ url: imageUrl, width: 1200, height: 630 }],
      },
      twitter: {
        card: 'summary_large_image',
        title: article.seoTitle ?? article.title,
        description: article.seoDescription ?? article.excerpt,
        images: [imageUrl],
      },
    }
  } catch {
    return {}
  }
}

export const revalidate = 3600

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  let article: Awaited<ReturnType<typeof getArticleBySlug>> = null
  let relatedArticles: Awaited<ReturnType<typeof getRelatedArticles>> = []

  try {
    article = await getArticleBySlug(slug)
  } catch {
    notFound()
  }

  if (!article) notFound()

  const rt = article.body ? readingTime(article.body as Parameters<typeof readingTime>[0]) : 1
  const categoryIds = article.categories?.map((c) => c._id) ?? []

  try {
    if (categoryIds.length > 0) {
      relatedArticles = await getRelatedArticles(article._id, categoryIds, 3)
    }
  } catch {}

  const authorInitials = article.author?.name
    ? article.author.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'HN'

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt ?? '',
    image: article.coverImage ? urlFor(article.coverImage).width(1200).height(630).url() : '',
    datePublished: article.publishedAt ?? '',
    author: article.author ? { '@type': 'Person', name: article.author.name } : { '@type': 'Organization', name: 'Healths.ng' },
    publisher: { '@type': 'Organization', name: 'Healths.ng Media Limited', url: 'https://healths.ng' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      {/* Article header */}
      <article>
        <header className="pt-12 pb-8 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-gray-500 text-sm">
                <li><Link href="/" className="hover:text-brand-teal">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/articles" className="hover:text-brand-teal">Articles</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-brand-charcoal truncate max-w-xs">{article.title}</li>
              </ol>
            </nav>

            {article.categories && article.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {article.categories.map((cat) => (
                  <Link key={cat._id} href={`/articles?category=${cat.slug.current}`}>
                    <Badge
                      className="text-xs font-semibold text-white border-0 hover:opacity-90"
                      style={{ backgroundColor: cat.color ?? '#0B6E6E' }}
                    >
                      {cat.title}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}

            <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-brand-charcoal leading-tight mb-6">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={article.author?.image ? urlFor(article.author.image).width(64).height(64).url() : undefined}
                    alt={article.author?.name ?? 'Author'}
                  />
                  <AvatarFallback className="bg-brand-teal-50 text-brand-teal text-xs font-semibold">
                    {authorInitials}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium text-brand-charcoal">{article.author?.name ?? 'Healths.ng'}</span>
              </div>
              {article.publishedAt && (
                <span className="flex items-center gap-1">
                  <Calendar size={13} />{formatDate(article.publishedAt)}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Clock size={13} />{rt} min read
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
                  src={urlFor(article.coverImage).width(1200).height(525).url()}
                  alt={(article.coverImage as { alt?: string }).alt ?? article.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 896px) 100vw, 896px"
                />
              </div>
            </div>
          </div>
        )}

        {/* Article body */}
        <div className="py-12 bg-white">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-12">
              <div className="prose prose-lg prose-headings:font-display prose-headings:text-brand-charcoal prose-a:text-brand-teal max-w-none">
                {article.body && (
                  <PortableText
                    value={article.body as Parameters<typeof PortableText>[0]['value']}
                    components={{
                      types: {
                        image: ({ value }) => {
                          const imgUrl = urlFor(value).width(800).url()
                          return (
                            <figure className="my-8">
                              <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
                                <Image src={imgUrl} alt={value.alt ?? ''} fill className="object-cover" sizes="800px" />
                              </div>
                              {value.alt && <figcaption className="text-center text-sm text-gray-500 mt-2">{value.alt}</figcaption>}
                            </figure>
                          )
                        },
                      },
                    }}
                  />
                )}
              </div>

              {/* Sidebar */}
              <aside className="space-y-6">
                {/* Share */}
                <div className="p-5 bg-brand-warm-gray rounded-2xl">
                  <h3 className="font-display font-bold text-brand-charcoal mb-3 flex items-center gap-2">
                    <Share2 size={16} /> Share this article
                  </h3>
                  <div className="space-y-2">
                    <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(`https://healths.ng/articles/${slug}`)}`} target="_blank" rel="noopener noreferrer" className="block w-full text-center py-2 px-4 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors">
                      Share on X
                    </a>
                    <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://healths.ng/articles/${slug}`)}&title=${encodeURIComponent(article.title)}`} target="_blank" rel="noopener noreferrer" className="block w-full text-center py-2 px-4 rounded-lg bg-[#0077B5] text-white text-sm font-medium hover:bg-[#006097] transition-colors">
                      Share on LinkedIn
                    </a>
                    <a href={`https://wa.me/?text=${encodeURIComponent(`${article.title} https://healths.ng/articles/${slug}`)}`} target="_blank" rel="noopener noreferrer" className="block w-full text-center py-2 px-4 rounded-lg bg-[#25D366] text-white text-sm font-medium hover:bg-[#1da851] transition-colors">
                      Share on WhatsApp
                    </a>
                  </div>
                </div>

                {/* Tags */}
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
                  <AvatarImage
                    src={article.author.image ? urlFor(article.author.image).width(128).height(128).url() : undefined}
                    alt={article.author.name}
                  />
                  <AvatarFallback className="bg-brand-teal text-white font-bold text-lg">
                    {authorInitials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-display font-bold text-brand-charcoal text-lg">{article.author.name}</div>
                  {article.author.role && <div className="text-brand-teal text-sm mb-2">{article.author.role}</div>}
                  {article.author.bio && <p className="text-gray-600 text-sm leading-relaxed">{article.author.bio}</p>}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>

      {/* Related articles */}
      {relatedArticles.length > 0 && (
        <section className="py-16 bg-brand-warm-gray" aria-labelledby="related-heading">
          <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
            <SectionHeading id="related-heading" label="Keep Reading" title="Related Articles" align="left" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {relatedArticles.map((ra) => (
                <ArticleCard
                  key={ra._id}
                  title={ra.title}
                  excerpt={ra.excerpt}
                  slug={ra.slug.current}
                  coverImageUrl={ra.coverImage ? urlFor(ra.coverImage).width(600).height(340).url() : undefined}
                  author={{ name: ra.author?.name ?? 'Healths.ng' }}
                  publishedAt={ra.publishedAt}
                  category={ra.categories?.[0]?.title}
                  categoryColor={ra.categories?.[0]?.color}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <NewsletterSection />

      {/* Back to articles */}
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
