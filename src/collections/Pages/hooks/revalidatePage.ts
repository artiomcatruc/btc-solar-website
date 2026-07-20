import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Page } from '../../../payload-types'
import { locales } from '@/utilities/locale'

const pagePaths = (slug?: string | null) => {
  const suffix = !slug || slug === 'home' || slug === 'index' ? '' : `/${slug}`
  return locales.map((locale) => `/${locale}${suffix}`)
}

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      for (const path of pagePaths(doc.slug)) {
        payload.logger.info(`Revalidating page at path: ${path}`)
        revalidatePath(path)
      }
      revalidateTag('pages-sitemap', 'max')
    }

    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      for (const path of pagePaths(previousDoc.slug)) {
        payload.logger.info(`Revalidating old page at path: ${path}`)
        revalidatePath(path)
      }
      revalidateTag('pages-sitemap', 'max')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Page> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    for (const path of pagePaths(doc?.slug)) {
      revalidatePath(path)
    }
    revalidateTag('pages-sitemap', 'max')
  }

  return doc
}
