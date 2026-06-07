'use client'

import * as React from 'react'

import { useFormAppearance } from '../appearance'

export const Width: React.FC<{
  children: React.ReactNode
  className?: string
  width?: number | string
}> = ({ children, className, width }) => {
  const appearance = useFormAppearance()
  const isBtc = appearance === 'btc'

  return (
    <div
      className={className}
      style={!isBtc && width ? { maxWidth: `${width}%` } : undefined}
    >
      {children}
    </div>
  )
}
