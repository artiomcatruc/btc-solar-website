import type { Block } from 'payload'

const toneOptions = [
  { label: 'Solar amber', value: 'solar' },
  { label: 'Eco green', value: 'eco' },
  { label: 'Graphite neutral', value: 'graphite' },
] as const

export const BtcAboutHero: Block = {
  slug: 'btcAboutHero',
  interfaceName: 'BtcAboutHeroBlock',
  labels: { singular: 'BTC About Hero', plural: 'BTC About Heroes' },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'About BTC Solar',
      admin: { description: 'Uppercase label above the headline.' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'headline',
          type: 'text',
          required: true,
          defaultValue: "Powering Moldova's",
          admin: { width: '50%' },
        },
        {
          name: 'headlineAccent',
          type: 'text',
          defaultValue: 'Sustainable Future',
          admin: {
            width: '50%',
            description: 'Renders inline with gradient-text.',
          },
        },
      ],
    },
    {
      name: 'lead',
      type: 'textarea',
      defaultValue:
        "We are Moldova's trusted leader in solar energy solutions, committed to making clean energy accessible, affordable, and efficient for every home and business.",
    },
    {
      name: 'highlights',
      type: 'array',
      maxRows: 4,
      labels: { singular: 'Highlight', plural: 'Highlights' },
      defaultValue: [
        { tone: 'solar', value: '8+ Years', label: 'Experience' },
        { tone: 'eco', value: '500+', label: 'Happy Clients' },
      ],
      fields: [
        {
          name: 'tone',
          type: 'select',
          required: true,
          defaultValue: 'solar',
          options: [...toneOptions],
        },
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
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
          defaultValue: '10 MW',
          admin: { width: '50%', description: 'Floating badge title on the image.' },
        },
        {
          name: 'cardSubtitle',
          type: 'text',
          defaultValue: 'Installed Capacity',
          admin: { width: '50%', description: 'Badge subtitle line.' },
        },
      ],
    },
  ],
}
