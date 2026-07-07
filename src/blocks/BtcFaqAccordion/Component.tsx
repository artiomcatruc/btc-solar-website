'use client'

import React, { useState } from 'react'

import type { BtcFaqAccordionBlock, Faq } from '@/payload-types'

const Chevron: React.FC<{ open?: boolean }> = ({ open }) => (
  <svg
    className={`h-5 w-5 text-graphite-400 transition-transform ${open ? 'rotate-180' : ''}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
  </svg>
)

export const BtcFaqAccordionBlockComponent: React.FC<BtcFaqAccordionBlock> = (props) => {
  const { eyebrow, title } = props
  const entries = props.entries ?? []
  const rows = entries.filter((e): e is Faq => typeof e === 'object' && !!e?.id)
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-4xl px-4 fade-in-visible sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          {eyebrow ? (
            <span className="text-sm font-semibold uppercase tracking-wider text-solar-500">{eyebrow}</span>
          ) : null}
          <h2 className="mt-4 mb-6 text-3xl font-bold text-graphite-900 md:text-5xl">{title}</h2>
        </div>
        {!rows.length ? (
          <p className="text-center text-graphite-600">Link FAQ entries here to render the accordion.</p>
        ) : (
          <div className="space-y-4">
            {rows.map((faq, index) => {
              const open = openIdx === index
              return (
                <div
                  className="overflow-hidden rounded-2xl border border-graphite-200 fade-in-visible"
                  key={faq.id}
                >
                  <button
                    className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-graphite-50"
                    aria-expanded={open}
                    type="button"
                    onClick={() => setOpenIdx(open ? null : index)}
                  >
                    <span className="pr-6 font-semibold text-graphite-900">{faq.question}</span>
                    <Chevron open={open} />
                  </button>
                  {open ? (
                    <div className="border-t border-graphite-100 px-6 pb-6 pt-4 text-graphite-600">
                      <p>{faq.answer}</p>
                    </div>
                  ) : null}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
