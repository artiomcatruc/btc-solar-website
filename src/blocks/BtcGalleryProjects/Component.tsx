import { cn } from '@/utilities/ui'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import React from 'react'

import type { BtcGalleryProjectsBlock, GalleryItem, Media } from '@/payload-types'

import { GalleryProjectsGrid } from './ProjectsGrid'
import type { SerializedGalleryProject } from './types'

type Background = NonNullable<BtcGalleryProjectsBlock['background']>

const backgroundClass: Record<Background, string> = {
  graphite: 'bg-graphite-50',
  white: 'bg-white',
}

const categoryLabel = (category: GalleryItem['category']) =>
  category.charAt(0).toUpperCase() + category.slice(1)

const serializeItem = (item: GalleryItem): SerializedGalleryProject | null => {
  const image = item.image

  if (typeof image !== 'object' || !image?.url) return null

  const media = image as Media
  const title = item.title || item.caption || 'Project'
  const lightboxTitle = item.systemSize ? `${title} - ${item.systemSize}` : title

  return {
    id: item.id,
    category: item.category,
    title,
    lightboxTitle,
    badgeLabel: item.badgeLabel || categoryLabel(item.category),
    location: item.location,
    systemSize: item.systemSize,
    layout: item.layout === 'large' ? 'large' : 'normal',
    imageUrl: getMediaUrl(media.url, media.updatedAt),
    imageAlt: media.alt || item.title || '',
  }
}

export const BtcGalleryProjectsBlockComponent: React.FC<BtcGalleryProjectsBlock> = (props) => {
  const { groupId = 'gallery', background = 'white', items } = props

  const projects = (items ?? [])
    .filter((item): item is GalleryItem => typeof item === 'object' && !!item?.id)
    .map(serializeItem)
    .filter((item): item is SerializedGalleryProject => item !== null)

  return (
    <section className={cn(backgroundClass[background ?? 'white'], 'py-16')}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <GalleryProjectsGrid groupId={groupId ?? 'gallery'} items={projects} />
      </div>
    </section>
  )
}
