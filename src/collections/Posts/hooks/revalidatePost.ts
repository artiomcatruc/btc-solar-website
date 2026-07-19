import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Post } from '../../../payload-types'
import { locales } from '@/utilities/locale'

const postPaths = (slug?: string | null) =>
  slug ? locales.map((locale) => `/${locale}/posts/${slug}`) : []

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      for (const path of postPaths(doc.slug)) {
        payload.logger.info(`Revalidating post at path: ${path}`)
        revalidatePath(path)
      }
      revalidateTag('posts-sitemap', 'max')
    }

    if (previousDoc._status === 'published' && doc._status !== 'published') {
      for (const path of postPaths(previousDoc.slug)) {
        payload.logger.info(`Revalidating old post at path: ${path}`)
        revalidatePath(path)
      }
      revalidateTag('posts-sitemap', 'max')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    for (const path of postPaths(doc?.slug)) {
      revalidatePath(path)
    }
    revalidateTag('posts-sitemap', 'max')
  }

  return doc
}
