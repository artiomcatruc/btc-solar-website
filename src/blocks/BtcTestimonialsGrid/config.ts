import type { Block } from 'payload'

export const BtcTestimonialsGrid: Block = {
  slug: 'btcTestimonialsGrid',
  interfaceName: 'BtcTestimonialsGridBlock',
  labels: {
    singular: 'BTC Testimonials',
    plural: 'BTC Testimonials',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Testimonials',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'What Our Clients Say',
    },
    {
      name: 'items',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
      admin: { description: 'Usually 3 for the legacy homepage layout.' },
    },
  ],
}
