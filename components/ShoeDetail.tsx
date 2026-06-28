import {
  brandColor,
  CUSHION_LABELS,
  DISTANCE_LABELS,
  PURPOSE_LABELS,
  RESPONSIVENESS_LABELS,
} from '@/lib/display'
import type { Shoe } from '@/types/shoe'

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-gray-100 py-3 last:border-b-0">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-semibold text-gray-900">{value}</span>
    </div>
  )
}

export default function ShoeDetail({ shoe }: { shoe: Shoe }) {
  const purposeText = shoe.purpose.map((p) => PURPOSE_LABELS[p]).join(', ')
  const distanceText = shoe.recommendedDistance.map((d) => DISTANCE_LABELS[d]).join(', ')

  return (
    <div className="flex flex-col gap-8 md:flex-row">
      {/* 이미지 플레이스홀더 (브랜드 색) */}
      <div
        className="flex h-64 w-full items-center justify-center rounded-2xl text-3xl font-bold tracking-wide text-white/90 md:h-80 md:w-80 md:shrink-0"
        style={{ backgroundColor: brandColor(shoe.brand) }}
      >
        {shoe.brand}
      </div>

      <div className="flex flex-1 flex-col">
        <p className="text-sm font-medium text-gray-500">{shoe.brand}</p>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-gray-900">
          {shoe.name}
        </h1>

        {/* 스펙 테이블 */}
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white px-5">
          <SpecRow label="훈련 목적" value={purposeText} />
          <SpecRow label="착화감(쿠셔닝)" value={CUSHION_LABELS[shoe.cushion]} />
          <SpecRow label="반발력" value={RESPONSIVENESS_LABELS[shoe.responsiveness]} />
          <SpecRow label="무게" value={`${shoe.weight}g`} />
          <SpecRow label="드롭" value={`${shoe.drop}mm`} />
          <SpecRow label="추천 거리" value={distanceText} />
        </div>

        {/* 특성 태그 */}
        <div className="mt-6 flex flex-wrap gap-2">
          {shoe.features.map((feature) => (
            <span
              key={feature}
              className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm text-gray-700"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* 구매 버튼 (Phase 5에서 도메인 검증 강화 예정) */}
        <a
          href={shoe.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-xl bg-orange-500 px-6 py-3.5 text-center text-base font-bold text-white transition hover:bg-orange-600"
        >
          🛒 공식몰에서 구매하기
        </a>
      </div>
    </div>
  )
}
