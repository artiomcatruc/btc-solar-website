import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'
import Link from 'next/link'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import { buildPostsHref } from '@/utilities/postsQuery'

type BadgeTone = 'solar' | 'eco' | 'graphite'

const badgeToneClass: Record<BadgeTone, string> = {
  solar: 'bg-solar-500 text-graphite-900',
  eco: 'bg-eco-500 text-white',
  graphite: 'bg-graphite-700 text-white',
}

const isTone = (value?: string | null): value is BadgeTone =>
  value === 'solar' || value === 'eco' || value === 'graphite'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, tags, heroImage, publishedAt, title } = post

  const categoryList =
    categories?.filter(
      (category): category is Exclude<typeof category, number> =>
        typeof category === 'object' && category !== null,
    ) ?? []

  const tagList =
    tags?.filter(
      (tag): tag is Exclude<typeof tag, number> => typeof tag === 'object' && tag !== null,
    ) ?? []

  return (
    <div className="relative flex min-h-[70vh] items-end overflow-hidden bg-graphite-900">
      {heroImage && typeof heroImage !== 'string' ? (
        <Media
          fill
          priority
          pictureClassName="absolute inset-0 block size-full"
          imgClassName="object-cover"
          resource={heroImage}
        />
      ) : null}
      <div className="absolute inset-0 bg-linear-to-t from-graphite-950/95 via-graphite-900/55 to-graphite-900/20" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-32 sm:px-6 lg:px-8">
        <div className="max-w-3xl text-white">
          {categoryList.length > 0 ? (
            <div className="mb-6 flex flex-wrap gap-2">
              {categoryList.map((category) => {
                const tone = isTone(category.badgeTone) ? category.badgeTone : 'eco'
                return (
                  <Link
                    key={category.id}
                    href={buildPostsHref({ category: category.slug ?? undefined })}
                    className={cn(
                      'rounded-full px-4 py-1.5 text-sm font-semibold transition-opacity hover:opacity-90',
                      badgeToneClass[tone],
                    )}
                  >
                    {category.title}
                  </Link>
                )
              })}
            </div>
          ) : (
            <span className="mb-6 inline-block text-sm font-semibold uppercase tracking-wider text-solar-400">
              Blog
            </span>
          )}

          <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">{title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
            {publishedAt ? (
              <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
            ) : null}
            {tagList.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {tagList.map((tag) => (
                  <Link
                    key={tag.id}
                    href={buildPostsHref({ tag: tag.slug ?? undefined })}
                    className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                  >
                    #{tag.title}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
