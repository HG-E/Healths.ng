import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, DM_Sans, DM_Serif_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import Script from 'next/script'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-accent',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://healths.ng'),
  title: {
    default: 'Healths.ng Media Limited',
    template: '%s | Healths.ng',
  },
  description:
    "Africa's leading health media and digital empowerment platform. Health articles, digital services for healthcare professionals, and capacity building training.",
  keywords: [
    'health media Nigeria',
    'healthcare digital transformation',
    'health articles Nigeria',
    'medical professionals digital skills',
    'health content Nigeria',
    'healthcare marketing Africa',
    'digital health Nigeria',
    'health training Nigeria',
  ],
  authors: [{ name: 'Healths.ng Media Limited' }],
  creator: 'Healths.ng Media Limited',
  publisher: 'Healths.ng Media Limited',
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://healths.ng',
    siteName: 'Healths.ng Media Limited',
    title: 'Healths.ng Media Limited',
    description:
      "Africa's leading health media and digital empowerment platform.",
    images: [
      {
        url: '/og/default-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Healths.ng Media Limited',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@healthsng',
    creator: '@healthsng',
    title: 'Healths.ng Media Limited',
    description:
      "Africa's leading health media and digital empowerment platform.",
    images: ['/og/default-og.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://healths.ng',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${dmSans.variable} ${dmSerifDisplay.variable} h-full`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col antialiased bg-brand-off-white text-brand-charcoal font-body">
        <a href="#main-content" className="skip-nav">
          Skip to main content
        </a>
        {children}
        <Analytics />
        {gaMeasurementId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
