import PageTemplate, { generateMetadata as generatePageMetadata } from './[slug]/page'

export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{
    locale?: string
  }>
}

export default async function HomePage({ params }: Args) {
  const { locale } = await params
  return PageTemplate({ params: Promise.resolve({ locale, slug: 'home' }) })
}

export async function generateMetadata(args: Args) {
  const { locale } = await args.params
  return generatePageMetadata({ params: Promise.resolve({ locale, slug: 'home' }) })
}
