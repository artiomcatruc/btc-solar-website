import { cache } from 'react'

import { getCachedGlobal } from '@/utilities/getGlobals'

export const getCachedSite = cache(async () => {
  const fn = getCachedGlobal('site', 1)
  return fn()
})
