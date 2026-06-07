import type { Block } from 'payload'

const backgroundOptions = [
  { label: 'White', value: 'white' },
  { label: 'Graphite (light gray)', value: 'graphite' },
] as const

export const BtcGalleryFilter: Block = {
  slug: 'btcGalleryFilter',
  interfaceName: 'BtcGalleryFilterBlock',
  labels: { singular: 'BTC Gallery Filter', plural: 'BTC Gallery Filters' },
  fields: [
    {
      name: 'groupId',
      type: 'text',
      defaultValue: 'gallery',
      required: true,
      admin: {
        description: 'Must match the BTC Gallery Projects block on the same page.',
      },
    },
    {
      name: 'sticky',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Pin the filter bar below the header while scrolling.' },
    },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'white',
      options: [...backgroundOptions],
    },
    {
      name: 'filters',
      type: 'array',
      minRows: 1,
      defaultValue: [
        { label: 'All Projects', value: 'all' },
        { label: 'Residential', value: 'residential' },
        { label: 'Commercial', value: 'commercial' },
      ],
      labels: { singular: 'Filter', plural: 'Filters' },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: {
            description: 'Use "all" for the catch-all filter, or a gallery item category slug.',
          },
        },
      ],
    },
  ],
}
