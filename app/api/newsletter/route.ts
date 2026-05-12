import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServiceClient } from '@/lib/supabase/server'
import { resend, buildNewsletterWelcomeEmail } from '@/lib/resend/client'

const schema = z.object({
  email: z.string().email(),
  fullName: z.string().optional(),
  source: z.string().optional(),
})

async function addToBrevo(email: string, name?: string) {
  const apiKey = process.env.BREVO_API_KEY
  const listId = process.env.BREVO_LIST_ID
  if (!apiKey || !listId) return null

  const res = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: { 'api-key': apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      attributes: name ? { FIRSTNAME: name.split(' ')[0], LASTNAME: name.split(' ').slice(1).join(' ') } : {},
      listIds: [parseInt(listId, 10)],
      updateEnabled: true,
    }),
  })

  if (!res.ok) {
    console.error('Brevo API error:', await res.text())
    return null
  }

  const data = await res.json()
  return data.id?.toString()
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = schema.parse(body)

    const supabase = await createServiceClient()

    // Check if already subscribed
    const { data: existing } = await supabase
      .from('newsletter_subscribers')
      .select('id, status')
      .eq('email', data.email)
      .single()

    if ((existing as { status?: string } | null)?.status === 'active') {
      return NextResponse.json({ success: true, message: 'Already subscribed' }, { status: 200 })
    }

    // Add to Brevo
    const brevoId = await addToBrevo(data.email, data.fullName)

    // Save to Supabase
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase.from('newsletter_subscribers') as any).upsert({
      email: data.email,
      full_name: data.fullName,
      source: data.source ?? 'website',
      brevo_contact_id: brevoId,
      status: 'active',
    }, { onConflict: 'email' })

    // Send welcome email
    await resend.emails.send(buildNewsletterWelcomeEmail(data.email, data.fullName))

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }
    console.error('Newsletter API error:', error)
    return NextResponse.json({ error: 'Failed to subscribe. Please try again.' }, { status: 500 })
  }
}
