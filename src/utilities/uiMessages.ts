import type { Locale } from '@/utilities/locale'

const dict = {
  en: {
    contactInfo: 'Contact Info',
    openNav: 'Open navigation',
    closeNav: 'Close navigation',
    whatsappChat: 'Chat on WhatsApp',
  },
  ru: {
    contactInfo: 'Контакты',
    openNav: 'Открыть меню',
    closeNav: 'Закрыть меню',
    whatsappChat: 'Написать в WhatsApp',
  },
  ro: {
    contactInfo: 'Contact',
    openNav: 'Deschide meniul',
    closeNav: 'Închide meniul',
    whatsappChat: 'Scrie pe WhatsApp',
  },
} as const satisfies Record<Locale, Record<string, string>>

export type UiMessageKey = keyof (typeof dict)['en']

export function t(locale: Locale, key: UiMessageKey): string {
  return dict[locale][key] ?? dict.en[key]
}
