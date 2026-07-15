import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { PostsFilterBar } from '@/components/Posts/PostsFilterBar'
import { buildPostsWhere, POSTS_PER_PAGE } from '@/utilities/postsQuery'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-dynamic'
export const revalidate = 600

type Args = {
  searchParams: Promise<{
    category?: string
    tag?: string
    q?: string
    page?: string
  }>
}

export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const searchParams = await searchParamsPromise
  const category = searchParams.category || undefined
  const tag = searchParams.tag || undefined
  const q = searchParams.q || undefined
  const page = Math.max(1, Number(searchParams.page) || 1)

  const payload = await getPayload({ config: configPromise })

  const [posts, categories, tags] = await Promise.all([
    payload.find({
      collection: 'posts',
      depth: 1,
      limit: POSTS_PER_PAGE,
      page,
      overrideAccess: false,
      where: buildPostsWhere({ category, tag, q }),
      sort: '-publishedAt',
      select: {
        title: true,
        slug: true,
        categories: true,
        tags: true,
        heroImage: true,
        meta: true,
        publishedAt: true,
      },
    }),
    payload.find({
      collection: 'categories',
      depth: 0,
      limit: 100,
      pagination: false,
      overrideAccess: false,
      select: {
        title: true,
        slug: true,
      },
      sort: 'title',
    }),
    payload.find({
      collection: 'tags',
      depth: 0,
      limit: 100,
      pagination: false,
      overrideAccess: false,
      select: {
        title: true,
        slug: true,
      },
      sort: 'title',
    }),
  ])

  const categoryOptions = categories.docs
    .filter((doc) => Boolean(doc.slug))
    .map((doc) => ({ label: doc.title, value: doc.slug! }))

  const tagOptions = tags.docs
    .filter((doc) => Boolean(doc.slug))
    .map((doc) => ({ label: doc.title, value: doc.slug! }))

  return (
    <div className="bg-graphite-50">
      <PageClient />

      <section className="border-b border-graphite-100 bg-white pt-28 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="fade-in-visible max-w-3xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-solar-500">
              Insights
            </span>
            <h1 className="mt-4 mb-6 text-4xl font-bold text-graphite-900 md:text-5xl">Blog</h1>
            <p className="text-lg leading-relaxed text-graphite-600">
              News, solar insights and project updates from BTC Solar.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto mb-10 max-w-7xl px-4 sm:px-6 lg:px-8">
          <PostsFilterBar
            categories={categoryOptions}
            tags={tagOptions}
            activeCategory={category}
            activeTag={tag}
            activeQuery={q}
          />
        </div>

        <div className="mx-auto mb-8 max-w-7xl px-4 sm:px-6 lg:px-8">
          <PageRange
            className="text-sm font-medium text-graphite-500"
            collection="posts"
            collectionLabels={{ plural: 'articles', singular: 'article' }}
            currentPage={posts.page}
            limit={POSTS_PER_PAGE}
            totalDocs={posts.totalDocs}
          />
        </div>

        {posts.docs.length > 0 ? (
          <CollectionArchive posts={posts.docs} />
        ) : (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-dashed border-graphite-200 bg-white px-8 py-16 text-center">
              <p className="text-lg font-medium text-graphite-900">No articles found</p>
              <p className="mt-2 text-graphite-600">Try another search, category or tag.</p>
            </div>
          </div>
        )}

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {posts.totalPages > 1 && posts.page ? (
            <Pagination
              page={posts.page}
              totalPages={posts.totalPages}
              filters={{ category, tag, q }}
            />
          ) : null}
        </div>
      </section>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Blog | BTC Solar',
    description: 'News, solar insights and project updates from BTC Solar.',
  }
}
