import Link from 'next/link'
import React from 'react'

import type { Product } from '@/payload-types'

import { formatPrice } from '@/cart/formatPrice'
import { AddToCartButton } from '@/components/Cart/AddToCartButton'
import { Media } from '@/components/Media'
import { localizeHref, type Locale } from '@/utilities/locale'
import { cn } from '@/utilities/ui'
import { t } from '@/utilities/uiMessages'

type Props = {
  product: Product
  locale: Locale
}

export const ProductCard: React.FC<Props> = ({ product, locale }) => {
  const unavailable = product.soldOut || product.quantity <= 0
  const image = typeof product.image === 'object' ? product.image : null
  const href = localizeHref(`/products/${product.slug}`, locale)

  return (
    <article
      className={cn(
        'group hover-lift fade-in-visible flex h-full flex-col overflow-hidden rounded-3xl border border-graphite-100 bg-white shadow-sm',
        unavailable && 'opacity-90',
      )}
    >
      <Link href={href} className="relative aspect-16/10 overflow-hidden bg-graphite-100">
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
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="text-xl font-bold text-graphite-900">
            <Link className="transition-colors group-hover:text-solar-600" href={href}>
              {product.title}
            </Link>
          </h3>
          <p className="shrink-0 text-lg font-semibold text-solar-600">
            {formatPrice(product.price, product.currency, locale)}
          </p>
        </div>

        <p className="mb-5 line-clamp-3 flex-1 leading-relaxed text-graphite-600">
          {product.summary}
        </p>

        <div className="mt-auto space-y-4 border-t border-graphite-100 pt-4">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="font-medium text-graphite-500">
              {unavailable
                ? t(locale, 'soldOut')
                : t(locale, 'inStockCount').replace('{count}', String(product.quantity))}
            </span>
            <span
              className={cn(
                'rounded-full px-2.5 py-1 text-xs font-semibold',
                unavailable ? 'bg-red-50 text-red-700' : 'bg-eco-50 text-eco-600',
              )}
            >
              {unavailable ? t(locale, 'soldOut') : t(locale, 'inStock')}
            </span>
          </div>

          <AddToCartButton disabled={unavailable} locale={locale} productId={product.id} />
        </div>
      </div>
    </article>
  )
}
