import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'columns',
      type: 'array',
      maxRows: 4,
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
