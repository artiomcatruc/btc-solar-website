import type { Locale } from '@/utilities/locale'

export const formatPrice = (price: number, currency: string, locale: Locale) => {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: price % 1 === 0 ? 0 : 2,
    }).format(price)
  } catch {
    return `${price} ${currency}`
  }
}
