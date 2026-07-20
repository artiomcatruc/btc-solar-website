import { headers } from 'next/headers'

import { defaultLocale, parseLocale, type Locale } from '@/utilities/locale'

/** Locale set by middleware on each frontend request (`x-locale`). */
export async function getRequestLocale(): Promise<Locale> {
  const h = await headers()
  return parseLocale(h.get('x-locale') || defaultLocale)
}
