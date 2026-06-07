'use client'

import { dispatchGalleryFilter } from '@/utilities/galleryEvents'
import { cn } from '@/utilities/ui'
import React, { useState } from 'react'

export type FilterOption = {
  label: string
  value: string
}

type Props = {
  groupId: string
  filters: FilterOption[]
}

const COMPACT_THRESHOLD = 4

export const GalleryFilterBar: React.FC<Props> = ({ groupId, filters }) => {
  const [active, setActive] = useState(filters[0]?.value ?? 'all')
  const isCompact = filters.length > COMPACT_THRESHOLD

  const handleSelect = (value: string) => {
    setActive(value)
    dispatchGalleryFilter({ groupId, category: value })
  }

  return (
    <div
      className={cn(
        isCompact
          ? '-mx-4 overflow-x-auto px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
          : 'flex flex-wrap justify-center',
      )}
    >
      <div
        className={cn(
          'flex gap-2 sm:gap-3',
          isCompact ? 'min-w-max snap-x snap-mandatory flex-nowrap pb-1' : 'flex-wrap justify-center gap-4',
        )}
      >
        {filters.map((filter) => {
          const isActive = active === filter.value

          return (
            <button
              type="button"
              key={`${filter.value}-${filter.label}`}
              onClick={() => handleSelect(filter.value)}
              className={cn(
                'shrink-0 snap-start font-medium transition-all',
                isCompact
                  ? 'rounded-full px-4 py-2 text-sm'
                  : 'rounded-full px-6 py-3',
                isActive
                  ? 'bg-graphite-900 text-white shadow-sm'
                  : 'bg-graphite-100 text-graphite-600 hover:bg-graphite-200',
              )}
            >
              {filter.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
