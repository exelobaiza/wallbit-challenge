'use client'

import { useState, useEffect } from 'react'
import { Cart, Product } from '../../app/lib/types'
import { toast } from './use-toast'

export function useCart() {
  const [cart, setCart] = useState<Cart>({ items: [], createdAt: new Date().toISOString() })

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product: Product, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find(item => item.id === product.id)
      if (existingItem) {
        return {
          ...prevCart,
          items: prevCart.items.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        }
      } else {
        return {
          ...prevCart,
          items: [...prevCart.items, { ...product, quantity }]
        }
      }
    })
    toast({
      title: 'Éxito',
      description: 'Producto agregado al carrito',
    })
  }

  const removeFromCart = (id: number) => {
    setCart((prevCart) => ({
      ...prevCart,
      items: prevCart.items.filter(item => item.id !== id)
    }))
    toast({
      title: 'Éxito',
      description: 'Producto eliminado del carrito',
    })
  }

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id)
    } else {
      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      }))
    }
  }

  const clearCart = () => {
    setCart({ items: [], createdAt: new Date().toISOString() })
    toast({
      title: 'Éxito',
      description: 'Todos los productos han sido eliminados del carrito',
    })
  }

  return { cart, addToCart, removeFromCart, updateQuantity, clearCart }
}