'use client'

import { useEffect, useRef, useState } from 'react'

interface StatCardProps {
  value: number
  suffix?: string
  label: string
  description?: string
}

export function StatCard({ value, suffix = '', label, description }: StatCardProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const animated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true
          const duration = 2000
          const steps = 60
          const increment = value / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= value) {
              setCount(value)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref} className="text-center">
      <div className="font-display font-bold text-4xl md:text-5xl text-brand-teal mb-1">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="font-semibold text-brand-charcoal text-lg">{label}</div>
      {description && (
        <div className="text-gray-500 text-sm mt-1">{description}</div>
      )}
    </div>
  )
}
