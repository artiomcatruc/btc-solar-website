import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getCachedSite } from '@/utilities/getSite'
import { defaultLocale, type Locale } from '@/utilities/locale'
import React from 'react'

type Props = {
  locale?: Locale
}

export async function Header({ locale = defaultLocale }: Props) {
  const [headerGetter, site] = await Promise.all([
    getCachedGlobal('header', 2, locale),
    getCachedSite(locale),
  ])
  const header = await headerGetter()

  return <HeaderClient header={header} locale={locale} site={site} />
}
