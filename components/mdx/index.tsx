import Image from 'next/image'
import Link from 'next/link'
import type { MDXComponents } from 'mdx/types'

function Callout({
  children,
  type = 'info',
}: {
  children: React.ReactNode
  type?: 'info' | 'warning' | 'tip'
}) {
  const styles = {
    info: 'bg-brand-teal-50 border-brand-teal',
    warning: 'bg-amber-50 border-amber-400',
    tip: 'bg-green-50 border-brand-green',
  }
  const labels = { info: 'Note', warning: 'Important', tip: 'Tip' }
  return (
    <div className={`my-6 border-l-4 px-5 py-4 rounded-r-xl text-sm leading-relaxed ${styles[type]}`}>
      <p className="font-semibold text-xs uppercase tracking-wide mb-1 opacity-60">{labels[type]}</p>
      {children}
    </div>
  )
}

function YouTube({ id, title }: { id: string; title?: string }) {
  return (
    <figure className="my-8">
      <div className="aspect-video rounded-2xl overflow-hidden bg-gray-100">
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          title={title ?? 'YouTube video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
      {title && <figcaption className="text-center text-sm text-gray-500 mt-2">{title}</figcaption>}
    </figure>
  )
}

function ArticleImage({
  src,
  alt,
  caption,
}: {
  src: string
  alt: string
  caption?: string
}) {
  return (
    <figure className="my-8">
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-gray-100">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 896px) 100vw, 896px"
        />
      </div>
      {caption && (
        <figcaption className="text-center text-sm text-gray-500 mt-3 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

export const mdxComponents: MDXComponents = {
  // Custom components usable inside articles
  Callout,
  YouTube,
  ArticleImage,

  // Override default HTML elements for better styling + security
  a: ({ href, children, ...props }) => {
    const isInternal = href?.startsWith('/') || href?.startsWith('#')
    if (isInternal) {
      return (
        <Link href={href!} className="text-brand-teal hover:underline" {...props}>
          {children}
        </Link>
      )
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand-teal hover:underline"
        {...props}
      >
        {children}
      </a>
    )
  },

  img: ({ src, alt }) =>
    src ? <ArticleImage src={src} alt={alt ?? ''} /> : null,
}
