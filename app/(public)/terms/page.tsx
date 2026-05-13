import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/utils/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Service',
  description: 'Terms and conditions governing the use of Healths.ng services and website.',
  path: '/terms',
})

const lastUpdated = '13 May 2025'

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-brand-warm-gray border-b border-gray-200 py-12">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-gray-500 text-sm">
              <li><Link href="/" className="hover:text-brand-teal">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-brand-charcoal">Terms of Service</li>
            </ol>
          </nav>
          <h1 className="font-display font-bold text-3xl text-brand-charcoal">Terms of Service</h1>
          <p className="mt-2 text-gray-500 text-sm">Last updated: {lastUpdated}</p>
        </div>
      </div>

      {/* Body */}
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl py-16">
        <div className="prose prose-gray max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-brand-charcoal prose-a:text-brand-teal prose-a:no-underline hover:prose-a:underline">

          <p className="lead text-gray-700 text-base leading-relaxed">
            By accessing this website or engaging Healths.ng Media Limited for any service, you
            agree to be bound by these Terms of Service. Please read them carefully.
          </p>
          <p className="text-gray-600 text-sm">
            These Terms are governed by the laws of the <strong>Federal Republic of Nigeria</strong>.
            Any disputes shall be subject to the exclusive jurisdiction of Nigerian courts.
          </p>

          <hr className="my-8" />

          <h2>1. About Us</h2>
          <p>
            Healths.ng Media Limited is a digital media and professional services company
            incorporated in Nigeria, providing health media content, digital transformation services,
            training programmes, and brand consulting to healthcare professionals and organisations.
          </p>

          <h2>2. Use of This Website</h2>
          <p>You agree to use this website only for lawful purposes and in a manner that does not:</p>
          <ul>
            <li>Infringe the rights of any third party</li>
            <li>Transmit any unsolicited or unauthorised advertising or promotional material</li>
            <li>Attempt to gain unauthorised access to any part of the website or its related systems</li>
            <li>Reproduce, duplicate, copy, or resell any content from this website without our written permission</li>
          </ul>

          <h2>3. Our Services</h2>
          <h3>3.1 Service Delivery</h3>
          <p>
            All services (digital transformation, content creation, training, and consulting) are
            delivered under a separate Service Agreement or Statement of Work, which sets out the
            specific scope, deliverables, timelines, and fees applicable to your engagement.
            These Terms apply in addition to and form part of any such agreement.
          </p>

          <h3>3.2 Discovery Calls</h3>
          <p>
            Discovery calls are offered free of charge. Booking a discovery call does not constitute
            a service agreement or commit either party to any purchase.
          </p>

          <h3>3.3 Training Programmes</h3>
          <p>
            Training programme fees are due in full before attendance. In the event of cancellation
            by the participant with more than 7 days notice, we offer a credit toward a future
            programme. Cancellations within 7 days are non-refundable but may be transferred to
            another participant from the same organisation.
          </p>

          <h2>4. Payment Terms</h2>
          <ul>
            <li>All fees are quoted and billed in Nigerian Naira (₦), exclusive of VAT (currently 7.5%)</li>
            <li>Monthly retainer invoices are issued at the start of each billing cycle and are due within 7 days</li>
            <li>Project-based work requires a 50% deposit before commencement, with the balance due on delivery</li>
            <li>Late payments attract an interest charge of 2% per month on the outstanding amount</li>
            <li>We reserve the right to suspend services for accounts more than 14 days overdue</li>
          </ul>

          <h2>5. Intellectual Property</h2>
          <h3>5.1 Our Content</h3>
          <p>
            All content on this website — including articles, graphics, design, and copy — is owned
            by or licensed to Healths.ng Media Limited. You may not reproduce or republish any part
            of it without our prior written consent.
          </p>

          <h3>5.2 Client Deliverables</h3>
          <p>
            Upon full payment, intellectual property rights in client-specific deliverables (websites,
            articles, brand materials) transfer to the client. Generic tools, templates, and
            methodologies developed by Healths.ng remain our property.
          </p>

          <h3>5.3 Portfolio Rights</h3>
          <p>
            We reserve the right to feature client work in our portfolio and case studies unless
            the client has explicitly requested confidentiality in writing.
          </p>

          <h2>6. Health Content Disclaimer</h2>
          <p>
            Health articles and content published on this website are for informational and
            educational purposes only. They do not constitute medical advice, diagnosis, or
            treatment. Always consult a qualified Nigerian healthcare professional for personal
            medical decisions.
          </p>
          <p>
            While we take all reasonable steps to ensure accuracy, we make no warranties about the
            completeness or currency of health information on this site.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by Nigerian law, Healths.ng Media Limited shall not be
            liable for any indirect, incidental, or consequential loss arising from:
          </p>
          <ul>
            <li>Your use of or reliance on content published on this website</li>
            <li>Any interruption, suspension, or termination of our services</li>
            <li>Any actions taken or not taken based on health information we publish</li>
          </ul>
          <p>
            Our total liability to any client for any cause of action shall not exceed the total
            fees paid to us in the 3 months preceding the claim.
          </p>

          <h2>8. Confidentiality</h2>
          <p>
            Both parties agree to keep confidential any proprietary or sensitive information
            shared during the course of an engagement. This obligation survives termination of
            the service agreement for a period of 2 years.
          </p>

          <h2>9. Termination</h2>
          <p>
            Either party may terminate a monthly retainer agreement with 30 days written notice.
            We reserve the right to terminate immediately if a client engages in abusive conduct
            toward our team, or for non-payment after 14 days overdue notice has been issued.
          </p>
          <p>
            Upon termination, all deliverables produced up to the termination date and paid for
            will be handed over to the client within 14 days.
          </p>

          <h2>10. Amendments</h2>
          <p>
            We may update these Terms from time to time. The current version is always available
            at <Link href="/terms">healths.ng/terms</Link>. Continued use of our services after
            an update constitutes acceptance of the revised Terms.
          </p>

          <h2>11. Contact</h2>
          <p>
            For any questions about these Terms:
          </p>
          <ul>
            <li>Email: <a href="mailto:hello@healths.ng">hello@healths.ng</a></li>
            <li>Phone: +234 703 051 5183</li>
            <li>Address: Healths.ng Media Limited, Lagos, Nigeria</li>
          </ul>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
          <Link href="/privacy-policy" className="text-brand-teal font-semibold text-sm hover:underline">
            Read our Privacy Policy →
          </Link>
          <Link href="/contact" className="text-brand-teal font-semibold text-sm hover:underline">
            Contact us with questions →
          </Link>
        </div>
      </div>
    </div>
  )
}
