'use client'

import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React from 'react'

import type { Media as MediaType, Post } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData = Pick<
  Post,
  'slug' | 'categories' | 'tags' | 'meta' | 'title' | 'publishedAt' | 'heroImage'
>

type BadgeTone = 'solar' | 'eco' | 'graphite'

const badgeToneClass: Record<BadgeTone, string> = {
  solar: 'bg-solar-500 text-graphite-900',
  eco: 'bg-eco-500 text-white',
  graphite: 'bg-graphite-700 text-white',
}

const isTone = (value?: string | null): value is BadgeTone =>
  value === 'solar' || value === 'eco' || value === 'graphite'

const resolveCardImage = (doc?: CardPostData): MediaType | null => {
  if (!doc) return null

  if (doc.heroImage && typeof doc.heroImage === 'object') return doc.heroImage

  const metaImage = doc.meta?.image
  if (metaImage && typeof metaImage === 'object') return metaImage

  return null
}

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { cardRef, linkRef } = useClickableCard({})
  const { className, doc, relationTo = 'posts', showCategories, title: titleFromProps } = props

  const { slug, categories, tags, meta, title, publishedAt } = doc || {}
  const description = meta?.description
  const image = resolveCardImage(doc)

  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ')
  const href = `/${relationTo}/${slug}`

  const categoryBadges =
    showCategories && Array.isArray(categories)
      ? categories.filter(
          (category): category is Exclude<typeof category, number> =>
            typeof category === 'object' && category !== null,
        )
      : []

  const tagBadges = Array.isArray(tags)
    ? tags.filter(
        (tag): tag is Exclude<typeof tag, number> => typeof tag === 'object' && tag !== null,
      )
    : []

  return (
    <article
      className={cn(
        'group hover-lift flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-graphite-100 bg-white shadow-sm',
        className,
      )}
      ref={cardRef}
    >
      <div className="relative aspect-16/10 overflow-hidden bg-graphite-100">
        {image ? (
          <Media
            fill
            resource={image}
            size="33vw"
            pictureClassName="absolute inset-0 block size-full"
            imgClassName="object-cover transition-transform duration-500 group-hover:scale-105"
            htmlElement={null}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-graphite-400">
            No image
          </div>
        )}
        {categoryBadges.length > 0 ? (
          <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
            {categoryBadges.map((category) => {
              const tone = isTone(category.badgeTone) ? category.badgeTone : 'eco'
              return (
                <span
                  key={category.id}
                  className={cn(
                    'rounded-full px-3 py-1 text-xs font-semibold',
                    badgeToneClass[tone],
                  )}
                >
                  {category.title}
                </span>
              )
            })}
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-6">
        {publishedAt ? (
          <time
            className="mb-3 text-xs font-semibold uppercase tracking-wider text-solar-500"
            dateTime={publishedAt}
          >
            {new Date(publishedAt).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </time>
        ) : null}

        {titleToUse ? (
          <h3 className="mb-3 text-xl font-bold text-graphite-900">
            <Link className="transition-colors group-hover:text-solar-600" href={href} ref={linkRef}>
              {titleToUse}
            </Link>
          </h3>
        ) : null}

        {sanitizedDescription ? (
          <p className="mb-4 line-clamp-3 flex-1 leading-relaxed text-graphite-600">
            {sanitizedDescription}
          </p>
        ) : null}

        {tagBadges.length > 0 ? (
          <div className="mt-auto flex flex-wrap gap-2 pt-2">
            {tagBadges.map((tag) => (
              <span
                key={tag.id}
                className="rounded-full border border-solar-200 bg-solar-50 px-2.5 py-1 text-xs font-medium text-graphite-700"
              >
                #{tag.title}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  )
}
