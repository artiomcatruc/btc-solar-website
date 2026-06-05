import type { Block } from 'payload'

const toneOptions = [
  { label: 'Eco green', value: 'eco' },
  { label: 'Solar amber', value: 'solar' },
  { label: 'Graphite neutral', value: 'graphite' },
] as const

export const BtcBenefitsSplit: Block = {
  slug: 'btcBenefitsSplit',
  interfaceName: 'BtcBenefitsSplitBlock',
  labels: { singular: 'BTC Benefits Split', plural: 'BTC Benefits Splits' },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Why Solar?',
      admin: { description: 'Uppercase label above the heading.' },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Benefits of Going Solar',
    },
    {
      name: 'benefits',
      type: 'array',
      labels: {
        singular: 'Benefit',
        plural: 'Benefits',
      },
      fields: [
        {
          name: 'tone',
          type: 'select',
          required: true,
          defaultValue: 'eco',
          options: [...toneOptions],
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'cardTitle',
          type: 'text',
          admin: { width: '50%', placeholder: '25+ Years', description: 'Floating badge title' },
        },
        {
          name: 'cardSubtitle',
          type: 'text',
          admin: {
            width: '50%',
            placeholder: 'Panel Warranty',
            description: 'Badge subtitle line',
          },
        },
      ],
    },
  ],
}
