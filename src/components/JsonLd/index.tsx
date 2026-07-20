import React from 'react'

type Props = {
  data: Record<string, unknown> | Array<Record<string, unknown>>
}

/** Server-safe JSON-LD script tag. */
export const JsonLd: React.FC<Props> = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
