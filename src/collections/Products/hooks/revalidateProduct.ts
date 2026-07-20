import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Product } from '../../../payload-types'
import { locales } from '@/utilities/locale'

const productPaths = (slug?: string | null) =>
  slug ? locales.map((locale) => `/${locale}/products/${slug}`) : []

export const revalidateProduct: CollectionAfterChangeHook<Product> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    for (const path of productPaths(doc.slug)) {
      payload.logger.info(`Revalidating product at path: ${path}`)
      revalidatePath(path)
    }
    for (const locale of locales) {
      revalidatePath(`/${locale}/products`)
    }
    revalidateTag('products-sitemap', 'max')
    revalidateTag('pages-sitemap', 'max')

    if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
      for (const path of productPaths(previousDoc.slug)) {
        revalidatePath(path)
      }
    }
  }

  return doc
}

export const revalidateProductDelete: CollectionAfterDeleteHook<Product> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    for (const path of productPaths(doc?.slug)) {
      revalidatePath(path)
    }
    for (const locale of locales) {
      revalidatePath(`/${locale}/products`)
    }
    revalidateTag('products-sitemap', 'max')
    revalidateTag('pages-sitemap', 'max')
  }

  return doc
}
