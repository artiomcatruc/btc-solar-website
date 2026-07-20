'use client'

import React from 'react'

type Props = {
  value: string
  onChange: (value: string) => void
}

/** Visually hidden field — bots fill it, humans don't. */
export const HoneypotField: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: '-10000px',
        top: 'auto',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
      }}
    >
      <label htmlFor="companyWebsite">Company website</label>
      <input
        autoComplete="off"
        id="companyWebsite"
        name="companyWebsite"
        tabIndex={-1}
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}
