import configPromise from '@payload-config'
import { cn } from '@/utilities/ui'
import { getPayload } from 'payload'
import React from 'react'

import type { BtcGalleryFilterBlock, Category } from '@/payload-types'

import { GalleryFilterBar, type FilterOption } from './FilterBar'

type Background = NonNullable<BtcGalleryFilterBlock['background']>

const backgroundClass: Record<Background, string> = {
  graphite: 'bg-graphite-50 border-graphite-200',
  white: 'bg-white border-graphite-100',
}

const isCategory = (value: unknown): value is Category =>
  typeof value === 'object' && value !== null && 'slug' in value && 'title' in value

const resolveCategories = async (
  selected?: (number | Category)[] | null,
): Promise<Category[]> => {
  const payload = await getPayload({ config: configPromise })
  const picked = (selected ?? []).filter(isCategory)

  if (picked.length) return picked

  const ids = (selected ?? []).filter((value): value is number => typeof value === 'number')

  if (ids.length) {
    const result = await payload.find({
      collection: 'categories',
      where: { id: { in: ids } },
      limit: ids.length,
      pagination: false,
    })
    const byId = new Map(result.docs.map((doc) => [doc.id, doc]))

    return ids.map((id) => byId.get(id)).filter((doc): doc is Category => Boolean(doc))
  }

  const result = await payload.find({
    collection: 'categories',
    limit: 100,
    pagination: false,
    sort: 'title',
  })

  return result.docs
}

export const BtcGalleryFilterBlockComponent = async (props: BtcGalleryFilterBlock) => {
  const {
    groupId = 'gallery',
    sticky = true,
    background = 'white',
    allLabel = 'All Projects',
    categories,
  } = props

  const categoryDocs = await resolveCategories(categories)

  const options: FilterOption[] = [
    { label: allLabel || 'All Projects', value: 'all' },
    ...categoryDocs
      .filter((category) => Boolean(category.slug && category.title))
      .map((category) => ({
        label: category.title,
        value: category.slug as string,
      })),
  ]

  if (options.length <= 1) return null

  return (
    <section
      className={cn(
        'border-b py-8',
        backgroundClass[background ?? 'white'],
        sticky ? 'sticky top-20 z-40' : undefined,
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <GalleryFilterBar filters={options} groupId={groupId ?? 'gallery'} />
      </div>
    </section>
  )
}
