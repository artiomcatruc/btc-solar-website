'use client'

import type { Footer } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

type LinkCell = NonNullable<NonNullable<Footer['columns']>[number]['links']>[number]

export const LinkRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<LinkCell>()
  const label = data?.data?.link?.label

  const text = label
    ? `${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}. ${label}`
    : 'Link'

  return <div>{text}</div>
}
