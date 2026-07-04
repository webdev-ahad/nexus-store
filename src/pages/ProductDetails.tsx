import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  Minus,
  Plus,
  Zap,
  Package,
  ChevronRight,
  X,
} from 'lucide-react'
import { products, getProductById, type Product } from '../data/Products'
import ProductCard from '../components/ProductCard'
import ProductNotFound from '../components/ProductNotFound'
import ProductDetailsSkeleton from '../components/ProductDetailsSkeleton'

type ProductDetailsProps = {
  onAddToCart: (product: Product, qty?: number) => void
}

const ProductDetails = ({ onAddToCart }: ProductDetailsProps) => {
  const { id } = useParams<{ id: string }>()
  const [quantity, setQuantity] = useState(1)
  const [isImageZoomed, setIsImageZoomed] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Debounce guard for add-to-cart button
  const addingRef = useRef(false)

  // Parse id safely — handles NaN, negative, undefined
  const numericId = Number(id)
  const product = Number.isFinite(numericId) ? getProductById(numericId) : undefined

  const relatedProducts = useMemo(
    () =>
      product
        ? products.filter((p) => p.category === product.category && p.id !== product.id)
        : [],
    [product]
  )

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setMounted(true)
    setQuantity(1)
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 350)
    return () => clearTimeout(timer)
  }, [id])

  // Close modal on Escape
  useEffect(() => {
    if (!isModalOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isModalOpen])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isModalOpen])

  const handleAddToCart = useCallback(() => {
    if (!product || addingRef.current) return
    addingRef.current = true
    setTimeout(() => { addingRef.current = false }, 400)

    onAddToCart(product, quantity)
    setQuantity(1)
  }, [product, quantity, onAddToCart])

  if (!product) {
    return <ProductNotFound />
  }

  if (isLoading) {
    return <ProductDetailsSkeleton />
  }

  const stockCount = 12 + ((product.id * 7) % 20)

  return (
    <div
      className={`min-h-screen bg-zinc-950 transition-opacity duration-500 ${
        mounted ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Breadcrumb */}
      <div className="border-b border-white/[0.04]">
        <nav
          aria-label="Breadcrumb"
          className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-sm sm:px-6 lg:px-8"
        >
          <Link
            to="/"
            className="flex items-center gap-1.5 text-zinc-500 transition hover:text-purple-400"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Home
          </Link>
          <ChevronRight className="h-3 w-3 text-zinc-700" aria-hidden="true" />
          <span className="text-zinc-500">{product.category}</span>
          <ChevronRight className="h-3 w-3 text-zinc-700" aria-hidden="true" />
          <span className="truncate text-zinc-300">{product.title}</span>
        </nav>
      </div>

      {/* Main Product Section */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Left — Image */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: '100ms' }}
          >
            <div
              className="group relative cursor-zoom-in overflow-hidden rounded-2xl border border-white/[0.06] bg-zinc-900"
              onMouseEnter={() => setIsImageZoomed(true)}
              onMouseLeave={() => setIsImageZoomed(false)}
              onClick={() => setIsModalOpen(true)}
              onKeyDown={(e) => { if (e.key === 'Enter') setIsModalOpen(true) }}
              role="button"
              tabIndex={0}
              aria-label={`View ${product.title} fullscreen`}
            >
              {product.badge && (
                <span className="absolute left-4 top-4 z-10 rounded-lg bg-purple-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-950">
                  {product.badge}
                </span>
              )}
              <img
                src={product.image}
                alt={product.title}
                loading="lazy"
                className={`aspect-square w-full object-cover transition-transform duration-700 ease-out ${
                  isImageZoomed ? 'scale-110' : 'scale-100'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent" />
            </div>
          </div>

          {/* Right — Details */}
          <div
            className="flex flex-col gap-5 sm:gap-6 animate-fade-in-up"
            style={{ animationDelay: '250ms' }}
          >
            {/* Category Badge */}
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/20 bg-purple-500/[0.08] px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-purple-300">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400" aria-hidden="true" />
                {product.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1" aria-label={`Rated ${product.rating.toFixed(1)} out of 5`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    aria-hidden="true"
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-purple-400 text-purple-400'
                        : 'fill-zinc-700 text-zinc-700'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-purple-300">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-sm text-zinc-500">
                ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold tracking-tight text-white">
                ${product.price}
              </span>
              <span className="text-sm text-zinc-500">
                {product.price >= 75
                  ? 'Free shipping included'
                  : 'Free shipping over $75'}
              </span>
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-base leading-7 text-zinc-400">
                {product.description}
              </p>
            )}

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                <h3 className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
                  Key Features
                </h3>
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {product.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-zinc-300"
                    >
                      <Zap className="mt-0.5 h-3.5 w-3.5 shrink-0 text-purple-400" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity + Add to Cart */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-0.5 rounded-xl border border-white/[0.06] bg-white/[0.03]">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className={`flex h-11 w-11 items-center justify-center rounded-l-xl transition cursor-pointer
                    ${quantity <= 1
                      ? 'text-zinc-600 cursor-not-allowed'
                      : 'text-zinc-400 hover:bg-white/[0.06] hover:text-white'
                    }`}
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span
                  className="flex h-11 w-12 items-center justify-center text-sm font-semibold text-white"
                  aria-live="polite"
                  aria-label={`Quantity: ${quantity}`}
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  disabled={quantity >= 10}
                  className={`flex h-11 w-11 items-center justify-center rounded-r-xl transition cursor-pointer
                    ${quantity >= 10
                      ? 'text-zinc-600 cursor-not-allowed'
                      : 'text-zinc-400 hover:bg-white/[0.06] hover:text-white'
                    }`}
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 cursor-pointer rounded-xl bg-purple-500 px-8 py-3 text-sm font-bold text-zinc-950 transition hover:bg-purple-400 hover:shadow-lg hover:shadow-purple-500/20 active:scale-[0.98]"
              >
                Add to Cart — ${(product.price * quantity).toFixed(2)}
              </button>
            </div>

            {/* Stock Indicator */}
            <div className="flex items-center gap-2 text-sm">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
              <span className="text-emerald-400">In stock</span>
              <span className="text-zinc-600">— {stockCount} units available</span>
            </div>

            {/* Delivery Info */}
            <div className="grid gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 sm:grid-cols-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10">
                  <Truck className="h-4 w-4 text-purple-400" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-medium text-white">Free Shipping</p>
                  <p className="text-[11px] text-zinc-500">Orders over $75</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10">
                  <ShieldCheck className="h-4 w-4 text-purple-400" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-medium text-white">2-Year Warranty</p>
                  <p className="text-[11px] text-zinc-500">Full coverage</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10">
                  <RotateCcw className="h-4 w-4 text-purple-400" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-medium text-white">30-Day Returns</p>
                  <p className="text-[11px] text-zinc-500">No questions asked</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      {product.specs && Object.keys(product.specs).length > 0 && (
        <section
          className="border-t border-white/[0.04] animate-fade-in-up"
          style={{ animationDelay: '400ms' }}
        >
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10">
                <Package className="h-4 w-4 text-purple-400" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight text-white">
                Specifications
              </h2>
            </div>
            <div className="overflow-hidden rounded-xl border border-white/[0.06]">
              {Object.entries(product.specs).map(([key, value], i) => (
                <div
                  key={key}
                  className={`flex items-center justify-between px-5 py-3.5 text-sm ${
                    i % 2 === 0 ? 'bg-white/[0.02]' : 'bg-transparent'
                  } ${
                    i < Object.entries(product.specs!).length - 1
                      ? 'border-b border-white/[0.04]'
                      : ''
                  }`}
                >
                  <span className="font-medium text-zinc-400">{key}</span>
                  <span className="text-right text-white">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section
          className="border-t border-white/[0.04] animate-fade-in-up"
          style={{ animationDelay: '550ms' }}
        >
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-2xl font-semibold tracking-tight text-white">
              Related Products
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((rp, index) => (
                <ProductCard key={rp.id} product={rp} onAddToCart={onAddToCart} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Fullscreen Image Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md animate-fade-in p-4"
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`${product.title} fullscreen preview`}
        >
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute right-4 top-4 z-10 rounded-full bg-zinc-800/80 p-2 text-zinc-400 transition hover:bg-zinc-700 hover:text-white cursor-pointer"
            aria-label="Close fullscreen preview"
            autoFocus
          >
            <X className="h-6 w-6" />
          </button>
          <img
            src={product.image}
            alt={product.title}
            className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl animate-modal-in"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}

export default ProductDetails
