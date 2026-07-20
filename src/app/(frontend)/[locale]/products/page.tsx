import type { Metadata } from 'next/types'

import { ProductCard } from '@/components/Products/ProductCard'
import { buildLocaleAlternates, withBrandTitle } from '@/utilities/seo'
import { parseLocale } from '@/utilities/locale'
import { t } from '@/utilities/uiMessages'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-dynamic'
export const revalidate = 600

type Args = {
  params: Promise<{
    locale?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { locale: localeParam } = await paramsPromise
  const locale = parseLocale(localeParam)
  const payload = await getPayload({ config: configPromise })

  const products = await payload.find({
    collection: 'products',
    depth: 1,
    limit: 100,
    locale,
    pagination: false,
    overrideAccess: false,
    sort: 'sort',
  })

  return (
    <div className="bg-graphite-50">
      <PageClient />

      <section className="border-b border-graphite-100 bg-white pt-28 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="fade-in-visible max-w-3xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-solar-500">
              {t(locale, 'productsEyebrow')}
            </span>
            <h1 className="mt-4 mb-6 text-4xl font-bold text-graphite-900 md:text-5xl">
              {t(locale, 'productsTitle')}
            </h1>
            <p className="text-lg leading-relaxed text-graphite-600">
              {t(locale, 'productsLead')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {products.docs.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {products.docs.map((product) => (
                <ProductCard key={product.id} locale={locale} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-graphite-200 bg-white px-8 py-16 text-center">
              <p className="text-lg font-medium text-graphite-900">
                {t(locale, 'productsEmptyTitle')}
              </p>
              <p className="mt-2 text-graphite-600">{t(locale, 'productsEmptyLead')}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale: localeParam } = await paramsPromise
  const locale = parseLocale(localeParam)
  const title = t(locale, 'productsTitle')
  const description = t(locale, 'productsLead')

  return {
    alternates: buildLocaleAlternates('/products', locale),
    description,
    title: withBrandTitle(title),
  }
}
