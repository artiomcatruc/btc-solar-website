import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { JsonLd } from '@/components/JsonLd'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { getCachedSite } from '@/utilities/getSite'
import { absoluteUrl, SITE_BRAND, SITE_DEFAULT_DESCRIPTION } from '@/utilities/seo'
import { locales, parseLocale } from '@/utilities/locale'
import React from 'react'

type Args = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: Args) {
  const { locale: localeParam } = await params
  const locale = parseLocale(localeParam)
  const site = await getCachedSite(locale)

  const siteName = site?.siteName?.trim() || SITE_BRAND
  const description =
    site?.defaultDescription?.trim() || SITE_DEFAULT_DESCRIPTION
  const logo =
    typeof site?.ogImage === 'object' && site.ogImage?.url
      ? absoluteUrl(site.ogImage.url)
      : undefined

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    url: absoluteUrl(`/${locale}`),
    description,
    email: site?.email || undefined,
    telephone: site?.phone || undefined,
    address: site?.address
      ? {
          '@type': 'PostalAddress',
          streetAddress: site.address,
        }
      : undefined,
    logo,
    sameAs: (site?.socialLinks || [])
      .map((link) => link.url)
      .filter((url): url is string => Boolean(url && url !== '#')),
  }

  return (
    <>
      <JsonLd data={organizationJsonLd} />
      <Header locale={locale} />
      {children}
      <Footer locale={locale} />
      <WhatsAppButton locale={locale} />
    </>
  )
}
