'use client'

import { BtcSolarMark } from '@/components/BtcSolar/Mark'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header as HeaderDoc, Site } from '@/payload-types'

import { cn } from '@/utilities/ui'

interface Props {
  header: HeaderDoc | null
  site: Site | null
}

export const HeaderClient: React.FC<Props> = ({ header, site }) => {
  const pathname = usePathname()
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    setHeaderTheme(null)
    setMobileOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  const navItems = header?.navItems || []
  const headerCta = header?.cta
  const hasCta = header?.ctaEnabled !== false && Boolean(headerCta?.label)

  return (
    <header className="fixed inset-x-0 top-0 z-50" {...(theme ? { 'data-theme': theme } : {})}>
      <nav className="glass border-b border-graphite-100">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
          <Link className="flex items-center gap-3" href="/" onClick={() => setMobileOpen(false)}>
            {typeof header?.logo === 'object' && header.logo?.id ? (
              <div className="relative h-10 w-32 shrink-0">
                <Media
                  htmlElement={null}
                  priority
                  resource={header.logo}
                  imgClassName="h-full w-full object-contain object-left"
                />
              </div>
            ) : (
              <>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-solar-400">
                  <BtcSolarMark className="h-6 w-6 text-graphite-900" />
                </div>
                <span className="text-xl font-bold tracking-tight text-graphite-900">
                  {site?.siteName || 'BTC Solar'}
                </span>
              </>
            )}
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map(({ link }, i) => (
              <CMSLink
                key={`${link?.label}-${i}`}
                {...link}
                appearance="inline"
                className={cn('font-medium text-graphite-600 transition-colors hover:text-solar-500')}
              />
            ))}
          </div>

          {hasCta && headerCta ? (
            <CMSLink
              {...headerCta}
              appearance="inline"
              className="hover:bg-graphite-800 hidden rounded-full bg-graphite-900 px-6 py-3 font-medium text-white transition-colors md:inline-flex md:items-center md:gap-2"
            />
          ) : null}

          <button
            aria-expanded={mobileOpen}
            className="p-2 text-graphite-900 md:hidden"
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="sr-only">{mobileOpen ? 'Close navigation' : 'Open navigation'}</span>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              )}
            </svg>
          </button>
        </div>

        {mobileOpen ? (
          <div className="border-t border-graphite-100 bg-white md:hidden">
            <div className="space-y-4 px-4 py-6">
              {navItems.map(({ link }, i) => (
                <div key={`mobile-${link?.label}-${i}`} onClick={() => setMobileOpen(false)} role="presentation">
                  <CMSLink {...link} appearance="inline" className="block py-2 font-medium text-graphite-900" />
                </div>
              ))}
              {hasCta && headerCta ? (
                <div onClick={() => setMobileOpen(false)} role="presentation">
                  <CMSLink
                    {...headerCta}
                    appearance="inline"
                    className="mt-4 block rounded-full bg-graphite-900 px-6 py-3 text-center font-medium text-white"
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
