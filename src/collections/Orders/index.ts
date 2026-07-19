import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { anyone } from '../../access/anyone'
import { decrementStock } from './decrementStock'
import { prepareOrder } from './prepareOrder'

export const Orders: CollectionConfig<'orders'> = {
  slug: 'orders',
  labels: {
    singular: 'Order',
    plural: 'Orders',
  },
  access: {
    create: anyone,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  defaultSort: '-createdAt',
  admin: {
    useAsTitle: 'customerName',
    defaultColumns: ['customerName', 'phone', 'status', 'total', 'currency', 'createdAt'],
    listSearchableFields: ['customerName', 'phone', 'address'],
    description: 'Storefront orders. Contact the customer and arrange payment offline.',
  },
  hooks: {
    beforeValidate: [prepareOrder],
    afterChange: [decrementStock],
  },
  fields: [
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Fulfilled', value: 'fulfilled' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Track outreach and fulfillment. Payment stays offline.',
        components: {
          Cell: '@/collections/Orders/StatusCell#OrderStatusCell',
        },
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'customerName',
          type: 'text',
          required: true,
          label: 'Name',
          admin: { width: '50%' },
        },
        {
          name: 'phone',
          type: 'text',
          required: true,
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'address',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Delivery / contact address.',
      },
    },
    {
      name: 'note',
      type: 'textarea',
      admin: {
        description: 'Optional message from the customer.',
      },
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      labels: {
        singular: 'Item',
        plural: 'Items',
      },
      admin: {
        description: 'Prices and titles are snapshotted at checkout.',
      },
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            readOnly: true,
            description: 'Snapshotted at checkout.',
          },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'quantity',
              type: 'number',
              required: true,
              min: 1,
              admin: { width: '33%', step: 1 },
            },
            {
              name: 'unitPrice',
              type: 'number',
              required: true,
              min: 0,
              admin: { width: '33%', readOnly: true, step: 0.01 },
            },
            {
              name: 'lineTotal',
              type: 'number',
              required: true,
              min: 0,
              admin: { width: '34%', readOnly: true, step: 0.01 },
            },
          ],
        },
        {
          name: 'currency',
          type: 'select',
          required: true,
          options: [
            { label: 'MDL', value: 'MDL' },
            { label: 'EUR', value: 'EUR' },
            { label: 'USD', value: 'USD' },
          ],
          admin: { readOnly: true },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'total',
          type: 'number',
          required: true,
          min: 0,
          admin: {
            width: '50%',
            readOnly: true,
            step: 0.01,
            description: 'Computed from line items at checkout.',
          },
        },
        {
          name: 'currency',
          type: 'select',
          required: true,
          options: [
            { label: 'MDL', value: 'MDL' },
            { label: 'EUR', value: 'EUR' },
            { label: 'USD', value: 'USD' },
          ],
          admin: {
            width: '50%',
            readOnly: true,
          },
        },
      ],
    },
  ],
}
