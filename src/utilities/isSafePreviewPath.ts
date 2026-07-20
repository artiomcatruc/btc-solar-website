/**
 * Relative preview paths only. Rejects open redirects like `//evil.com` and `/\evil.com`.
 */
export const isSafePreviewPath = (path: string): boolean => {
  if (!path.startsWith('/')) return false
  if (path.startsWith('//')) return false
  if (path.includes('\\')) return false
  if (path.includes('://')) return false

  try {
    const url = new URL(path, 'http://preview.local')
    return url.origin === 'http://preview.local'
  } catch {
    return false
  }
}
