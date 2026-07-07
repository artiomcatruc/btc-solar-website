export const GALLERY_FILTER_EVENT = 'btc-gallery-filter'

export type GalleryFilterDetail = {
  groupId: string
  category: string
}

export function dispatchGalleryFilter(detail: GalleryFilterDetail) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent<GalleryFilterDetail>(GALLERY_FILTER_EVENT, { detail }))
}
