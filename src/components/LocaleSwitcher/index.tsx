'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

import { cn } from '@/utilities/ui'
import {
  getLocaleFromPathname,
  localeLabels,
  locales,
  swapLocaleInPathname,
  type Locale,
} from '@/utilities/locale'

type Props = {
  className?: string
  locale?: Locale
}

export const LocaleSwitcher: React.FC<Props> = ({ className, locale: localeProp }) => {
  const pathname = usePathname()
  // Prefer pathname — localeProp from a stale RSC layout can lag behind soft navigations.
  const current = getLocaleFromPathname(pathname) || localeProp || 'en'

  useEffect(() => {
    document.documentElement.lang = current
  }, [current])

  return (
    <div
      aria-label="Language"
      className={cn(
        'inline-flex items-center gap-0.5 rounded-full border border-graphite-200 bg-white/80 p-0.5 text-xs font-semibold tracking-wide',
        className,
      )}
      role="navigation"
    >
      {locales.map((locale) => {
        const active = locale === current
        return (
          <Link
            key={locale}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'rounded-full px-2.5 py-1 transition-colors',
              active
                ? 'bg-graphite-900 text-white'
                : 'text-graphite-600 hover:bg-graphite-100 hover:text-graphite-900',
            )}
            href={swapLocaleInPathname(pathname, locale)}
            hrefLang={locale}
            lang={locale}
          >
            {localeLabels[locale]}
          </Link>
        )
      })}
    </div>
  )
}
