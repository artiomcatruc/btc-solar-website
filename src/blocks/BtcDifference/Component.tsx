import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import React from 'react'

import type { BtcDifferenceBlock } from '@/payload-types'

type Background = NonNullable<BtcDifferenceBlock['background']>
type Tone = 'solar' | 'eco' | 'graphite'

type Card = NonNullable<BtcDifferenceBlock['cards']>[number]

const backgroundClass: Record<Background, string> = {
  graphite: 'bg-graphite-50',
  white: 'bg-white',
}

const badgeToneClass: Record<Tone, string> = {
  solar: 'bg-solar-500 text-white',
  eco: 'bg-eco-500 text-white',
  graphite: 'bg-graphite-700 text-white',
}

const highlightToneClass: Record<Tone, string> = {
  solar: 'text-solar-600',
  eco: 'text-eco-600',
  graphite: 'text-graphite-600',
}

const isTone = (value?: string | null): value is Tone =>
  value === 'solar' || value === 'eco' || value === 'graphite'

const gridClass = (columns: string, count: number): string => {
  if (count === 1) return 'mx-auto max-w-xl'
  if (columns === '3') return 'grid gap-8 md:grid-cols-2 lg:grid-cols-3'
  return 'grid gap-8 md:grid-cols-2'
}

type DifferenceCardProps = {
  card: Card
}

const DifferenceCard: React.FC<DifferenceCardProps> = ({ card }) => {
  const badgeTone = isTone(card.badgeTone) ? card.badgeTone : 'eco'
  const highlightTone = isTone(card.highlightTone) ? card.highlightTone : 'eco'

  return (
    <article className="fade-in-visible overflow-hidden rounded-3xl border border-graphite-100 bg-white shadow-lg">
      <div className="relative">
        {typeof card.image === 'object' && card.image?.id ? (
          <Media
            htmlElement={null}
            resource={card.image}
            imgClassName="h-[300px] w-full object-cover"
          />
        ) : null}
        {card.badge ? (
          <span
            className={cn(
              'absolute top-4 left-4 rounded-full px-4 py-2 text-sm font-semibold',
              badgeToneClass[badgeTone],
            )}
          >
            {card.badge}
          </span>
        ) : null}
      </div>
      <div className="p-6">
        <h3 className="mb-2 text-xl font-bold text-graphite-900">{card.title}</h3>
        <p className="mb-4 text-graphite-600">{card.description}</p>
        {card.metaLabel || card.metaValue || card.highlight ? (
          <div className="flex items-center justify-between text-sm">
            {card.metaLabel || card.metaValue ? (
              <span className="text-graphite-500">
                {card.metaLabel ? `${card.metaLabel}: ` : null}
                {card.metaValue ? (
                  <strong className="text-graphite-900">{card.metaValue}</strong>
                ) : null}
              </span>
            ) : (
              <span />
            )}
            {card.highlight ? (
              <span className={cn('font-semibold', highlightToneClass[highlightTone])}>
                {card.highlight}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  )
}

export const BtcDifferenceBlockComponent: React.FC<BtcDifferenceBlock> = (props) => {
  const {
    background = 'graphite',
    eyebrow,
    heading,
    intro,
    columns = '2',
    cards = [],
  } = props

  const items = cards ?? []

  return (
    <section className={cn(backgroundClass[background ?? 'graphite'], 'py-24')}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="fade-in-visible mb-16 text-center">
          {eyebrow ? (
            <span className="text-sm font-semibold uppercase tracking-wider text-solar-500">
              {eyebrow}
            </span>
          ) : null}
          <h2 className="mt-4 mb-6 text-3xl font-bold text-graphite-900 md:text-5xl">{heading}</h2>
          {intro ? (
            <p className="mx-auto max-w-2xl text-lg text-graphite-600">{intro}</p>
          ) : null}
        </div>

        {!items.length ? (
          <p className="rounded-3xl border border-dashed border-graphite-200 bg-white p-12 text-center text-graphite-600">
            Add cards to the BTC Difference block.
          </p>
        ) : (
          <div className={gridClass(columns ?? '2', items.length)}>
            {items.map((card, i) => (
              <DifferenceCard card={card} key={`${card.title}-${i}`} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
