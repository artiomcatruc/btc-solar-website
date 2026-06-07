'use client'

import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'

import RichText from '@/components/RichText'
import type { Form as PayloadForm } from '@/payload-types'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import {
  FormAppearanceProvider,
  groupContactFormFields,
  isConsentFieldName,
} from '@/blocks/Form/appearance'
import { fields } from '@/blocks/Form/fields'
import { getClientSideURL } from '@/utilities/getURL'
import { cn } from '@/utilities/ui'

type Props = {
  form: PayloadForm
  formLead?: string | null
  formTitle?: string | null
  privacyPolicyUrl?: string | null
}

export const ContactFormPanel: React.FC<Props> = ({
  form: formRelation,
  formLead,
  formTitle,
  privacyPolicyUrl,
}) => {
  const formFromProps = formRelation as unknown as FormType
  const {
    id: formID,
    confirmationMessage,
    confirmationType,
    redirect,
    submitButtonLabel,
  } = formFromProps

  const formMethods = useForm({
    defaultValues: formFromProps.fields,
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const fieldRows = groupContactFormFields(formFromProps.fields ?? [])

  const onSubmit = useCallback(
    (data: FormFieldBlock[]) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)
            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status,
            })
            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect
            if (url) router.push(url)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  return (
    <div className="fade-in-visible rounded-3xl bg-graphite-50 p-8 md:p-10">
      {formTitle ? <h2 className="mb-2 text-2xl font-bold text-graphite-900">{formTitle}</h2> : null}
      {formLead ? <p className="mb-8 text-graphite-600">{formLead}</p> : null}

      <FormAppearanceProvider appearance="btc">
        <FormProvider {...formMethods}>
          {!isLoading && hasSubmitted && confirmationType === 'message' ? (
            <div className="prose prose-graphite max-w-none">
              <RichText data={confirmationMessage} enableGutter={false} />
            </div>
          ) : null}

          {isLoading && !hasSubmitted ? (
            <p className="text-graphite-600">Sending your request...</p>
          ) : null}

          {error ? (
            <p className="mb-4 text-sm text-red-600">
              {error.status ? `${error.status}: ` : ''}
              {error.message}
            </p>
          ) : null}

          {!hasSubmitted ? (
            <form className="space-y-6" id={String(formID)} onSubmit={handleSubmit(onSubmit)}>
              {fieldRows.map((row, rowIndex) => (
                <div
                  className={cn(row.length === 2 ? 'grid gap-6 md:grid-cols-2' : undefined)}
                  key={`row-${rowIndex}`}
                >
                  {row.map((field, index) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                    if (!Field) return null

                    const fieldName = 'name' in field ? field.name : `field-${index}`
                    const isConsent = isConsentFieldName(fieldName)

                    return (
                      <Field
                        control={control}
                        errors={errors}
                        form={formFromProps}
                        key={`${fieldName}-${index}`}
                        privacyPolicyUrl={isConsent ? privacyPolicyUrl : undefined}
                        register={register}
                        {...field}
                      />
                    )
                  })}
                </div>
              ))}

              <button
                className="flex w-full items-center justify-center gap-2 rounded-full bg-graphite-900 px-8 py-4 font-semibold text-white transition-colors hover:bg-graphite-800 disabled:opacity-60"
                disabled={isLoading}
                form={String(formID)}
                type="submit"
              >
                {submitButtonLabel || 'Submit Request'}
                <ArrowRight aria-hidden className="h-5 w-5" strokeWidth={2} />
              </button>
            </form>
          ) : null}
        </FormProvider>
      </FormAppearanceProvider>
    </div>
  )
}
