import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/shared/Logo'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-warm-gray flex flex-col items-center justify-center px-4 text-center">
      <Logo size="lg" className="mb-8" />
      <div className="bg-brand-teal text-white text-xs font-bold px-3 py-1 rounded-full mb-6 inline-block">404</div>
      <h1 className="font-display font-bold text-4xl md:text-5xl text-brand-charcoal mb-4">
        Page Not Found
      </h1>
      <p className="text-gray-600 text-lg max-w-md mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/">
          <Button className="bg-brand-teal hover:bg-brand-teal-dark text-white font-bold px-8">
            Go to Homepage
          </Button>
        </Link>
        <Link href="/articles">
          <Button variant="outline" className="font-semibold px-8">
            Read Health Articles
          </Button>
        </Link>
        <Link href="/contact">
          <Button variant="outline" className="font-semibold px-8">
            Contact Us
          </Button>
        </Link>
      </div>
    </div>
  )
}
