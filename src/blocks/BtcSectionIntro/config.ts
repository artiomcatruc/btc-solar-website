import type { Block } from 'payload'

export const BtcSectionIntro: Block = {
  slug: 'btcSectionIntro',
  interfaceName: 'BtcSectionIntroBlock',
  labels: { singular: 'BTC Section Intro', plural: 'BTC Section Intros' },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      admin: { description: 'Uppercase label in solar accent.' },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'lead',
      type: 'textarea',
    },
    {
      name: 'align',
      type: 'select',
      defaultValue: 'center',
      options: [
        { label: 'Center', value: 'center' },
        { label: 'Left', value: 'left' },
      ],
    },
  ],
}
