import { Media } from '@/components/Media'
import { CircleCheck, Users, Zap } from 'lucide-react'
import { cn } from '@/utilities/ui'
import React from 'react'

import type { BtcAboutHeroBlock } from '@/payload-types'

const toneBox: Record<
  NonNullable<BtcAboutHeroBlock['highlights']>[number]['tone'],
  string
> = {
  eco: 'bg-eco-100 text-eco-500',
  solar: 'bg-solar-100 text-solar-500',
  graphite: 'bg-graphite-100 text-graphite-600',
}

const toneGlyph = (tone?: string | null) => {
  if (tone === 'eco') return Users
  if (tone === 'graphite') return Zap
  return CircleCheck
}

export const BtcAboutHeroBlockComponent: React.FC<BtcAboutHeroBlock> = (props) => {
  const {
    eyebrow,
    headline,
    headlineAccent,
    lead,
    highlights = [],
    media,
    cardTitle,
    cardSubtitle,
  } = props

  const items = highlights ?? []

  return (
    <section className="bg-graphite-50 pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="fade-in-visible">
            {eyebrow ? (
              <span className="text-sm font-semibold uppercase tracking-wider text-solar-500">
                {eyebrow}
              </span>
            ) : null}
            <h1 className="mt-4 mb-6 text-4xl font-bold leading-tight text-graphite-900 md:text-6xl">
              {headline}
              {headlineAccent ? (
                <>
                  {' '}
                  <span className="gradient-text">{headlineAccent}</span>
                </>
              ) : null}
            </h1>
            {lead ? (
              <p className="mb-8 text-xl leading-relaxed text-graphite-600">{lead}</p>
            ) : null}

            {items.length > 0 ? (
              <div className="flex flex-wrap gap-6">
                {items.map((item, i) => {
                  const Glyph = toneGlyph(item.tone)
                  return (
                    <div className="flex items-center gap-3" key={`${item.value}-${i}`}>
                      <div
                        className={cn(
                          'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl',
                          item.tone ? toneBox[item.tone] : toneBox.solar,
                        )}
                        aria-hidden
                      >
                        <Glyph className="h-6 w-6" strokeWidth={2} />
                      </div>
                      <div>
                        <p className="font-bold text-graphite-900">{item.value}</p>
                        <p className="text-sm text-graphite-500">{item.label}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : null}
          </div>

          <div className="fade-in-visible relative">
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              {typeof media === 'object' && media?.id ? (
                <Media
                  htmlElement={null}
                  resource={media}
                  imgClassName="h-[500px] w-full object-cover"
                />
              ) : null}
            </div>
            {cardTitle || cardSubtitle ? (
              <div className="absolute -right-6 -bottom-6 hidden rounded-2xl border border-graphite-100 bg-white p-6 shadow-xl lg:block">
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-eco-500 text-white"
                    aria-hidden
                  >
                    <Zap className="h-7 w-7" strokeWidth={2} />
                  </div>
                  <div>
                    {cardTitle ? (
                      <p className="text-2xl font-bold text-graphite-900">{cardTitle}</p>
                    ) : null}
                    {cardSubtitle ? (
                      <p className="text-graphite-600">{cardSubtitle}</p>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
