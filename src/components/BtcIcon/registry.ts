import type { LucideIcon } from 'lucide-react'
import {
  Award,
  BarChart3,
  Battery,
  Bolt,
  Building2,
  CircleCheck,
  Cog,
  Globe2,
  Heart,
  Home,
  Leaf,
  Lightbulb,
  ShieldCheck,
  Sun,
  Users,
  Wrench,
  Zap,
} from 'lucide-react'

export const BTC_ICON_KEYS = [
  'home',
  'building',
  'shield',
  'bolt',
  'cog',
  'chart',
  'lightbulb',
  'globe',
  'zap',
  'sun',
  'battery',
  'wrench',
  'users',
  'check',
  'leaf',
  'award',
  'heart',
] as const

export type BtcIconKey = (typeof BTC_ICON_KEYS)[number]
export type BtcIconTone = 'solar' | 'eco' | 'graphite'

export const BTC_ICON_MAP: Record<BtcIconKey, LucideIcon> = {
  home: Home,
  building: Building2,
  shield: ShieldCheck,
  bolt: Bolt,
  cog: Cog,
  chart: BarChart3,
  lightbulb: Lightbulb,
  globe: Globe2,
  zap: Zap,
  sun: Sun,
  battery: Battery,
  wrench: Wrench,
  users: Users,
  check: CircleCheck,
  leaf: Leaf,
  award: Award,
  heart: Heart,
}

export const BTC_ICON_LABELS: Record<BtcIconKey, string> = {
  home: 'Home',
  building: 'Building',
  shield: 'Shield',
  bolt: 'Bolt',
  cog: 'Settings',
  chart: 'Chart',
  lightbulb: 'Lightbulb',
  globe: 'Globe',
  zap: 'Zap',
  sun: 'Sun',
  battery: 'Battery',
  wrench: 'Wrench',
  users: 'Users',
  check: 'Check',
  leaf: 'Leaf',
  award: 'Award',
  heart: 'Heart',
}

export const BTC_ICON_TONE: Record<BtcIconKey, BtcIconTone> = {
  home: 'solar',
  building: 'eco',
  shield: 'graphite',
  bolt: 'solar',
  cog: 'eco',
  chart: 'graphite',
  lightbulb: 'solar',
  globe: 'eco',
  zap: 'solar',
  sun: 'solar',
  battery: 'eco',
  wrench: 'graphite',
  users: 'eco',
  check: 'solar',
  leaf: 'eco',
  award: 'solar',
  heart: 'solar',
}

export const BTC_ICON_TONE_CLASS: Record<BtcIconTone, string> = {
  solar: 'bg-solar-100 text-solar-500',
  eco: 'bg-eco-100 text-eco-500',
  graphite: 'bg-graphite-100 text-graphite-600',
}

export const BTC_ICON_TONE_DARK_CLASS: Record<BtcIconTone, string> = {
  solar: 'bg-solar-400/20 text-solar-400',
  eco: 'bg-eco-400/20 text-eco-400',
  graphite: 'bg-white/10 text-graphite-300',
}

export const BTC_ICON_SELECT_OPTIONS = BTC_ICON_KEYS.map((value) => ({
  label: BTC_ICON_LABELS[value],
  value,
}))

export function isBtcIconKey(value?: string | null): value is BtcIconKey {
  return BTC_ICON_KEYS.includes(value as BtcIconKey)
}

export function getBtcIconComponent(key?: string | null): LucideIcon {
  if (isBtcIconKey(key)) return BTC_ICON_MAP[key]
  return Home
}

export function getBtcIconTone(key?: string | null): BtcIconTone {
  if (isBtcIconKey(key)) return BTC_ICON_TONE[key]
  return 'solar'
}
