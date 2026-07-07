import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getCachedSite } from '@/utilities/getSite'
import React from 'react'

export async function Header() {
  const [headerGetter, site] = await Promise.all([getCachedGlobal('header', 2), getCachedSite()])
  const header = await headerGetter()

  return <HeaderClient header={header} site={site} />
}
