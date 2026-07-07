import { CMSLink } from '@/components/Link'
import { BtcSolarMark } from '@/components/BtcSolar/Mark'
import { Media } from '@/components/Media'
import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'

import type { Footer as FooterType, Header, Site } from '@/payload-types'

import { FooterSocialIcon } from '@/Footer/SocialIcon'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getCachedSite } from '@/utilities/getSite'

const DEFAULT_BRAND_DESCRIPTION =
  'Premium solar energy solutions for homes and businesses across Moldova. Your trusted partner in renewable energy.'

const linkClassName = 'text-graphite-400 transition-colors hover:text-solar-400'

export async function Footer() {
  const [footerFn, site, headerFn] = await Promise.all([
    getCachedGlobal('footer', 2),
    getCachedSite(),
    getCachedGlobal('header', 1),
  ])

  const [footer, header] = await Promise.all([footerFn(), headerFn()])

  return <FooterInner footer={footer} header={header} site={site} />
}

const FooterInner: React.FC<{
  footer: FooterType | null
  header: Header | null
  site: Site | null
}> = ({ footer, header, site }) => {
  const linkColumns = (footer?.columns || []).slice(0, 2)
  const year = new Date().getFullYear()
  const siteTitle = site?.siteName?.trim() || 'BTC Solar'
  const brandTitle = header?.tagline?.trim() || siteTitle
  const brandDescription =
    footer?.brandDescription?.trim() || site?.defaultDescription?.trim() || DEFAULT_BRAND_DESCRIPTION
  const copyright =
    footer?.copyrightText?.trim() || `© ${year} ${siteTitle}. All rights reserved.`

  return (
    <footer className="mt-auto bg-graphite-950 py-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link className="mb-6 flex items-center gap-3" href="/">
              {typeof header?.logo === 'object' && header.logo?.id ? (
                <>
                  <div className="relative h-10 w-10 shrink-0">
                    <Media
                      htmlElement={null}
                      resource={header.logo}
                      imgClassName="h-full w-full object-contain"
                    />
                  </div>
                  <span className="text-xl font-bold">{brandTitle}</span>
                </>
              ) : (
                <>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-solar-400">
                    <BtcSolarMark className="h-6 w-6 text-graphite-900" />
                  </div>
                  <span className="text-xl font-bold">{brandTitle}</span>
                </>
              )}
            </Link>
            <p className="leading-relaxed text-graphite-400">{brandDescription}</p>
          </div>

          {linkColumns.map((column, index) => (
            <div key={`${column.heading}-${index}`}>
              <h4 className="mb-6 text-lg font-semibold">{column.heading}</h4>
              <ul className="space-y-3">
                {(column.links || []).map(({ link }, idx) => (
                  <li key={`${link?.label}-${idx}`}>
                    <CMSLink {...link} appearance="inline" className={linkClassName} />
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {footer?.showContactFromSite !== false ? (
            <div>
              <h4 className="mb-6 text-lg font-semibold">Contact Info</h4>
              <ul className="space-y-3 text-graphite-400">
                {site?.address ? (
                  <li className="flex items-center gap-3">
                    <MapPin
                      aria-hidden
                      className="h-5 w-5 shrink-0 text-solar-400"
                      strokeWidth={2}
                    />
                    <span>{site.address}</span>
                  </li>
                ) : null}
                {site?.phone ? (
                  <li className="flex items-center gap-3">
                    <Phone
                      aria-hidden
                      className="h-5 w-5 shrink-0 text-solar-400"
                      strokeWidth={2}
                    />
                    <a className="transition-colors hover:text-solar-400" href={`tel:${site.phone.replace(/\s/g, '')}`}>
                      {site.phone}
                    </a>
                  </li>
                ) : null}
                {site?.email ? (
                  <li className="flex items-center gap-3">
                    <Mail
                      aria-hidden
                      className="h-5 w-5 shrink-0 text-solar-400"
                      strokeWidth={2}
                    />
                    <a className="transition-colors hover:text-solar-400" href={`mailto:${site.email}`}>
                      {site.email}
                    </a>
                  </li>
                ) : null}
              </ul>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-graphite-800 pt-8 md:flex-row">
          <p className="text-sm text-graphite-500">{copyright}</p>
          {footer?.showSocialFromSite !== false && site?.socialLinks?.length ? (
            <div className="flex items-center gap-4">
              {site.socialLinks.map(({ label, url }) =>
                label && url ? (
                  <FooterSocialIcon key={`${label}-${url}`} label={label} url={url} />
                ) : null,
              )}
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  )
}
