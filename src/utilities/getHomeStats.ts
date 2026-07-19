import { cache } from 'react'

import { getCachedGlobal } from '@/utilities/getGlobals'
import { defaultLocale, type Locale } from '@/utilities/locale'

/** Single cached read for BTC stats fallback (used when block uses global fallback). */
export const getCachedHomeStats = cache(async (locale: Locale = defaultLocale) => {
  const fn = getCachedGlobal('home-stats', 1, locale)
  return fn()
})
