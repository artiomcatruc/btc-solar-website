import type { Metadata } from 'next/types'

import { CartView } from '@/components/Cart/CartView'
import { parseLocale } from '@/utilities/locale'
import { t } from '@/utilities/uiMessages'
import React from 'react'
import PageClient from './page.client'

type Args = {
  params: Promise<{
    locale?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { locale: localeParam } = await paramsPromise
  const locale = parseLocale(localeParam)

  return (
    <div className="bg-graphite-50">
      <PageClient />

      <section className="border-b border-graphite-100 bg-white pt-28 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="fade-in-visible max-w-3xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-solar-500">
              {t(locale, 'cartEyebrow')}
            </span>
            <h1 className="mt-4 mb-6 text-4xl font-bold text-graphite-900 md:text-5xl">
              {t(locale, 'cartTitle')}
            </h1>
            <p className="text-lg leading-relaxed text-graphite-600">{t(locale, 'cartLead')}</p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CartView locale={locale} />
        </div>
      </section>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale: localeParam } = await paramsPromise
  const locale = parseLocale(localeParam)

  return {
    title: `${t(locale, 'cartTitle')} | BTC Solar`,
    description: t(locale, 'cartLead'),
  }
}
