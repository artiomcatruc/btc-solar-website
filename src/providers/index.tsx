import React from 'react'

import { CartProvider } from '@/cart/CartProvider'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <CartProvider>{children}</CartProvider>
}
