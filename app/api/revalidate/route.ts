import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  const tag = request.nextUrl.searchParams.get('tag')

  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const documentType = body._type as string

    // Revalidate relevant tags based on Sanity document type
    const tagMap: Record<string, string[]> = {
      article: ['articles'],
      author: ['articles'],
      category: ['articles'],
      teamMember: ['team'],
      testimonial: ['testimonials'],
      event: ['events'],
      successStory: ['success-stories'],
      service: ['services'],
    }

    const tagsToRevalidate = tag
      ? [tag]
      : (tagMap[documentType] ?? ['articles'])

    tagsToRevalidate.forEach((t) => revalidateTag(t, {}))

    if (body.slug?.current) {
      revalidateTag(`article-${body.slug.current}`, {})
    }

    return NextResponse.json({
      revalidated: true,
      tags: tagsToRevalidate,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Revalidate error:', error)
    return NextResponse.json({ error: 'Failed to revalidate' }, { status: 500 })
  }
}
