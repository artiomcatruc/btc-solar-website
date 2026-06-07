export type SerializedGalleryProject = {
  id: number
  category: string
  title: string
  lightboxTitle: string
  badgeLabel: string
  location?: string | null
  systemSize?: string | null
  layout: 'normal' | 'large'
  imageUrl: string
  imageAlt: string
}
