import type { Block } from 'payload'

const backgroundOptions = [
  { label: 'Graphite (light gray)', value: 'graphite' },
  { label: 'White', value: 'white' },
] as const

const toneOptions = [
  { label: 'Solar amber', value: 'solar' },
  { label: 'Eco green', value: 'eco' },
  { label: 'Graphite neutral', value: 'graphite' },
] as const

const columnsOptions = [
  { label: '2 columns', value: '2' },
  { label: '3 columns', value: '3' },
] as const

export const BtcDifference: Block = {
  slug: 'btcDifference',
  interfaceName: 'BtcDifferenceBlock',
  labels: { singular: 'BTC Difference', plural: 'BTC Difference Sections' },
  fields: [
    {
      name: 'background',
      type: 'select',
      defaultValue: 'graphite',
      options: [...backgroundOptions],
    },
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Transformation',
      admin: { description: 'Uppercase label above the heading.' },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'See the Difference',
    },
    {
      name: 'intro',
      type: 'textarea',
      admin: { description: 'Optional lead paragraph below the heading.' },
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '2',
      options: [...columnsOptions],
    },
    {
      name: 'cards',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Card', plural: 'Cards' },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          type: 'row',
          fields: [
            {
              name: 'badge',
              type: 'text',
              defaultValue: 'After Installation',
              admin: { width: '50%' },
            },
            {
              name: 'badgeTone',
              type: 'select',
              defaultValue: 'eco',
              options: [...toneOptions],
              admin: { width: '50%' },
            },
          ],
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
        {
          type: 'row',
          fields: [
            {
              name: 'metaLabel',
              type: 'text',
              admin: { width: '33%', placeholder: 'System Size' },
            },
            {
              name: 'metaValue',
              type: 'text',
              admin: { width: '33%', placeholder: '8 kW' },
            },
            {
              name: 'highlight',
              type: 'text',
              admin: { width: '34%', placeholder: '-75% Energy Bills' },
            },
          ],
        },
        {
          name: 'highlightTone',
          type: 'select',
          defaultValue: 'eco',
          options: [...toneOptions],
          admin: { description: 'Accent color for the highlight stat.' },
        },
      ],
    },
  ],
}
