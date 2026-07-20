import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import { homeStatic } from '@/endpoints/seed/home-static'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { locales, parseLocale, type Locale } from '@/utilities/locale'
import PageClient from './page.client'

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  if (process.env.NEXT_BUILD_SKIP_DB === 'true') {
    return []
  }

  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const slugs =
    pages.docs
      ?.filter((doc) => doc.slug && doc.slug !== 'home' && doc.slug !== 'index')
      .map((doc) => doc.slug as string) || []

  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })))
}

type Args = {
  params: Promise<{
    locale?: string
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { locale: localeParam, slug = 'home' } = await paramsPromise
  const locale = parseLocale(localeParam)
  const decodedSlug = decodeURIComponent(slug)
  const url = `/${locale}${decodedSlug === 'home' || decodedSlug === 'index' ? '' : `/${decodedSlug}`}`
  let page: RequiredDataFromCollectionSlug<'pages'> | null

  page = await queryPageBySlug({
    locale,
    slug: decodedSlug,
  })

  if (!page && (decodedSlug === 'home' || decodedSlug === 'index')) {
    page = homeStatic
  }

  if (!page) {
    return <PayloadRedirects locale={locale} url={url} />
  }

  const { hero, layout } = page

  const usesBtcHero = Boolean(
    layout?.some((b) => b?.blockType === 'btcHero' || b?.blockType === 'btcAboutHero'),
  )

  return (
    <article>
      <PageClient />
      <PayloadRedirects disableNotFound locale={locale} url={url} />

      {draft && <LivePreviewListener />}

      {!usesBtcHero && <RenderHero {...hero} />}
      <RenderBlocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale: localeParam, slug = 'home' } = await paramsPromise
  const locale = parseLocale(localeParam)
  const decodedSlug = decodeURIComponent(slug)
  const page = await queryPageBySlug({
    locale,
    slug: decodedSlug,
  })

  return generateMeta({ collection: 'pages', doc: page, locale, slug: decodedSlug })
}

const queryPageBySlug = cache(async ({ locale, slug }: { locale: Locale; slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const trySlugs =
    slug === 'home' || slug === 'index' ? (['home', 'index'] as const) : ([slug] as const)

  for (const candidate of trySlugs) {
    const result = await payload.find({
      collection: 'pages',
      draft,
      limit: 1,
      depth: 3,
      locale,
      pagination: false,
      overrideAccess: draft,
      where: {
        slug: {
          equals: candidate,
        },
      },
    })

    if (result.docs?.[0]) return result.docs[0]
  }

  return null
})
