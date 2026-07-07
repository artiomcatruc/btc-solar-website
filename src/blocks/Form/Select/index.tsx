import type { SelectField } from '@payloadcms/plugin-form-builder/types'
import type { Control, FieldErrorsImpl } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import {
  Select as SelectComponent,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import React from 'react'
import { Controller } from 'react-hook-form'

import { BtcLabel, btcFieldClass, useFormAppearance } from '../appearance'
import { Error } from '../Error'
import { Width } from '../Width'

export const Select: React.FC<
  SelectField & {
    control: Control
    errors: Partial<FieldErrorsImpl>
    placeholder?: string | null
  }
> = ({ name, control, errors, label, options, placeholder, required, width, defaultValue }) => {
  const appearance = useFormAppearance()
  const isBtc = appearance === 'btc'
  const emptyLabel = placeholder?.trim() || 'Select project type'

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
      <Controller
        control={control}
        defaultValue={defaultValue}
        name={name}
        render={({ field: { onChange, value } }) => {
          if (isBtc) {
            return (
              <select
                className={`${btcFieldClass} cursor-pointer appearance-none`}
                id={name}
                onChange={(event) => onChange(event.target.value)}
                required={required ?? false}
                value={value ?? ''}
              >
                <option disabled value="">
                  {emptyLabel}
                </option>
                {options.map(({ label: optionLabel, value: optionValue }) => (
                  <option key={optionValue} value={optionValue}>
                    {optionLabel}
                  </option>
                ))}
              </select>
            )
          }

          const controlledValue = options.find((t) => t.value === value)

          return (
            <SelectComponent onValueChange={(val) => onChange(val)} value={controlledValue?.value}>
              <SelectTrigger className="w-full" id={name}>
                <SelectValue placeholder={emptyLabel} />
              </SelectTrigger>
              <SelectContent>
                {options.map(({ label: optionLabel, value: optionValue }) => {
                  return (
                    <SelectItem key={optionValue} value={optionValue}>
                      {optionLabel}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </SelectComponent>
          )
        }}
        rules={{ required }}
      />
      {errors[name] && <Error name={name} />}
    </Width>
  )
}
