import type { Metadata } from 'next'

import type { Config, Media, Page, Post, Product } from '../payload-types'

import { type Locale } from '@/utilities/locale'
import { getServerSideURL } from './getURL'
import { mergeOpenGraph } from './mergeOpenGraph'
import {
  buildLocaleAlternates,
  collectionInternalPath,
  SITE_DEFAULT_DESCRIPTION,
  type SeoCollection,
  withBrandTitle,
} from './seo'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/favicon.jpg'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url
    const raw = ogUrl || image.url
    url = raw?.startsWith('http') ? raw : serverUrl + raw
  }

  return url
}

type DocWithMeta = Partial<Page> | Partial<Post> | Partial<Product> | null

export const generateMeta = async (args: {
  doc: DocWithMeta
  locale: Locale
  collection: SeoCollection
  /** Fallback when doc is missing (404 metadata still needs a canonical path). */
  slug?: string | null
}): Promise<Metadata> => {
  const { doc, locale, collection } = args

  const metaImage =
    doc && 'meta' in doc && doc.meta && typeof doc.meta === 'object'
      ? (doc.meta as {
          image?: Media | number | null
          title?: string | null
          description?: string | null
        })
      : null

  const ogImage = getImageURL(
    metaImage?.image ??
      (doc && 'image' in doc ? (doc.image as Media | number | null) : null) ??
      (doc && 'heroImage' in doc ? (doc.heroImage as Media | number | null) : null),
  )

  const title = withBrandTitle(metaImage?.title || doc?.title)
  const description =
    metaImage?.description ||
    (doc && 'summary' in doc ? doc.summary : null) ||
    SITE_DEFAULT_DESCRIPTION

  const slug = args.slug ?? (typeof doc?.slug === 'string' ? doc.slug : null)
  const internalPath = collectionInternalPath(collection, slug)
  const alternates = buildLocaleAlternates(internalPath, locale)
  const canonical = typeof alternates.canonical === 'string' ? alternates.canonical : undefined

  return {
    alternates,
    description,
    openGraph: mergeOpenGraph({
      description: description || '',
      images: ogImage ? [{ url: ogImage }] : undefined,
      title,
      url: canonical,
    }),
    title,
  }
}
