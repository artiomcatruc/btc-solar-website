import type { Block } from 'payload'

import { linkGroup } from '@/fields/linkGroup'

type BlockData = { colorScheme?: string }

export const BtcCtaBanner: Block = {
  slug: 'btcCtaBanner',
  interfaceName: 'BtcCtaBannerBlock',
  labels: { singular: 'BTC CTA Banner', plural: 'BTC CTA Banners' },
  fields: [
    {
      name: 'colorScheme',
      type: 'select',
      defaultValue: 'dark',
      options: [
        { label: 'Dark', value: 'dark' },
        { label: 'Graphite (light gray)', value: 'graphite' },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_data, _siblingData, { blockData }: { blockData?: BlockData }) =>
          blockData?.colorScheme === 'dark',
        description: 'Optional background image overlay for the dark theme.',
      },
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
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
