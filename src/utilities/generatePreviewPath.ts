import { PayloadRequest, CollectionSlug } from 'payload'

import { defaultLocale } from '@/utilities/locale'
import { signPreviewPath } from '@/utilities/previewSignature'

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

  const signed = signPreviewPath(path)
  if (!signed) return null

  // HMAC signature — PREVIEW_SECRET itself never appears in the URL.
  const encodedParams = new URLSearchParams({
    path: signed.path,
    exp: signed.exp,
    sig: signed.sig,
  })

  return `/next/preview?${encodedParams.toString()}`
}
