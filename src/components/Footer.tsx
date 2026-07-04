import { memo, useCallback, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { navigateToSection } from '../utils/navigation'

type FooterProps = {
  onCategoryChange: (category: string | null) => void
  onNewsletterSubmit: (email: string) => void
}

const Footer = memo(({ onCategoryChange, onNewsletterSubmit }: FooterProps) => {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const goToSection = useCallback(
    (sectionId: string, options?: { category?: string | null; faqId?: string | null }) => {
      if (options?.category !== undefined) {
        onCategoryChange(options.category)
      }
      navigateToSection(navigate, location, sectionId, options)
    },
    [navigate, location, onCategoryChange]
  )

  const handleNewsletter = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      const trimmed = email.trim()
      if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return
      onNewsletterSubmit(trimmed)
      setEmail('')
    },
    [email, onNewsletterSubmit]
  )

  return (
    <footer className="border-t border-white/[0.06] bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2.5" aria-label="Nexus Store home">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-zinc-900 text-sm font-bold text-white">
                N
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Nexus Store</p>
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
                  Gaming Gear
                </p>
              </div>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-zinc-500">
              Premium peripherals for players who demand precision, comfort, and style.
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">Shop</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <button
                  type="button"
                  onClick={() => goToSection('products', { category: null })}
                  className="cursor-pointer text-sm text-zinc-500 transition hover:text-white"
                >
                  All products
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => goToSection('products', { category: 'mice-keyboards' })}
                  className="cursor-pointer text-sm text-zinc-500 transition hover:text-white"
                >
                  Mice &amp; keyboards
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => goToSection('products', { category: 'audio' })}
                  className="cursor-pointer text-sm text-zinc-500 transition hover:text-white"
                >
                  Audio &amp; headsets
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => goToSection('products', { category: 'displays' })}
                  className="cursor-pointer text-sm text-zinc-500 transition hover:text-white"
                >
                  Monitors &amp; displays
                </button>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">Support</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <button
                  type="button"
                  onClick={() => goToSection('faq', { faqId: 'shipping' })}
                  className="cursor-pointer text-sm text-zinc-500 transition hover:text-white"
                >
                  Shipping &amp; returns
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => goToSection('faq', { faqId: 'warranty' })}
                  className="cursor-pointer text-sm text-zinc-500 transition hover:text-white"
                >
                  Warranty
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => goToSection('faq')}
                  className="cursor-pointer text-sm text-zinc-500 transition hover:text-white"
                >
                  FAQ
                </button>
              </li>
              <li>
                <a
                  href="mailto:support@nexusstore.com"
                  className="text-sm text-zinc-500 transition hover:text-white"
                >
                  Contact us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">Stay updated</p>
            <p className="mt-4 text-sm leading-6 text-zinc-500">
              Get drops, deals, and new gear alerts.
            </p>
            <form className="mt-4 flex gap-2" aria-label="Newsletter signup" onSubmit={handleNewsletter}>
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="min-w-0 flex-1 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 transition focus:border-purple-500/40 focus:outline-none focus:ring-1 focus:ring-purple-500/20"
              />
              <button
                type="submit"
                className="shrink-0 cursor-pointer rounded-xl bg-purple-500 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-purple-400"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} Nexus Store. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => goToSection('faq', { faqId: 'payment' })}
              className="cursor-pointer text-sm text-zinc-500 transition hover:text-white"
            >
              Privacy
            </button>
            <button
              type="button"
              onClick={() => goToSection('faq', { faqId: 'returns' })}
              className="cursor-pointer text-sm text-zinc-500 transition hover:text-white"
            >
              Terms
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
})

Footer.displayName = 'Footer'

export default Footer
