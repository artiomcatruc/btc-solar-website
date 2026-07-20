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
      name: 'allLabel',
      type: 'text',
      localized: true,
      defaultValue: 'All Projects',
      admin: { description: 'Label for the catch-all filter button.' },
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        description: 'Leave empty to show every category. Order here controls filter button order.',
      },
    },
  ],
}
