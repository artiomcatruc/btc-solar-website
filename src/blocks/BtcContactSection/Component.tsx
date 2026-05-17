import { Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'

import type { BtcContactSectionBlock } from '@/payload-types'

import { getCachedSite } from '@/utilities/getSite'

export async function BtcContactSectionComponent(props: BtcContactSectionBlock) {
  const { eyebrow, title, lead, showSiteContactDetails } = props
  const site = await getCachedSite()

  return (
    <section className="bg-white py-16">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_minmax(0,1fr)] lg:gap-16 lg:px-8">
        <div className="fade-in-visible">
          {eyebrow ? (
            <span className="text-sm font-semibold uppercase tracking-wider text-solar-500">{eyebrow}</span>
          ) : null}
          <h1 className="mt-4 mb-6 text-3xl font-bold text-graphite-900 md:text-5xl">{title}</h1>
          {lead ? <p className="mb-10 max-w-xl text-lg text-graphite-600">{lead}</p> : null}

          {showSiteContactDetails && site ? (
            <ul className="space-y-5 text-graphite-600">
              {site.address ? (
                <li className="flex gap-4">
                  <MapPin aria-hidden className="mt-0.5 h-5 w-5 flex-shrink-0 text-solar-500" strokeWidth={1.75} />
                  <span className="leading-relaxed">{site.address}</span>
                </li>
              ) : null}
              {site.phone ? (
                <li className="flex gap-4">
                  <Phone aria-hidden className="mt-0.5 h-5 w-5 flex-shrink-0 text-solar-500" strokeWidth={1.75} />
                  <a className="hover:text-solar-600" href={`tel:${site.phone.replace(/\s/g, '')}`}>
                    {site.phone}
                  </a>
                </li>
              ) : null}
              {site.email ? (
                <li className="flex gap-4">
                  <Mail aria-hidden className="mt-0.5 h-5 w-5 flex-shrink-0 text-solar-500" strokeWidth={1.75} />
                  <a className="hover:text-solar-600" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                </li>
              ) : null}
            </ul>
          ) : null}
        </div>
        <div className="fade-in-visible rounded-3xl border border-dashed border-graphite-200 bg-graphite-50 p-10 text-graphite-600">
          <p className="font-medium text-graphite-900">Phase E placeholder</p>
          <p className="mt-2 text-sm leading-relaxed">
            Wire the contact form (server action / Resend / SMTP) here; this panel is only scaffolding so layout + CMS
            copy stay testable beforehand.
          </p>
        </div>
      </div>
    </section>
  )
}
