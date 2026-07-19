import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional SVG/PNG logo. Fallback: BTC Solar mark.',
      },
    },
    {
      name: 'tagline',
      type: 'text',
      localized: true,
      admin: {
        description: 'Beside logo; if empty, Site siteName is shown.',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 8,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'ctaEnabled',
          type: 'checkbox',
          defaultValue: true,
          label: 'Show consultation CTA',
          admin: { width: '50%' },
        },
      ],
    },
    link({
      appearances: false,
      overrides: {
        name: 'cta',
        label: 'Consultation button',
      },
    }),
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
