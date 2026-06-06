import type { Block } from 'payload'

const backgroundOptions = [
  { label: 'Graphite (light gray)', value: 'graphite' },
  { label: 'White', value: 'white' },
] as const

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
      admin: {
        description:
          'Single paragraph for compact layout. Separate paragraphs with a blank line for the multi-paragraph story layout.',
      },
    },
    {
      name: 'align',
      type: 'select',
      defaultValue: 'center',
      options: [
        { label: 'Center', value: 'center' },
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
    },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'graphite',
      options: [...backgroundOptions],
    },
  ],
}
