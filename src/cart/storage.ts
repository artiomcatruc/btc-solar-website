import type { CartItem, CartState } from './types'

export const CART_STORAGE_KEY = 'btc-solar-cart-v1'

const isCartItem = (value: unknown): value is CartItem => {
  if (!value || typeof value !== 'object') return false
  const item = value as CartItem
  return (
    typeof item.productId === 'number' &&
    Number.isFinite(item.productId) &&
    typeof item.quantity === 'number' &&
    Number.isFinite(item.quantity) &&
    item.quantity > 0
  )
}

export const readCart = (): CartState => {
  if (typeof window === 'undefined') return { items: [] }

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY)
    if (!raw) return { items: [] }
    const parsed = JSON.parse(raw) as { items?: unknown }
    const items = Array.isArray(parsed.items) ? parsed.items.filter(isCartItem) : []
    return { items }
  } catch {
    return { items: [] }
  }
}

export const writeCart = (state: CartState) => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({ items: state.items }))
}

export const cartItemCount = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.quantity, 0)
