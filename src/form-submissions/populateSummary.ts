import type { CollectionBeforeChangeHook } from 'payload'

import { extractSubmissionSummary } from './extractSummary'

export const populateSubmissionSummary: CollectionBeforeChangeHook = ({ data, operation }) => {
  if (!data) return data

  const summary = extractSubmissionSummary(data.submissionData)

  // Always refresh denormalized fields from submissionData on create.
  // On update, only fill empty summary fields so manual edits stay possible.
  if (operation === 'create') {
    return {
      ...data,
      status: data.status || 'new',
      ...summary,
    }
  }

  return {
    ...data,
    name: data.name || summary.name,
    email: data.email || summary.email,
    phone: data.phone || summary.phone,
    projectType: data.projectType || summary.projectType,
    location: data.location || summary.location,
    message: data.message || summary.message,
  }
}
