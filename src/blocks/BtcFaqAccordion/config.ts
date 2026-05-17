import type { Block } from 'payload'

export const BtcFaqAccordion: Block = {
  slug: 'btcFaqAccordion',
  interfaceName: 'BtcFaqAccordionBlock',
  labels: { singular: 'BTC FAQ Accordion', plural: 'BTC FAQ Accordions' },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'FAQ',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Frequently Asked Questions',
    },
    {
      name: 'entries',
      type: 'relationship',
      relationTo: 'faqs',
      hasMany: true,
      admin: {
        description: 'Questions appear in CMS order.',
      },
    },
  ],
}
