import type { Block } from 'payload'

const backgroundOptions = [
  { label: 'Graphite (light gray)', value: 'graphite' },
  { label: 'White', value: 'white' },
] as const

export const BtcServicesGrid: Block = {
  slug: 'btcServicesGrid',
  interfaceName: 'BtcServicesGridBlock',
  labels: { singular: 'BTC Services Grid', plural: 'BTC Services Grids' },
  fields: [
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      admin: {
        description: 'Select services in presentation order.',
      },
    },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'graphite',
      options: [...backgroundOptions],
    },
  ],
}
