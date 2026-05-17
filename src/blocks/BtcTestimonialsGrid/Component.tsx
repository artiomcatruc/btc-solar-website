import { Media } from '@/components/Media'
import React from 'react'

import type { BtcTestimonialsGridBlock, Testimonial } from '@/payload-types'

const Stars: React.FC<{ count?: number | null }> = ({ count = 5 }) => {
  const n = typeof count === 'number' ? Math.min(5, Math.max(0, Math.round(count))) : 5
  return (
    <div className="mb-6 flex gap-1" aria-hidden>
      {Array.from({ length: n }).map((_, i) => (
        <svg
          className="h-5 w-5 flex-shrink-0 text-solar-400"
          fill="currentColor"
          key={`star-${i}`}
          viewBox="0 0 20 20"
        >
          <title>★</title>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export const BtcTestimonialsGridBlockComponent: React.FC<BtcTestimonialsGridBlock> = (props) => {
  const { eyebrow, title } = props
  const rawItems = props.items ?? []
  const list = rawItems.filter((t): t is Testimonial => typeof t === 'object' && !!t?.id)

  return (
    <section className="bg-graphite-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center fade-in-visible">
          {eyebrow ? (
            <span className="text-sm font-semibold uppercase tracking-wider text-solar-500">{eyebrow}</span>
          ) : null}
          <h2 className="mt-4 mb-6 text-3xl font-bold text-graphite-900 md:text-5xl">{title}</h2>
        </div>
        {!list.length ? (
          <p className="text-center text-graphite-600">
            Link testimonials entries in Payload to populate this grid.
          </p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {list.map((tm) => {
              const initials = tm.name
                ?.trim()
                .split(/\s+/)
                .map((part) => part[0])
                .filter(Boolean)
                .slice(0, 2)
                .join('')
                .toUpperCase()
              const hasAvatar = typeof tm.avatar === 'object' && tm.avatar?.id
              return (
                <figure
                  className="fade-in-visible rounded-3xl border border-graphite-100 bg-white p-8 shadow-sm"
                  key={tm.id}
                >
                  <Stars count={tm.rating} />
                  <blockquote className="mb-6 leading-relaxed text-graphite-700">&ldquo;{tm.quote}&rdquo;</blockquote>
                  <figcaption className="flex items-center gap-4">
                    {hasAvatar ? (
                      <div className="h-12 w-12 overflow-hidden rounded-full border border-graphite-100 bg-graphite-100">
                        <Media htmlElement={null} resource={tm.avatar} imgClassName="h-full w-full object-cover" />
                      </div>
                    ) : (
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-graphite-200 text-sm font-semibold text-graphite-600">
                        {initials ?? '•'}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-graphite-900">{tm.name}</p>
                      {tm.subtitle ? <p className="text-sm text-graphite-500">{tm.subtitle}</p> : null}
                    </div>
                  </figcaption>
                </figure>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
