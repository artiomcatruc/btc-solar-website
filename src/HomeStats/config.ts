import type { GlobalConfig } from 'payload'

import { revalidateHomeStats } from './hooks/revalidateHomeStats'

export const HomeStats: GlobalConfig = {
  slug: 'home-stats',
  label: 'Home Statistics',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'stats',
      type: 'array',
      maxRows: 4,
      minRows: 0,
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'value',
              type: 'text',
              localized: true,
              required: true,
              admin: { width: '50%', description: 'e.g. 500+, 10MW, 98% — suffix in solar accent' },
            },
            {
              name: 'label',
              type: 'text',
              localized: true,
              required: true,
              admin: { width: '50%', description: 'e.g. Projects Completed' },
            },
          ],
        },
      ],
      admin: { initCollapsed: true },
    },
  ],
  hooks: {
    afterChange: [revalidateHomeStats],
  },
}
