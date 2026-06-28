export type Purpose = 'jogging' | 'interval' | 'tempo' | 'race' | 'lsd'
export type Cushion = 'soft' | 'firm' | 'balanced'
export type DistanceRange = 'under5' | '5to10' | '10to20' | 'over20'

export type Shoe = {
  id: string
  name: string
  brand: string
  imageUrl: string
  purpose: Purpose[]
  cushion: Cushion
  weight: number // 그램 (남성 270mm 기준)
  drop: number // 힐-투-토 드롭 (mm)
  recommendedDistance: DistanceRange
  features: string[]
  officialUrl: string
}

export type ShoeFilter = {
  purpose?: Purpose
  cushion?: Cushion
  distance?: DistanceRange
}
