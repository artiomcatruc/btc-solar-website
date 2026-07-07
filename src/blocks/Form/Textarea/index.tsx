import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import { Textarea as TextAreaComponent } from '@/components/ui/textarea'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'
import { BtcLabel, btcFieldClass, getBtcPlaceholder, useFormAppearance } from '../appearance'

export const Textarea: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
    rows?: number
  }
> = ({ name, defaultValue, errors, label, register, required, rows = 3, width }) => {
  const appearance = useFormAppearance()
  const isBtc = appearance === 'btc'

  return (
    <Width width={width}>
      {isBtc ? (
        <BtcLabel htmlFor={name || ''} label={label || ''} required={required} />
      ) : (
        <Label htmlFor={name}>
          {label}
          {required ? (
            <span className="required">
              * <span className="sr-only">(required)</span>
            </span>
          ) : null}
        </Label>
      )}

      {isBtc ? (
        <textarea
          className={`${btcFieldClass} resize-none`}
          defaultValue={defaultValue ?? undefined}
          id={name}
          placeholder={getBtcPlaceholder(name || '', label || '')}
          rows={4}
          {...register(name, { required: required })}
        />
      ) : (
        <TextAreaComponent
          defaultValue={defaultValue}
          id={name}
          rows={rows}
          {...register(name, { required: required })}
        />
      )}

      {errors[name] && <Error name={name} />}
    </Width>
  )
}
