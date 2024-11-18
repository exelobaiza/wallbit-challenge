import { Product } from './types'

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch('https://fakestoreapi.com/products')
  if (!response.ok) throw new Error('Error al cargar productos')
  return response.json()
}