import { cn } from '@/utilities/ui'
import React from 'react'

import type { BtcSectionIntroBlock } from '@/payload-types'

type Align = NonNullable<BtcSectionIntroBlock['align']>
type Background = NonNullable<BtcSectionIntroBlock['background']>

const alignClass: Record<Align, string> = {
  center: 'text-center',
  left: 'text-left',
  right: 'text-right',
}

const backgroundClass: Record<Background, string> = {
  graphite: 'bg-graphite-50',
  white: 'bg-white',
}

const splitLeadParagraphs = (lead?: string | null): string[] => {
  if (!lead?.trim()) return []

  return lead
    .split(/\n\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}

export const BtcSectionIntroBlockComponent: React.FC<BtcSectionIntroBlock> = (props) => {
  const { eyebrow, heading, lead, align = 'center', background = 'graphite' } = props
  const textAlign = alignClass[align ?? 'center']
  const paragraphs = splitLeadParagraphs(lead)
  const isProseLayout = paragraphs.length > 1
  const leadText = paragraphs[0] ?? lead?.trim()

  return (
    <section className={cn(backgroundClass[background ?? 'graphite'], 'py-24')}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className={cn('fade-in-visible', textAlign, isProseLayout ? 'mb-16' : undefined)}>
            {eyebrow ? (
              <span className="text-sm font-semibold uppercase tracking-wider text-solar-500">
                {eyebrow}
              </span>
            ) : null}
            <h2 className="mt-4 mb-6 text-3xl font-bold text-graphite-900 md:text-5xl">{heading}</h2>
            {!isProseLayout && leadText ? (
              <p className="text-lg leading-relaxed text-graphite-600">{leadText}</p>
            ) : null}
          </div>

          {isProseLayout ? (
            <div className={cn('prose prose-lg fade-in-visible max-w-none', textAlign)}>
              {paragraphs.map((paragraph, i) => (
                <p
                  className={cn(
                    'text-lg leading-relaxed text-graphite-600',
                    i < paragraphs.length - 1 ? 'mb-6' : undefined,
                  )}
                  key={`${i}-${paragraph.slice(0, 24)}`}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
