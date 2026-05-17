import { Media } from '@/components/Media'
import React from 'react'

import type { BtcGalleryGridBlock, GalleryItem } from '@/payload-types'

export const BtcGalleryGridBlockComponent: React.FC<BtcGalleryGridBlock> = (props) => {
  const { eyebrow, title } = props
  const candidates = props.items ?? []
  const imgs = candidates.filter((g): g is GalleryItem => typeof g === 'object' && !!g?.id)

  return (
    <section className="relative bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center fade-in-visible">
          {eyebrow ? (
            <span className="text-sm font-semibold uppercase tracking-wider text-solar-500">{eyebrow}</span>
          ) : null}
          <h2 className="mt-4 text-3xl font-bold text-graphite-900 md:text-5xl">{title}</h2>
        </div>
        {!imgs.length ? (
          <p className="rounded-3xl border border-dashed border-graphite-100 p-16 text-center text-graphite-500">
            Relate gallery items to show this grid here.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {imgs.map((item, idx) => (
              <div
                className={`group relative min-h-[12rem] overflow-hidden rounded-3xl border border-graphite-100 fade-in-visible ${
                  idx % 7 === 0 ? 'lg:col-span-2 lg:row-span-2 lg:min-h-[22rem]' : ''
                }`}
                key={item.id}
              >
                {typeof item.image === 'object' && item.image?.id ? (
                  <Media
                    htmlElement={null}
                    priority={idx === 0}
                    resource={item.image}
                    className="h-full min-h-[12rem] w-full lg:min-h-0"
                    imgClassName="h-full min-h-[12rem] w-full object-cover transition duration-[400ms] group-hover:scale-[1.02] lg:min-h-0"
                  />
                ) : null}
                <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-graphite-950/85 via-graphite-950/20 to-transparent p-6 text-white opacity-0 transition duration-300 group-hover:opacity-100">
                  <span className="text-lg font-semibold">{item.caption}</span>
                  {item.location ? <span className="mt-1 text-sm text-graphite-200">{item.location}</span> : null}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
