import type { Block } from 'payload'

export const BtcProcessSteps: Block = {
  slug: 'btcProcessSteps',
  interfaceName: 'BtcProcessStepsBlock',
  labels: { singular: 'BTC Process Steps', plural: 'BTC Process Steps' },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      admin: { description: 'e.g. HOW IT WORKS' },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Our Installation Process',
    },
    {
      name: 'intro',
      type: 'textarea',
    },
    {
      name: 'steps',
      type: 'array',
      minRows: 1,
      fields: [
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
  ],
}
