import type { Media } from '@/payload-types'
import type { Locale } from '@/utilities/locale'

type Args = {
  image1: Media
  image2: Media
  image3: Media
}

type ProductSeed = {
  slug: string
  image: number
  price: number
  currency: 'MDL' | 'EUR' | 'USD'
  quantity: number
  soldOut: boolean
  sort: number
  locales: Record<Locale, { title: string; summary: string }>
}

export const sampleProducts = ({ image1, image2, image3 }: Args): ProductSeed[] => [
  {
    slug: 'solar-panel-550w',
    image: image1.id,
    price: 1890,
    currency: 'MDL',
    quantity: 24,
    soldOut: false,
    sort: 10,
    locales: {
      en: {
        title: 'Solar Panel 550W Mono',
        summary:
          'High-efficiency monocrystalline panel for residential and commercial rooftops. Includes 25-year performance warranty.',
      },
      ru: {
        title: 'Солнечная панель 550W Mono',
        summary:
          'Высокоэффективная монокристаллическая панель для крыш домов и коммерческих объектов. Гарантия производительности 25 лет.',
      },
      ro: {
        title: 'Panou solar 550W Mono',
        summary:
          'Panou monocristalin de înaltă eficiență pentru acoperișuri rezidențiale și comerciale. Garanție de performanță 25 ani.',
      },
    },
  },
  {
    slug: 'hybrid-inverter-5kw',
    image: image2.id,
    price: 12900,
    currency: 'MDL',
    quantity: 6,
    soldOut: false,
    sort: 20,
    locales: {
      en: {
        title: 'Hybrid Inverter 5 kW',
        summary:
          'Grid-ready hybrid inverter with battery support. Ideal for homes that want backup power and lower utility bills.',
      },
      ru: {
        title: 'Гибридный инвертор 5 кВт',
        summary:
          'Гибридный инвертор с поддержкой батарей. Подходит для домов с резервным питанием и снижением счетов за электричество.',
      },
      ro: {
        title: 'Invertor hibrid 5 kW',
        summary:
          'Invertor hibrid compatibil cu baterii. Ideal pentru case cu backup și facturi mai mici la energie.',
      },
    },
  },
  {
    slug: 'roof-mounting-kit',
    image: image3.id,
    price: 2450,
    currency: 'MDL',
    quantity: 0,
    soldOut: true,
    sort: 30,
    locales: {
      en: {
        title: 'Roof Mounting Kit',
        summary:
          'Complete aluminum mounting kit for pitched roofs. Compatible with standard 60/72-cell modules.',
      },
      ru: {
        title: 'Комплект креплений на крышу',
        summary:
          'Полный алюминиевый комплект для скатных крыш. Совместим со стандартными модулями 60/72 ячеек.',
      },
      ro: {
        title: 'Kit de montaj pe acoperiș',
        summary:
          'Kit complet din aluminiu pentru acoperișuri înclinate. Compatibil cu module standard 60/72 celule.',
      },
    },
  },
]
