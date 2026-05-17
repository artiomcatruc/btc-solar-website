import type { Block } from 'payload'

export const BtcGalleryGrid: Block = {
  slug: 'btcGalleryGrid',
  interfaceName: 'BtcGalleryGridBlock',
  labels: {
    singular: 'BTC Gallery Grid',
    plural: 'BTC Gallery Grids',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Our Work',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Project Gallery',
    },
    {
      name: 'items',
      type: 'relationship',
      relationTo: 'gallery-items',
      hasMany: true,
      admin: {
        description: 'Select gallery items.',
      },
    },
  ],
}
