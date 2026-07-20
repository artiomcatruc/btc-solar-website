import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { revalidateProduct, revalidateProductDelete } from './hooks/revalidateProduct'

export const Products: CollectionConfig<'products'> = {
  slug: 'products',
  labels: {
    singular: 'Product',
    plural: 'Products',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'price', 'quantity', 'soldOut', 'updatedAt'],
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (!data) return data

        if (typeof data.quantity === 'number' && data.quantity <= 0) {
          data.soldOut = true
        }

        return data
      },
    ],
    afterChange: [revalidateProduct],
    afterDelete: [revalidateProductDelete],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
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
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'price',
                  type: 'number',
                  required: true,
                  min: 0,
                  admin: {
                    width: '50%',
                    description: 'Display price only — payment is offline.',
                    step: 0.01,
                  },
                },
                {
                  name: 'currency',
                  type: 'select',
                  required: true,
                  defaultValue: 'MDL',
                  options: [
                    { label: 'MDL', value: 'MDL' },
                    { label: 'EUR', value: 'EUR' },
                    { label: 'USD', value: 'USD' },
                  ],
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'quantity',
                  type: 'number',
                  required: true,
                  min: 0,
                  defaultValue: 0,
                  admin: {
                    width: '50%',
                    description: 'Units available. Quantity 0 auto-marks sold out.',
                    step: 1,
                  },
                },
                {
                  name: 'soldOut',
                  type: 'checkbox',
                  defaultValue: false,
                  label: 'Sold out',
                  admin: {
                    width: '50%',
                    description: 'Manual override. Also set automatically when quantity is 0.',
                    components: {
                      Cell: '@/collections/Products/SoldOutCell#SoldOutCell',
                    },
                  },
                },
              ],
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'sort',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Lower sorts first on the storefront.',
      },
    },
    slugField(),
  ],
}
