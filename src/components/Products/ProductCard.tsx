import React from 'react'

import type { Product } from '@/payload-types'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import type { Locale } from '@/utilities/locale'
import { t } from '@/utilities/uiMessages'

type Props = {
  product: Product
  locale: Locale
}

const formatPrice = (price: number, currency: Product['currency'], locale: Locale) => {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: price % 1 === 0 ? 0 : 2,
    }).format(price)
  } catch {
    return `${price} ${currency}`
  }
}

export const ProductCard: React.FC<Props> = ({ product, locale }) => {
  const unavailable = product.soldOut || product.quantity <= 0
  const image = typeof product.image === 'object' ? product.image : null

  return (
    <article
      className={cn(
        'group hover-lift fade-in-visible flex h-full flex-col overflow-hidden rounded-3xl border border-graphite-100 bg-white shadow-sm',
        unavailable && 'opacity-90',
      )}
    >
      <div className="relative aspect-16/10 overflow-hidden bg-graphite-100">
        {image ? (
          <Media
            fill
            resource={image}
            size="33vw"
            pictureClassName="absolute inset-0 block size-full"
            imgClassName={cn(
              'object-cover transition-transform duration-500 group-hover:scale-105',
              unavailable && 'grayscale-[30%]',
            )}
            htmlElement={null}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-graphite-400">
            {t(locale, 'noImage')}
          </div>
        )}

        {unavailable ? (
          <span className="absolute top-4 left-4 z-10 rounded-full bg-graphite-900/90 px-3 py-1 text-xs font-semibold text-white">
            {t(locale, 'soldOut')}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="text-xl font-bold text-graphite-900">{product.title}</h3>
          <p className="shrink-0 text-lg font-semibold text-solar-600">
            {formatPrice(product.price, product.currency, locale)}
          </p>
        </div>

        <p className="mb-5 line-clamp-3 flex-1 leading-relaxed text-graphite-600">
          {product.summary}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-graphite-100 pt-4 text-sm">
          <span className="font-medium text-graphite-500">
            {unavailable
              ? t(locale, 'soldOut')
              : t(locale, 'inStockCount').replace('{count}', String(product.quantity))}
          </span>
          <span
            className={cn(
              'rounded-full px-2.5 py-1 text-xs font-semibold',
              unavailable
                ? 'bg-red-50 text-red-700'
                : 'bg-eco-50 text-eco-600',
            )}
          >
            {unavailable ? t(locale, 'soldOut') : t(locale, 'inStock')}
          </span>
        </div>
      </div>
    </article>
  )
}
