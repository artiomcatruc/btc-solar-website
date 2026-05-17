import React from 'react'

import type { Service } from '@/payload-types'
import type { BtcServicesGridBlock } from '@/payload-types'

import { serviceIconGlyph } from '@/utilities/mapServiceIcons'

const toneForIcon = (
  icon: Service['icon'],
): 'bg-solar-100 text-solar-600' | 'bg-eco-100 text-eco-600' | 'bg-graphite-100 text-graphite-600' => {
  if (icon === 'building') return 'bg-eco-100 text-eco-600'
  if (icon === 'bolt' || icon === 'home') return 'bg-solar-100 text-solar-600'
  return 'bg-graphite-100 text-graphite-600'
}

export const BtcServicesGridBlockComponent: React.FC<BtcServicesGridBlock> = (props) => {
  const { services } = props
  const list = (services || []).filter((s): s is Service => typeof s === 'object' && s?.id !== undefined)

  if (!list.length) {
    return (
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="rounded-3xl border border-dashed border-graphite-200 bg-graphite-50 p-12 text-center text-graphite-600">
            Add services documents and relate them here in the BTC Services Grid block.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="relative bg-graphite-50 py-24">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {list.map((service) => {
          const Glyph = serviceIconGlyph(service.icon)
          const tones = toneForIcon(service.icon)
          return (
            <div
              className="hover-lift rounded-3xl border border-graphite-100 bg-white p-8 shadow-sm"
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
