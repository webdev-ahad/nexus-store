import { memo, useCallback, useEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { MinusIcon, PlusIcon, XIcon, ShoppingBag, Trash2Icon } from 'lucide-react'
import type { CartItem } from '../data/Products'

type CartDrawerProps = {
  isOpen: boolean
  onClose: () => void
  cartItems: CartItem[]
  onIncrement: (id: number) => void
  onDecrement: (id: number) => void
  onRemove: (id: number) => void
  onCheckout: () => void
}

const CartDrawer = memo(({
  isOpen,
  onClose,
  cartItems,
  onIncrement,
  onDecrement,
  onRemove,
  onCheckout,
}: CartDrawerProps) => {
  const drawerRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const totalItemCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.count, 0),
    [cartItems]
  )

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.count, 0),
    [cartItems]
  )

  const shipping = subtotal >= 75 || subtotal === 0 ? 0 : 9.99
  const total = subtotal + shipping

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) closeButtonRef.current?.focus()
  }, [isOpen])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !drawerRef.current) return

    const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (focusable.length === 0) return

    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }, [])

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
        onKeyDown={handleKeyDown}
        className={`fixed top-0 right-0 z-50 flex h-full w-full flex-col border-l border-white/[0.06] bg-zinc-950 shadow-2xl transition-transform duration-300 ease-in-out sm:max-w-md ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-5">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-5 w-5 text-purple-400" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-white">
              Your Cart
              {totalItemCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center rounded-full bg-purple-500 px-2 py-0.5 text-xs font-bold text-zinc-950">
                  {totalItemCount}
                </span>
              )}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close cart"
            className="cursor-pointer rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto px-6 py-4">
          {cartItems.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <div className="rounded-full border border-white/[0.06] bg-white/[0.03] p-6">
                <ShoppingBag className="h-10 w-10 text-zinc-600" aria-hidden="true" />
              </div>
              <p className="font-medium text-zinc-400">Your cart is empty</p>
              <p className="text-sm text-zinc-600">Browse our collection and add some gear!</p>
              <button
                onClick={onClose}
                className="mt-2 cursor-pointer rounded-xl bg-purple-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-purple-400"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 animate-scale-in"
              >
                <Link
                  to={`/product/${item.id}`}
                  onClick={onClose}
                  className="shrink-0 overflow-hidden rounded-lg"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-16 w-16 object-cover transition hover:scale-105"
                  />
                </Link>

                <div className="min-w-0 flex-1">
                  <Link
                    to={`/product/${item.id}`}
                    onClick={onClose}
                    className="block truncate text-sm font-medium text-white transition hover:text-purple-300"
                  >
                    {item.title}
                  </Link>
                  <p className="mt-0.5 text-xs text-zinc-500">{item.category}</p>
                  <p className="mt-1 text-sm font-semibold text-purple-300">
                    ${(item.price * item.count).toFixed(2)}
                  </p>
                </div>

                <div className="flex shrink-0 flex-col items-end gap-2">
                  <button
                    onClick={() => onRemove(item.id)}
                    aria-label={`Remove ${item.title} from cart`}
                    className="cursor-pointer rounded-lg p-1 text-zinc-500 transition hover:bg-red-500/10 hover:text-red-400"
                  >
                    <Trash2Icon className="h-3.5 w-3.5" />
                  </button>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onDecrement(item.id)}
                      aria-label={`Decrease quantity of ${item.title}`}
                      className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03] text-zinc-300 transition hover:bg-white/[0.06] hover:text-white"
                    >
                      <MinusIcon className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-5 text-center text-sm font-bold text-white">{item.count}</span>
                    <button
                      onClick={() => onIncrement(item.id)}
                      aria-label={`Increase quantity of ${item.title}`}
                      className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03] text-zinc-300 transition hover:border-purple-500/30 hover:bg-purple-500/10 hover:text-white"
                    >
                      <PlusIcon className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="space-y-4 border-t border-white/[0.06] px-6 py-5">
            <div className="space-y-2" aria-live="polite" aria-atomic="true">
              <div className="flex justify-between text-sm text-zinc-400">
                <span>Subtotal ({totalItemCount} item{totalItemCount !== 1 ? 's' : ''})</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-zinc-400">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-emerald-400' : 'text-zinc-300'}>
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              {subtotal > 0 && subtotal < 75 && (
                <p className="text-xs text-zinc-500">
                  Add ${(75 - subtotal).toFixed(2)} more for free shipping
                </p>
              )}
              <div className="flex justify-between border-t border-white/[0.06] pt-2 text-base font-bold text-white">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={onCheckout}
              className="w-full cursor-pointer rounded-xl bg-purple-500 py-3 text-sm font-bold text-zinc-950 shadow-lg shadow-purple-500/20 transition hover:bg-purple-400 active:scale-[0.98]"
            >
              Checkout — ${total.toFixed(2)}
            </button>
            <button
              onClick={onClose}
              className="w-full cursor-pointer rounded-xl border border-white/[0.08] py-2.5 text-sm font-medium text-zinc-400 transition hover:border-white/[0.12] hover:text-white"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
})

CartDrawer.displayName = 'CartDrawer'

export default CartDrawer
