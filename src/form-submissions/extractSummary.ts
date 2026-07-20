type SubmissionEntry = {
  field?: string | null
  value?: string | null
}

const getField = (entries: SubmissionEntry[] | null | undefined, names: string[]) => {
  const map = new Map(
    (entries ?? [])
      .filter((entry) => entry.field)
      .map((entry) => [entry.field!.toLowerCase(), String(entry.value ?? '').trim()]),
  )

  for (const name of names) {
    const value = map.get(name.toLowerCase())
    if (value) return value
  }

  return ''
}

export type SubmissionSummary = {
  name: string
  email: string
  phone: string
  projectType: string
  location: string
  message: string
}

export const extractSubmissionSummary = (
  submissionData: SubmissionEntry[] | null | undefined,
): SubmissionSummary => {
  const firstName = getField(submissionData, ['firstName', 'first_name', 'firstname'])
  const lastName = getField(submissionData, ['lastName', 'last_name', 'lastname'])
  const fullName = getField(submissionData, ['name', 'fullName', 'full_name'])

  const name = fullName || [firstName, lastName].filter(Boolean).join(' ').trim()

  return {
    name,
    email: getField(submissionData, ['email', 'emailAddress', 'email_address']),
    phone: getField(submissionData, ['phone', 'phoneNumber', 'phone_number', 'tel']),
    projectType: getField(submissionData, ['projectType', 'project_type', 'type']),
    location: getField(submissionData, ['location', 'city']),
    message: getField(submissionData, ['message', 'comment', 'notes']),
  }
}
