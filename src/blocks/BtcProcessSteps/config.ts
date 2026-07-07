import type { Block } from 'payload'

import { BTC_ICON_SELECT_OPTIONS } from '@/components/BtcIcon'

const toneOptions = [
  { label: 'Solar', value: 'solar' },
  { label: 'Eco', value: 'eco' },
  { label: 'Graphite', value: 'graphite' },
] as const

type BlockData = { variant?: string }

const isVariant =
  (variant: string) =>
  (_data: unknown, _siblingData: unknown, { blockData }: { blockData?: BlockData }) =>
    blockData?.variant === variant

export const BtcProcessSteps: Block = {
  slug: 'btcProcessSteps',
  interfaceName: 'BtcProcessStepsBlock',
  labels: { singular: 'BTC Steps Section', plural: 'BTC Steps Sections' },
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'process',
      options: [
        { label: 'Process (numbered steps)', value: 'process' },
        { label: 'Icons (values)', value: 'icons' },
        { label: 'Cards (badges)', value: 'cards' },
      ],
      admin: {
        description: 'Process: numbered flow. Icons: round icon grid. Cards: badge tiles on dark backgrounds.',
      },
    },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'dark',
      options: [
        { label: 'Dark', value: 'dark' },
        { label: 'White', value: 'white' },
      ],
    },
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
      labels: { singular: 'Step', plural: 'Steps' },
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
        {
          name: 'icon',
          type: 'select',
          options: BTC_ICON_SELECT_OPTIONS,
          admin: {
            condition: isVariant('icons'),
            description: 'Icon for the values layout.',
          },
        },
        {
          name: 'badge',
          type: 'text',
          admin: {
            condition: isVariant('cards'),
            description: 'Short label inside the circle, e.g. ISO, CE, TÜV.',
          },
        },
        {
          name: 'tone',
          type: 'select',
          defaultValue: 'solar',
          options: [...toneOptions],
          admin: {
            condition: (_data, _siblingData, { blockData }: { blockData?: BlockData }) =>
              blockData?.variant === 'icons' || blockData?.variant === 'cards',
            description: 'Accent color for the step marker or badge.',
          },
        },
      ],
    },
  ],
}
