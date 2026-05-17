'use client'

import type { Footer } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const ColumnRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Footer['columns']>[number]>()

  const heading = data?.data?.heading
    ? `${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}. ${data.data.heading}`
    : 'Column'

  return <div>{heading}</div>
}
