import Link from 'next/link'
import { notFound } from 'next/navigation'
import ShoeDetail from '@/components/ShoeDetail'
import { getAllShoes, getShoeById } from '@/lib/shoes'

// 빌드 시 모든 러닝화 상세 페이지를 정적 생성
export function generateStaticParams() {
  return getAllShoes().map((shoe) => ({ id: shoe.id }))
}

export default async function ShoeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const shoe = getShoeById(id)

  if (!shoe) {
    notFound()
  }

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-5 py-10">
      <div className="mb-6">
        <Link href="/shoes" className="text-sm font-medium text-orange-600 hover:underline">
          ← 검색 결과로
        </Link>
      </div>
      <ShoeDetail shoe={shoe} />
    </main>
  )
}
