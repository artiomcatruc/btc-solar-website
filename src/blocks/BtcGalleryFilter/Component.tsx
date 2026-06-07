import { cn } from '@/utilities/ui'
import React from 'react'

import type { BtcGalleryFilterBlock } from '@/payload-types'

import { GalleryFilterBar, type FilterOption } from './FilterBar'

type Background = NonNullable<BtcGalleryFilterBlock['background']>

const backgroundClass: Record<Background, string> = {
  graphite: 'bg-graphite-50 border-graphite-200',
  white: 'bg-white border-graphite-100',
}

export const BtcGalleryFilterBlockComponent: React.FC<BtcGalleryFilterBlock> = (props) => {
  const { groupId = 'gallery', sticky = true, background = 'white', filters = [] } = props

  const options: FilterOption[] = (filters ?? [])
    .filter((f): f is { label: string; value: string } => Boolean(f?.label && f?.value))
    .map((f) => ({ label: f.label, value: f.value }))

  if (!options.length) return null

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
