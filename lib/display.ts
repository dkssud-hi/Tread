import type { Cushion, DistanceRange, Purpose, Responsiveness } from '@/types/shoe'

// 필터 값 → 한글 표시 라벨
export const PURPOSE_LABELS: Record<Purpose, string> = {
  jogging: '조깅',
  interval: '인터벌',
  tempo: '템포',
  race: '대회/레이스',
  lsd: 'LSD(장거리)',
}

export const CUSHION_LABELS: Record<Cushion, string> = {
  soft: '푹신함',
  firm: '단단함',
  balanced: '균형',
}

export const RESPONSIVENESS_LABELS: Record<Responsiveness, string> = {
  high: '높음',
  mid: '중간',
  low: '낮음',
}

export const DISTANCE_LABELS: Record<DistanceRange, string> = {
  under5: '5km 이하',
  '5to10': '5~10km',
  '10to20': '10~20km',
  over20: '20km 이상',
}

// 필터 그룹 정의 (UI에서 순서대로 렌더링)
export const PURPOSE_OPTIONS: Purpose[] = ['jogging', 'interval', 'tempo', 'race', 'lsd']
export const CUSHION_OPTIONS: Cushion[] = ['soft', 'balanced', 'firm']
export const RESPONSIVENESS_OPTIONS: Responsiveness[] = ['high', 'mid', 'low']
export const DISTANCE_OPTIONS: DistanceRange[] = ['under5', '5to10', '10to20', 'over20']

// 브랜드 → 플레이스홀더 배경색 (실제 이미지 확보 전까지 사용)
const BRAND_COLORS: Record<string, string> = {
  Nike: '#111827',
  Adidas: '#1F2937',
  ASICS: '#1D4ED8',
  HOKA: '#7C3AED',
  'New Balance': '#DC2626',
  Saucony: '#EA580C',
  Brooks: '#059669',
  On: '#0F766E',
  Mizuno: '#2563EB',
  Puma: '#000000',
}

export function brandColor(brand: string): string {
  return BRAND_COLORS[brand] ?? '#6B7280'
}
