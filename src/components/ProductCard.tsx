import { memo, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Star } from 'lucide-react'
import type { Product } from '../data/Products'
import { cardBase, cardHover, countBadge } from './ui/styles'

type ProductCardProps = {
  product: Product
  onAddToCart: (product: Product, qty?: number) => void
  index?: number
}

const ProductCard = memo(({ product, onAddToCart, index = 0 }: ProductCardProps) => {
  const { id, title, category, price, image, rating, reviews, badge } = product
  const addingRef = useRef(false)

  const handleAdd = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (addingRef.current) return
      addingRef.current = true
      setTimeout(() => { addingRef.current = false }, 400)
      onAddToCart(product)
    },
    [onAddToCart, product]
  )

  return (
    <Link
      to={`/product/${id}`}
      className={`group block overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 will-change-transform animate-fade-in-up ${cardBase} ${cardHover}`}
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <article aria-label={`${title} — $${price}`}>
        <div className="relative overflow-hidden bg-zinc-900">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="h-64 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/30 to-transparent" />
          {badge ? (
            <span className="absolute right-4 top-4 rounded-md bg-purple-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-950">
              {badge}
            </span>
          ) : null}
        </div>

        <div className="space-y-4 p-5">
          <div>
            <p className="font-semibold text-white transition group-hover:text-purple-100">{title}</p>
            <p className="mt-0.5 text-sm text-purple-300/80">{category}</p>
          </div>

          <div className="flex items-center justify-between gap-4">
            <p className="text-xl font-semibold text-white">${price}</p>
            <span className={`inline-flex items-center gap-1 ${countBadge}`}>
              <Star className="h-3 w-3 fill-purple-400 text-purple-400" aria-hidden="true" />
              {rating.toFixed(1)}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
            <span>{reviews} verified reviews</span>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            aria-label={`Add ${title} to cart`}
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-purple-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-purple-400 hover:shadow-[0_8px_24px_-8px_rgba(139,92,246,0.5)] active:scale-[0.97]"
          >
            <ShoppingCart className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            Add to cart
          </button>
        </div>
      </article>
    </Link>
  )
})

ProductCard.displayName = 'ProductCard'

export default ProductCard
