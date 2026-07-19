'use client'

import { Link, useConfig } from '@payloadcms/ui'
import React from 'react'

type Status = 'new' | 'contacted' | 'fulfilled' | 'cancelled'

type Props = {
  cellData?: Status | null
  link?: boolean
  linkURL?: string
  collectionSlug?: string
  rowData?: { id?: string | number }
  viewType?: string
}

const styles: Record<Status, { bg: string; color: string; label: string }> = {
  new: { bg: 'rgba(234, 179, 8, 0.18)', color: '#a16207', label: 'New' },
  contacted: { bg: 'rgba(59, 130, 246, 0.16)', color: '#1d4ed8', label: 'Contacted' },
  fulfilled: { bg: 'rgba(34, 197, 94, 0.16)', color: '#15803d', label: 'Fulfilled' },
  cancelled: { bg: 'rgba(239, 68, 68, 0.14)', color: '#b91c1c', label: 'Cancelled' },
}

export const OrderStatusCell: React.FC<Props> = ({
  cellData,
  link,
  linkURL,
  collectionSlug,
  rowData,
  viewType,
}) => {
  const {
    config: {
      routes: { admin: adminRoute },
    },
  } = useConfig()

  const status = (cellData && styles[cellData] ? cellData : 'new') as Status
  const style = styles[status]

  const badge = (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: 999,
        padding: '2px 10px',
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: '0.02em',
        background: style.bg,
        color: style.color,
      }}
    >
      {style.label}
    </span>
  )

  if (!link) return badge

  const href =
    linkURL ||
    (collectionSlug && rowData?.id != null
      ? `${adminRoute}/collections/${collectionSlug}${viewType === 'trash' ? '/trash' : ''}/${encodeURIComponent(String(rowData.id))}`
      : undefined)

  if (!href) return badge

  return (
    <Link href={href} prefetch={false}>
      {badge}
    </Link>
  )
}
