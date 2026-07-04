import { useState, useEffect, useMemo, memo, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import type { Product } from '../data/Products'
import { products } from '../data/Products'
import { matchesCategoryGroup } from '../data/categories'
import { applyHomeNavigationState, type HomeNavigationState } from '../utils/navigation'
import Hero from '../components/Hero'
import ProductCard from '../components/ProductCard'
import ProductCardSkeleton from '../components/ProductCardSkeleton'
import CategoriesSection from '../components/sections/CategoriesSection'
import FeaturesSection from '../components/sections/FeaturesSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import FAQSection from '../components/sections/FAQSection'
import SectionShell from '../components/ui/SectionShell'
import SectionHeader from '../components/ui/SectionHeader'
import { cardBase, countBadge } from '../components/ui/styles'

type HomeProps = {
  search: string
  categoryFilter: string | null
  onCategoryChange: (category: string | null) => void
  onAddToCart: (product: Product, qty?: number) => void
}

const Home = memo(({ search, categoryFilter, onCategoryChange, onAddToCart }: HomeProps) => {
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)
  const [openFaqId, setOpenFaqId] = useState<string | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const state = location.state as HomeNavigationState | null
    applyHomeNavigationState(state, onCategoryChange, setOpenFaqId)
  }, [location.state, onCategoryChange])

  const handleSelectCategory = useCallback(
    (groupId: string | null) => {
      onCategoryChange(groupId)
      requestAnimationFrame(() => {
        document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
      })
    },
    [onCategoryChange]
  )

  const filteredProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          matchesCategoryGroup(product.category, categoryFilter) &&
          (product.title.toLowerCase().includes(search.toLowerCase()) ||
            product.category.toLowerCase().includes(search.toLowerCase()))
      ),
    [search, categoryFilter]
  )

  return (
    <div>
      <Hero
        title="Premium Gaming Gear"
        subtitle="Elevate your gaming experience with cutting-edge peripherals and accessories designed for competitive performance."
        ctaText="Shop Now"
        ctaUrl="#products"
      />

      <CategoriesSection
        activeCategory={categoryFilter}
        onSelectCategory={handleSelectCategory}
      />

      <SectionShell id="products" gradient="top">
        <SectionHeader
          label="Featured collection"
          title="Hot picks for your setup"
          description="Handpicked peripherals with real imagery — find the gear that fits your playstyle."
          trailing={
            <span className={countBadge}>
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              {search ? ` · "${search}"` : ''}
            </span>
          }
        />

        {categoryFilter && (
          <button
            type="button"
            onClick={() => onCategoryChange(null)}
            className="-mt-6 mb-6 cursor-pointer text-sm text-purple-400 transition hover:text-purple-300"
          >
            Clear category filter ×
          </button>
        )}

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                index={index}
              />
            ))
          ) : (
            <div
              className={`col-span-full py-14 text-center animate-fade-in ${cardBase}`}
              role="status"
              aria-live="polite"
            >
              <p className="text-lg font-medium text-zinc-300">No products found</p>
              <p className="mt-2 text-sm text-zinc-500">Try a different search or category</p>
              <button
                type="button"
                onClick={() => onCategoryChange(null)}
                className="mt-5 cursor-pointer rounded-xl bg-purple-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-purple-400 hover:shadow-[0_8px_24px_-8px_rgba(139,92,246,0.5)]"
              >
                Show all products
              </button>
            </div>
          )}
        </div>
      </SectionShell>

      <FeaturesSection />
      <TestimonialsSection />
      <FAQSection openFaqId={openFaqId} />
    </div>
  )
})

Home.displayName = 'Home'

export default Home
