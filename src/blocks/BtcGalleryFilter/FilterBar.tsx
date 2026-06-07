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

export const GalleryFilterBar: React.FC<Props> = ({ groupId, filters }) => {
  const [active, setActive] = useState(filters[0]?.value ?? 'all')

  const handleSelect = (value: string) => {
    setActive(value)
    dispatchGalleryFilter({ groupId, category: value })
  }

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {filters.map((filter) => {
        const isActive = active === filter.value

        return (
          <button
            type="button"
            key={`${filter.value}-${filter.label}`}
            onClick={() => handleSelect(filter.value)}
            className={cn(
              'rounded-full px-6 py-3 font-medium transition-all',
              isActive
                ? 'bg-graphite-900 text-white'
                : 'bg-graphite-100 text-graphite-600 hover:bg-graphite-200',
            )}
          >
            {filter.label}
          </button>
        )
      })}
    </div>
  )
}
