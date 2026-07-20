import { afterEach, describe, expect, it } from 'vitest'

import { signPreviewPath, verifyPreviewSignature } from '@/utilities/previewSignature'

describe('previewSignature', () => {
  const original = process.env.PREVIEW_SECRET

  afterEach(() => {
    process.env.PREVIEW_SECRET = original
  })

  it('signs and verifies a relative path', () => {
    process.env.PREVIEW_SECRET = 'test-preview-secret'
    const signed = signPreviewPath('/en/about')
    expect(signed).not.toBeNull()
    expect(verifyPreviewSignature(signed!.path, signed!.exp, signed!.sig)).toBe(true)
  })

  it('rejects tampered signatures', () => {
    process.env.PREVIEW_SECRET = 'test-preview-secret'
    const signed = signPreviewPath('/en/about')
    expect(signed).not.toBeNull()
    expect(verifyPreviewSignature(signed!.path, signed!.exp, 'deadbeef')).toBe(false)
    expect(verifyPreviewSignature('/en/evil', signed!.exp, signed!.sig)).toBe(false)
  })

  it('rejects expired signatures', () => {
    process.env.PREVIEW_SECRET = 'test-preview-secret'
    const signed = signPreviewPath('/en/about')
    expect(signed).not.toBeNull()
    const expired = String(Math.floor(Date.now() / 1000) - 10)
    expect(verifyPreviewSignature(signed!.path, expired, signed!.sig)).toBe(false)
  })
})
