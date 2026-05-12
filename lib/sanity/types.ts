export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  alt?: string
}

export interface SanitySlug {
  _type: 'slug'
  current: string
}

export interface SanityAuthor {
  _id: string
  name: string
  slug: SanitySlug
  image?: SanityImage
  bio?: string
  role?: string
  linkedinUrl?: string
}

export interface SanityCategory {
  _id: string
  title: string
  slug: SanitySlug
  description?: string
  color?: string
}

export interface SanityArticle {
  _id: string
  title: string
  slug: SanitySlug
  excerpt?: string
  coverImage?: SanityImage
  author?: SanityAuthor
  categories?: SanityCategory[]
  tags?: string[]
  body?: unknown[]
  publishedAt?: string
  featured?: boolean
  seoTitle?: string
  seoDescription?: string
}

export interface SanityTeamMember {
  _id: string
  name: string
  slug: SanitySlug
  role: string
  image?: SanityImage
  bio?: string
  linkedinUrl?: string
  twitterUrl?: string
}

export interface SanityTestimonial {
  _id: string
  author: string
  role: string
  organization?: string
  content: string
  image?: SanityImage
  rating?: number
}

export interface SanityEvent {
  _id: string
  title: string
  slug: SanitySlug
  description?: string
  coverImage?: SanityImage
  date: string
  endDate?: string
  location?: string
  isOnline?: boolean
  registrationUrl?: string
  price?: number
  capacity?: number
  status?: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
}

export interface SanitySuccessStory {
  _id: string
  clientType: string
  challenge: string
  solution: string
  result: string
  testimonial?: string
  clientName?: string
  image?: SanityImage
  featured?: boolean
}

export interface SanityService {
  _id: string
  title: string
  slug: SanitySlug
  description: string
  icon?: string
  features?: string[]
  targetAudience?: string[]
  pricing?: string
  coverImage?: SanityImage
}
