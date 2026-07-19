import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'
import Link from 'next/link'

import type { Post } from '@/payload-types'

import { PostHero } from '@/heros/PostHero'
import { generateMeta } from '@/utilities/generateMeta'
import { locales, localizeHref, parseLocale, type Locale } from '@/utilities/locale'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  if (process.env.NEXT_BUILD_SKIP_DB === 'true') {
    return []
  }

  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return locales.flatMap((locale) =>
    posts.docs.map(({ slug }) => ({
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

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { locale: localeParam, slug = '' } = await paramsPromise
  const locale = parseLocale(localeParam)
  const decodedSlug = decodeURIComponent(slug)
  const url = `/${locale}/posts/${decodedSlug}`
  const post = await queryPostBySlug({ locale, slug: decodedSlug })

  if (!post) return <PayloadRedirects locale={locale} url={url} />

  return (
    <article className="bg-white pb-24">
      <PageClient />
      <PayloadRedirects disableNotFound locale={locale} url={url} />
      {draft && <LivePreviewListener />}

      <PostHero post={post} />

      <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="mb-10">
          <Link
            href={localizeHref('/posts', locale)}
            className="inline-flex items-center gap-2 text-sm font-medium text-graphite-600 transition-colors hover:text-solar-600"
          >
            <span aria-hidden>←</span> Back to blog
          </Link>
        </div>

        <RichText
          className="prose prose-lg mx-auto max-w-[48rem] prose-headings:font-bold prose-headings:text-graphite-900 prose-p:text-graphite-600 prose-a:text-solar-600"
          data={post.content}
          enableGutter={false}
        />

        {post.relatedPosts && post.relatedPosts.length > 0 ? (
          <div className="mx-auto mt-20 max-w-[52rem]">
            <h2 className="mb-8 text-2xl font-bold text-graphite-900 md:text-3xl">Related articles</h2>
            <RelatedPosts
              docs={post.relatedPosts.filter((related): related is Post => typeof related === 'object')}
            />
          </div>
        ) : null}
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale: localeParam, slug = '' } = await paramsPromise
  const locale = parseLocale(localeParam)
  const decodedSlug = decodeURIComponent(slug)
  const post = await queryPostBySlug({ locale, slug: decodedSlug })

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ locale, slug }: { locale: Locale; slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    locale,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
