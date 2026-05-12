'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SectionHeading } from '@/components/shared/SectionHeading'

const schema = z.object({ email: z.string().email('Please enter a valid email address') })
type FormData = z.infer<typeof schema>

export function NewsletterSection() {
  const [success, setSuccess] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setSuccess(true)
        reset()
      }
    } catch {
      // Handled by form error state
    }
  }

  return (
    <section className="py-20 bg-brand-charcoal" aria-labelledby="newsletter-heading">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center">
        <SectionHeading
          id="newsletter-heading"
          label="Newsletter"
          title="Nigeria's Health Insights, Delivered Weekly"
          subtitle="Join 10,000+ Nigerian healthcare professionals and health-conscious Nigerians getting expert health updates, digital growth tips, and industry news — free, every week."
          inverted
        />

        {success ? (
          <div className="mt-10 flex flex-col items-center gap-3 text-white">
            <CheckCircle2 size={40} className="text-brand-green" />
            <p className="font-semibold text-lg">You&apos;re subscribed!</p>
            <p className="text-white/70">Welcome to the Healths.ng community. Your first newsletter is on its way.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-10" noValidate>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white focus:ring-white/30 h-12"
                  aria-label="Email address for newsletter"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-red-300 text-xs mt-1 text-left">{errors.email.message}</p>
                )}
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-brand-gold hover:bg-brand-gold-dark text-white font-bold h-12 px-8 whitespace-nowrap"
              >
                {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : 'Subscribe Free'}
              </Button>
            </div>
            <p className="mt-4 text-white/50 text-xs">
              No spam, ever. Unsubscribe anytime. We respect your privacy.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
