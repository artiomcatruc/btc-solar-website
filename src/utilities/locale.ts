export const locales = ['en', 'ru', 'ro'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const localeLabels: Record<Locale, string> = {
  en: 'EN',
  ru: 'RU',
  ro: 'RO',
}

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value)
}

export function parseLocale(value: string | undefined | null): Locale {
  if (isLocale(value)) return value
  return defaultLocale
}

/** Prefix an internal path with locale. External URLs and hashes pass through. */
export function localizeHref(path: string, locale: Locale): string {
  if (!path) return `/${locale}`
  if (/^(https?:|mailto:|tel:)/i.test(path)) return path
  if (path.startsWith('#')) return path

  const [pathname, search = ''] = path.split(/(?=[?#])/)
  const segments = pathname.split('/').filter(Boolean)

  if (segments[0] && isLocale(segments[0])) {
    segments[0] = locale
  } else {
    segments.unshift(locale)
  }

  return `/${segments.join('/')}${search}`
}

/** Swap locale segment in a pathname, preserving the rest. */
export function swapLocaleInPathname(pathname: string, nextLocale: Locale): string {
  const segments = pathname.split('/').filter(Boolean)
  if (segments[0] && isLocale(segments[0])) {
    segments[0] = nextLocale
  } else {
    segments.unshift(nextLocale)
  }
  return `/${segments.join('/')}` || `/${nextLocale}`
}

export function getLocaleFromPathname(pathname: string): Locale | null {
  const first = pathname.split('/').filter(Boolean)[0]
  return isLocale(first) ? first : null
}
