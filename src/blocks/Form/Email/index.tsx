import type { EmailField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

import { BtcLabel, btcFieldClass, getBtcPlaceholder, useFormAppearance } from '../appearance'
import { Error } from '../Error'
import { Width } from '../Width'

export const Email: React.FC<
  EmailField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required, width }) => {
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
        <input
          className={btcFieldClass}
          defaultValue={defaultValue ?? undefined}
          id={name}
          placeholder={getBtcPlaceholder(name || '', label || '')}
          type="email"
          {...register(name, { pattern: /^\S[^\s@]*@\S+$/, required })}
        />
      ) : (
        <Input
          defaultValue={defaultValue}
          id={name}
          type="text"
          {...register(name, { pattern: /^\S[^\s@]*@\S+$/, required })}
        />
      )}

      {errors[name] && <Error name={name} />}
    </Width>
  )
}
