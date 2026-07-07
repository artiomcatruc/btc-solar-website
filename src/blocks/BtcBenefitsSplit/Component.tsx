import { Media } from '@/components/Media'
import { BtcIcon, BtcIconBox, BTC_ICON_TONE_CLASS, type BtcIconTone } from '@/components/BtcIcon'
import { cn } from '@/utilities/ui'
import React from 'react'

import type { BtcBenefitsSplitBlock } from '@/payload-types'

type ListStyle = NonNullable<BtcBenefitsSplitBlock['listStyle']>

type Benefit = NonNullable<BtcBenefitsSplitBlock['benefits']>[number]

const isTone = (value?: string | null): value is BtcIconTone =>
  value === 'solar' || value === 'eco' || value === 'graphite'

const toneIconName = (tone?: string | null): string => {
  if (tone === 'solar') return 'zap'
  if (tone === 'graphite') return 'chart'
  return 'shield'
}

type BenefitRowProps = {
  benefit: Benefit
  listStyle: ListStyle
  checkTone: BtcIconTone
}

const BenefitRow: React.FC<BenefitRowProps> = ({ benefit, listStyle, checkTone }) => {
  if (listStyle === 'checks') {
    return (
      <div className="flex gap-4">
        <div
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
            BTC_ICON_TONE_CLASS[checkTone],
          )}
          aria-hidden
        >
          <BtcIcon className="h-5 w-5" name="check" strokeWidth={2} />
        </div>
        <div>
          <h3 className="mb-2 text-lg font-bold text-graphite-900">{benefit.title}</h3>
          <p className="text-graphite-600">{benefit.description}</p>
        </div>
      </div>
    )
  }

  const tone = isTone(benefit.tone) ? benefit.tone : 'eco'

  return (
    <div className="flex gap-4">
      <BtcIconBox name={toneIconName(tone)} size="sm" tone={tone} />
      <div>
        <h3 className="mb-2 text-lg font-bold text-graphite-900">{benefit.title}</h3>
        <p className="text-graphite-600">{benefit.description}</p>
      </div>
    </div>
  )
}

type ContentColumnProps = Pick<
  BtcBenefitsSplitBlock,
  'eyebrow' | 'heading' | 'benefits' | 'listStyle' | 'checkTone'
> & {
  className?: string
}

const ContentColumn: React.FC<ContentColumnProps> = ({
  eyebrow,
  heading,
  benefits = [],
  listStyle = 'icons',
  checkTone = 'solar',
  className,
}) => {
  const items = benefits ?? []
  const resolvedCheckTone = isTone(checkTone) ? checkTone : 'solar'

  return (
    <div className={cn('fade-in-visible', className)}>
      {eyebrow ? (
        <span className="text-sm font-semibold uppercase tracking-wider text-solar-500">
          {eyebrow}
        </span>
      ) : null}
      {heading ? (
        <h2 className="mt-4 mb-8 text-3xl font-bold text-graphite-900 md:text-5xl">{heading}</h2>
      ) : null}

      <div className="space-y-6">
        {items.map((benefit, i) => (
          <BenefitRow
            benefit={benefit}
            checkTone={resolvedCheckTone}
            key={`${benefit.title}-${i}`}
            listStyle={listStyle ?? 'icons'}
          />
        ))}
      </div>
    </div>
  )
}

type MediaColumnProps = Pick<BtcBenefitsSplitBlock, 'media' | 'cardTitle' | 'cardSubtitle'> & {
  className?: string
}

const MediaColumn: React.FC<MediaColumnProps> = ({
  media,
  cardTitle,
  cardSubtitle,
  className,
}) => (
  <div className={cn('fade-in-visible relative', className)}>
    <div className="overflow-hidden rounded-3xl shadow-2xl">
      {typeof media === 'object' && media?.id ? (
        <Media htmlElement={null} resource={media} imgClassName="h-[500px] w-full object-cover" />
      ) : null}
    </div>
    {cardTitle || cardSubtitle ? (
      <div className="absolute -bottom-6 -left-6 rounded-2xl border border-graphite-100 bg-white p-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-eco-500 text-white"
            aria-hidden
          >
            <BtcIcon className="h-7 w-7" name="check" strokeWidth={2} />
          </div>
          <div>
            {cardTitle ? <p className="text-2xl font-bold text-graphite-900">{cardTitle}</p> : null}
            {cardSubtitle ? <p className="text-graphite-600">{cardSubtitle}</p> : null}
          </div>
        </div>
      </div>
    ) : null}
  </div>
)

export const BtcBenefitsSplitBlockComponent: React.FC<BtcBenefitsSplitBlock> = (props) => {
  const {
    eyebrow,
    heading,
    benefits,
    media,
    cardTitle,
    cardSubtitle,
    mediaPosition = 'right',
    listStyle = 'icons',
    checkTone = 'solar',
  } = props

  const mediaOnLeft = mediaPosition === 'left'

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <MediaColumn
            className={cn(
              'order-2',
              mediaOnLeft ? 'lg:order-1' : 'lg:order-2',
            )}
            cardSubtitle={cardSubtitle}
            cardTitle={cardTitle}
            media={media}
          />
          <ContentColumn
            benefits={benefits}
            checkTone={checkTone}
            className={cn(
              'order-1',
              mediaOnLeft ? 'lg:order-2' : 'lg:order-1',
            )}
            eyebrow={eyebrow}
            heading={heading}
            listStyle={listStyle}
          />
        </div>
      </div>
    </section>
  )
}
