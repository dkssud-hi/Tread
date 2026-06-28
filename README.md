<div align="center">

# 👟 Tread

**훈련 목적에 맞는 러닝화를 단번에 찾아드립니다**

[![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

### 🔗 [**라이브 데모 → tread-nine.vercel.app**](https://tread-nine.vercel.app)

</div>

---

## 🎯 서비스 소개

러닝을 즐기다 보면 훈련 종류마다 맞는 신발이 달라진다는 걸 알게 됩니다.  
조깅용, 인터벌용, 레이스용 — 하지만 매번 구글에서 정보를 찾는 건 번거롭죠.

**Tread**는 훈련 목적 · 쿠셔닝 · 주행 거리 조건만 선택하면  
딱 맞는 러닝화를 바로 찾아주는 서비스입니다.

---

## ✨ 주요 기능

| 기능 | 설명 |
|---|---|
| 🔍 **조건 검색** | 훈련 목적 · 쿠셔닝 · 거리 필터로 러닝화 탐색 |
| 📋 **상세 페이지** | 쿠셔닝 · 무게 · 드롭 · 추천 거리 등 스펙 확인 |
| 🛒 **구매 연결** | 상세 페이지에서 브랜드 공식몰로 바로 이동 |

---

## 🧑‍🤝‍🧑 이런 분들을 위해 만들었어요

<table>
  <tr>
    <td align="center">🌱</td>
    <td><strong>러닝 입문자</strong><br/>어떤 신발부터 사야 할지 모르는 분</td>
  </tr>
  <tr>
    <td align="center">⚡</td>
    <td><strong>중급 러너</strong><br/>훈련 종류별로 신발을 나눠 신고 싶은 분</td>
  </tr>
  <tr>
    <td align="center">🏅</td>
    <td><strong>대회 준비 러너</strong><br/>마라톤·하프를 위한 레이스화를 찾는 분</td>
  </tr>
</table>

---

## 🛠 기술 스택

```
Frontend   Next.js 14 (App Router) + TypeScript + Tailwind CSS
Data       JSON 기반 러닝화 스펙 DB (MVP)
Deploy     Vercel
```

> **MVP 아키텍처**: 별도 백엔드 서버 없이 Next.js API Routes만으로 구성합니다.  
> 데이터가 늘어나면 Supabase(PostgreSQL)로 마이그레이션 예정.

---

## 📂 프로젝트 구조

```
tread/
├── app/
│   ├── page.tsx                 # 홈 — 검색 필터
│   ├── shoes/
│   │   ├── page.tsx             # 검색 결과 목록
│   │   └── [id]/page.tsx        # 상세 페이지
│   └── api/shoes/route.ts       # 검색 API
├── components/
│   ├── SearchFilter.tsx
│   ├── ShoeCard.tsx
│   └── ShoeDetail.tsx
├── data/shoes.json              # 러닝화 스펙 데이터
├── lib/shoes.ts                 # 필터 로직
├── types/shoe.ts                # 타입 정의
└── docs/
    ├── PRD.md                   # 제품 요구사항
    └── ARCHITECTURE.md          # 시스템 설계
```

---

## 🚀 로컬 실행

```bash
# 패키지 설치
npm install

# 개발 서버 실행
npm run dev
```

`http://localhost:3000` 에서 확인하세요.

---

## 📄 문서

- [PRD — 제품 요구사항](docs/PRD.md)
- [ARCHITECTURE — 시스템 설계](docs/ARCHITECTURE.md)

---

<div align="center">
  <sub>Made with ❤️ for runners</sub>
</div>
