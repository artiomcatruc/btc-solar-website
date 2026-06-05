import { cn } from '@/utilities/ui'
import React from 'react'

import type { BtcSectionIntroBlock } from '@/payload-types'

type Props = BtcSectionIntroBlock & {
  continuesToServicesGrid?: boolean
}

export const BtcSectionIntroBlockComponent: React.FC<Props> = (props) => {
  const { eyebrow, heading, lead, align = 'center', continuesToServicesGrid = false } = props
  const isLeft = align === 'left'

  return (
    <section className={cn('bg-graphite-50 pt-24', continuesToServicesGrid ? 'pb-16' : 'pb-24')}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={cn('fade-in-visible', isLeft ? 'text-left' : 'text-center')}>
          {eyebrow ? (
            <span className="text-sm font-semibold uppercase tracking-wider text-solar-500">
              {eyebrow}
            </span>
          ) : null}
          <h2 className="mt-4 mb-6 text-3xl font-bold text-graphite-900 md:text-5xl">{heading}</h2>
          {lead ? (
            <p
              className={cn(
                'max-w-2xl text-lg leading-relaxed text-graphite-600',
                isLeft ? '' : 'mx-auto',
              )}
            >
              {lead}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  )
}
