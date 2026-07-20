import React from 'react'

import type { BtcContactSectionBlock, Form } from '@/payload-types'
import { getRequestLocale } from '@/utilities/getRequestLocale'
import { getCachedSite } from '@/utilities/getSite'

import { ContactFormPanel } from './ContactFormPanel'
import { ContactInfo } from './ContactInfo'

const isForm = (value: BtcContactSectionBlock['form']): value is Form =>
  typeof value === 'object' && value !== null && 'id' in value

export async function BtcContactSectionComponent(props: BtcContactSectionBlock) {
  const {
    infoTitle,
    showSiteContactDetails = true,
    showSocialLinks = true,
    socialTitle,
    formTitle,
    formLead,
    form,
    privacyPolicyUrl,
  } = props

  const locale = await getRequestLocale()
  const site = showSiteContactDetails || showSocialLinks ? await getCachedSite(locale) : null

  if (!isForm(form)) return null

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          {showSiteContactDetails || showSocialLinks ? (
            <ContactInfo
              infoTitle={infoTitle}
              showSiteContactDetails={showSiteContactDetails}
              showSocialLinks={showSocialLinks}
              site={site}
              socialTitle={socialTitle}
            />
          ) : (
            <div className="lg:col-span-2" />
          )}

          <div className="lg:col-span-3">
            <ContactFormPanel
              form={form}
              formLead={formLead}
              formTitle={formTitle}
              privacyPolicyUrl={privacyPolicyUrl}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
