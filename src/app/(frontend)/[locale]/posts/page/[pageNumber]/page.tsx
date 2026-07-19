import type { Metadata } from 'next/types'
import { redirect } from 'next/navigation'

import { buildPostsHref } from '@/utilities/postsQuery'
import { parseLocale } from '@/utilities/locale'

export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{
    locale?: string
    pageNumber: string
  }>
  searchParams: Promise<{
    category?: string
    tag?: string
    q?: string
  }>
}

/** Legacy `/[locale]/posts/page/N` → `/[locale]/posts?page=N` (preserves filters). */
export default async function Page({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: Args) {
  const { locale: localeParam, pageNumber } = await paramsPromise
  const locale = parseLocale(localeParam)
  const searchParams = await searchParamsPromise
  const page = Number(pageNumber)

  redirect(
    buildPostsHref({
      category: searchParams.category,
      tag: searchParams.tag,
      q: searchParams.q,
      page: Number.isInteger(page) && page > 0 ? page : 1,
      locale,
    }),
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `Blog | Page ${pageNumber || ''} | BTC Solar`,
  }
}
