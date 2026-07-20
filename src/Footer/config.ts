import type { GlobalConfig } from 'payload'

import { adminOrEditor } from '@/access/roles'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
    update: adminOrEditor,
  },
  fields: [
    {
      name: 'brandDescription',
      type: 'textarea',
      localized: true,
      label: 'Brand description',
      defaultValue:
        'Premium solar energy solutions for homes and businesses across Moldova. Your trusted partner in renewable energy.',
      admin: {
        description: 'Shown under the logo in the first footer column.',
      },
    },
    {
      name: 'columns',
      type: 'array',
      maxRows: 2,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/ColumnRowLabel#ColumnRowLabel',
        },
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'links',
          type: 'array',
          fields: [
            link({
              appearances: false,
            }),
          ],
          admin: {
            initCollapsed: true,
            components: {
              RowLabel: '@/Footer/LinkRowLabel#LinkRowLabel',
            },
          },
        },
      ],
    },
    {
      name: 'copyrightText',
      type: 'text',
      localized: true,
      admin: {
        placeholder: '© 2024 BTC Solar. All rights reserved.',
      },
    },
    {
      name: 'showContactFromSite',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show phone, email & address from Site settings',
      admin: {
        description: 'Renders “Contact Info” beside link columns.',
      },
    },
    {
      name: 'showSocialFromSite',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show social icons from Site settings',
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
