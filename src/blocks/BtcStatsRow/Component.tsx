import React from 'react'

import type { BtcStatsRowBlock } from '@/payload-types'

import { getCachedHomeStats } from '@/utilities/getHomeStats'

type InlineStat = NonNullable<BtcStatsRowBlock['stats']>[number]

export async function BtcStatsRowComponent(props: BtcStatsRowBlock) {
  const { stats = [], preferGlobalHomeStats } = props

  const inlineRows =
    stats?.filter(
      (s: InlineStat) => (s?.value ?? '').toString().trim() && (s?.label ?? '').toString().trim(),
    ) ?? []

  let rows = inlineRows.map((s: InlineStat) => ({
    value: s.value ?? '',
    label: s.label ?? '',
  }))

  if (!rows.length && preferGlobalHomeStats) {
    const globalDoc = await getCachedHomeStats()
    const globalsRows = Array.isArray(globalDoc.stats)
      ? (globalDoc.stats as { id?: unknown; value?: string | null; label?: string | null }[])
      : []
    rows =
      globalsRows
        ?.filter(
          (entry) =>
            (entry?.value ?? '').toString().trim().length &&
            (entry?.label ?? '').toString().trim().length,
        )
        .map((entry) => ({
          value: entry.value ?? '',
          label: entry.label ?? '',
        })) ?? []
  }

  if (!rows.length) return null

  return (
    <section className="bg-white py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:gap-12 lg:px-8">
        {rows.map((stat, i) => (
          <div className="fade-in-visible text-center" key={`${stat.value}-${stat.label}-${i}`}>
            <p className="mb-2 text-4xl font-bold text-graphite-900 md:text-6xl">{stat.value}</p>
            <p className="font-medium text-graphite-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
