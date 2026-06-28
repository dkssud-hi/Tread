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

// 필터용 브랜드 목록 (데이터의 브랜드와 동기화 — BRAND_COLORS 키 기준)
export const BRAND_OPTIONS: string[] = Object.keys(BRAND_COLORS)

// 거리 밴드별 경계값 (km). over20은 상한 없음(Infinity).
const DISTANCE_BOUNDS: Record<DistanceRange, [number, number]> = {
  under5: [0, 5],
  '5to10': [5, 10],
  '10to20': [10, 20],
  over20: [20, Infinity],
}

// 추천 거리 배열을 연속 범위로 병합해 한 줄로 표시
// 예) ['5to10','10to20'] -> '5~20km', ['10to20','over20'] -> '10km 이상'
export function formatDistanceRange(distances: DistanceRange[]): string {
  if (distances.length === 0) return '-'
  const sorted = [...distances].sort(
    (a, b) => DISTANCE_OPTIONS.indexOf(a) - DISTANCE_OPTIONS.indexOf(b)
  )
  const min = DISTANCE_BOUNDS[sorted[0]][0]
  const max = DISTANCE_BOUNDS[sorted[sorted.length - 1]][1]
  if (min === 0 && max === Infinity) return '전 거리'
  if (min === 0) return `${max}km 이하`
  if (max === Infinity) return `${min}km 이상`
  return `${min}~${max}km`
}
