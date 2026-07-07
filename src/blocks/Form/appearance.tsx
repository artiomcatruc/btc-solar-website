'use client'

import React, { createContext, useContext } from 'react'

export type FormAppearance = 'default' | 'btc'

const FormAppearanceContext = createContext<FormAppearance>('default')

export const FormAppearanceProvider: React.FC<{
  appearance: FormAppearance
  children: React.ReactNode
}> = ({ appearance, children }) => (
  <FormAppearanceContext.Provider value={appearance}>{children}</FormAppearanceContext.Provider>
)

export const useFormAppearance = () => useContext(FormAppearanceContext)

export const btcFieldClass =
  'form-input w-full px-4 py-3 rounded-xl border border-graphite-200 bg-white focus:outline-none'

export const btcLabelClass = 'block text-sm font-medium text-graphite-700 mb-2'

export const isPhoneFieldName = (name?: string | null) => {
  const key = name?.toLowerCase() ?? ''
  return key.includes('phone') || key.includes('tel')
}

export const getBtcPlaceholder = (name: string, label: string): string => {
  const key = name.toLowerCase()

  if (key.includes('first')) return 'Your first name'
  if (key.includes('last')) return 'Your last name'
  if (isPhoneFieldName(name)) return '+373 XX XXX XXX'
  if (key.includes('email')) return 'your@email.com'
  if (key.includes('location') || key.includes('city')) return 'City or address'
  if (key.includes('message')) return 'Tell us about your project or ask any questions...'

  return label
}

export const BtcLabel: React.FC<{
  htmlFor: string
  label: string
  required?: boolean | null
}> = ({ htmlFor, label, required }) => (
  <label className={btcLabelClass} htmlFor={htmlFor}>
    {label}
    {required ? ' *' : null}
  </label>
)

type FormFieldLike = {
  blockType?: string | null
  name?: string | null
  width?: number | null
}

export const groupContactFormFields = <T extends FormFieldLike>(fields: T[]): T[][] => {
  const rows: T[][] = []
  let pair: T[] = []

  for (const field of fields) {
    if (field.width === 50) {
      pair.push(field)
      if (pair.length === 2) {
        rows.push(pair)
        pair = []
      }
    } else {
      if (pair.length) {
        rows.push(pair)
        pair = []
      }
      rows.push([field])
    }
  }

  if (pair.length) rows.push(pair)

  return rows
}

export const isConsentFieldName = (name?: string | null) => {
  const key = name?.toLowerCase() ?? ''
  return key.includes('consent') || key.includes('agree')
}

export const renderConsentLabel = (label: string, privacyPolicyUrl?: string | null) => {
  if (!privacyPolicyUrl || !label.includes('Privacy Policy')) {
    return label
  }

  const [before, after] = label.split('Privacy Policy')

  return (
    <>
      {before}
      <a className="text-solar-500 hover:underline" href={privacyPolicyUrl}>
        Privacy Policy
      </a>
      {after}
    </>
  )
}
