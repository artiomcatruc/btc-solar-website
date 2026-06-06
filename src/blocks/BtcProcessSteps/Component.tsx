import React from 'react'

import { BtcIconCircle, BTC_ICON_TONE_DARK_CLASS, type BtcIconTone } from '@/components/BtcIcon'
import { cn } from '@/utilities/ui'

import type { BtcProcessStepsBlock } from '@/payload-types'

type Background = NonNullable<BtcProcessStepsBlock['background']>
type Variant = NonNullable<BtcProcessStepsBlock['variant']>

type Step = NonNullable<BtcProcessStepsBlock['steps']>[number]

const isTone = (value?: string | null): value is BtcIconTone =>
  value === 'solar' || value === 'eco' || value === 'graphite'

const sectionClass: Record<Background, string> = {
  dark: 'bg-graphite-900 text-white',
  white: 'bg-white text-graphite-900',
}

const eyebrowClass: Record<Background, string> = {
  dark: 'text-solar-400',
  white: 'text-solar-500',
}

const introClass: Record<Background, string> = {
  dark: 'text-graphite-300',
  white: 'text-graphite-600',
}

const stepBodyClass: Record<Background, string> = {
  dark: 'text-graphite-400',
  white: 'text-graphite-600',
}

type SectionHeaderProps = Pick<BtcProcessStepsBlock, 'eyebrow' | 'title' | 'intro'> & {
  background: Background
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ eyebrow, title, intro, background }) => (
  <div className="fade-in-visible mb-16 text-center">
    {eyebrow ? (
      <span
        className={cn(
          'text-sm font-semibold uppercase tracking-wider',
          eyebrowClass[background],
        )}
      >
        {eyebrow}
      </span>
    ) : null}
    <h2 className="mt-4 mb-6 text-3xl font-bold md:text-5xl">{title}</h2>
    {intro ? (
      <p className={cn('mx-auto max-w-2xl text-lg', introClass[background])}>{intro}</p>
    ) : null}
  </div>
)

type ProcessStepProps = {
  step: Step
  index: number
  total: number
  background: Background
}

const ProcessStep: React.FC<ProcessStepProps> = ({ step, index, total, background }) => (
  <div className="fade-in-visible text-center">
    <div
      className={cn(
        'relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full',
        background === 'dark' ? 'bg-solar-400/20' : 'bg-solar-100',
      )}
    >
      <span
        className={cn(
          'text-3xl font-bold',
          background === 'dark' ? 'text-solar-400' : 'text-solar-500',
        )}
      >
        {index + 1}
      </span>
      {index < total - 1 ? (
        <div className="absolute left-full top-1/2 hidden h-px w-full bg-graphite-700 lg:block" />
      ) : null}
    </div>
    <h3 className="mb-3 text-xl font-bold">{step.title}</h3>
    <p className={stepBodyClass[background]}>{step.description}</p>
  </div>
)

type IconStepProps = {
  step: Step
  background: Background
}

const IconStep: React.FC<IconStepProps> = ({ step, background }) => {
  const tone = isTone(step.tone) ? step.tone : undefined

  return (
    <div className="fade-in-visible text-center">
      <BtcIconCircle
        boxClassName="mb-6"
        name={step.icon}
        theme={background === 'dark' ? 'dark' : 'light'}
        tone={tone}
      />
      <h3 className="mb-3 text-xl font-bold">{step.title}</h3>
      <p className={stepBodyClass[background]}>{step.description}</p>
    </div>
  )
}

type CardStepProps = {
  step: Step
}

const CardStep: React.FC<CardStepProps> = ({ step }) => {
  const tone = isTone(step.tone) ? step.tone : 'solar'

  return (
    <div className="fade-in-visible rounded-2xl border border-graphite-700 bg-graphite-800/50 p-6 text-center backdrop-blur-sm">
      <div
        className={cn(
          'mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full',
          BTC_ICON_TONE_DARK_CLASS[tone],
        )}
        aria-hidden
      >
        {step.badge ? <span className="text-2xl font-bold">{step.badge}</span> : null}
      </div>
      <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
      <p className="text-sm text-graphite-400">{step.description}</p>
    </div>
  )
}

export const BtcProcessStepsBlockComponent: React.FC<BtcProcessStepsBlock> = (props) => {
  const {
    variant = 'process',
    background = 'dark',
    eyebrow,
    title,
    intro,
    steps,
  } = props
  const resolvedSteps = steps ?? []
  const resolvedBackground: Background = background ?? 'dark'
  const resolvedVariant: Variant = variant ?? 'process'

  return (
    <section className={cn(sectionClass[resolvedBackground], 'py-24')}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          background={resolvedBackground}
          eyebrow={eyebrow}
          intro={intro}
          title={title}
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {resolvedSteps.map((step, index) => {
            const key = `${step.title}-${index}`

            if (resolvedVariant === 'icons') {
              return <IconStep background={resolvedBackground} key={key} step={step} />
            }

            if (resolvedVariant === 'cards') {
              return <CardStep key={key} step={step} />
            }

            return (
              <ProcessStep
                background={resolvedBackground}
                index={index}
                key={key}
                step={step}
                total={resolvedSteps.length}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
