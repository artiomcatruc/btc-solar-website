import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'

import type { Footer as FooterType, Site } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { BtcSolarMark } from '@/components/BtcSolar/Mark'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getCachedSite } from '@/utilities/getSite'

export async function Footer() {
  const footerFn = getCachedGlobal('footer', 2)

  const [footer, site] = await Promise.all([footerFn(), getCachedSite()])

  return (
    <FooterInner footer={footer} site={site} />
  )
}

const FooterInner: React.FC<{ footer: FooterType | null; site: Site | null }> = ({ footer, site }) => {
  const columns = footer?.columns || []
  const year = new Date().getFullYear()
  const siteTitle = site?.siteName?.trim?.() || 'BTC Solar Energy'
  const copyright =
    footer?.copyrightText?.trim?.() ||
    `© ${year} ${siteTitle}. Moldova renewable energy installs.`

  return (
    <footer className="mt-auto border-t border-graphite-900 bg-graphite-950 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 lg:px-8">
        <div>
          <Link className="mb-6 flex items-center gap-3" href="/">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-solar-400">
              <BtcSolarMark className="h-6 w-6 text-graphite-900" />
            </div>
            <span className="text-xl font-bold">{siteTitle}</span>
          </Link>
          <p className="leading-relaxed text-graphite-400">
            Premium solar energy solutions across Moldova. Strategy, permitting, installs, monitoring.
          </p>
        </div>

        {columns.map((column, index) => (
          <div key={`${column.heading}-${index}`}>
            <h4 className="mb-4 text-lg font-semibold">{column.heading}</h4>
            <ul className="space-y-3">
              {(column.links || []).map(({ link }, idx) => (
                <li key={`${link?.label}-${idx}`}>
                  <CMSLink {...link} appearance="inline" className="text-graphite-400 hover:text-solar-400" />
                </li>
              ))}
            </ul>
          </div>
        ))}

        {footer?.showContactFromSite !== false ? (
          <div>
            <h4 className="mb-4 text-lg font-semibold">Contact</h4>
            <ul className="space-y-3 text-graphite-400">
              {site?.address ? (
                <li className="flex gap-3">
                  <MapPin aria-hidden className="mt-0.5 h-5 w-5 flex-shrink-0 text-solar-400" strokeWidth={1.75} />
                  <span className="leading-relaxed">{site.address}</span>
                </li>
              ) : null}
              {site?.phone ? (
                <li className="flex gap-3">
                  <Phone aria-hidden className="mt-0.5 h-5 w-5 flex-shrink-0 text-solar-400" strokeWidth={1.75} />
                  <a className="hover:text-solar-400" href={`tel:${site.phone.replace(/\s/g, '')}`}>
                    {site.phone}
                  </a>
                </li>
              ) : null}
              {site?.email ? (
                <li className="flex gap-3">
                  <Mail aria-hidden className="mt-0.5 h-5 w-5 flex-shrink-0 text-solar-400" strokeWidth={1.75} />
                  <a className="hover:text-solar-400" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        ) : null}
      </div>

      <div className="border-t border-graphite-900">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 text-graphite-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p className="text-sm">{copyright}</p>
          <div className="flex flex-wrap items-center gap-3">
            {footer?.showSocialFromSite !== false && site?.socialLinks?.length
              ? site.socialLinks.map(({ label, url }) => (
                  <a
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-graphite-900 text-[0.625rem] font-semibold uppercase text-white transition-colors hover:bg-solar-400 hover:text-graphite-900"
                    href={url}
                    key={`${label}-${url}`}
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    {label?.slice(0, 3) || '—'}
                  </a>
                ))
              : null}
            <ThemeSelector />
          </div>
        </div>
      </div>
    </footer>
  )
}
