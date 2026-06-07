'use client'

import { GALLERY_FILTER_EVENT, type GalleryFilterDetail } from '@/utilities/galleryEvents'
import { cn } from '@/utilities/ui'
import { MapPin } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useMemo, useState } from 'react'

import type { SerializedGalleryProject } from './types'
import { GalleryLightbox, type LightboxState } from './Lightbox'

const categoryBadgeClass: Record<string, string> = {
  residential: 'bg-eco-500 text-white',
  commercial: 'bg-solar-500 text-graphite-900',
  other: 'bg-graphite-600 text-white',
}

type Props = {
  groupId: string
  items: SerializedGalleryProject[]
}

export const GalleryProjectsGrid: React.FC<Props> = ({ groupId, items }) => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightbox, setLightbox] = useState<LightboxState>(null)

  useEffect(() => {
    const handleFilter = (event: Event) => {
      const detail = (event as CustomEvent<GalleryFilterDetail>).detail
      if (detail?.groupId !== groupId) return
      setActiveCategory(detail.category)
    }

    window.addEventListener(GALLERY_FILTER_EVENT, handleFilter)
    return () => window.removeEventListener(GALLERY_FILTER_EVENT, handleFilter)
  }, [groupId])

  const visibleItems = useMemo(() => {
    if (activeCategory === 'all') return items
    return items.filter((item) => item.category === activeCategory)
  }, [activeCategory, items])

  const openLightbox = (item: SerializedGalleryProject) => {
    setLightbox({
      imageUrl: item.imageUrl,
      imageAlt: item.imageAlt,
      title: item.lightboxTitle,
      location: item.location,
    })
  }

  if (!items.length) {
    return (
      <p className="rounded-3xl border border-dashed border-graphite-200 p-16 text-center text-graphite-600">
        Relate gallery items to show projects here.
      </p>
    )
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visibleItems.map((item) => {
          const isLarge = item.layout === 'large'
          const badgeClass = categoryBadgeClass[item.category] ?? categoryBadgeClass.other

          return (
            <button
              type="button"
              key={item.id}
              onClick={() => openLightbox(item)}
              className={cn(
                'gallery-item group fade-in-visible relative cursor-pointer overflow-hidden rounded-3xl text-left',
                isLarge ? 'lg:col-span-2 lg:row-span-2' : undefined,
              )}
            >
              <div
                className={cn(
                  'relative w-full',
                  isLarge ? 'h-[400px] lg:h-full lg:min-h-[28rem]' : 'h-[280px]',
                )}
              >
                <Image
                  alt={item.imageAlt}
                  className="object-cover transition duration-500 group-hover:scale-[1.02]"
                  fill
                  sizes={
                    isLarge
                      ? '(max-width: 1024px) 100vw, 66vw'
                      : '(max-width: 1024px) 50vw, 33vw'
                  }
                  src={item.imageUrl}
                  unoptimized
                />
              </div>
              <div className="gallery-overlay absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-graphite-900/90 via-graphite-900/20 to-transparent p-6 lg:p-8">
                <span
                  className={cn(
                    'mb-3 inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold',
                    badgeClass,
                  )}
                >
                  {item.badgeLabel}
                </span>
                <h3
                  className={cn(
                    'font-bold text-white',
                    isLarge ? 'mb-2 text-2xl' : 'mb-1 text-xl',
                  )}
                >
                  {item.title}
                </h3>
                {item.location ? (
                  <p
                    className={cn(
                      'flex items-center gap-2 text-graphite-300',
                      isLarge ? 'text-base text-graphite-200' : 'text-sm',
                    )}
                  >
                    <MapPin className="h-4 w-4 shrink-0" strokeWidth={2} />
                    {item.location}
                  </p>
                ) : null}
                {item.systemSize ? (
                  <p
                    className={cn(
                      'mt-1 font-semibold text-solar-400',
                      isLarge ? 'mt-2 text-base' : 'text-sm',
                    )}
                  >
                    {item.systemSize}
                  </p>
                ) : null}
              </div>
            </button>
          )
        })}
      </div>

      <GalleryLightbox onClose={() => setLightbox(null)} state={lightbox} />
    </>
  )
}
