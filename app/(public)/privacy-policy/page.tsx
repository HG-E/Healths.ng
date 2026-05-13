import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/utils/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy',
  description: 'How Healths.ng Media Limited collects, uses, and protects your personal data — in compliance with the Nigeria Data Protection Regulation (NDPR).',
  path: '/privacy-policy',
})

const lastUpdated = '13 May 2025'

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-brand-warm-gray border-b border-gray-200 py-12">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-gray-500 text-sm">
              <li><Link href="/" className="hover:text-brand-teal">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-brand-charcoal">Privacy Policy</li>
            </ol>
          </nav>
          <h1 className="font-display font-bold text-3xl text-brand-charcoal">Privacy Policy</h1>
          <p className="mt-2 text-gray-500 text-sm">Last updated: {lastUpdated}</p>
        </div>
      </div>

      {/* Body */}
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl py-16">
        <div className="prose prose-gray max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-brand-charcoal prose-a:text-brand-teal prose-a:no-underline hover:prose-a:underline">

          <p className="lead text-gray-700 text-base leading-relaxed">
            Healths.ng Media Limited (&ldquo;Healths.ng&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to
            protecting your personal data. This Privacy Policy explains what information we collect,
            how we use it, who we share it with, and your rights under the{' '}
            <strong>Nigeria Data Protection Regulation (NDPR) 2019</strong> and its 2023 amendments.
          </p>

          <p className="text-gray-600 text-sm">
            If you have questions about this policy, contact our Data Protection Officer at{' '}
            <a href="mailto:privacy@healths.ng">privacy@healths.ng</a>.
          </p>

          <hr className="my-8" />

          <h2>1. Who We Are</h2>
          <p>
            Healths.ng Media Limited is a Nigerian health media and digital empowerment company
            registered under the laws of the Federal Republic of Nigeria. Our principal office is
            in Lagos, Nigeria.
          </p>
          <ul>
            <li><strong>Company name:</strong> Healths.ng Media Limited</li>
            <li><strong>Email:</strong> hello@healths.ng</li>
            <li><strong>Phone:</strong> +234 703 051 5183</li>
            <li><strong>Location:</strong> Lagos, Nigeria</li>
          </ul>

          <h2>2. What Personal Data We Collect</h2>
          <p>We collect the following categories of personal data:</p>

          <h3>a. Information you provide directly</h3>
          <ul>
            <li><strong>Contact forms:</strong> full name, email address, phone number, organisation name, and your message</li>
            <li><strong>Booking forms:</strong> name, email, phone, preferred date and time for discovery calls</li>
            <li><strong>Newsletter sign-up:</strong> email address and, optionally, your name</li>
            <li><strong>Training registration:</strong> name, email, profession, and payment information (processed by our payment partner)</li>
          </ul>

          <h3>b. Information collected automatically</h3>
          <ul>
            <li><strong>Usage data:</strong> pages visited, time on site, referral source, browser type, and device information (via Vercel Analytics)</li>
            <li><strong>Cookies:</strong> session identifiers and preference cookies. See Section 7 for details.</li>
          </ul>

          <h3>c. Information from third parties</h3>
          <p>
            We do not purchase or acquire personal data from third-party data brokers.
          </p>

          <h2>3. How We Use Your Data</h2>
          <p>We use your personal data only for the following purposes:</p>
          <ul>
            <li>To respond to your enquiries and contact form submissions</li>
            <li>To confirm and manage your discovery call or training booking</li>
            <li>To send you our newsletter (only if you subscribed — you can unsubscribe at any time)</li>
            <li>To deliver services you have engaged us for</li>
            <li>To improve our website and services through aggregated, anonymised analytics</li>
            <li>To comply with applicable Nigerian law</li>
          </ul>
          <p>
            We do <strong>not</strong> use your data for automated decision-making or profiling that
            produces legal or similarly significant effects on you.
          </p>

          <h2>4. Legal Basis for Processing</h2>
          <p>Under the NDPR, we process your data on the following lawful bases:</p>
          <ul>
            <li><strong>Consent:</strong> newsletter subscriptions, marketing communications</li>
            <li><strong>Contract performance:</strong> service delivery to clients who have engaged us</li>
            <li><strong>Legitimate interest:</strong> responding to contact enquiries, improving our services, website analytics</li>
            <li><strong>Legal obligation:</strong> retaining financial records and tax documentation as required by Nigerian law</li>
          </ul>

          <h2>5. Who We Share Your Data With</h2>
          <p>
            We do not sell your personal data. We share it only with the following trusted processors,
            under written agreements, who help us deliver our services:
          </p>
          <ul>
            <li><strong>Resend</strong> — email delivery (contact form notifications, newsletters, booking confirmations)</li>
            <li><strong>Vercel</strong> — website hosting and analytics (anonymised traffic data)</li>
            <li><strong>Sanity</strong> — content management system (article and event content only; no personal data stored)</li>
            <li><strong>Supabase</strong> — database infrastructure (for registered users only)</li>
          </ul>
          <p>
            All processors are bound by data processing agreements and are only permitted to use your
            data to perform services on our behalf.
          </p>

          <h2>6. Data Retention</h2>
          <ul>
            <li><strong>Contact/enquiry data:</strong> retained for 24 months from the date of last contact</li>
            <li><strong>Newsletter subscribers:</strong> retained until you unsubscribe</li>
            <li><strong>Client service records:</strong> retained for 7 years (as required by Nigerian tax law)</li>
            <li><strong>Analytics data:</strong> anonymised; no personal retention period applies</li>
          </ul>

          <h2>7. Cookies</h2>
          <p>We use the following types of cookies:</p>
          <ul>
            <li><strong>Strictly necessary:</strong> required for the website to function (session cookies). Cannot be disabled.</li>
            <li><strong>Analytics:</strong> Vercel Analytics collects anonymised, aggregated data. No cookies are set; data is not shared with advertising networks.</li>
          </ul>
          <p>
            We do not use advertising, retargeting, or third-party tracking cookies.
          </p>

          <h2>8. Your Rights Under the NDPR</h2>
          <p>You have the right to:</p>
          <ul>
            <li><strong>Access</strong> the personal data we hold about you</li>
            <li><strong>Rectify</strong> inaccurate or incomplete data</li>
            <li><strong>Erasure</strong> (&ldquo;right to be forgotten&rdquo;) — request deletion of your data where we have no lawful reason to retain it</li>
            <li><strong>Restriction</strong> of processing in certain circumstances</li>
            <li><strong>Data portability</strong> — receive your data in a structured, machine-readable format</li>
            <li><strong>Object</strong> to processing based on legitimate interest</li>
            <li><strong>Withdraw consent</strong> at any time for consent-based processing (e.g., newsletter unsubscribe)</li>
          </ul>
          <p>
            To exercise any of these rights, email <a href="mailto:privacy@healths.ng">privacy@healths.ng</a>.
            We will respond within 30 days. If you believe we have mishandled your data, you may
            lodge a complaint with the{' '}
            <strong>Nigeria Data Protection Commission (NDPC)</strong> at{' '}
            <a href="https://ndpc.gov.ng" target="_blank" rel="noopener noreferrer">ndpc.gov.ng</a>.
          </p>

          <h2>9. Security</h2>
          <p>
            We implement appropriate technical and organisational measures to protect your data,
            including TLS encryption in transit, access controls, and regular security reviews.
            No method of transmission over the internet is 100% secure; however, we take all
            reasonable steps to protect your data.
          </p>

          <h2>10. Children&rsquo;s Privacy</h2>
          <p>
            Our services are directed at adults and healthcare professionals. We do not knowingly
            collect personal data from individuals under the age of 18. If you believe we have
            inadvertently collected such data, please contact us immediately and we will delete it.
          </p>

          <h2>11. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically. When we do, we will update the &ldquo;Last
            updated&rdquo; date at the top of this page. Significant changes will be communicated
            to newsletter subscribers by email.
          </p>

          <h2>12. Contact Us</h2>
          <p>
            For any privacy-related questions or to exercise your data rights:
          </p>
          <ul>
            <li>Email: <a href="mailto:privacy@healths.ng">privacy@healths.ng</a></li>
            <li>General: <a href="mailto:hello@healths.ng">hello@healths.ng</a></li>
            <li>Address: Healths.ng Media Limited, Lagos, Nigeria</li>
          </ul>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
          <Link href="/terms" className="text-brand-teal font-semibold text-sm hover:underline">
            Read our Terms of Service →
          </Link>
          <Link href="/contact" className="text-brand-teal font-semibold text-sm hover:underline">
            Contact us with questions →
          </Link>
        </div>
      </div>
    </div>
  )
}
