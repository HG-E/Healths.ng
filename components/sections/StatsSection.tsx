import { StatCard } from '@/components/shared/StatCard'

const stats = [
  { value: 10000, suffix: '+', label: 'Professionals Reached', description: 'Nigerian doctors, nurses, pharmacists & more' },
  { value: 500, suffix: '+', label: 'Health Articles', description: 'Expert-reviewed, Nigeria-focused content' },
  { value: 50, suffix: '+', label: 'Organizations Served', description: 'Clinics, hospitals & health orgs in Nigeria' },
  { value: 2019, suffix: '', label: 'Year Founded', description: 'Serving Nigeria since day one' },
]

export function StatsSection() {
  return (
    <section className="py-20 bg-white" aria-labelledby="stats-heading">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <h2 id="stats-heading" className="sr-only">Our Impact</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  )
}
