import { cn } from '@/utilities/ui'
import React from 'react'

import {
  BTC_ICON_TONE_CLASS,
  getBtcIconComponent,
  getBtcIconTone,
  type BtcIconKey,
} from './registry'

export {
  BTC_ICON_KEYS,
  BTC_ICON_LABELS,
  BTC_ICON_MAP,
  BTC_ICON_SELECT_OPTIONS,
  BTC_ICON_TONE,
  BTC_ICON_TONE_CLASS,
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
export const BtcIcon: React.FC<BtcIconProps> = ({ name, className, strokeWidth = 2 }) => {
  const Icon = getBtcIconComponent(name)
  return <Icon aria-hidden className={className} strokeWidth={strokeWidth} />
}

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
  boxClassName?: string
}

/** Icon inside the standard rounded BTC tile (solar/eco/graphite tone from registry). */
export const BtcIconBox: React.FC<BtcIconBoxProps> = ({
  name,
  size = 'md',
  className,
  boxClassName,
  strokeWidth = 2,
}) => {
  const tone = getBtcIconTone(name)

  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center rounded-2xl',
        boxSizeClass[size],
        BTC_ICON_TONE_CLASS[tone],
        boxClassName,
      )}
      aria-hidden
    >
      <BtcIcon className={cn(iconSizeClass[size], className)} name={name} strokeWidth={strokeWidth} />
    </div>
  )
}
