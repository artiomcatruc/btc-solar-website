import type { Metadata } from 'next'

import {
  defaultLocale,
  locales,
  localizeHref,
  type Locale,
} from '@/utilities/locale'
import { getServerSideURL } from '@/utilities/getURL'

export const SITE_BRAND = 'BTC Solar'

export const SITE_DEFAULT_DESCRIPTION =
  'Premium solar panel installation across Moldova. Residential and commercial renewable energy solutions.'

export type SeoCollection = 'pages' | 'posts' | 'products'

/** Path without locale prefix, e.g. `/`, `/about`, `/posts/foo`, `/products/bar`. */
export function collectionInternalPath(
  collection: SeoCollection,
  slug?: string | null,
): string {
  if (collection === 'posts') return slug ? `/posts/${slug}` : '/posts'
  if (collection === 'products') return slug ? `/products/${slug}` : '/products'
  if (!slug || slug === 'home' || slug === 'index') return '/'
  return `/${slug}`
}

export function absoluteUrl(path: string): string {
  const base = getServerSideURL().replace(/\/$/, '')
  if (!path) return base
  if (/^https?:\/\//i.test(path)) return path
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}

/** Canonical + hreflang alternates for a locale-agnostic internal path. */
export function buildLocaleAlternates(
  internalPath: string,
  locale: Locale,
): NonNullable<Metadata['alternates']> {
  const languages: Record<string, string> = {}

  for (const loc of locales) {
    languages[loc] = absoluteUrl(localizeHref(internalPath, loc))
  }

  languages['x-default'] = languages[defaultLocale]

  return {
    canonical: languages[locale],
    languages,
  }
}

export function withBrandTitle(title?: string | null): string {
  const trimmed = title?.trim()
  if (!trimmed) return SITE_BRAND
  if (trimmed === SITE_BRAND || trimmed.endsWith(`| ${SITE_BRAND}`)) return trimmed
  return `${trimmed} | ${SITE_BRAND}`
}
