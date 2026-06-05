import React from 'react'

import type { BtcStatsRowBlock } from '@/payload-types'

import { getCachedHomeStats } from '@/utilities/getHomeStats'

type InlineStat = NonNullable<BtcStatsRowBlock['stats']>[number]

type StatRow = {
  value: string
  label: string
}

const parseStatValue = (value: string): { main: string; accent: string } => {
  const trimmed = value.trim()
  const match = trimmed.match(/^([\d,.]+)\s*(.*)$/)

  if (!match?.[1]) {
    return { main: trimmed, accent: '' }
  }

  return { main: match[1], accent: match[2] ?? '' }
}

export async function BtcStatsRowComponent(props: BtcStatsRowBlock) {
  const { stats = [], preferGlobalHomeStats } = props

  const inlineRows =
    stats?.filter(
      (s: InlineStat) => (s?.value ?? '').toString().trim() && (s?.label ?? '').toString().trim(),
    ) ?? []

  let rows: StatRow[] = inlineRows.map((s: InlineStat) => ({
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
          {rows.map((stat, i) => {
            const { main, accent } = parseStatValue(stat.value)

            return (
              <div className="fade-in-visible text-center" key={`${stat.value}-${stat.label}-${i}`}>
                <p className="mb-2 text-4xl font-bold text-graphite-900 md:text-6xl">
                  {main}
                  {accent ? <span className="text-solar-500">{accent}</span> : null}
                </p>
                <p className="font-medium text-graphite-600">{stat.label}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
