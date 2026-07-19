import type { Locale } from '@/utilities/locale'

const dict = {
  en: {
    contactInfo: 'Contact Info',
    openNav: 'Open navigation',
    closeNav: 'Close navigation',
  },
  ru: {
    contactInfo: 'Контакты',
    openNav: 'Открыть меню',
    closeNav: 'Закрыть меню',
  },
  ro: {
    contactInfo: 'Contact',
    openNav: 'Deschide meniul',
    closeNav: 'Închide meniul',
  },
} as const satisfies Record<Locale, Record<string, string>>

export type UiMessageKey = keyof (typeof dict)['en']

export function t(locale: Locale, key: UiMessageKey): string {
  return dict[locale][key] ?? dict.en[key]
}
