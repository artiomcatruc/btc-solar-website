import { cn } from '@/utilities/ui'
import React, { createElement } from 'react'

import {
  BTC_ICON_TONE_CLASS,
  BTC_ICON_TONE_DARK_CLASS,
  getBtcIconComponent,
  getBtcIconTone,
  type BtcIconTone,
} from './registry'

export {
  BTC_ICON_KEYS,
  BTC_ICON_LABELS,
  BTC_ICON_MAP,
  BTC_ICON_SELECT_OPTIONS,
  BTC_ICON_TONE,
  BTC_ICON_TONE_CLASS,
  BTC_ICON_TONE_DARK_CLASS,
  getBtcIconComponent,
  getBtcIconTone,
  isBtcIconKey,
  type BtcIconKey,
  type BtcIconTone,
} from './registry'

type BtcIconProps = {
  name?: string | null
  className?: string
  strokeWidth?: number
}

/** Renders a lucide glyph from the shared BTC icon registry. */
export const BtcIcon: React.FC<BtcIconProps> = ({ name, className, strokeWidth = 2 }) =>
  createElement(getBtcIconComponent(name), {
    'aria-hidden': true,
    className,
    strokeWidth,
  })

type BtcIconBoxSize = 'sm' | 'md' | 'lg'

const boxSizeClass: Record<BtcIconBoxSize, string> = {
  sm: 'h-12 w-12',
  md: 'h-14 w-14',
  lg: 'h-16 w-16',
}

const iconSizeClass: Record<BtcIconBoxSize, string> = {
  sm: 'h-6 w-6',
  md: 'h-7 w-7',
  lg: 'h-8 w-8',
}

type BtcIconBoxProps = BtcIconProps & {
  size?: BtcIconBoxSize
  tone?: BtcIconTone | null
  boxClassName?: string
}

/** Icon inside the standard rounded BTC tile (solar/eco/graphite tone from registry). */
export const BtcIconBox: React.FC<BtcIconBoxProps> = ({
  name,
  size = 'md',
  tone,
  className,
  boxClassName,
  strokeWidth = 2,
}) => {
  const resolvedTone = tone ?? getBtcIconTone(name)

  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center rounded-2xl',
        boxSizeClass[size],
        BTC_ICON_TONE_CLASS[resolvedTone],
        boxClassName,
      )}
      aria-hidden
    >
      <BtcIcon className={cn(iconSizeClass[size], className)} name={name} strokeWidth={strokeWidth} />
    </div>
  )
}

type BtcIconCircleSize = 'md' | 'lg'

const circleBoxSizeClass: Record<BtcIconCircleSize, string> = {
  md: 'h-16 w-16',
  lg: 'h-20 w-20',
}

const circleIconSizeClass: Record<BtcIconCircleSize, string> = {
  md: 'h-8 w-8',
  lg: 'h-10 w-10',
}

type BtcIconCircleProps = BtcIconProps & {
  tone?: BtcIconTone | null
  size?: BtcIconCircleSize
  theme?: 'light' | 'dark'
  boxClassName?: string
}

/** Icon inside a circular BTC tile (values grid, process markers). */
export const BtcIconCircle: React.FC<BtcIconCircleProps> = ({
  name,
  tone,
  size = 'lg',
  theme = 'light',
  className,
  boxClassName,
  strokeWidth = 2,
}) => {
  const resolvedTone = tone ?? getBtcIconTone(name)
  const toneClass =
    theme === 'dark' ? BTC_ICON_TONE_DARK_CLASS[resolvedTone] : BTC_ICON_TONE_CLASS[resolvedTone]

  return (
    <div
      className={cn(
        'mx-auto flex shrink-0 items-center justify-center rounded-full',
        circleBoxSizeClass[size],
        toneClass,
        boxClassName,
      )}
      aria-hidden
    >
      <BtcIcon
        className={cn(circleIconSizeClass[size], className)}
        name={name}
        strokeWidth={strokeWidth}
      />
    </div>
  )
}
