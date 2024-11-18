'use client'

import { useState, useEffect } from 'react'
import { Card } from 'components/ui/card'
import { Input } from 'components/ui/input'
import { Button } from 'components/ui/button'
import { Alert, AlertDescription } from 'components/ui/alert'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover"
import { ImageIcon } from 'lucide-react'
import { Product } from '../app/lib/types'
import { fetchProducts } from '../app/lib/api'

const removeArrowsClass = "appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"

interface ProductFormProps {
  onAddToCart: (product: Product, quantity: number) => void
}

export function ProductForm({ onAddToCart }: ProductFormProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [productId, setProductId] = useState('')
  const [quantity, setQuantity] = useState('1')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [matchingProducts, setMatchingProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  useEffect(() => {
    fetchProducts().then(setProducts).catch(console.error)
  }, [])

  useEffect(() => {
    if (productId) {
      const product = products.find(p => p.id === parseInt(productId))
      setSelectedProduct(product || null)
      setMatchingProducts(products.filter(p => p.id.toString().startsWith(productId)).slice(0, 5))
    } else {
      setSelectedProduct(null)
      setMatchingProducts([])
    }
  }, [productId, products])

  const handleProductSelect = (product: Product) => {
    setProductId(product.id.toString())
    setSelectedProduct(product)
    setIsPopoverOpen(false)
  }

  const handleAddToCart = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!quantity || !productId) {
      setError('Por favor, complete ambos campos: Cantidad y ID del Producto.')
      setLoading(false)
      return
    }

    try {
      const product = products.find(p => p.id === parseInt(productId))
      if (!product) {
        setError('Producto no encontrado')
        return
      }

      const quantityNum = parseInt(quantity)
      if (isNaN(quantityNum) || quantityNum <= 0) {
        setError('La cantidad debe ser un número positivo')
        return
      }

      onAddToCart(product, quantityNum)

      setProductId('')
      setQuantity('1')
    } catch (error) {
      setError('No se pudo agregar el producto al carrito')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="bg-white shadow-sm border-0">
      <div className="p-6">
        <form onSubmit={handleAddToCart} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="productId" className="block text-sm font-medium mb-2">Product ID</label>
                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Input
                      id="productId"
                      type="number"
                      value={productId}
                      onChange={(e) => {
                        setProductId(e.target.value)
                        setIsPopoverOpen(true)
                      }}
                      placeholder="Enter product ID"
                      min="1"
                      required
                      className={`${removeArrowsClass} h-12`}
                    />
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0">
                    <ul className="divide-y divide-gray-100">
                      {matchingProducts.map((product) => (
                        <li
                          key={product.id}
                          className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => handleProductSelect(product)}
                        >
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              {product.image ? (
                                <img className="h-10 w-10 rounded-lg object-cover" src={product.image} alt="" />
                              ) : (
                                <ImageIcon className="h-10 w-10 text-gray-400" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {product.title}
                              </p>
                              <p className="text-sm text-gray-500">
                                ID: {product.id}
                              </p>
                            </div>
                            <div className="text-sm font-medium text-[#0095FF]">
                              ${product.price.toFixed(2)}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium mb-2">Quantity</label>
                <Select value={quantity} onValueChange={setQuantity}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select quantity" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {selectedProduct && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                {selectedProduct.image ? (
                  <img src={selectedProduct.image} alt={selectedProduct.title} className="w-16 h-16 object-cover rounded-lg" />
                ) : (
                  <ImageIcon className="w-16 h-16 text-gray-400" />
                )}
                <div>
                  <h3 className="font-medium">{selectedProduct.title}</h3>
                  <p className="text-[#0095FF] font-medium">${selectedProduct.price.toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-[#0095FF] hover:bg-[#0077CC] text-white"
          >
            {loading ? 'Adding...' : 'Add to Cart'}
          </Button>
        </form>
      </div>
    </Card>
  )
}