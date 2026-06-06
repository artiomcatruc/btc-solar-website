import { cn } from '@/utilities/ui'
import React from 'react'

import type { BtcSectionIntroBlock } from '@/payload-types'

type Props = BtcSectionIntroBlock & {
  continuesToServicesGrid?: boolean
}

type Align = NonNullable<BtcSectionIntroBlock['align']>

const alignClass: Record<Align, string> = {
  center: 'text-center',
  left: 'text-left',
  right: 'text-right',
}

const splitLeadParagraphs = (lead?: string | null): string[] => {
  if (!lead?.trim()) return []

  return lead
    .split(/\n\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}

export const BtcSectionIntroBlockComponent: React.FC<Props> = (props) => {
  const { eyebrow, heading, lead, align = 'center', continuesToServicesGrid = false } = props
  const textAlign = alignClass[align ?? 'center']
  const paragraphs = splitLeadParagraphs(lead)
  const isProseLayout = paragraphs.length > 1

  if (isProseLayout) {
    return (
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className={cn('fade-in-visible mb-16', textAlign)}>
              {eyebrow ? (
                <span className="text-sm font-semibold uppercase tracking-wider text-solar-500">
                  {eyebrow}
                </span>
              ) : null}
              <h2 className="mt-4 mb-6 text-3xl font-bold text-graphite-900 md:text-5xl">{heading}</h2>
            </div>

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
          </div>
        </div>
      </section>
    )
  }

  const leadText = paragraphs[0] ?? lead?.trim()

  return (
    <section className={cn('bg-graphite-50 pt-24', continuesToServicesGrid ? 'pb-16' : 'pb-24')}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div
            className={cn('fade-in-visible', textAlign, continuesToServicesGrid ? 'mb-16' : undefined)}
          >
            {eyebrow ? (
              <span className="text-sm font-semibold uppercase tracking-wider text-solar-500">
                {eyebrow}
              </span>
            ) : null}
            <h2 className="mt-4 mb-6 text-3xl font-bold text-graphite-900 md:text-5xl">{heading}</h2>
            {leadText ? (
              <p className="text-lg leading-relaxed text-graphite-600">{leadText}</p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
