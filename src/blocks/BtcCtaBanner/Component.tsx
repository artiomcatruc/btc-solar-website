import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import React from 'react'

import type { BtcCtaBannerBlock } from '@/payload-types'

export const BtcCtaBannerBlockComponent: React.FC<BtcCtaBannerBlock> = (props) => {
  const { background, title, description, links } = props

  return (
    <section className="relative overflow-hidden bg-graphite-900 py-24 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-20">
        {typeof background === 'object' && background?.id ? (
          <Media
            htmlElement="div"
            className="h-full w-full"
            imgClassName="h-full w-full object-cover"
            fill
            resource={background}
          />
        ) : null}
      </div>
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-6 text-3xl font-bold md:text-5xl">{title}</h2>
        {description ? (
          <p className="mx-auto mb-10 max-w-2xl text-xl text-graphite-300">{description}</p>
        ) : null}
        {Array.isArray(links) && links.length > 0 ? (
          <ul className="flex flex-col flex-wrap justify-center gap-4 sm:flex-row">
            {links.map(({ link }, i) => (
              <li key={`cta-${link?.label}-${i}`}>
                <CMSLink
                  {...link}
                  appearance="inline"
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full px-8 py-4 font-semibold transition-colors',
                    i === 0 ? 'bg-solar-400 text-graphite-900 hover:bg-solar-300' : 'border border-white/20 bg-white/10 hover:bg-white/20',
                  )}
                />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  )
}
