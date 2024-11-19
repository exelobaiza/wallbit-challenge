'use client'

import { useState } from 'react'
import { Card } from 'components/ui/card'
import { Button } from 'components/ui/button'
import { ShoppingCartIcon, PencilIcon } from 'lucide-react'
import { CartItem } from './CartItem'
import { Cart } from '../app/lib/types'

interface CartListProps {
  cart: Cart
  onUpdateQuantity: (id: number, quantity: number) => void
  onRemoveFromCart: (id: number) => void
}

export function CartList({ cart, onUpdateQuantity, onRemoveFromCart }: CartListProps) {
  const [isEditMode, setIsEditMode] = useState(false)

  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0)
  const totalCost = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const formattedDate = new Date(cart.createdAt).toLocaleString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <Card className="bg-white shadow-sm border-0">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <ShoppingCartIcon className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Cart Items</h2>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsEditMode(!isEditMode)}
            className={`rounded-full ${isEditMode ? 'bg-gray-100' : ''}`}
          >
            <PencilIcon className="h-4 w-4" />
          </Button>
        </div>

        {cart.items.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCartIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">Your cart is empty</p>
            <p className="text-sm text-gray-400">Add items using the form on the left</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {cart.items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  isEditMode={isEditMode}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemove={onRemoveFromCart}
                />
              ))}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Items</span>
                <span className="font-medium">{totalItems}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Total</span>
                <span className="font-medium text-lg">${totalCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-4">
                <span>Carrito creado el:</span>
                <span>{formattedDate}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </Card>
  )
}
