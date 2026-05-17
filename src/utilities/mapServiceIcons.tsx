import type { LucideIcon } from 'lucide-react'
import { BarChart3, Bolt, Building2, Cog, Home, ShieldCheck } from 'lucide-react'

type ServiceIconKey =
  | 'home'
  | 'building'
  | 'shield'
  | 'bolt'
  | 'cog'
  | 'chart'

/** Maps CMS service icon selects to lucide glyphs (legacy-style iconography). */
export const SERVICE_ICON_MAP: Record<ServiceIconKey, LucideIcon> = {
  home: Home,
  building: Building2,
  shield: ShieldCheck,
  bolt: Bolt,
  cog: Cog,
  chart: BarChart3,
}

export function serviceIconGlyph(key?: string | null): LucideIcon {
  const k = key as ServiceIconKey
  return SERVICE_ICON_MAP[k] ?? Home
}
