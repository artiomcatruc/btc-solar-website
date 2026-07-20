'use client'

import React, { useState } from 'react'

import { useCart } from '@/cart/CartProvider'
import type { Locale } from '@/utilities/locale'
import { t } from '@/utilities/uiMessages'
import { cn } from '@/utilities/ui'

type Props = {
  productId: number
  disabled?: boolean
  locale: Locale
  className?: string
}

export const AddToCartButton: React.FC<Props> = ({
  productId,
  disabled,
  locale,
  className,
}) => {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        'inline-flex w-full items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-colors',
        disabled
          ? 'cursor-not-allowed bg-graphite-100 text-graphite-400'
          : 'bg-graphite-900 text-white hover:bg-graphite-800',
        className,
      )}
      onClick={() => {
        if (disabled) return
        addItem(productId, 1)
        setAdded(true)
        window.setTimeout(() => setAdded(false), 1200)
      }}
    >
      {disabled ? t(locale, 'soldOut') : added ? t(locale, 'addedToCart') : t(locale, 'addToCart')}
    </button>
  )
}
