import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServiceClient } from '@/lib/supabase/server'
import { resend, buildContactNotificationEmail, buildContactAutoReply } from '@/lib/resend/client'

const schema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  organization: z.string().optional(),
  serviceInterest: z.string().optional(),
  message: z.string().min(20),
  sourcePage: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = schema.parse(body)

    // 1. Save to Supabase
    const supabase = await createServiceClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from('contact_submissions') as any).insert({
      full_name: data.fullName,
      email: data.email,
      phone: data.phone ?? null,
      organization: data.organization ?? null,
      service_interest: data.serviceInterest ?? null,
      message: data.message,
      source_page: data.sourcePage ?? null,
    })

    if (error) {
      console.error('Supabase insert error:', error)
      // Continue even if DB save fails — don't block email
    }

    // 2. Send notification to team
    await resend.emails.send(
      buildContactNotificationEmail({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        organization: data.organization,
        serviceInterest: data.serviceInterest,
        message: data.message,
        sourcePage: data.sourcePage,
      })
    )

    // 3. Send auto-reply to submitter
    await resend.emails.send(buildContactAutoReply(data.email, data.fullName))

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid form data', details: error.issues }, { status: 400 })
    }
    console.error('Contact API error:', error)
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 })
  }
}
