import type { Block } from 'payload'

import { linkGroup } from '@/fields/linkGroup'

export const BtcHero: Block = {
  slug: 'btcHero',
  interfaceName: 'BtcHeroBlock',
  labels: { singular: 'BTC Hero', plural: 'BTC Heroes' },
  fields: [
    {
      name: 'badge',
      type: 'text',
      localized: true,
      admin: { description: 'Pill above the headline.' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'headline',
          type: 'text',
          localized: true,
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'headlineAccent',
          type: 'text',
          localized: true,
          admin: { width: '50%', description: 'Gradient line (second line).' },
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'background',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    linkGroup({
      appearances: false,
      overrides: {
        name: 'buttons',
        maxRows: 2,
        labels: {
          plural: 'Buttons',
          singular: 'Button',
        },
      },
    }),
  ],
}
