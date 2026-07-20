import type { Metadata } from 'next'

import { SITE_BRAND, SITE_DEFAULT_DESCRIPTION } from '@/utilities/seo'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: SITE_DEFAULT_DESCRIPTION,
  images: [
    {
      url: `${getServerSideURL()}/website-template-OG.webp`,
    },
  ],
  siteName: SITE_BRAND,
  title: SITE_BRAND,
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
