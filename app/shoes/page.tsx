import Link from 'next/link'
import ShoeCard from '@/components/ShoeCard'
import {
  CUSHION_LABELS,
  DISTANCE_LABELS,
  PURPOSE_LABELS,
  RESPONSIVENESS_LABELS,
} from '@/lib/display'
import { filterShoes } from '@/lib/shoes'
import type {
  Cushion,
  DistanceRange,
  Purpose,
  Responsiveness,
  ShoeFilter,
} from '@/types/shoe'

type SearchParams = {
  purpose?: string
  cushion?: string
  responsiveness?: string
  distance?: string
}

const PURPOSES: Purpose[] = ['jogging', 'interval', 'tempo', 'race', 'lsd']
const CUSHIONS: Cushion[] = ['soft', 'firm', 'balanced']
const RESPONSIVENESS: Responsiveness[] = ['high', 'mid', 'low']
const DISTANCES: DistanceRange[] = ['under5', '5to10', '10to20', 'over20']

function pick<T extends string>(value: string | undefined, allowed: T[]): T | undefined {
  return value && (allowed as string[]).includes(value) ? (value as T) : undefined
}

export default async function ShoesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const sp = await searchParams

  const filter: ShoeFilter = {
    purpose: pick(sp.purpose, PURPOSES),
    cushion: pick(sp.cushion, CUSHIONS),
    responsiveness: pick(sp.responsiveness, RESPONSIVENESS),
    distance: pick(sp.distance, DISTANCES),
  }

  const results = filterShoes(filter)

  // 적용된 조건을 라벨 칩으로 표시
  const appliedChips: string[] = []
  if (filter.purpose) appliedChips.push(PURPOSE_LABELS[filter.purpose])
  if (filter.cushion) appliedChips.push(CUSHION_LABELS[filter.cushion])
  if (filter.responsiveness) appliedChips.push(RESPONSIVENESS_LABELS[filter.responsiveness])
  if (filter.distance) appliedChips.push(DISTANCE_LABELS[filter.distance])

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-10">
      <div className="mb-6">
        <Link href="/" className="text-sm font-medium text-orange-600 hover:underline">
          ← 검색 조건 바꾸기
        </Link>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold text-gray-900">검색 결과</h1>
        <span className="text-sm font-medium text-gray-500">{results.length}개</span>
      </div>

      {appliedChips.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {appliedChips.map((chip) => (
            <span
              key={chip}
              className="rounded-full bg-orange-50 px-3 py-1.5 text-sm font-medium text-orange-700"
            >
              {chip}
            </span>
          ))}
        </div>
      )}

      {results.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-gray-50 px-6 py-16 text-center">
          <p className="text-base font-medium text-gray-700">
            조건에 맞는 러닝화가 없어요
          </p>
          <p className="mt-2 text-sm text-gray-500">
            조건을 줄여서 다시 검색해보세요
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-orange-600"
          >
            조건 다시 선택
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((shoe) => (
            <ShoeCard key={shoe.id} shoe={shoe} />
          ))}
        </div>
      )}
    </main>
  )
}
