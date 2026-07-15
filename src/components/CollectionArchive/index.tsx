import { cn } from '@/utilities/ui'
import React from 'react'

import { Card, CardPostData } from '@/components/Card'

export type Props = {
  posts: CardPostData[]
  className?: string
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts, className } = props

  return (
    <div className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)}>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts?.map((result, index) => {
          if (typeof result === 'object' && result !== null) {
            return (
              <Card
                className="fade-in-visible h-full"
                doc={result}
                key={result.slug ?? index}
                relationTo="posts"
                showCategories
              />
            )
          }

          return null
        })}
      </div>
    </div>
  )
}
