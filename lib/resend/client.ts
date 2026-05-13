import { Resend } from 'resend'

let _resend: Resend | null = null

export function getResend() {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY ?? 'placeholder')
  }
  return _resend
}

export const resend = {
  emails: {
    send: (params: Parameters<Resend['emails']['send']>[0]) =>
      getResend().emails.send(params),
  },
}

export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'hello@healths.ng'
export const TEAM_EMAIL = process.env.RESEND_TEAM_EMAIL ?? 'hello@healths.ng'

export function buildContactNotificationEmail(data: {
  fullName: string
  email: string
  phone?: string
  organization?: string
  serviceInterest?: string
  message: string
  sourcePage?: string
}) {
  return {
    from: FROM_EMAIL,
    to: TEAM_EMAIL,
    subject: `New Contact: ${data.fullName} — ${data.serviceInterest ?? 'General Inquiry'}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0B6E6E; padding: 24px; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 20px;">New Contact Form Submission</h1>
          <p style="color: #E8F5F5; margin: 8px 0 0;">Healths.ng Media Limited</p>
        </div>
        <div style="background: white; padding: 24px; border: 1px solid #e5e7eb; border-top: 0; border-radius: 0 0 8px 8px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #6b7280; width: 140px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${data.fullName}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Email</td><td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #0B6E6E;">${data.email}</a></td></tr>
            ${data.phone ? `<tr><td style="padding: 8px 0; color: #6b7280;">Phone</td><td style="padding: 8px 0;">${data.phone}</td></tr>` : ''}
            ${data.organization ? `<tr><td style="padding: 8px 0; color: #6b7280;">Organization</td><td style="padding: 8px 0;">${data.organization}</td></tr>` : ''}
            ${data.serviceInterest ? `<tr><td style="padding: 8px 0; color: #6b7280;">Service</td><td style="padding: 8px 0;">${data.serviceInterest}</td></tr>` : ''}
            ${data.sourcePage ? `<tr><td style="padding: 8px 0; color: #6b7280;">Source Page</td><td style="padding: 8px 0;">${data.sourcePage}</td></tr>` : ''}
          </table>
          <hr style="margin: 16px 0; border-color: #e5e7eb;" />
          <h3 style="margin: 0 0 8px; color: #1A1A2E;">Message</h3>
          <p style="color: #374151; line-height: 1.6; margin: 0; background: #F8F9FA; padding: 16px; border-radius: 6px;">${data.message.replace(/\n/g, '<br>')}</p>
          <p style="margin-top: 16px; color: #9ca3af; font-size: 12px;">Submitted at ${new Date().toLocaleString('en-NG', { timeZone: 'Africa/Lagos' })} (WAT)</p>
        </div>
      </div>
    `,
  }
}

export function buildContactAutoReply(to: string, name: string) {
  return {
    from: FROM_EMAIL,
    to,
    subject: 'We received your message — Healths.ng',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0B6E6E; padding: 24px; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 20px;">Thank you, ${name}!</h1>
          <p style="color: #E8F5F5; margin: 8px 0 0;">Healths.ng Media Limited</p>
        </div>
        <div style="background: white; padding: 24px; border: 1px solid #e5e7eb; border-top: 0; border-radius: 0 0 8px 8px;">
          <p style="color: #374151; line-height: 1.6;">We've received your message and we're delighted to hear from you.</p>
          <p style="color: #374151; line-height: 1.6;">Our team will review your inquiry and get back to you within <strong>24 business hours</strong>.</p>
          <p style="color: #374151; line-height: 1.6;">For urgent matters, you can reach us via WhatsApp:</p>
          <a href="https://wa.me/2347030515183" style="display: inline-block; background: #25D366; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin: 8px 0;">Message us on WhatsApp</a>
          <hr style="margin: 24px 0; border-color: #e5e7eb;" />
          <p style="color: #6b7280; font-size: 14px; margin: 0;">Warm regards,<br/><strong style="color: #0B6E6E;">The Healths.ng Team</strong><br/>Nigeria's Health Media &amp; Digital Empowerment Platform</p>
        </div>
      </div>
    `,
  }
}

export function buildNewsletterWelcomeEmail(to: string, name?: string) {
  return {
    from: FROM_EMAIL,
    to,
    subject: 'Welcome to the Healths.ng Community 🌿',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0B6E6E 0%, #2EAE7D 100%); padding: 32px 24px; border-radius: 8px 8px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Welcome${name ? `, ${name}` : ''}!</h1>
          <p style="color: #E8F5F5; margin: 8px 0 0; font-size: 16px;">You're now part of the Healths.ng community.</p>
        </div>
        <div style="background: white; padding: 32px 24px; border: 1px solid #e5e7eb; border-top: 0; border-radius: 0 0 8px 8px;">
          <p style="color: #374151; line-height: 1.6;">Here's what you'll receive:</p>
          <ul style="color: #374151; line-height: 1.8;">
            <li>📰 Weekly health tips and articles</li>
            <li>💼 Digital empowerment resources for health professionals</li>
            <li>🎓 Early access to training programs and events</li>
            <li>📣 Health awareness campaigns and insights</li>
          </ul>
          <div style="background: #F8F9FA; padding: 20px; border-radius: 8px; margin: 24px 0;">
            <h3 style="margin: 0 0 8px; color: #0B6E6E;">Start exploring</h3>
            <a href="https://healths.ng/articles" style="color: #0B6E6E; font-weight: 600;">Read our latest health articles →</a>
          </div>
          <hr style="margin: 24px 0; border-color: #e5e7eb;" />
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">You're receiving this because you subscribed at healths.ng. <a href="https://healths.ng/unsubscribe" style="color: #9ca3af;">Unsubscribe</a></p>
        </div>
      </div>
    `,
  }
}

export function buildBookingConfirmationEmail(
  to: string,
  data: { fullName: string; serviceType: string; preferredDate?: string; preferredTime?: string }
) {
  return {
    from: FROM_EMAIL,
    to,
    subject: 'Your discovery call request — Healths.ng',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0B6E6E; padding: 24px; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 20px;">Discovery Call Requested!</h1>
          <p style="color: #E8F5F5; margin: 8px 0 0;">Healths.ng Media Limited</p>
        </div>
        <div style="background: white; padding: 24px; border: 1px solid #e5e7eb; border-top: 0; border-radius: 0 0 8px 8px;">
          <p style="color: #374151; line-height: 1.6;">Hi <strong>${data.fullName}</strong>, thank you for requesting a discovery call!</p>
          <div style="background: #E8F5F5; padding: 20px; border-radius: 8px; margin: 16px 0; border-left: 4px solid #0B6E6E;">
            <p style="margin: 0; color: #0B6E6E; font-weight: 600;">Your request details:</p>
            <p style="margin: 8px 0 0; color: #374151;">Service: <strong>${data.serviceType}</strong></p>
            ${data.preferredDate ? `<p style="margin: 4px 0 0; color: #374151;">Preferred Date: <strong>${data.preferredDate}</strong></p>` : ''}
            ${data.preferredTime ? `<p style="margin: 4px 0 0; color: #374151;">Preferred Time: <strong>${data.preferredTime}</strong></p>` : ''}
          </div>
          <p style="color: #374151; line-height: 1.6;"><strong>Next steps:</strong></p>
          <ol style="color: #374151; line-height: 1.8;">
            <li>Our team will review your request</li>
            <li>We'll confirm your appointment within 24 hours</li>
            <li>You'll receive a calendar invite with the call link</li>
          </ol>
          <p style="color: #374151;">Need to make changes? Email us at <a href="mailto:hello@healths.ng" style="color: #0B6E6E;">hello@healths.ng</a></p>
          <hr style="margin: 24px 0; border-color: #e5e7eb;" />
          <p style="color: #6b7280; font-size: 14px; margin: 0;">Warm regards,<br/><strong style="color: #0B6E6E;">The Healths.ng Team</strong></p>
        </div>
      </div>
    `,
  }
}
