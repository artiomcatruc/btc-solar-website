'use client'

import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import {
  defaultLocale,
  getLocaleFromPathname,
  localizeHref,
  type Locale,
} from '@/utilities/locale'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import type { Page, Post } from '@/payload-types'

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  locale?: Locale
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

function resolveRawHref(props: CMSLinkType): string | undefined {
  const { type, reference, url } = props

  if (type === 'reference' && reference && typeof reference.value === 'object' && reference.value.slug) {
    const slug = reference.value.slug

    if (reference.relationTo === 'pages') {
      return slug === 'home' || slug === 'index' ? '/' : `/${slug}`
    }

    return `/posts/${slug}`
  }

  return url ?? undefined
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    appearance = 'inline',
    children,
    className,
    label,
    locale: localeProp,
    newTab,
    size: sizeFromProps,
    url,
  } = props

  const pathname = usePathname()
  // Prefer pathname so soft locale switches don't keep a stale layout prop.
  const locale = getLocaleFromPathname(pathname) || localeProp || defaultLocale

  const rawHref = resolveRawHref(props)
  if (!rawHref) return null

  const href = localizeHref(rawHref, locale)

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    )
  }

  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    </Button>
  )
}
