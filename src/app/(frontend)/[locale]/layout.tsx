import { locales } from '@/utilities/locale'
import React from 'react'

type Args = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children }: Args) {
  return children
}
