import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

import {
  BtcLabel,
  btcFieldClass,
  getBtcPlaceholder,
  isPhoneFieldName,
  useFormAppearance,
} from '../appearance'
import { Error } from '../Error'
import { Width } from '../Width'

export const Number: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required, width }) => {
  const appearance = useFormAppearance()
  const isBtc = appearance === 'btc'
  const isPhone = isPhoneFieldName(name)

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
          inputMode={isPhone ? 'tel' : 'numeric'}
          placeholder={getBtcPlaceholder(name || '', label || '')}
          type={isPhone ? 'tel' : 'text'}
          {...register(name, { required })}
        />
      ) : (
        <Input
          defaultValue={defaultValue}
          id={name}
          type="number"
          {...register(name, { required })}
        />
      )}
      {errors[name] && <Error name={name} />}
    </Width>
  )
}
