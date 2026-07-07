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
      name: 'phones',
      type: 'array',
      admin: {
        description: 'Optional extra phone numbers shown on the contact page.',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'number',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'emails',
      type: 'array',
      admin: {
        description: 'Optional extra email addresses shown on the contact page.',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'address',
          type: 'email',
          required: true,
        },
      ],
    },
    {
      name: 'address',
      type: 'textarea',
      admin: {
        description: 'Use line breaks for multi-line addresses.',
      },
    },
    {
      name: 'workingHours',
      type: 'textarea',
      admin: {
        description: 'One line per entry, e.g. Monday - Friday: 9:00 - 18:00',
      },
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
