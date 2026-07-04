import { memo } from 'react'
import { Star } from 'lucide-react'
import SectionShell from '../ui/SectionShell'
import SectionHeader from '../ui/SectionHeader'
import { cardBase, cardHover } from '../ui/styles'

const testimonials = [
  {
    name: 'Alex Chen',
    initials: 'AC',
    role: 'Competitive FPS player',
    quote:
      'The Titan Strike mouse completely changed my aim consistency. Nexus Store shipped it next day — packaging was premium too.',
    rating: 5,
  },
  {
    name: 'Jordan Miles',
    initials: 'JM',
    role: 'Stream creator',
    quote:
      'Bought the Stream Pro webcam and Omega headset together. Crystal clear audio and video. My viewers noticed immediately.',
    rating: 5,
  },
  {
    name: 'Sam Rivera',
    initials: 'SR',
    role: 'Setup enthusiast',
    quote:
      'Finally a store that curates real gaming gear, not generic junk. The Nova keyboard feels incredible and the site is smooth.',
    rating: 5,
  },
]

const TestimonialsSection = memo(() => {
  return (
    <SectionShell gradient="bottom">
      <SectionHeader
        label="Reviews"
        title="Trusted by gamers worldwide"
        description="Real feedback from players who upgraded their setup with Nexus Store."
      />

      <div className="grid gap-3 md:grid-cols-3">
        {testimonials.map((item, index) => (
          <blockquote
            key={item.name}
            className={`p-6 animate-fade-in-up ${cardBase} ${cardHover}`}
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/15 text-sm font-bold text-purple-300">
                {item.initials}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{item.name}</p>
                <p className="text-xs text-zinc-500">{item.role}</p>
              </div>
            </div>

            <div className="mt-4 flex gap-0.5" aria-label={`${item.rating} out of 5 stars`}>
              {Array.from({ length: item.rating }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-purple-400 text-purple-400" aria-hidden="true" />
              ))}
            </div>

            <p className="mt-4 text-sm leading-7 text-zinc-400">&ldquo;{item.quote}&rdquo;</p>
          </blockquote>
        ))}
      </div>
    </SectionShell>
  )
})

TestimonialsSection.displayName = 'TestimonialsSection'

export default TestimonialsSection
