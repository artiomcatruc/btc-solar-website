import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

import { locales } from '@/utilities/locale'

export const revalidateSite: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating site global`)
    revalidateTag('global_site', 'max')
    for (const locale of locales) {
      revalidateTag(`global_site_${locale}`, 'max')
    }
  }

  return doc
}
