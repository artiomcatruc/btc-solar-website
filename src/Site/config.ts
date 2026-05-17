import type { GlobalConfig } from 'payload'

import { revalidateSite } from './hooks/revalidateSite'

export const Site: GlobalConfig = {
  slug: 'site',
  label: 'Site',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      defaultValue: 'BTC Solar',
    },
    {
      name: 'defaultTitle',
      type: 'text',
      admin: { description: 'Fallback document title when a page omits SEO title.' },
    },
    {
      name: 'defaultDescription',
      type: 'textarea',
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      type: 'row',
      fields: [
        { name: 'phone', type: 'text', admin: { width: '50%' } },
        { name: 'email', type: 'email', admin: { width: '50%' } },
      ],
    },
    {
      name: 'address',
      type: 'textarea',
    },
    {
      name: 'defaultLocale',
      type: 'select',
      defaultValue: 'en',
      options: [
        { label: 'English', value: 'en' },
        { label: 'Română', value: 'ro' },
        { label: 'Русский', value: 'ru' },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              type: 'text',
              admin: { width: '50%' },
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              admin: { width: '50%' },
              required: true,
            },
          ],
        },
      ],
      admin: { initCollapsed: true },
    },
  ],
  hooks: {
    afterChange: [revalidateSite],
  },
}
