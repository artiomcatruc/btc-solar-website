import type { Block } from 'payload'

export const BtcContactSection: Block = {
  slug: 'btcContactSection',
  interfaceName: 'BtcContactSectionBlock',
  labels: {
    singular: 'BTC Contact Section',
    plural: 'BTC Contact Sections',
  },
  fields: [
    {
      name: 'infoTitle',
      type: 'text',
      localized: true,
      defaultValue: 'Contact Information',
    },
    {
      name: 'showSiteContactDetails',
      type: 'checkbox',
      defaultValue: true,
      label: 'Render contact details from Site global',
    },
    {
      name: 'showSocialLinks',
      type: 'checkbox',
      defaultValue: true,
      label: 'Render social links from Site global',
    },
    {
      name: 'socialTitle',
      type: 'text',
      localized: true,
      defaultValue: 'Follow Us',
    },
    {
      name: 'formTitle',
      type: 'text',
      localized: true,
      defaultValue: 'Request a Free Consultation',
    },
    {
      name: 'formLead',
      type: 'textarea',
      localized: true,
      defaultValue:
        'Fill out the form below and our team will contact you within 24 hours.',
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
      admin: {
        description: 'Submissions are stored in the Payload dashboard (Form Submissions collection).',
      },
    },
    {
      name: 'privacyPolicyUrl',
      type: 'text',
      localized: true,
      admin: {
        description: 'Optional link used in the consent checkbox label.',
      },
    },
  ],
}
