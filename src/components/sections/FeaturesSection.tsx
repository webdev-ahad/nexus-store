import { memo } from 'react'
import { Truck, ShieldCheck, Headphones, Zap } from 'lucide-react'
import SectionShell from '../ui/SectionShell'
import SectionHeader from '../ui/SectionHeader'
import { cardBase, cardHover, iconBox } from '../ui/styles'

const features = [
  {
    icon: Zap,
    title: 'Pro-grade performance',
    description: 'Every product is hand-picked for competitive play — low latency, high precision, zero compromise.',
  },
  {
    icon: Truck,
    title: 'Free shipping over $75',
    description: 'Fast, tracked delivery on qualifying orders. Most gear ships within 24 hours.',
  },
  {
    icon: ShieldCheck,
    title: '2-year warranty',
    description: 'Extended coverage on all peripherals. If it fails, we replace it — no hassle.',
  },
  {
    icon: Headphones,
    title: 'Expert support',
    description: 'Real gamers on our support team, ready to help you pick the right gear for your setup.',
  },
]

const FeaturesSection = memo(() => {
  return (
    <SectionShell id="about" gradient="center">
      <SectionHeader
        label="Why Nexus"
        title="Built for serious gamers"
        description="Premium gear, fast delivery, and support from people who actually play — not just sell."
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className={`group p-5 animate-fade-in-up ${cardBase} ${cardHover}`}
            style={{ animationDelay: `${index * 70}ms` }}
          >
            <div className={`${iconBox} transition group-hover:border-purple-500/20 group-hover:bg-purple-500/15`}>
              <feature.icon className="h-5 w-5 text-purple-400" strokeWidth={1.75} aria-hidden="true" />
            </div>
            <h3 className="mt-4 font-semibold text-white">{feature.title}</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-500">{feature.description}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  )
})

FeaturesSection.displayName = 'FeaturesSection'

export default FeaturesSection
