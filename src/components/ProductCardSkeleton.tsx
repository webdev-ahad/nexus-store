import { memo } from 'react'

const ProductCardSkeleton = memo(() => (
  <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]">
    <div className="relative overflow-hidden bg-zinc-900">
      <div className="skeleton-shimmer h-64 w-full" />
    </div>

    <div className="space-y-4 p-5">
      <div className="space-y-2">
        <div className="skeleton-shimmer h-5 w-3/4" />
        <div className="skeleton-shimmer h-3 w-1/3" />
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="skeleton-shimmer h-6 w-16" />
        <div className="skeleton-shimmer h-6 w-12 rounded-md" />
      </div>

      <div className="flex items-center gap-2">
        <div className="skeleton-shimmer h-1.5 w-1.5 rounded-full" />
        <div className="skeleton-shimmer h-3 w-28" />
      </div>

      <div className="skeleton-shimmer h-10 w-full rounded-xl" />
    </div>
  </div>
))

ProductCardSkeleton.displayName = 'ProductCardSkeleton'

export default ProductCardSkeleton
