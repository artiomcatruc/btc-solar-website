'use client'

import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { useCart } from '@/cart/CartProvider'
import { localizeHref, type Locale } from '@/utilities/locale'
import { t } from '@/utilities/uiMessages'
import { cn } from '@/utilities/ui'

type Props = {
  locale: Locale
  className?: string
}

export const CartButton: React.FC<Props> = ({ locale, className }) => {
  const { count, ready } = useCart()
  const href = localizeHref('/cart', locale)

  return (
    <Link
      href={href}
      className={cn(
        'relative inline-flex h-10 w-10 items-center justify-center rounded-full text-graphite-700 transition-colors hover:bg-graphite-100 hover:text-graphite-900',
        className,
      )}
      aria-label={t(locale, 'cartTitle')}
    >
      <ShoppingCart className="h-5 w-5" />
      {ready && count > 0 ? (
        <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-solar-500 px-1 text-[11px] font-bold text-graphite-900">
          {count > 99 ? '99+' : count}
        </span>
      ) : null}
    </Link>
  )
}
