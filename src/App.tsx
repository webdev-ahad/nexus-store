import { useCallback, useRef, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { toast } from 'sonner'
import { Trash } from 'lucide-react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import NotFound from './pages/NotFound'
import CartDrawer from './components/CartDrawer'
import type { Product, CartItem } from './data/Products'

function App() {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const addGuardRef = useRef(false)

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }, [])

  const handleOpenCart = useCallback(() => {
    setIsCartOpen(true)
  }, [])

  const handleCloseCart = useCallback(() => {
    setIsCartOpen(false)
  }, [])

  const handleAddToCart = useCallback((product: Product, qty = 1) => {
    if (addGuardRef.current) return
    addGuardRef.current = true
    setTimeout(() => { addGuardRef.current = false }, 300)

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, count: item.count + qty } : item
        )
      }
      return [...prev, { ...product, count: qty }]
    })

    toast.success(
      qty > 1
        ? `${qty}× ${product.title} added to cart!`
        : `${product.title} added to cart!`,
      { position: 'top-center', duration: 2000 }
    )
  }, [])

  const handleIncrement = useCallback((id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    )
  }, [])

  const handleDecrement = useCallback((id: number) => {
    setCartItems((prev) => {
      const target = prev.find((item) => item.id === id)
      if (!target) return prev

      if (target.count <= 1) {
        toast.error(`${target.title} removed from cart`, {
          position: 'bottom-right',
          duration: 2000,
          icon: <Trash className="h-4 w-4 text-red-400" />,
        })
        return prev.filter((item) => item.id !== id)
      }

      return prev.map((item) =>
        item.id === id ? { ...item, count: item.count - 1 } : item
      )
    })
  }, [])

  const handleRemove = useCallback((id: number) => {
    setCartItems((prev) => {
      const target = prev.find((item) => item.id === id)
      if (target) {
        toast.error(`${target.title} removed from cart`, {
          position: 'bottom-right',
          duration: 2000,
          icon: <Trash className="h-4 w-4 text-red-400" />,
        })
      }
      return prev.filter((item) => item.id !== id)
    })
  }, [])

  const handleCheckout = useCallback(() => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.count, 0)
    const shipping = total >= 75 ? 0 : 9.99
    const grandTotal = total + shipping

    toast.success(`Order placed! Total: $${grandTotal.toFixed(2)}`, {
      description: 'This is a demo checkout — thanks for trying Nexus Store.',
      position: 'top-center',
      duration: 4000,
    })

    setCartItems([])
    setIsCartOpen(false)
  }, [cartItems])

  const handleNewsletterSubmit = useCallback((email: string) => {
    toast.success('You\'re on the list!', {
      description: `We'll send updates to ${email}`,
      position: 'bottom-right',
      duration: 3000,
    })
  }, [])

  const totalItemCount = cartItems.reduce((sum, item) => sum + item.count, 0)

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100 antialiased">
      <Navbar
        search={search}
        handleSearch={handleSearch}
        cartItemCount={totalItemCount}
        onOpenCart={handleOpenCart}
        onCategoryChange={setCategoryFilter}
      />

      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                search={search}
                categoryFilter={categoryFilter}
                onCategoryChange={setCategoryFilter}
                onAddToCart={handleAddToCart}
              />
            }
          />
          <Route
            path="/product/:id"
            element={<ProductDetails onAddToCart={handleAddToCart} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer onCategoryChange={setCategoryFilter} onNewsletterSubmit={handleNewsletterSubmit} />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={handleCloseCart}
        cartItems={cartItems}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onRemove={handleRemove}
        onCheckout={handleCheckout}
      />
    </div>
  )
}

export default App
