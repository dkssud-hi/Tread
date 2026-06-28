import { NextResponse } from 'next/server'
import { BRAND_OPTIONS } from '@/lib/display'
import { filterShoes } from '@/lib/shoes'
import type {
  Cushion,
  DistanceRange,
  Purpose,
  Responsiveness,
  ShoeFilter,
} from '@/types/shoe'

const PURPOSES: Purpose[] = ['jogging', 'interval', 'tempo', 'race', 'lsd']
const CUSHIONS: Cushion[] = ['soft', 'firm', 'balanced']
const RESPONSIVENESS: Responsiveness[] = ['high', 'mid', 'low']
const DISTANCES: DistanceRange[] = ['under5', '5to10', '10to20', 'over20']

// 허용된 값일 때만 통과시키고, 그 외(빈 값·오타 등)는 undefined로 무시
function pick<T extends string>(value: string | null, allowed: T[]): T | undefined {
  return value && (allowed as string[]).includes(value) ? (value as T) : undefined
}

// GET /api/shoes?purpose=&cushion=&responsiveness=&distance=
export function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const filter: ShoeFilter = {
    purpose: pick(searchParams.get('purpose'), PURPOSES),
    cushion: pick(searchParams.get('cushion'), CUSHIONS),
    responsiveness: pick(searchParams.get('responsiveness'), RESPONSIVENESS),
    distance: pick(searchParams.get('distance'), DISTANCES),
    brand: pick(searchParams.get('brand'), BRAND_OPTIONS),
  }

  const results = filterShoes(filter)
  return NextResponse.json(results)
}
