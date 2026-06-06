import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import React from 'react'

import type { BtcCtaBannerBlock } from '@/payload-types'

type ColorScheme = NonNullable<BtcCtaBannerBlock['colorScheme']>

const ButtonArrow = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
)

const sectionClass: Record<ColorScheme, string> = {
  dark: 'bg-graphite-900 text-white',
  graphite: 'bg-graphite-50 text-graphite-900',
}

const descriptionClass: Record<ColorScheme, string> = {
  dark: 'text-graphite-300',
  graphite: 'text-graphite-600',
}

const primaryButtonClass: Record<ColorScheme, string> = {
  dark: 'bg-solar-400 text-graphite-900 hover:bg-solar-300',
  graphite: 'bg-graphite-900 text-white hover:bg-graphite-800',
}

const secondaryButtonClass: Record<ColorScheme, string> = {
  dark: 'border border-white/20 bg-white/10 text-white hover:bg-white/20',
  graphite: 'border border-graphite-200 bg-white text-graphite-900 hover:bg-graphite-100',
}

export const BtcCtaBannerBlockComponent: React.FC<BtcCtaBannerBlock> = (props) => {
  const { colorScheme = 'dark', image, title, description, links } = props
  const resolvedScheme: ColorScheme = colorScheme ?? 'dark'

  return (
    <section className={cn('relative overflow-hidden py-24', sectionClass[resolvedScheme])}>
      {resolvedScheme === 'dark' && typeof image === 'object' && image?.id ? (
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <Media
            className="h-full w-full"
            fill
            htmlElement="div"
            imgClassName="h-full w-full object-cover"
            resource={image}
          />
        </div>
      ) : null}

      <div className="fade-in-visible relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-6 text-3xl font-bold md:text-5xl">{title}</h2>
        {description ? (
          <p className={cn('mx-auto mb-10 max-w-2xl text-xl', descriptionClass[resolvedScheme])}>
            {description}
          </p>
        ) : null}
        {Array.isArray(links) && links.length > 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            {links.map(({ link }, i) => (
              <CMSLink
                key={`cta-${link?.label}-${i}`}
                {...link}
                appearance="inline"
                className={cn(
                  'flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 font-semibold transition-colors sm:w-auto',
                  i === 0 ? primaryButtonClass[resolvedScheme] : secondaryButtonClass[resolvedScheme],
                )}
              >
                {i === 0 ? <ButtonArrow /> : null}
              </CMSLink>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
