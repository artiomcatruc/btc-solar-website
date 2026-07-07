import { cache } from 'react'

import { getCachedGlobal } from '@/utilities/getGlobals'

/** Single cached read for BTC stats fallback (used when block uses global fallback). */
export const getCachedHomeStats = cache(async () => {
  const fn = getCachedGlobal('home-stats', 1)
  return fn()
})
