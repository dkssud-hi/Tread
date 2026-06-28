import SearchFilter from '@/components/SearchFilter'

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-12">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          Tread <span className="align-middle">👟</span>
        </h1>
        <p className="mt-3 text-base text-gray-500">
          훈련 목적과 취향에 맞는 러닝화를 찾아보세요
        </p>
      </header>

      <SearchFilter />

      <p className="mt-6 text-center text-sm text-gray-400">
        조건을 선택하지 않으면 전체 러닝화를 보여드려요
      </p>
    </main>
  )
}
