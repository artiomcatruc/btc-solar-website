import { cache } from 'react'

import { getCachedGlobal } from '@/utilities/getGlobals'
import { defaultLocale, type Locale } from '@/utilities/locale'

export const getCachedSite = cache(async (locale: Locale = defaultLocale) => {
  const fn = getCachedGlobal('site', 1, locale)
  return fn()
})
