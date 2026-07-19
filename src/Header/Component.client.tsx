'use client'

import { BtcSolarMark } from '@/components/BtcSolar/Mark'
import { CartButton } from '@/components/Cart/CartButton'
import { CMSLink } from '@/components/Link'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import { Media } from '@/components/Media'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

import type { Header as HeaderDoc, Site } from '@/payload-types'
import { localizeHref, type Locale } from '@/utilities/locale'
import { t } from '@/utilities/uiMessages'
import { cn } from '@/utilities/ui'

const CtaArrow = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
)

const resolveHref = (
  link: NonNullable<HeaderDoc['navItems']>[number]['link'] | undefined,
  locale: Locale,
) => {
  if (link?.type === 'reference' && link.reference && typeof link.reference.value === 'object') {
    const slug = link.reference.value.slug
    const raw =
      link.reference.relationTo === 'pages'
        ? slug === 'home' || slug === 'index'
          ? '/'
          : `/${slug}`
        : `/posts/${slug}`
    return localizeHref(raw, locale)
  }
  return localizeHref(link?.url || '/', locale)
}

interface Props {
  header: HeaderDoc | null
  locale: Locale
  site: Site | null
}

export const HeaderClient: React.FC<Props> = ({ header, locale, site }) => {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [lastPathname, setLastPathname] = useState(pathname)

  if (lastPathname !== pathname) {
    setLastPathname(pathname)
    if (mobileOpen) {
      setMobileOpen(false)
    }
  }

  const navItems = header?.navItems || []
  const headerCta = header?.cta
  const hasCta = header?.ctaEnabled !== false && Boolean(headerCta?.label)
  const homeHref = localizeHref('/', locale)

  const isActive = (href: string) => {
    if (href === homeHref) return pathname === homeHref || pathname === `/${locale}`
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  const ctaClassName =
    'inline-flex items-center gap-2 rounded-full bg-graphite-900 px-6 py-3 font-medium text-white transition-colors hover:bg-graphite-800'

  return (
    <header className="sticky inset-x-0 top-(--admin-bar-height,0px) z-50">
      <nav className="glass border-b border-graphite-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between gap-4">
            <Link
              className="flex items-center gap-3"
              href={homeHref}
              onClick={() => setMobileOpen(false)}
            >
              {typeof header?.logo === 'object' && header.logo?.id ? (
                <>
                  <div className="relative h-10 w-10 shrink-0">
                    <Media
                      htmlElement={null}
                      priority
                      resource={header.logo}
                      imgClassName="h-full w-full object-contain"
                    />
                  </div>
                  <span className="text-xl font-bold tracking-tight text-graphite-900">
                    {header?.tagline || site?.siteName || 'BTC Solar'}
                  </span>
                </>
              ) : (
                <>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-solar-400">
                    <BtcSolarMark className="h-6 w-6 text-graphite-900" />
                  </div>
                  <span className="text-xl font-bold tracking-tight text-graphite-900">
                    {header?.tagline || site?.siteName || 'BTC Solar'}
                  </span>
                </>
              )}
            </Link>

            <div className="hidden items-center gap-8 md:flex">
              {navItems.map(({ link }, i) => {
                const href = resolveHref(link, locale)
                return (
                  <CMSLink
                    key={`${link?.label}-${i}`}
                    {...link}
                    appearance="inline"
                    className={cn(
                      'font-medium transition-colors hover:text-solar-500',
                      isActive(href) ? 'text-graphite-900' : 'text-graphite-600',
                    )}
                    locale={locale}
                  />
                )
              })}
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <CartButton locale={locale} />
              <LocaleSwitcher locale={locale} />
              {hasCta && headerCta ? (
                <CMSLink
                  {...headerCta}
                  appearance="inline"
                  className={ctaClassName}
                  locale={locale}
                >
                  <CtaArrow />
                </CMSLink>
              ) : null}
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <CartButton locale={locale} />
              <LocaleSwitcher locale={locale} />
              <button
                aria-expanded={mobileOpen}
                className="p-2 text-graphite-900"
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
              >
                <span className="sr-only">
                  {mobileOpen ? t(locale, 'closeNav') : t(locale, 'openNav')}
                </span>
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {mobileOpen ? (
          <div className="border-t border-graphite-100 bg-white md:hidden">
            <div className="space-y-4 px-4 py-6">
              {navItems.map(({ link }, i) => {
                const href = resolveHref(link, locale)
                return (
                  <div
                    key={`mobile-${link?.label}-${i}`}
                    onClick={() => setMobileOpen(false)}
                    role="presentation"
                  >
                    <CMSLink
                      {...link}
                      appearance="inline"
                      className={cn(
                        'block py-2 font-medium',
                        isActive(href) ? 'text-graphite-900' : 'text-graphite-600',
                      )}
                      locale={locale}
                    />
                  </div>
                )
              })}
              {hasCta && headerCta ? (
                <div onClick={() => setMobileOpen(false)} role="presentation">
                  <CMSLink
                    {...headerCta}
                    appearance="inline"
                    className="mt-4 block rounded-full bg-graphite-900 px-6 py-3 text-center font-medium text-white"
                    locale={locale}
                  />
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  )
}
