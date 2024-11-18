'use client'

import { Header } from '../components/Header'
import { ProductForm } from '../components/ProductForm'
import { CartList } from '../components/CartList'
import { useCart } from '../src/hooks/useCart'

export default function Home() {
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart()

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-3">
            <h2 className="text-4xl font-bold mb-4">Your Shopping Cart</h2>
            <p className="text-gray-600 mb-8">Add products using their ID and manage your cart easily.</p>
            <ProductForm onAddToCart={addToCart} />
          </div>
          <div className="lg:col-span-2">
            <CartList
              cart={cart}
              onUpdateQuantity={updateQuantity}
              onRemoveFromCart={removeFromCart}
            />
          </div>
        </div>
      </main>
    </div>
  )
}