import { describe, expect, it } from 'vitest'

import { isSafePreviewPath } from '@/utilities/isSafePreviewPath'

describe('isSafePreviewPath', () => {
  it('allows relative site paths', () => {
    expect(isSafePreviewPath('/en/about')).toBe(true)
    expect(isSafePreviewPath('/')).toBe(true)
  })

  it('rejects open redirects', () => {
    expect(isSafePreviewPath('//evil.com')).toBe(false)
    expect(isSafePreviewPath('/\\evil.com')).toBe(false)
    expect(isSafePreviewPath('https://evil.com')).toBe(false)
    expect(isSafePreviewPath('evil.com')).toBe(false)
  })
})
