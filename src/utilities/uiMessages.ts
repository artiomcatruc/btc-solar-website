import type { Locale } from '@/utilities/locale'

const dict = {
  en: {
    contactInfo: 'Contact Info',
    openNav: 'Open navigation',
    closeNav: 'Close navigation',
    whatsappChat: 'Chat on WhatsApp',
    productsEyebrow: 'Shop',
    productsTitle: 'Products',
    productsLead:
      'Solar equipment available for order. Leave your contacts at checkout — we confirm availability and arrange payment offline.',
    productsEmptyTitle: 'No products yet',
    productsEmptyLead: 'Add products in the admin panel to show them here.',
    soldOut: 'Sold out',
    inStock: 'In stock',
    inStockCount: '{count} in stock',
    noImage: 'No image',
  },
  ru: {
    contactInfo: 'Контакты',
    openNav: 'Открыть меню',
    closeNav: 'Закрыть меню',
    whatsappChat: 'Написать в WhatsApp',
    productsEyebrow: 'Магазин',
    productsTitle: 'Продукты',
    productsLead:
      'Солнечное оборудование под заказ. На оформлении оставьте контакты — мы подтвердим наличие и согласуем оплату офлайн.',
    productsEmptyTitle: 'Пока нет продуктов',
    productsEmptyLead: 'Добавьте продукты в админке, чтобы они появились здесь.',
    soldOut: 'Нет в наличии',
    inStock: 'В наличии',
    inStockCount: '{count} шт.',
    noImage: 'Нет фото',
  },
  ro: {
    contactInfo: 'Contact',
    openNav: 'Deschide meniul',
    closeNav: 'Închide meniul',
    whatsappChat: 'Scrie pe WhatsApp',
    productsEyebrow: 'Magazin',
    productsTitle: 'Produse',
    productsLead:
      'Echipamente solare disponibile la comandă. Lăsați datele de contact la finalizare — confirmăm stocul și plata offline.',
    productsEmptyTitle: 'Încă nu există produse',
    productsEmptyLead: 'Adăugați produse în panoul admin pentru a le afișa aici.',
    soldOut: 'Stoc epuizat',
    inStock: 'În stoc',
    inStockCount: '{count} în stoc',
    noImage: 'Fără imagine',
  },
} as const satisfies Record<Locale, Record<string, string>>

export type UiMessageKey = keyof (typeof dict)['en']

export function t(locale: Locale, key: UiMessageKey): string {
  return dict[locale][key] ?? dict.en[key]
}
