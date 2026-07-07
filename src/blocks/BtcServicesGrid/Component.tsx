import React from 'react'

import type { Service } from '@/payload-types'
import type { BtcServicesGridBlock } from '@/payload-types'

import { BtcIconBox } from '@/components/BtcIcon'
import { cn } from '@/utilities/ui'

type Background = NonNullable<BtcServicesGridBlock['background']>
type CardVariant = 'compact' | 'feature'

const backgroundClass: Record<Background, string> = {
  graphite: 'bg-graphite-50',
  white: 'bg-white',
}

const cardVariantForCount = (count: number): CardVariant => {
  if (count >= 3) return 'compact'
  return 'feature'
}

const gridClassForCount = (count: number): string => {
  if (count === 1) return 'mx-auto max-w-2xl'
  if (count === 2) return 'grid gap-16 lg:grid-cols-2'
  return 'grid gap-8 md:grid-cols-2 lg:grid-cols-3'
}

type ServiceCardProps = {
  service: Service
  variant: CardVariant
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, variant }) => {
  const isFeature = variant === 'feature'

  return (
    <div
      className={cn(
        'fade-in-visible rounded-3xl border border-graphite-100 bg-white shadow-sm',
        isFeature ? 'h-full p-10' : 'hover-lift p-8',
      )}
    >
      <BtcIconBox
        boxClassName={isFeature ? 'mb-8' : 'mb-6'}
        name={service.icon}
        size={isFeature ? 'lg' : 'md'}
      />
      <h3
        className={cn(
          'font-bold text-graphite-900',
          isFeature ? 'mb-4 text-2xl' : 'mb-3 text-xl',
        )}
      >
        {service.title}
      </h3>
      <p
        className={cn(
          'leading-relaxed text-graphite-600',
          isFeature ? 'text-lg' : undefined,
        )}
      >
        {service.summary}
      </p>
    </div>
  )
}

export const BtcServicesGridBlockComponent: React.FC<BtcServicesGridBlock> = (props) => {
  const { services, background = 'graphite' } = props
  const list = (services || []).filter((s): s is Service => typeof s === 'object' && s?.id !== undefined)
  const variant = cardVariantForCount(list.length)

  return (
    <section className={cn(backgroundClass[background ?? 'graphite'], 'py-24')}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {!list.length ? (
          <p className="rounded-3xl border border-dashed border-graphite-200 bg-white p-12 text-center text-graphite-600">
            Add services documents and relate them here in the BTC Services Grid block.
          </p>
        ) : (
          <div className={gridClassForCount(list.length)}>
            {list.map((service) => (
              <ServiceCard key={service.id} service={service} variant={variant} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
