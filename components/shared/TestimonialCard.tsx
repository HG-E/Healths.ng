import Image from 'next/image'
import { Quote } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface TestimonialCardProps {
  author: string
  role: string
  organization?: string
  content: string
  imageUrl?: string
  rating?: number
}

export function TestimonialCard({
  author,
  role,
  organization,
  content,
  imageUrl,
  rating,
}: TestimonialCardProps) {
  const initials = author
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      <Quote className="text-brand-teal/30 mb-4" size={32} />
      {rating && (
        <div className="flex gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={i < rating ? 'text-brand-gold' : 'text-gray-200'} aria-hidden="true">
              ★
            </span>
          ))}
        </div>
      )}
      <p className="text-gray-700 leading-relaxed flex-1 mb-6 font-body">
        &ldquo;{content}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={imageUrl} alt={author} />
          <AvatarFallback className="bg-brand-teal-50 text-brand-teal font-semibold text-sm">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-semibold text-brand-charcoal text-sm">{author}</div>
          <div className="text-gray-500 text-xs">
            {role}{organization && `, ${organization}`}
          </div>
        </div>
      </div>
    </div>
  )
}
