export type Purpose = 'jogging' | 'interval' | 'tempo' | 'race' | 'lsd'
export type Cushion = 'soft' | 'firm' | 'balanced'
export type Responsiveness = 'high' | 'mid' | 'low'
export type DistanceRange = 'under5' | '5to10' | '10to20' | 'over20'

export type Shoe = {
  id: string
  name: string
  brand: string
  imageUrl: string
  purpose: Purpose[]
  cushion: Cushion
  responsiveness: Responsiveness // 반발력(에너지 리턴) 등급
  weight: number // 그램 (남성 270mm 기준) — 상세 페이지 표시용
  drop: number // 힐-투-토 드롭 (mm) — 상세 페이지 표시용
  recommendedDistance: DistanceRange[] // 훈련 시 추천되는 주행 거리대 (복수 가능)
  features: string[]
  officialUrl: string
}

// 검색 필터: 훈련 목적 · 쿠셔닝 · 반발력 · 거리 · 브랜드
export type ShoeFilter = {
  purpose?: Purpose
  cushion?: Cushion
  responsiveness?: Responsiveness
  distance?: DistanceRange
  brand?: string
}
