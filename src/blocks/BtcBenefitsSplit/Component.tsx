import { Media } from '@/components/Media'
import { Landmark, Shield, Zap } from 'lucide-react'
import { cn } from '@/utilities/ui'
import React from 'react'

import type { BtcBenefitsSplitBlock } from '@/payload-types'

const toneBox: Record<
  NonNullable<BtcBenefitsSplitBlock['benefits']>[number]['tone'],
  string
> = {
  eco: 'bg-eco-100 text-eco-600',
  solar: 'bg-solar-100 text-solar-600',
  graphite: 'bg-graphite-100 text-graphite-600',
}

const toneGlyph = (tone?: string | null) => {
  if (tone === 'solar') return Zap
  if (tone === 'graphite') return Landmark
  return Shield
}

export const BtcBenefitsSplitBlockComponent: React.FC<BtcBenefitsSplitBlock> = (props) => {
  const { benefits = [], media, cardTitle, cardSubtitle } = props

  const items = benefits ?? []

  return (
    <section className="relative bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="space-y-6">
            {items.map((benefit, i) => {
              const Glyph = toneGlyph(benefit.tone)
              return (
                <div className="flex gap-4" key={`${benefit.title}-${i}`}>
                  <div
                    className={cn(
                      'flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl',
                      benefit.tone ? toneBox[benefit.tone] : toneBox.eco,
                    )}
                    aria-hidden
                  >
                    <Glyph className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-bold text-graphite-900">{benefit.title}</h3>
                    <p className="text-graphite-600">{benefit.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              {typeof media === 'object' && media?.id ? (
                <Media htmlElement={null} resource={media} imgClassName="h-[28rem] w-full object-cover" />
              ) : null}
            </div>
            {cardTitle || cardSubtitle ? (
              <div className="glass absolute -bottom-6 -left-6 rounded-2xl border border-graphite-100 p-6 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-eco-500 text-white">
                    <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <title>Check</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
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
