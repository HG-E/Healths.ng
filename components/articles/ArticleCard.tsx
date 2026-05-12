import Link from 'next/link'
import Image from 'next/image'
import { Clock, Calendar } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { formatShortDate } from '@/lib/utils/formatDate'

interface ArticleCardProps {
  title: string
  excerpt?: string
  slug: string
  coverImageUrl?: string
  author: { name: string; avatarUrl?: string }
  publishedAt?: string
  readingTime?: number
  category?: string
  categoryColor?: string
}

export function ArticleCard({
  title,
  excerpt,
  slug,
  coverImageUrl,
  author,
  publishedAt,
  readingTime,
  category,
  categoryColor,
}: ArticleCardProps) {
  const initials = author.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      <Link href={`/articles/${slug}`} className="block overflow-hidden aspect-[16/9] relative bg-brand-teal-50">
        {coverImageUrl ? (
          <Image
            src={coverImageUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-brand-teal/30 font-display font-bold text-4xl">H</span>
          </div>
        )}
        {category && (
          <div className="absolute top-3 left-3">
            <Badge
              className="text-xs font-semibold text-white border-0"
              style={{ backgroundColor: categoryColor ?? '#0B6E6E' }}
            >
              {category}
            </Badge>
          </div>
        )}
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <Link href={`/articles/${slug}`}>
          <h3 className="font-display font-bold text-brand-charcoal text-base leading-snug mb-2 group-hover:text-brand-teal transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>
        {excerpt && (
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
            {excerpt}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
          <div className="flex items-center gap-2">
            <Avatar className="h-7 w-7">
              <AvatarImage src={author.avatarUrl} alt={author.name} />
              <AvatarFallback className="bg-brand-teal-50 text-brand-teal text-xs font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-gray-600 font-medium">{author.name}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            {publishedAt && (
              <span className="flex items-center gap-1">
                <Calendar size={10} />
                {formatShortDate(publishedAt)}
              </span>
            )}
            {readingTime && (
              <span className="flex items-center gap-1">
                <Clock size={10} />
                {readingTime} min
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
