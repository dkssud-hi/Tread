# TASKS.md — Tread 개발 작업 목록

> AI 에이전트와 작업할 때 이 파일을 참조해 현재 단계를 확인하고,
> 완료된 항목은 `[x]`로 체크한다.
> 세부 구현 계획이 필요한 단계는 docs/exec-plans/active/ 에 별도 문서를 만든다.

---

## Phase 1 — 프로젝트 셋업

- [x] Next.js 14 (App Router) + TypeScript + Tailwind CSS 프로젝트 초기화
- [x] ESLint / Prettier 설정
- [x] docs/ARCHITECTURE.md 의 폴더 구조대로 디렉터리 생성
      (app/, components/, data/, lib/, types/, public/images/shoes/)
- [x] Vercel 연결 및 초기 배포 확인 → https://tread-nine.vercel.app

**완료 기준**: `npm run dev` 실행 시 로컬호스트에서 Next.js 기본 화면이 뜨고, Vercel에 빈 배포가 성공한다.

---

## Phase 2 — 데이터 준비

- [x] `types/shoe.ts` 타입 정의 작성 (docs/ARCHITECTURE.md 스키마 참조)
- [x] 기존 운동화 정보 데이터를 shoes.json 스키마에 맞게 변환·통합
- [x] `data/shoes.json` 초기 데이터 작성 (25개 모델 — Nike·Adidas·ASICS·HOKA·NB·Saucony·Brooks·On·Mizuno·Puma)

**완료 기준**: shoes.json 파일이 TypeScript 타입과 일치하고, 각 purpose 카테고리에 최소 3개 이상의 모델이 있다.

---

## Phase 3 — 검색 API

- [x] `lib/shoes.ts` 필터 로직 작성 (getAllShoes / getShoeById / filterShoes)
      - 필터 5축: purpose · cushion · responsiveness · distance · brand
      - purpose·distance는 배열 포함 매칭, cushion·responsiveness·brand는 정확 일치
      - 파라미터 미입력 시 해당 조건 무시
- [x] `app/api/shoes/route.ts` API Route 구현
      - GET /api/shoes?purpose=&cushion=&responsiveness=&distance=&brand=
      - 허용값 검증(허용 외 값은 무시), 응답: Shoe[] JSON

**완료 기준**: PRD 시나리오 1~3 + 엣지케이스 검증 완료
- 입문자(jogging/under5/soft) → 데일리화 4개, 레이스화는 under5 검색에서 0개 노출
- 인터벌+반발력high → 스피드화 4개
- 잘못된 파라미터는 무시되고 나머지 조건만 적용

---

## Phase 4 — 핵심 UI (Must Have)

- [x] `components/SearchFilter.tsx` — 훈련목적·착화감·반발력·거리·브랜드 선택 칩 폼
- [x] `app/page.tsx` — 홈 화면 (SearchFilter 배치)
- [x] `components/ShoeCard.tsx` — 검색 결과 카드 (브랜드색 플레이스홀더 + 쿠셔닝·거리·무게 뱃지)
- [x] `app/shoes/page.tsx` — 검색 결과 목록 (URL 쿼리 기반, 적용 조건 칩, 빈 결과 처리)
- [x] `components/ShoeDetail.tsx` — 스펙 테이블 + 특성 태그 + 구매 버튼
- [x] `app/shoes/[id]/page.tsx` — 상세 페이지 (generateStaticParams로 25개 정적 생성, 404 처리)
- [x] `lib/display.ts` — 라벨·브랜드색 매핑 (공통)

**디자인**: 에너지 오렌지 테마, 모바일 우선 반응형 그리드, 이미지는 브랜드색 플레이스홀더(추후 교체)

**완료 기준**: production 빌드 통과 + 홈/검색결과/상세 페이지 HTTP 200 렌더링 확인, 없는 id는 404

---

## Phase 5 — Nice to Have

- [ ] 구매하기 버튼 → officialUrl 리다이렉트
      - 허용 도메인 화이트리스트 검증 포함 (보안 요구사항)
- [ ] 마라톤 대회 캘린더 페이지 (`app/marathon/page.tsx`)

**완료 기준**: 구매하기 클릭 시 공식몰로 이동하며, 화이트리스트 외 도메인은 차단된다.

---

## Phase 6 — 품질 · 배포

- [ ] 성능 확인 — 검색 결과 2초 이내, 상세 페이지 초기 로딩 1.5초 이내
- [ ] 반응형 UI 점검 (모바일 / 태블릿 / 데스크톱)
- [ ] SEO — 페이지별 메타태그, OG 이미지 설정
- [ ] Vercel 프로덕션 배포 및 HTTPS 확인

**완료 기준**: Lighthouse 성능 점수 80점 이상, 모바일에서 레이아웃 깨짐 없음.
