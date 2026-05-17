import { cn } from '@/utilities/ui'
import React from 'react'

import type { BtcSectionIntroBlock } from '@/payload-types'

export const BtcSectionIntroBlockComponent: React.FC<BtcSectionIntroBlock> = (props) => {
  const { eyebrow, heading, lead, align = 'center' } = props
  const isLeft = align === 'left'

  return (
    <div className={cn(isLeft ? 'text-left' : 'text-center', 'fade-in-visible mb-16')}>
      {eyebrow ? (
        <span className="text-sm font-semibold uppercase tracking-wider text-solar-500">{eyebrow}</span>
      ) : null}
      <h2 className={cn('mt-4 mb-6 text-3xl font-bold text-graphite-900 md:text-5xl', isLeft ? '' : 'mx-auto')}>
        {heading}
      </h2>
      {lead ? (
        <p
          className={cn(
            'max-w-2xl text-lg text-graphite-600 leading-relaxed',
            isLeft ? '' : 'mx-auto',
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  )
}
