import React from 'react'

import type { Service } from '@/payload-types'
import type { BtcServicesGridBlock } from '@/payload-types'

import { serviceIconGlyph } from '@/utilities/mapServiceIcons'
import { cn } from '@/utilities/ui'

const toneForIcon = (
  icon: Service['icon'],
): 'bg-solar-100 text-solar-500' | 'bg-eco-100 text-eco-500' | 'bg-graphite-100 text-graphite-600' => {
  if (icon === 'building') return 'bg-eco-100 text-eco-500'
  if (icon === 'bolt' || icon === 'home') return 'bg-solar-100 text-solar-500'
  return 'bg-graphite-100 text-graphite-600'
}

type Props = BtcServicesGridBlock & {
  followsSectionIntro?: boolean
}

export const BtcServicesGridBlockComponent: React.FC<Props> = (props) => {
  const { services, followsSectionIntro = false } = props
  const list = (services || []).filter((s): s is Service => typeof s === 'object' && s?.id !== undefined)

  const sectionClass = cn(
    'bg-graphite-50',
    followsSectionIntro ? 'pb-24 pt-0' : 'py-24',
  )

  if (!list.length) {
    return (
      <section className={sectionClass}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="rounded-3xl border border-dashed border-graphite-200 bg-white p-12 text-center text-graphite-600">
            Add services documents and relate them here in the BTC Services Grid block.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className={sectionClass}>
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {list.map((service) => {
          const Glyph = serviceIconGlyph(service.icon)
          const tones = toneForIcon(service.icon)
          return (
            <div
              className="hover-lift fade-in-visible rounded-3xl border border-graphite-100 bg-white p-8 shadow-sm"
              key={service.id}
            >
              <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${tones}`}>
                <Glyph className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-graphite-900">{service.title}</h3>
              <p className="leading-relaxed text-graphite-600">{service.summary}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
