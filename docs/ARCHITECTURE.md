# ARCHITECTURE.md — Tread

## 기술 스택

| 영역 | 선택 | 이유 |
|---|---|---|
| **Frontend** | Next.js 14+ (App Router) + TypeScript | SSR·SEO·공유 URL 요구사항 충족, React Server Components로 초기 로딩 최적화 |
| **스타일링** | Tailwind CSS | Next.js 공식 지원, MVP 개발 속도 최우선 |
| **Backend** | Next.js API Routes (서버리스) | MVP 단계에서 별도 서버 불필요. Vercel에 자동 배포 |
| **데이터** | JSON 파일 (`/data/shoes.json`) | 러닝화 50~200개 수준에서 DB 없이 서버 필터링으로 충분 |
| **배포** | Vercel ([tread-nine.vercel.app](https://tread-nine.vercel.app)) | Next.js 공식 호스팅, 무료 티어로 MVP 커버, HTTPS 자동 처리. master push 시 자동 재배포 |

### 마이그레이션 경로
- 데이터가 많아지거나 관리 UI가 필요해지면 `/lib/shoes.ts` 한 파일만 수정해 **Supabase**(PostgreSQL)로 전환
- Phase 2 모바일 앱은 동일한 `/api/shoes` 엔드포인트를 재사용

---

## 시스템 흐름

```
사용자 브라우저
    │
    ▼
[Next.js 페이지]  ←──────────────────────────────┐
  app/page.tsx          (홈 · 검색 필터 UI)       │
  app/shoes/page.tsx    (검색 결과 목록)           │
  app/shoes/[id]/page.tsx (상세 페이지)            │
    │                                              │
    │ fetch                                        │
    ▼                                              │
[Next.js API Route]                                │
  app/api/shoes/route.ts                           │
    │                                              │
    │ import                                       │
    ▼                                              │
[lib/shoes.ts]  ──── 필터 로직                    │
    │                                              │
    ▼                                              │
[data/shoes.json]  ──── 러닝화 스펙 데이터         │
                                                   │
[공식 브랜드 쇼핑몰]  ◄── officialUrl 리다이렉트 ──┘
```

---

## 디렉터리 구조

```
tread/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # 전역 레이아웃 (폰트, 메타태그)
│   ├── page.tsx                 # 홈 — 검색 필터 UI
│   ├── shoes/
│   │   ├── page.tsx             # 검색 결과 목록 (URL 쿼리 파라미터 기반)
│   │   └── [id]/
│   │       └── page.tsx         # 러닝화 상세 페이지
│   └── api/
│       └── shoes/
│           └── route.ts         # GET /api/shoes?purpose=&cushion=&responsiveness=&distance=&brand=
│
├── components/                  # 재사용 UI 컴포넌트
│   ├── SearchFilter.tsx         # 조건 선택 폼 (훈련목적·착화감·반발력·거리·브랜드)
│   ├── ShoeCard.tsx             # 검색 결과 카드 (쿠셔닝·거리·무게 뱃지)
│   └── ShoeDetail.tsx          # 상세 스펙 테이블
│
├── data/
│   └── shoes.json               # 러닝화 스펙 데이터 (MVP)
│
├── lib/
│   ├── shoes.ts                 # 데이터 접근 + 필터 로직
│   │                            # ※ Supabase 전환 시 이 파일만 수정
│   └── display.ts               # 한글 라벨·브랜드색·거리 병합 표시 헬퍼
│
├── types/
│   └── shoe.ts                  # Shoe 타입 정의
│
├── public/
│   └── images/shoes/            # 제품 이미지
│
└── docs/                        # 기획·설계 문서 (모든 규칙·설계 문서는 여기)
    ├── PRD.md
    ├── ARCHITECTURE.md          # 이 파일
    └── exec-plans/active/       # 진행 중 작업 계획
```

---

## 러닝화 데이터 스키마

`types/shoe.ts` 기준:

```ts
type ShoeId = string  // 예: "nike-vaporfly-3"

type Purpose = 'jogging' | 'interval' | 'tempo' | 'race' | 'lsd'
type Cushion = 'soft' | 'firm' | 'balanced'
type Responsiveness = 'high' | 'mid' | 'low'   // 반발력(에너지 리턴)
type DistanceRange = 'under5' | '5to10' | '10to20' | 'over20'

type Shoe = {
  id: ShoeId
  name: string                        // 제품명 (예: "Vaporfly 3")
  brand: string                       // 브랜드 (예: "Nike")
  imageUrl: string                    // 제품 이미지 경로
  purpose: Purpose[]                  // 복수 선택 가능
  cushion: Cushion                    // 착화감(쿠셔닝)
  responsiveness: Responsiveness      // 반발력 등급
  weight: number                       // 그램 (남성 270mm 기준) — 상세 표시용
  drop: number                         // 힐-투-토 드롭 (mm) — 상세 표시용
  recommendedDistance: DistanceRange[] // 훈련 시 추천 주행 거리대 (복수)
  features: string[]                   // 주요 특성 설명 (2~4개)
  officialUrl: string                  // 공식 구매 페이지 URL (허용 도메인만)
}
```

### 검색 필터 5축
훈련 목적(`purpose`) · 착화감(`cushion`) · 반발력(`responsiveness`) · 거리(`distance`) · 브랜드(`brand`).
`weight` / `drop`은 필터 조건이 아니라 상세 페이지 표시용이다.
검색 결과 카드는 추천 거리를 연속 범위로 병합해 표시한다(예: `5to10`+`10to20` → "5~20km", `lib/display.ts`의 `formatDistanceRange`).

---

## API 명세

### `GET /api/shoes`

조건 필터링 검색. 모든 파라미터는 선택 사항이며, 미입력 시 해당 조건을 무시한다.

| 파라미터 | 타입 | 예시 | 매칭 방식 |
|---|---|---|---|
| `purpose` | string | `jogging`, `interval`, `race` | 신발의 purpose 배열에 포함되면 매칭 |
| `cushion` | string | `soft`, `firm`, `balanced` | 정확히 일치 |
| `responsiveness` | string | `high`, `mid`, `low` | 정확히 일치 |
| `distance` | string | `under5`, `5to10`, `10to20`, `over20` | 신발의 `recommendedDistance` 배열에 포함되면 매칭 |
| `brand` | string | `Nike`, `Adidas`, `HOKA` … | 정확히 일치 (`lib/display.ts`의 `BRAND_OPTIONS` 기준 검증) |

> **거리 매칭 보충**: `recommendedDistance`는 "그 신발로 훈련 시 추천되는 거리대"이며 복수 값을 가진다.
> 예) 데일리화 `Pegasus 41`은 `["under5","5to10","10to20"]`이라 짧은~중거리 검색에 노출되고,
> 카본 레이스화 `Vaporfly 3`은 `["10to20","over20"]`이라 입문자의 `under5` 검색에는 노출되지 않는다.

**응답 예시**:
```json
[
  {
    "id": "nike-pegasus-41",
    "name": "Pegasus 41",
    "brand": "Nike",
    "cushion": "balanced",
    "responsiveness": "mid",
    "weight": 283,
    "recommendedDistance": ["under5", "5to10", "10to20"],
    ...
  }
]
```

---

## 주요 기술 결정

| 결정 | 이유 |
|---|---|
| App Router (Pages Router 대신) | Next.js 공식 권장 방향, Server Components 활용 가능 |
| JSON 파일 (DB 대신) | MVP 속도 우선, 소규모 데이터에서 DB 오버헤드 불필요 |
| 서버리스 API (별도 서버 대신) | Vercel에서 자동 배포·스케일링, 인프라 관리 없음 |
| TypeScript 필수 | 러닝화 스펙 필드 수가 많아 타입 없이 AI 작업 시 필드명 오류 빈번 |
| Tailwind CSS | 디자인 시스템 없이도 일관된 UI 구성 가능 |

---

## Out of Scope (Phase 1 MVP)
- 별도 백엔드 서버 (Next.js API Routes로 대체)
- 데이터베이스 (JSON 파일로 대체)
- 인증·로그인
- 실시간 재고·가격 연동
- React Native / Flutter 모바일 앱 (Phase 2)
