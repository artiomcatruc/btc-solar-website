import type { Block } from 'payload'

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
        description:
          'Select services in presentation order.',
      },
    },
  ],
}
