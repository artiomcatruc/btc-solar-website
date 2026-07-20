import type { Field } from 'payload'

import { adminOrEditor } from '@/access/roles'
import { populateSubmissionSummary } from './populateSummary'

const readOnlySummaryAdmin = {
  readOnly: true,
  width: '50%',
} as const

export const formSubmissionOverrides = {
  labels: {
    singular: 'Lead',
    plural: 'Leads',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'status', 'email', 'phone', 'projectType', 'createdAt'],
    defaultSort: '-createdAt',
    listSearchableFields: ['name', 'email', 'phone', 'message'],
    description: 'Contact form requests. Mark as Reviewed after you handle them.',
  },
  access: {
    update: adminOrEditor,
    read: adminOrEditor,
  },
  hooks: {
    beforeChange: [populateSubmissionSummary],
  },
  fields: ({ defaultFields }: { defaultFields: Field[] }): Field[] => {
    const mapped = defaultFields.map((field): Field => {
      if ('name' in field && field.name === 'submissionData') {
        return {
          ...field,
          label: 'All submitted fields',
          admin: {
            ...field.admin,
            initCollapsed: true,
            description: 'Raw field/value pairs from the form. Prefer the summary fields above.',
          },
        } as Field
      }

      if ('name' in field && field.name === 'form') {
        return {
          ...field,
          admin: {
            ...field.admin,
            position: 'sidebar',
          },
        } as Field
      }

      return field
    })

    return [
      {
        name: 'status',
        type: 'select',
        defaultValue: 'new',
        required: true,
        options: [
          { label: 'New', value: 'new' },
          { label: 'Reviewed', value: 'reviewed' },
        ],
        admin: {
          position: 'sidebar',
          description: 'Mark Reviewed once you have contacted the lead.',
          components: {
            Cell: '@/form-submissions/StatusCell#StatusCell',
          },
        },
      },
      {
        type: 'row',
        fields: [
          {
            name: 'name',
            type: 'text',
            label: 'Name',
            admin: readOnlySummaryAdmin,
          },
          {
            name: 'phone',
            type: 'text',
            label: 'Phone',
            admin: readOnlySummaryAdmin,
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'email',
            type: 'text',
            label: 'Email',
            admin: readOnlySummaryAdmin,
          },
          {
            name: 'projectType',
            type: 'text',
            label: 'Project type',
            admin: readOnlySummaryAdmin,
          },
        ],
      },
      {
        name: 'location',
        type: 'text',
        label: 'Location',
        admin: { readOnly: true },
      },
      {
        name: 'message',
        type: 'textarea',
        label: 'Message',
        admin: { readOnly: true },
      },
      ...mapped,
    ]
  },
}
