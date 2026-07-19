import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

import { locales } from '@/utilities/locale'

export const revalidateFooter: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating footer`)

    revalidateTag('global_footer', 'max')
    for (const locale of locales) {
      revalidateTag(`global_footer_${locale}`, 'max')
    }
  }

  return doc
}
