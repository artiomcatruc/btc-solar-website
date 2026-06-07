import type { CheckboxField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { useFormContext } from 'react-hook-form'

import { Checkbox as CheckboxUi } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import React from 'react'

import { renderConsentLabel, useFormAppearance } from '../appearance'
import { Error } from '../Error'
import { Width } from '../Width'

export const Checkbox: React.FC<
  CheckboxField & {
    errors: Partial<FieldErrorsImpl>
    privacyPolicyUrl?: string | null
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, privacyPolicyUrl, register, required, width }) => {
  const props = register(name, { required: required })
  const { setValue } = useFormContext()
  const appearance = useFormAppearance()
  const isBtc = appearance === 'btc'

  return (
    <Width width={width}>
      <div className={isBtc ? 'flex items-start gap-3' : 'flex items-center gap-2'}>
        {isBtc ? (
          <input
            className="mt-1 h-5 w-5 rounded border-graphite-300 text-solar-500 focus:ring-solar-400"
            defaultChecked={Boolean(defaultValue)}
            id={name}
            type="checkbox"
            {...props}
          />
        ) : (
          <CheckboxUi
            defaultChecked={defaultValue}
            id={name}
            {...props}
            onCheckedChange={(checked) => {
              setValue(props.name, checked)
            }}
          />
        )}
        {isBtc ? (
          <label className="text-sm text-graphite-600" htmlFor={name}>
            {renderConsentLabel(label || '', privacyPolicyUrl || '')}
          </label>
        ) : (
          <Label htmlFor={name}>
            {required ? (
              <span className="required">
                * <span className="sr-only">(required)</span>
              </span>
            ) : null}
            {label}
          </Label>
        )}
      </div>
      {errors[name] && <Error name={name} />}
    </Width>
  )
}
