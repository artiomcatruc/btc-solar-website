import type { Metadata } from 'next'

import { formatPrice } from '@/cart/formatPrice'
import { AddToCartButton } from '@/components/Cart/AddToCartButton'
import { JsonLd } from '@/components/JsonLd'
import { Media } from '@/components/Media'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'
import React, { cache } from 'react'

import type { Product } from '@/payload-types'
import { generateMeta } from '@/utilities/generateMeta'
import { getCachedSite } from '@/utilities/getSite'
import { absoluteUrl } from '@/utilities/seo'
import { locales, localizeHref, parseLocale, type Locale } from '@/utilities/locale'
import { t } from '@/utilities/uiMessages'
import PageClient from '../page.client'

export const dynamic = 'force-dynamic'
export const revalidate = 600

export async function generateStaticParams() {
  if (process.env.NEXT_BUILD_SKIP_DB === 'true') {
    return []
  }

  const payload = await getPayload({ config: configPromise })
  const products = await payload.find({
    collection: 'products',
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })

  return locales.flatMap((locale) =>
    products.docs
      .filter((doc) => Boolean(doc.slug))
      .map(({ slug }) => ({
        locale,
        slug,
      })),
  )
}

type Args = {
  params: Promise<{
    locale?: string
    slug?: string
  }>
}

export default async function ProductPage({ params: paramsPromise }: Args) {
  const { locale: localeParam, slug = '' } = await paramsPromise
  const locale = parseLocale(localeParam)
  const decodedSlug = decodeURIComponent(slug)
  const url = `/${locale}/products/${decodedSlug}`
  const [product, site] = await Promise.all([
    queryProductBySlug({ locale, slug: decodedSlug }),
    getCachedSite(locale),
  ])

  if (!product) return <PayloadRedirects locale={locale} url={url} />

  const unavailable = product.soldOut || product.quantity <= 0
  const image = typeof product.image === 'object' ? product.image : null
  const canonical = absoluteUrl(url)
  const imageUrl =
    image?.sizes?.og?.url || image?.url
      ? absoluteUrl(image.sizes?.og?.url || image.url || '')
      : undefined

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.summary,
    image: imageUrl ? [imageUrl] : undefined,
    sku: product.slug,
    url: canonical,
    brand: {
      '@type': 'Brand',
      name: site?.siteName || 'BTC Solar',
    },
    offers: {
      '@type': 'Offer',
      url: canonical,
      priceCurrency: product.currency,
      price: product.price,
      availability: unavailable
        ? 'https://schema.org/OutOfStock'
        : 'https://schema.org/InStock',
    },
  }

  return (
    <div className="bg-graphite-50">
      <PageClient />
      <PayloadRedirects disableNotFound locale={locale} url={url} />
      <JsonLd data={productJsonLd} />

      <section className="border-b border-graphite-100 bg-white pt-28 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href={localizeHref('/products', locale)}
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-graphite-600 transition-colors hover:text-solar-600"
          >
            <span aria-hidden>←</span> {t(locale, 'cartBackToProducts')}
          </Link>

          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-graphite-100">
              {image ? (
                <Media
                  fill
                  priority
                  resource={image}
                  size="50vw"
                  pictureClassName="absolute inset-0 block size-full"
                  imgClassName="object-cover"
                  htmlElement={null}
                />
              ) : null}
              {unavailable ? (
                <span className="absolute top-4 left-4 z-10 rounded-full bg-graphite-900/90 px-3 py-1 text-xs font-semibold text-white">
                  {t(locale, 'soldOut')}
                </span>
              ) : null}
            </div>

            <div className="fade-in-visible">
              <span className="text-sm font-semibold uppercase tracking-wider text-solar-500">
                {t(locale, 'productsEyebrow')}
              </span>
              <h1 className="mt-3 mb-4 text-4xl font-bold text-graphite-900 md:text-5xl">
                {product.title}
              </h1>
              <p className="mb-6 text-2xl font-semibold text-solar-600">
                {formatPrice(product.price, product.currency, locale)}
              </p>
              <p className="mb-8 text-lg leading-relaxed text-graphite-600">{product.summary}</p>

              <div className="mb-6 flex items-center gap-3 text-sm">
                <span className="font-medium text-graphite-500">
                  {unavailable
                    ? t(locale, 'soldOut')
                    : t(locale, 'inStockCount').replace('{count}', String(product.quantity))}
                </span>
              </div>

              <div className="max-w-sm">
                <AddToCartButton
                  disabled={unavailable}
                  locale={locale}
                  productId={product.id}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale: localeParam, slug = '' } = await paramsPromise
  const locale = parseLocale(localeParam)
  const decodedSlug = decodeURIComponent(slug)
  const product = await queryProductBySlug({ locale, slug: decodedSlug })

  return generateMeta({
    collection: 'products',
    doc: product,
    locale,
    slug: decodedSlug,
  })
}

const queryProductBySlug = cache(async ({ locale, slug }: { locale: Locale; slug: string }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'products',
    depth: 1,
    limit: 1,
    locale,
    overrideAccess: false,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return (result.docs?.[0] as Product | undefined) ?? null
})
