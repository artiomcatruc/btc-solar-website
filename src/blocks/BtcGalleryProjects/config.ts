import type { Block } from 'payload'

const backgroundOptions = [
  { label: 'White', value: 'white' },
  { label: 'Graphite (light gray)', value: 'graphite' },
] as const

export const BtcGalleryProjects: Block = {
  slug: 'btcGalleryProjects',
  interfaceName: 'BtcGalleryProjectsBlock',
  labels: { singular: 'BTC Gallery Projects', plural: 'BTC Gallery Projects' },
  fields: [
    {
      name: 'groupId',
      type: 'text',
      defaultValue: 'gallery',
      required: true,
      admin: {
        description: 'Must match the BTC Gallery Filter block on the same page.',
      },
    },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'white',
      options: [...backgroundOptions],
    },
    {
      name: 'items',
      type: 'relationship',
      relationTo: 'gallery-items',
      hasMany: true,
      admin: {
        description: 'Gallery items in presentation order.',
      },
    },
  ],
}
