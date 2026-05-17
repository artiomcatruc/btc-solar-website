import type { Block } from 'payload'

import { linkGroup } from '@/fields/linkGroup'

export const BtcCtaBanner: Block = {
  slug: 'btcCtaBanner',
  interfaceName: 'BtcCtaBannerBlock',
  labels: { singular: 'BTC CTA Banner', plural: 'BTC CTA Banners' },
  fields: [
    {
      name: 'background',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: { description: 'Dimmed imagery behind text.' },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    linkGroup({
      appearances: false,
      overrides: {
        name: 'links',
        maxRows: 2,
        labels: {
          plural: 'Actions',
          singular: 'Action',
        },
      },
    }),
  ],
}
