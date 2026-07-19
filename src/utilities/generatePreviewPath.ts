import { PreviewSearchParams } from '@/app/(frontend)/next/preview/route'
import { PayloadRequest, CollectionSlug } from 'payload'

import { defaultLocale } from '@/utilities/locale'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  posts: '/posts',
  pages: '',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
  req: PayloadRequest
}

export const generatePreviewPath = ({ collection, slug }: Props) => {
  if (slug === undefined || slug === null) {
    return null
  }

  // Encode to support slugs with special characters
  const encodedSlug = encodeURIComponent(slug)
  const prefix = collectionPrefixMap[collection] || ''
  const path =
    collection === 'pages' && (slug === 'home' || slug === 'index')
      ? `/${defaultLocale}`
      : `/${defaultLocale}${prefix}/${encodedSlug}`

  const encodedParams = new URLSearchParams({
    path,
    previewSecret: process.env.PREVIEW_SECRET || '',
  } satisfies PreviewSearchParams)

  const url = `/next/preview?${encodedParams.toString()}`

  return url
}
