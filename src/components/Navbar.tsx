import { memo, useEffect, useRef, useState, useCallback } from 'react'
import { SearchIcon, ShoppingCartIcon } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { navigateToSection } from '../utils/navigation'

type NavbarProps = {
  search: string
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
  cartItemCount: number
  onOpenCart: () => void
  onCategoryChange: (category: string | null) => void
}

const Navbar = memo(({
  search,
  handleSearch,
  cartItemCount,
  onOpenCart,
  onCategoryChange,
}: NavbarProps) => {
  const prevCount = useRef(cartItemCount)
  const [bounceKey, setBounceKey] = useState(0)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (cartItemCount !== prevCount.current && cartItemCount > 0) {
      setBounceKey((k) => k + 1)
    }
    prevCount.current = cartItemCount
  }, [cartItemCount])

  const goToSection = useCallback(
    (sectionId: string, options?: { category?: string | null; faqId?: string | null }) => {
      if (options?.category !== undefined) {
        onCategoryChange(options.category)
      }
      navigateToSection(navigate, location, sectionId, options)
    },
    [navigate, location, onCategoryChange]
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-zinc-950/80 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:gap-6 sm:px-6 lg:px-8">
        <Link to="/" className="group flex shrink-0 items-center gap-2.5" aria-label="Nexus Store home">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-zinc-900 text-sm font-bold tracking-tight text-white transition group-hover:border-purple-500/30">
            N
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold tracking-tight text-white">Nexus Store</p>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">Gaming Gear</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          <button
            type="button"
            onClick={() => goToSection('products')}
            className="cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium text-zinc-400 transition hover:bg-white/[0.04] hover:text-white"
          >
            Products
          </button>
          <button
            type="button"
            onClick={() => goToSection('categories')}
            className="cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium text-zinc-400 transition hover:bg-white/[0.04] hover:text-white"
          >
            Categories
          </button>
          <button
            type="button"
            onClick={() => goToSection('about')}
            className="cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium text-zinc-400 transition hover:bg-white/[0.04] hover:text-white"
          >
            About
          </button>
          <button
            type="button"
            onClick={() => goToSection('faq')}
            className="cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium text-zinc-400 transition hover:bg-white/[0.04] hover:text-white"
          >
            FAQ
          </button>
        </nav>

        <div className="flex flex-1 justify-center">
          <label htmlFor="navbar-search" className="sr-only">
            Search products
          </label>
          <div className="relative w-full max-w-md">
            <SearchIcon
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
            />
            <input
              id="navbar-search"
              type="search"
              placeholder="Search gear..."
              className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] py-2 pl-10 pr-4 text-sm text-zinc-100 placeholder:text-zinc-500 transition focus:border-purple-500/40 focus:bg-white/[0.05] focus:outline-none focus:ring-1 focus:ring-purple-500/20"
              value={search}
              onChange={handleSearch}
            />
          </div>
        </div>

        <button
          type="button"
          className="relative flex shrink-0 cursor-pointer items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] p-2.5 text-zinc-300 transition hover:border-white/[0.1] hover:bg-white/[0.06] hover:text-white"
          aria-label={`View cart, ${cartItemCount} item${cartItemCount !== 1 ? 's' : ''}`}
          onClick={onOpenCart}
        >
          <ShoppingCartIcon className="h-[18px] w-[18px]" strokeWidth={1.75} />
          {cartItemCount > 0 && (
            <span
              key={bounceKey}
              className="absolute -right-1 -top-1 flex h-4 min-w-4 animate-badge-bounce items-center justify-center rounded-full bg-purple-500 px-1 text-[10px] font-bold text-zinc-950"
            >
              {cartItemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
})

Navbar.displayName = 'Navbar'

export default Navbar
