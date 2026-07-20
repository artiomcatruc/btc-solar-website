import type { Block } from 'payload'

const toneOptions = [
  { label: 'Solar amber', value: 'solar' },
  { label: 'Eco green', value: 'eco' },
  { label: 'Graphite neutral', value: 'graphite' },
] as const

type BlockData = { listStyle?: string }

const isListStyle =
  (style: string) =>
  (_data: unknown, _siblingData: unknown, { blockData }: { blockData?: BlockData }) =>
    blockData?.listStyle === style

export const BtcBenefitsSplit: Block = {
  slug: 'btcBenefitsSplit',
  interfaceName: 'BtcBenefitsSplitBlock',
  labels: { singular: 'BTC Benefits Split', plural: 'BTC Benefits Splits' },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      localized: true,
      defaultValue: 'Why Solar?',
      admin: { description: 'Uppercase label above the heading.' },
    },
    {
      name: 'heading',
      type: 'text',
      localized: true,
      required: true,
      defaultValue: 'Benefits of Going Solar',
    },
    {
      name: 'mediaPosition',
      type: 'select',
      defaultValue: 'right',
      options: [
        { label: 'Media left, content right', value: 'left' },
        { label: 'Content left, media right', value: 'right' },
      ],
    },
    {
      name: 'listStyle',
      type: 'select',
      defaultValue: 'icons',
      options: [
        { label: 'Icons (square tiles)', value: 'icons' },
        { label: 'Checklist (round checks)', value: 'checks' },
      ],
    },
    {
      name: 'checkTone',
      type: 'select',
      defaultValue: 'solar',
      options: [...toneOptions],
      admin: {
        condition: isListStyle('checks'),
        description: 'Accent color for checklist markers.',
      },
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
          admin: {
            condition: isListStyle('icons'),
          },
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
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
          localized: true,
          admin: { width: '50%', placeholder: '25+ Years', description: 'Optional floating badge title.' },
        },
        {
          name: 'cardSubtitle',
          type: 'text',
          localized: true,
          admin: {
            width: '50%',
            placeholder: 'Panel Warranty',
            description: 'Optional badge subtitle.',
          },
        },
      ],
    },
  ],
}
