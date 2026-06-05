import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import React from 'react'

import type { BtcHeroBlock } from '@/payload-types'

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

export const BtcHeroBlockComponent: React.FC<BtcHeroBlock> = (props) => {
  const { badge, headline, headlineAccent, description, background, buttons } = props

  return (
    <section className="relative -mt-20 flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        {typeof background === 'object' && background?.id ? (
          <Media
            className="absolute inset-0 h-full w-full"
            fill
            htmlElement="div"
            imgClassName="h-full w-full object-cover"
            priority
            resource={background}
          />
        ) : null}
        <div className="hero-gradient absolute inset-0" />
      </div>
      <div className="fade-in-visible relative z-10 mx-auto w-full max-w-7xl px-4 pt-20 text-center sm:px-6 lg:px-8">
        {badge ? (
          <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-eco-400" />
            {badge}
          </span>
        ) : null}
        <h1 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-7xl">
          {headline ? <span className="block">{headline}</span> : null}
          {headlineAccent ? <span className="block gradient-text">{headlineAccent}</span> : null}
        </h1>
        {description ? (
          <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-graphite-200">
            {description}
          </p>
        ) : null}
        {Array.isArray(buttons) && buttons.length > 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            {buttons.map(({ link }, i) => (
              <CMSLink
                key={`${link?.label}-${i}`}
                {...link}
                appearance="inline"
                className={cn(
                  'flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 font-semibold transition-colors sm:w-auto',
                  i === 0
                    ? 'bg-solar-400 text-graphite-900 hover:bg-solar-300'
                    : 'border border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20',
                )}
              >
                {i === 0 ? <ButtonArrow /> : null}
              </CMSLink>
            ))}
          </div>
        ) : null}
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="h-6 w-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  )
}
