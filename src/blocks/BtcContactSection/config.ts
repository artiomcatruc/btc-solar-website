import type { Block } from 'payload'

export const BtcContactSection: Block = {
  slug: 'btcContactSection',
  interfaceName: 'BtcContactSectionBlock',
  labels: {
    singular: 'BTC Contact Intro',
    plural: 'BTC Contact Sections',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Contact Us',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'lead',
      type: 'textarea',
    },
    {
      name: 'showSiteContactDetails',
      type: 'checkbox',
      defaultValue: true,
      label: 'Render phone/email/address from Site global',
      admin: {
        description:
          'Form wiring arrives in Phase E; this handles intro + contact metadata only.',
      },
    },
  ],
}
