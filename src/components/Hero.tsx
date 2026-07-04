import { memo } from 'react'
import { Package, Layers, Star } from 'lucide-react'
import { products } from '../data/Products'
import { cardBase, cardHover, iconBox } from './ui/styles'

type HeroProps = {
  title: string
  subtitle: string
  ctaText?: string
  ctaUrl?: string
}

const avgRating = (products.reduce((s, p) => s + p.rating, 0) / products.length).toFixed(1)

const stats = [
  { icon: Package, label: 'Products', value: `${products.length}+` },
  { icon: Layers, label: 'Categories', value: String(new Set(products.map((p) => p.category)).size) },
  { icon: Star, label: 'Avg rating', value: avgRating },
]

const Hero = memo(({
  title,
  subtitle,
  ctaText = 'Shop Now',
  ctaUrl = '#products',
}: HeroProps) => {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.04] bg-zinc-950">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(139,92,246,0.15),transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-14 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:gap-12 lg:px-8 lg:py-20">
        <div className="w-full max-w-xl lg:flex-1 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/[0.08] px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
            <span className="text-xs font-medium uppercase tracking-[0.22em] text-purple-300">
              New arrivals
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
            {title}
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-zinc-500 sm:text-lg">
            {subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={ctaUrl}
              className="inline-flex items-center justify-center rounded-xl bg-purple-500 px-6 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-purple-400 hover:shadow-[0_12px_40px_-12px_rgba(139,92,246,0.5)] active:scale-[0.97]"
            >
              {ctaText}
            </a>
            <a
              href="#categories"
              className={`inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-zinc-300 ${cardBase} ${cardHover}`}
            >
              Browse collection
            </a>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className={`p-4 ${cardBase} ${cardHover}`}>
                <div className={`${iconBox} h-9 w-9`}>
                  <stat.icon className="h-4 w-4 text-purple-400" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <p className="mt-3 text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">{stat.label}</p>
                <p className="mt-0.5 text-xl font-semibold tracking-tight text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:flex-1 lg:max-w-xl animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-[2rem] bg-purple-500/10 blur-3xl"
            />
            <div className={`relative overflow-hidden ${cardBase} shadow-2xl shadow-black/40`}>
              <img
                src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=900&q=80"
                alt="Premium gaming setup with keyboard, mouse, and headset"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-purple-300">
                  Featured setup
                </p>
                <p className="mt-1 text-lg font-semibold text-white">Pro-grade peripherals</p>
                <p className="mt-1 text-sm text-zinc-500">Curated for competitive play</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

Hero.displayName = 'Hero'

export default Hero
