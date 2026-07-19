'use client'

import { Link, useConfig } from '@payloadcms/ui'
import React from 'react'

type Props = {
  cellData?: string | null
  link?: boolean
  linkURL?: string
  collectionSlug?: string
  rowData?: { id?: string | number }
  viewType?: string
}

export const StatusCell: React.FC<Props> = ({
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

  const isNew = cellData === 'new'

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
        background: isNew ? 'rgba(234, 179, 8, 0.18)' : 'rgba(34, 197, 94, 0.16)',
        color: isNew ? '#a16207' : '#15803d',
      }}
    >
      {isNew ? 'New' : 'Reviewed'}
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
