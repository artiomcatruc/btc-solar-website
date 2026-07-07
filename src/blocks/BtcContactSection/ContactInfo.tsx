import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'

import { ContactSocialIcon } from '@/blocks/BtcContactSection/ContactSocialIcon'
import type { Site } from '@/payload-types'
import { cn } from '@/utilities/ui'

type ContactRowProps = {
  title: string
  icon: React.ReactNode
  iconWrapClass: string
  children: React.ReactNode
}

const ContactRow: React.FC<ContactRowProps> = ({ title, icon, iconWrapClass, children }) => (
  <div className="flex items-start gap-4">
    <div
      className={cn(
        'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl',
        iconWrapClass,
      )}
    >
      {icon}
    </div>
    <div>
      <h3 className="mb-1 font-semibold text-graphite-900">{title}</h3>
      <div className="text-graphite-600">{children}</div>
    </div>
  </div>
)

const telHref = (value: string) => `tel:${value.replace(/\s/g, '')}`

type Props = {
  infoTitle?: string | null
  showSiteContactDetails?: boolean | null
  showSocialLinks?: boolean | null
  socialTitle?: string | null
  site: Site | null
}

export const ContactInfo: React.FC<Props> = ({
  infoTitle = 'Contact Information',
  showSiteContactDetails = true,
  showSocialLinks = true,
  socialTitle = 'Follow Us',
  site,
}) => {
  if (!site) return null

  const phones = [
    ...(site.phones?.map((entry) => entry.number).filter(Boolean) ?? []),
    ...(site.phone && !site.phones?.length ? [site.phone] : []),
  ]

  const emails = [
    ...(site.emails?.map((entry) => entry.address).filter(Boolean) ?? []),
    ...(site.email && !site.emails?.length ? [site.email] : []),
  ]

  const hours = site.workingHours
    ?.split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  const hasDetails = Boolean(site.address || phones.length || emails.length || hours?.length)

  return (
    <div className="fade-in-visible lg:col-span-2">
      {showSiteContactDetails && infoTitle ? (
        <h2 className="mb-8 text-2xl font-bold text-graphite-900">{infoTitle}</h2>
      ) : null}

      {showSiteContactDetails && hasDetails ? (
        <div className="mb-10 space-y-6">
          {site.address ? (
            <ContactRow
              icon={<MapPin aria-hidden className="h-6 w-6 text-solar-500" strokeWidth={2} />}
              iconWrapClass="bg-solar-100"
              title="Office Address"
            >
              {site.address.split('\n').map((line, index) => (
                <React.Fragment key={`${line}-${index}`}>
                  {index > 0 ? <br /> : null}
                  {line}
                </React.Fragment>
              ))}
            </ContactRow>
          ) : null}

          {phones.length ? (
            <ContactRow
              icon={<Phone aria-hidden className="h-6 w-6 text-eco-500" strokeWidth={2} />}
              iconWrapClass="bg-eco-100"
              title="Phone"
            >
              {phones.map((phone, index) => (
                <React.Fragment key={phone}>
                  {index > 0 ? <br /> : null}
                  <a className="transition-colors hover:text-solar-500" href={telHref(phone)}>
                    {phone}
                  </a>
                </React.Fragment>
              ))}
            </ContactRow>
          ) : null}

          {emails.length ? (
            <ContactRow
              icon={<Mail aria-hidden className="h-6 w-6 text-graphite-600" strokeWidth={2} />}
              iconWrapClass="bg-graphite-100"
              title="Email"
            >
              {emails.map((email, index) => (
                <React.Fragment key={email}>
                  {index > 0 ? <br /> : null}
                  <a className="transition-colors hover:text-solar-500" href={`mailto:${email}`}>
                    {email}
                  </a>
                </React.Fragment>
              ))}
            </ContactRow>
          ) : null}

          {hours?.length ? (
            <ContactRow
              icon={<Clock aria-hidden className="h-6 w-6 text-solar-500" strokeWidth={2} />}
              iconWrapClass="bg-solar-100"
              title="Working Hours"
            >
              {hours.map((line, index) => (
                <React.Fragment key={line}>
                  {index > 0 ? <br /> : null}
                  {line}
                </React.Fragment>
              ))}
            </ContactRow>
          ) : null}
        </div>
      ) : null}

      {showSocialLinks && site.socialLinks?.length ? (
        <div>
          {socialTitle ? <h3 className="mb-4 font-semibold text-graphite-900">{socialTitle}</h3> : null}
          <div className="flex items-center gap-3">
            {site.socialLinks.map(({ label, url }) =>
              label && url ? (
                <ContactSocialIcon key={`${label}-${url}`} label={label} url={url} />
              ) : null,
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}
