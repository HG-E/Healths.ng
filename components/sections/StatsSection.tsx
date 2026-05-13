import { StatCard } from '@/components/shared/StatCard'

const stats = [
  { value: 10000, suffix: '+', label: 'Professionals Trained & Served', description: 'Nigerian doctors, nurses, pharmacists & more' },
  { value: 500, suffix: '+', label: 'Health Articles Published', description: 'Expert-reviewed, Nigeria-focused content' },
  { value: 50, suffix: '+', label: 'Organizations Partnered', description: 'Clinics, hospitals & health orgs in Nigeria' },
  { value: 2019, suffix: '', label: 'Year Founded', description: 'Building for Nigerian healthcare since day one' },
]

export function StatsSection() {
  return (
    <section className="py-16 bg-white border-b border-gray-100" aria-labelledby="stats-heading">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <p id="stats-heading" className="text-center text-xs font-bold uppercase tracking-widest text-brand-teal mb-10">
          Our Impact in Numbers
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  )
}
