import React from 'react'

import type { BtcProcessStepsBlock } from '@/payload-types'

export const BtcProcessStepsBlockComponent: React.FC<BtcProcessStepsBlock> = (props) => {
  const { eyebrow, title, intro, steps } = props
  const resolvedSteps = steps ?? []

  return (
    <section className="bg-graphite-900 py-24 text-white">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        {eyebrow ? (
          <span className="text-sm font-semibold uppercase tracking-wider text-solar-400">{eyebrow}</span>
        ) : null}
        <h2 className="mt-4 mb-6 text-3xl font-bold md:text-5xl">{title}</h2>
        {intro ? (
          <p className="mx-auto mb-16 max-w-2xl text-lg text-graphite-300">{intro}</p>
        ) : null}
        <div className="grid gap-12 md:grid-cols-2 md:gap-10 lg:grid-cols-4 lg:gap-8">
          {resolvedSteps.map((step, index) => (
            <div className="text-center fade-in-visible" key={`${step.title}-${index}`}>
              <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-solar-400/20">
                <span className="text-3xl font-bold text-solar-400">{index + 1}</span>
                {index < resolvedSteps.length - 1 ? (
                  <div className="absolute left-full top-1/2 hidden h-px w-full bg-graphite-700 lg:block" />
                ) : null}
              </div>
              <h3 className="mb-3 text-xl font-bold">{step.title}</h3>
              <p className="text-graphite-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
