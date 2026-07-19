'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from 'react'

import { cartItemCount, readCart, writeCart } from './storage'
import type { CartItem } from './types'

type CartContextValue = {
  items: CartItem[]
  count: number
  ready: boolean
  addItem: (productId: number, quantity?: number) => void
  setQuantity: (productId: number, quantity: number) => void
  removeItem: (productId: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

const MAX_QTY = 99

const listeners = new Set<() => void>()
let memoryCart = { items: [] as CartItem[] }
let hydrated = false

const emit = () => {
  for (const listener of listeners) listener()
}

const getSnapshot = () => memoryCart
const emptyCart = { items: [] as CartItem[] }
const getServerSnapshot = () => emptyCart

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

const setCartItems = (items: CartItem[]) => {
  memoryCart = { items }
  writeCart(memoryCart)
  emit()
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ready, setReady] = useState(false)
  const cart = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  useEffect(() => {
    if (!hydrated) {
      memoryCart = readCart()
      hydrated = true
      emit()
    }
    setReady(true)
  }, [])

  const addItem = useCallback((productId: number, quantity = 1) => {
    const qty = Math.min(MAX_QTY, Math.max(1, Math.floor(quantity)))
    const current = getSnapshot().items
    const existing = current.find((item) => item.productId === productId)
    if (existing) {
      setCartItems(
        current.map((item) =>
          item.productId === productId
            ? { ...item, quantity: Math.min(MAX_QTY, item.quantity + qty) }
            : item,
        ),
      )
      return
    }
    setCartItems([...current, { productId, quantity: qty }])
  }, [])

  const setQuantity = useCallback((productId: number, quantity: number) => {
    const qty = Math.floor(quantity)
    if (!Number.isFinite(qty) || qty <= 0) {
      setCartItems(getSnapshot().items.filter((item) => item.productId !== productId))
      return
    }
    setCartItems(
      getSnapshot().items.map((item) =>
        item.productId === productId ? { ...item, quantity: Math.min(MAX_QTY, qty) } : item,
      ),
    )
  }, [])

  const removeItem = useCallback((productId: number) => {
    setCartItems(getSnapshot().items.filter((item) => item.productId !== productId))
  }, [])

  const clear = useCallback(() => {
    setCartItems([])
  }, [])

  const value = useMemo<CartContextValue>(
    () => ({
      items: cart.items,
      count: cartItemCount(cart.items),
      ready,
      addItem,
      setQuantity,
      removeItem,
      clear,
    }),
    [cart.items, ready, addItem, setQuantity, removeItem, clear],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
