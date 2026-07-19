'use client'

import React from 'react'

type Props = {
  cellData?: boolean | null
}

export const SoldOutCell: React.FC<Props> = ({ cellData }) => {
  const soldOut = Boolean(cellData)

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: 999,
        padding: '2px 10px',
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: '0.02em',
        background: soldOut ? 'rgba(239, 68, 68, 0.14)' : 'rgba(34, 197, 94, 0.16)',
        color: soldOut ? '#b91c1c' : '#15803d',
      }}
    >
      {soldOut ? 'Sold out' : 'In stock'}
    </span>
  )
}
