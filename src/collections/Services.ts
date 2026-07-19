import type { CollectionConfig } from 'payload'

import { BTC_ICON_SELECT_OPTIONS } from '@/components/BtcIcon'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Services: CollectionConfig<'services'> = {
  slug: 'services',
  labels: {
    singular: 'Service',
    plural: 'Services',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'icon', 'sort', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'summary',
      type: 'textarea',
      localized: true,
      required: true,
    },
    {
      name: 'icon',
      type: 'select',
      required: true,
      defaultValue: 'home',
      options: BTC_ICON_SELECT_OPTIONS,
      admin: {
        description: 'Lucide-based icons from the shared BTC icon registry.',
      },
    },
    {
      name: 'sort',
      type: 'number',
      admin: {
        description: 'Lower sorts first.',
        position: 'sidebar',
      },
      defaultValue: 0,
    },
  ],
}
