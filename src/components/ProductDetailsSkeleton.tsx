import { memo } from 'react'

/** Skeleton placeholder that matches the ProductDetails layout to prevent layout shift */
const ProductDetailsSkeleton = memo(() => (
  <div className="min-h-screen bg-zinc-950 animate-fade-in">
    {/* Breadcrumb skeleton */}
    <div className="border-b border-white/[0.04]">
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 sm:px-6 lg:px-8">
        <div className="skeleton-shimmer h-4 w-12" />
        <div className="skeleton-shimmer h-3 w-3 rounded-full" />
        <div className="skeleton-shimmer h-4 w-20" />
        <div className="skeleton-shimmer h-3 w-3 rounded-full" />
        <div className="skeleton-shimmer h-4 w-36" />
      </div>
    </div>

    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Image skeleton */}
        <div className="skeleton-shimmer aspect-square w-full rounded-2xl" />

        {/* Details skeleton */}
        <div className="flex flex-col gap-6">
          <div className="skeleton-shimmer h-6 w-28 rounded-full" />
          <div className="skeleton-shimmer h-10 w-3/4" />
          <div className="flex items-center gap-3">
            <div className="skeleton-shimmer h-4 w-24" />
            <div className="skeleton-shimmer h-4 w-16" />
          </div>
          <div className="skeleton-shimmer h-10 w-32" />
          <div className="skeleton-shimmer h-20 w-full" />
          <div className="skeleton-shimmer h-32 w-full rounded-xl" />
          <div className="flex gap-4">
            <div className="skeleton-shimmer h-11 w-32 rounded-xl" />
            <div className="skeleton-shimmer h-11 flex-1 rounded-xl" />
          </div>
          <div className="skeleton-shimmer h-5 w-40" />
          <div className="skeleton-shimmer h-24 w-full rounded-xl" />
        </div>
      </div>
    </section>
  </div>
))

ProductDetailsSkeleton.displayName = 'ProductDetailsSkeleton'

export default ProductDetailsSkeleton
