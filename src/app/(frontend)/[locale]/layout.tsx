import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { WhatsAppButton } from '@/components/WhatsAppButton'
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

  return (
    <>
      <Header locale={locale} />
      {children}
      <Footer locale={locale} />
      <WhatsAppButton locale={locale} />
    </>
  )
}
