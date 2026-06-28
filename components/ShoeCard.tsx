import Link from 'next/link'
import { brandColor, CUSHION_LABELS } from '@/lib/display'
import type { Shoe } from '@/types/shoe'

export default function ShoeCard({ shoe }: { shoe: Shoe }) {
  return (
    <Link
      href={`/shoes/${shoe.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-md"
    >
      {/* 이미지 플레이스홀더 (브랜드 색) — 실제 이미지 확보 후 교체 */}
      <div
        className="flex h-40 items-center justify-center text-2xl font-bold tracking-wide text-white/90"
        style={{ backgroundColor: brandColor(shoe.brand) }}
      >
        {shoe.brand}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div>
          <h3 className="font-bold text-gray-900">{shoe.name}</h3>
          <p className="text-sm text-gray-500">{shoe.brand}</p>
        </div>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
          <span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-medium text-orange-700">
            {CUSHION_LABELS[shoe.cushion]}
          </span>
          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
            {shoe.weight}g
          </span>
          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
            드롭 {shoe.drop}mm
          </span>
        </div>
      </div>
    </Link>
  )
}
