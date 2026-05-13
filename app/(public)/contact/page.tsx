'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, CheckCircle2, Mail, Phone, MapPin, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SectionHeading } from '@/components/shared/SectionHeading'

const contactSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  organization: z.string().optional(),
  serviceInterest: z.string().min(1, 'Please select a service'),
  message: z.string().min(20, 'Please tell us more about your needs (minimum 20 characters)'),
})

const bookingSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(7, 'Please enter your phone number'),
  organization: z.string().optional(),
  serviceType: z.string().min(1, 'Please select a service type'),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  message: z.string().optional(),
})

type ContactData = z.infer<typeof contactSchema>
type BookingData = z.infer<typeof bookingSchema>

function ContactForm() {
  const [success, setSuccess] = useState(false)
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting }, reset } = useForm<ContactData>({ resolver: zodResolver(contactSchema) })

  const onSubmit = async (data: ContactData) => {
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...data, sourcePage: '/contact' }) })
      if (res.ok) { setSuccess(true); reset() }
    } catch {}
  }

  if (success) {
    return (
      <div className="flex flex-col items-center gap-3 py-12 text-center">
        <CheckCircle2 size={40} className="text-brand-green" />
        <p className="font-display font-bold text-xl text-brand-charcoal">Message sent!</p>
        <p className="text-gray-600">We'll respond within 24 business hours.</p>
        <Button onClick={() => setSuccess(false)} variant="outline" className="mt-2">Send another message</Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cf-name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
          <Input id="cf-name" placeholder="Dr. Jane Okonkwo" {...register('fullName')} aria-invalid={!!errors.fullName} />
          {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
        </div>
        <div>
          <label htmlFor="cf-email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
          <Input id="cf-email" type="email" placeholder="jane@clinic.ng" {...register('email')} aria-invalid={!!errors.email} />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cf-phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <Input id="cf-phone" type="tel" placeholder="+234 703 051 5183" {...register('phone')} />
        </div>
        <div>
          <label htmlFor="cf-org" className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
          <Input id="cf-org" placeholder="Your clinic / organization" {...register('organization')} />
        </div>
      </div>
      <div>
        <label htmlFor="cf-service" className="block text-sm font-medium text-gray-700 mb-1">Service Interest *</label>
        <Select onValueChange={(v) => setValue('serviceInterest', v)}>
          <SelectTrigger id="cf-service" aria-invalid={!!errors.serviceInterest}>
            <SelectValue placeholder="Select a service..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="healthcare-digital">Healthcare Digital Transformation</SelectItem>
            <SelectItem value="health-media">Health Media & Content</SelectItem>
            <SelectItem value="training">Training & Capacity Building</SelectItem>
            <SelectItem value="consulting">Brand & Media Consulting</SelectItem>
            <SelectItem value="other">Other / General Inquiry</SelectItem>
          </SelectContent>
        </Select>
        {errors.serviceInterest && <p className="text-red-500 text-xs mt-1">{errors.serviceInterest.message}</p>}
      </div>
      <div>
        <label htmlFor="cf-message" className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
        <Textarea id="cf-message" placeholder="Tell us about your goals and how we can help..." rows={5} {...register('message')} aria-invalid={!!errors.message} />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full bg-brand-teal hover:bg-brand-teal-dark text-white font-bold h-12">
        {isSubmitting ? <Loader2 size={16} className="animate-spin mr-2" /> : null}
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  )
}

function BookingForm() {
  const [success, setSuccess] = useState(false)
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting }, reset } = useForm<BookingData>({ resolver: zodResolver(bookingSchema) })

  const onSubmit = async (data: BookingData) => {
    try {
      const res = await fetch('/api/booking', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      if (res.ok) { setSuccess(true); reset() }
    } catch {}
  }

  if (success) {
    return (
      <div className="flex flex-col items-center gap-3 py-12 text-center">
        <CheckCircle2 size={40} className="text-brand-green" />
        <p className="font-display font-bold text-xl text-brand-charcoal">Booking request sent!</p>
        <p className="text-gray-600">We'll confirm your appointment within 24 hours.</p>
        <Button onClick={() => setSuccess(false)} variant="outline" className="mt-2">Make another booking</Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="bf-name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
          <Input id="bf-name" placeholder="Dr. Jane Okonkwo" {...register('fullName')} aria-invalid={!!errors.fullName} />
          {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
        </div>
        <div>
          <label htmlFor="bf-email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <Input id="bf-email" type="email" placeholder="jane@clinic.ng" {...register('email')} aria-invalid={!!errors.email} />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="bf-phone" className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
          <Input id="bf-phone" type="tel" placeholder="+234 703 051 5183" {...register('phone')} aria-invalid={!!errors.phone} />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>
        <div>
          <label htmlFor="bf-org" className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
          <Input id="bf-org" placeholder="Your clinic / organization" {...register('organization')} />
        </div>
      </div>
      <div>
        <label htmlFor="bf-service" className="block text-sm font-medium text-gray-700 mb-1">Service Type *</label>
        <Select onValueChange={(v) => setValue('serviceType', v)}>
          <SelectTrigger id="bf-service" aria-invalid={!!errors.serviceType}>
            <SelectValue placeholder="What do you need help with?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="healthcare-digital">Healthcare Digital Transformation</SelectItem>
            <SelectItem value="health-media">Health Media & Content</SelectItem>
            <SelectItem value="training">Training & Capacity Building</SelectItem>
            <SelectItem value="consulting">Brand & Media Consulting</SelectItem>
            <SelectItem value="general">General Discovery Call</SelectItem>
          </SelectContent>
        </Select>
        {errors.serviceType && <p className="text-red-500 text-xs mt-1">{errors.serviceType.message}</p>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="bf-date" className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
          <Input id="bf-date" type="date" {...register('preferredDate')} min={new Date().toISOString().split('T')[0]} />
        </div>
        <div>
          <label htmlFor="bf-time" className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
          <Select onValueChange={(v) => setValue('preferredTime', v)}>
            <SelectTrigger id="bf-time"><SelectValue placeholder="Select time..." /></SelectTrigger>
            <SelectContent>
              <SelectItem value="9am-11am">9:00 AM – 11:00 AM (WAT)</SelectItem>
              <SelectItem value="11am-1pm">11:00 AM – 1:00 PM (WAT)</SelectItem>
              <SelectItem value="2pm-4pm">2:00 PM – 4:00 PM (WAT)</SelectItem>
              <SelectItem value="4pm-6pm">4:00 PM – 6:00 PM (WAT)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <label htmlFor="bf-message" className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
        <Textarea id="bf-message" placeholder="Any specific topics or questions you'd like to discuss..." rows={3} {...register('message')} />
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full bg-brand-gold hover:bg-brand-gold-dark text-white font-bold h-12">
        {isSubmitting ? <Loader2 size={16} className="animate-spin mr-2" /> : null}
        {isSubmitting ? 'Submitting...' : 'Book My Free Call'}
      </Button>
      <p className="text-center text-xs text-gray-500">We confirm within 24 hours. No commitment required.</p>
    </form>
  )
}

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-brand-teal to-brand-green text-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-white/60 text-sm">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white">Contact</li>
            </ol>
          </nav>
          <SectionHeading label="Contact Us" title="Let's Start a Conversation" subtitle="Whether you have a question, a project in mind, or just want to say hello — we'd love to hear from you." inverted align="left" />
        </div>
      </section>

      {/* Contact info + forms */}
      <section className="py-20 bg-brand-warm-gray">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact info sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h2 className="font-display font-bold text-brand-charcoal text-lg mb-4">Get in Touch</h2>
                <div className="space-y-4">
                  <a href="mailto:hello@healths.ng" className="flex items-center gap-3 text-gray-700 hover:text-brand-teal transition-colors">
                    <div className="w-9 h-9 bg-brand-teal-50 rounded-lg flex items-center justify-center shrink-0"><Mail size={16} className="text-brand-teal" /></div>
                    <div><p className="text-xs text-gray-500">Email</p><p className="font-medium text-sm">hello@healths.ng</p></div>
                  </a>
                  <a href="https://wa.me/2347030515183" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-700 hover:text-brand-teal transition-colors">
                    <div className="w-9 h-9 bg-brand-teal-50 rounded-lg flex items-center justify-center shrink-0"><MessageCircle size={16} className="text-brand-teal" /></div>
                    <div><p className="text-xs text-gray-500">WhatsApp</p><p className="font-medium text-sm">+234 703 051 5183</p></div>
                  </a>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-9 h-9 bg-brand-teal-50 rounded-lg flex items-center justify-center shrink-0"><MapPin size={16} className="text-brand-teal" /></div>
                    <div><p className="text-xs text-gray-500">Location</p><p className="font-medium text-sm">Lagos, Nigeria</p></div>
                  </div>
                </div>
              </div>
              <div className="bg-brand-teal rounded-2xl p-6 text-white">
                <h3 className="font-display font-bold mb-2">Response Time</h3>
                <p className="text-white/80 text-sm">We respond to all inquiries within <strong className="text-white">24 business hours</strong>. For urgent matters, reach us directly via WhatsApp.</p>
                <a href="https://wa.me/2347030515183" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
                  <MessageCircle size={16} /> Message on WhatsApp
                </a>
              </div>
            </div>

            {/* Forms */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-2xl p-8 border border-gray-100">
                <h2 className="font-display font-bold text-xl text-brand-charcoal mb-6">Send Us a Message</h2>
                <ContactForm />
              </div>

              <div id="booking" className="bg-white rounded-2xl p-8 border border-brand-gold/30 scroll-mt-24">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-brand-gold text-white text-xs font-bold px-3 py-1 rounded-full">FREE</span>
                  <h2 className="font-display font-bold text-xl text-brand-charcoal">Book a Discovery Call</h2>
                </div>
                <p className="text-gray-600 text-sm mb-6">30 minutes. No commitment. Just a conversation about your goals.</p>
                <BookingForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
