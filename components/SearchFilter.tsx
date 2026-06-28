'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  BRAND_OPTIONS,
  CUSHION_LABELS,
  CUSHION_OPTIONS,
  DISTANCE_LABELS,
  DISTANCE_OPTIONS,
  PURPOSE_LABELS,
  PURPOSE_OPTIONS,
  RESPONSIVENESS_LABELS,
  RESPONSIVENESS_OPTIONS,
} from '@/lib/display'

type Selected = {
  purpose?: string
  cushion?: string
  responsiveness?: string
  distance?: string
  brand?: string
}

// 단일 선택 칩 그룹 (이미 선택된 칩을 다시 누르면 해제)
function ChipGroup({
  title,
  options,
  labels,
  value,
  onSelect,
}: {
  title: string
  options: string[]
  labels?: Record<string, string>
  value?: string
  onSelect: (v?: string) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-gray-700">{title}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value === opt
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onSelect(active ? undefined : opt)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                active
                  ? 'border-orange-500 bg-orange-500 text-white'
                  : 'border-gray-300 bg-white text-gray-600 hover:border-orange-400 hover:text-orange-600'
              }`}
            >
              {labels?.[opt] ?? opt}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function SearchFilter() {
  const router = useRouter()
  const [selected, setSelected] = useState<Selected>({})

  function update(key: keyof Selected, value?: string) {
    setSelected((prev) => ({ ...prev, [key]: value }))
  }

  function handleSearch() {
    const params = new URLSearchParams()
    if (selected.purpose) params.set('purpose', selected.purpose)
    if (selected.cushion) params.set('cushion', selected.cushion)
    if (selected.responsiveness) params.set('responsiveness', selected.responsiveness)
    if (selected.distance) params.set('distance', selected.distance)
    if (selected.brand) params.set('brand', selected.brand)
    const query = params.toString()
    router.push(query ? `/shoes?${query}` : '/shoes')
  }

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <ChipGroup
        title="훈련 목적"
        options={PURPOSE_OPTIONS}
        labels={PURPOSE_LABELS}
        value={selected.purpose}
        onSelect={(v) => update('purpose', v)}
      />
      <ChipGroup
        title="착화감"
        options={CUSHION_OPTIONS}
        labels={CUSHION_LABELS}
        value={selected.cushion}
        onSelect={(v) => update('cushion', v)}
      />
      <ChipGroup
        title="반발력"
        options={RESPONSIVENESS_OPTIONS}
        labels={RESPONSIVENESS_LABELS}
        value={selected.responsiveness}
        onSelect={(v) => update('responsiveness', v)}
      />
      <ChipGroup
        title="주행 거리"
        options={DISTANCE_OPTIONS}
        labels={DISTANCE_LABELS}
        value={selected.distance}
        onSelect={(v) => update('distance', v)}
      />
      <ChipGroup
        title="브랜드"
        options={BRAND_OPTIONS}
        value={selected.brand}
        onSelect={(v) => update('brand', v)}
      />
      <button
        type="button"
        onClick={handleSearch}
        className="rounded-xl bg-orange-500 px-6 py-3.5 text-base font-bold text-white transition hover:bg-orange-600"
      >
        러닝화 검색하기
      </button>
    </div>
  )
}
