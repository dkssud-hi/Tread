import shoesData from '@/data/shoes.json'
import type { Shoe, ShoeFilter } from '@/types/shoe'

const shoes = shoesData as Shoe[]

// 전체 러닝화 목록 반환
export function getAllShoes(): Shoe[] {
  return shoes
}

// id로 단일 러닝화 조회 (상세 페이지용)
export function getShoeById(id: string): Shoe | undefined {
  return shoes.find((shoe) => shoe.id === id)
}

// 필터 4축으로 러닝화 검색
// - purpose: 신발의 purpose 배열에 포함되면 매칭
// - cushion / responsiveness: 정확히 일치
// - distance: 신발의 recommendedDistance 배열에 포함되면 매칭
// 미입력 조건은 무시한다.
export function filterShoes(filter: ShoeFilter): Shoe[] {
  return shoes.filter((shoe) => {
    if (filter.purpose && !shoe.purpose.includes(filter.purpose)) {
      return false
    }
    if (filter.cushion && shoe.cushion !== filter.cushion) {
      return false
    }
    if (filter.responsiveness && shoe.responsiveness !== filter.responsiveness) {
      return false
    }
    if (filter.distance && !shoe.recommendedDistance.includes(filter.distance)) {
      return false
    }
    return true
  })
}
