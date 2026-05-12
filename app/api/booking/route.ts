import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServiceClient } from '@/lib/supabase/server'
import { resend, TEAM_EMAIL, buildBookingConfirmationEmail } from '@/lib/resend/client'
import { FROM_EMAIL } from '@/lib/resend/client'

const schema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  organization: z.string().optional(),
  serviceType: z.string().min(1),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  message: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = schema.parse(body)

    // 1. Save to Supabase
    const supabase = await createServiceClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from('booking_requests') as any).insert({
      full_name: data.fullName,
      email: data.email,
      phone: data.phone,
      organization: data.organization ?? null,
      service_type: data.serviceType,
      preferred_date: data.preferredDate ?? null,
      preferred_time: data.preferredTime ?? null,
      message: data.message ?? null,
    })

    if (error) {
      console.error('Supabase booking insert error:', error)
    }

    // 2. Notify team
    await resend.emails.send({
      from: FROM_EMAIL,
      to: TEAM_EMAIL,
      subject: `New Booking Request: ${data.fullName} — ${data.serviceType}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <div style="background: #E8A020; padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="color: white; margin: 0;">New Discovery Call Request</h2>
          </div>
          <div style="background: white; padding: 24px; border: 1px solid #e5e7eb; border-top: 0; border-radius: 0 0 8px 8px;">
            <table style="width: 100%;">
              <tr><td style="color: #6b7280; padding: 6px 0; width: 140px;">Name</td><td style="font-weight: 600;">${data.fullName}</td></tr>
              <tr><td style="color: #6b7280; padding: 6px 0;">Email</td><td><a href="mailto:${data.email}">${data.email}</a></td></tr>
              <tr><td style="color: #6b7280; padding: 6px 0;">Phone</td><td>${data.phone}</td></tr>
              ${data.organization ? `<tr><td style="color: #6b7280; padding: 6px 0;">Organization</td><td>${data.organization}</td></tr>` : ''}
              <tr><td style="color: #6b7280; padding: 6px 0;">Service</td><td><strong>${data.serviceType}</strong></td></tr>
              ${data.preferredDate ? `<tr><td style="color: #6b7280; padding: 6px 0;">Preferred Date</td><td>${data.preferredDate}</td></tr>` : ''}
              ${data.preferredTime ? `<tr><td style="color: #6b7280; padding: 6px 0;">Preferred Time</td><td>${data.preferredTime}</td></tr>` : ''}
              ${data.message ? `<tr><td style="color: #6b7280; padding: 6px 0;">Notes</td><td>${data.message}</td></tr>` : ''}
            </table>
          </div>
        </div>
      `,
    })

    // 3. Confirmation to booker
    await resend.emails.send(
      buildBookingConfirmationEmail(data.email, {
        fullName: data.fullName,
        serviceType: data.serviceType,
        preferredDate: data.preferredDate,
        preferredTime: data.preferredTime,
      })
    )

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid booking data', details: error.issues }, { status: 400 })
    }
    console.error('Booking API error:', error)
    return NextResponse.json({ error: 'Failed to submit booking. Please try again.' }, { status: 500 })
  }
}
