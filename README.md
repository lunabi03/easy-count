# Lesson 06: Next.js + TypeScript 통합 계산기

## 🎯 프로젝트 소개

Lesson 01-05에서 배운 모든 계산기를 Next.js와 TypeScript로 통합한 웹 애플리케이션입니다.

## 🚀 실행 방법

### 1. 의존성 설치

```bash
pnpm install
```

### 2. 개발 서버 실행

```bash
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 열기

### 3. 프로덕션 빌드

```bash
pnpm build
pnpm start
```

## 📁 프로젝트 구조

```
lesson-06/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # 루트 레이아웃
│   ├── page.tsx             # 홈페이지
│   ├── globals.css          # 전역 스타일
│   ├── date/
│   │   ├── dday/
│   │   │   └── page.tsx    # 디데이 계산기 페이지
│   │   └── birthday/
│   │       └── page.tsx    # 생일 계산기 페이지
│   ├── salary/
│   │   └── page.tsx        # 연봉 계산기 페이지
│   └── shopping/
│       └── page.tsx        # 쇼핑 계산기 페이지
├── components/
│   ├── Header.tsx          # 헤더 컴포넌트
│   ├── Footer.tsx          # 푸터 컴포넌트
│   ├── Navigation.tsx      # 네비게이션
│   └── calculators/
│       ├── DDayCalculator.tsx
│       ├── BirthdayCalculator.tsx
│       ├── SalaryCalculator.tsx
│       ├── DiscountCalculator.tsx
│       └── VATCalculator.tsx
├── lib/
│   ├── calculations/       # 계산 로직
│   │   ├── date.ts
│   │   ├── salary.ts
│   │   ├── discount.ts
│   │   └── vat.ts
│   └── utils/
│       └── format.ts       # 포맷팅 유틸리티
└── types/
    └── index.ts            # TypeScript 타입 정의
```

## 💡 주요 기능

### 1. 💕 커플 디데이 계산기
- 100일, 200일, 500일, 1000일 기념일 자동 계산
- D-day 카운트 표시

### 2. 🎂 살아온 날 계산기
- 총 일수, 주수, 개월수, 년수 계산
- 다음 생일까지 남은 일수

### 3. 💰 연봉 실수령액 계산기
- 4대보험 자동 계산 (국민연금, 건강보험, 장기요양, 고용보험)
- 소득세 및 지방소득세 계산
- 월/연 실수령액 표시

### 4. 🛍️ 쇼핑 계산기
- **할인율 계산기**: 원가와 할인율로 최종 가격 계산
- **부가세 계산기**: 공급가액 ↔ 부가세 포함 금액 변환

## 🛠️ 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: pnpm

## 📚 학습 포인트

### Next.js 핵심 개념
1. **파일 기반 라우팅**: `app/` 폴더 구조로 자동 라우팅
2. **서버/클라이언트 컴포넌트**: 'use client' 지시어 활용
3. **레이아웃 시스템**: 중첩 레이아웃으로 공통 UI 관리

### TypeScript 활용
- 인터페이스로 데이터 타입 정의
- 타입 안정성 확보
- 자동 완성 및 오류 검출

### 코드 구조화
- 관심사의 분리 (계산 로직 / UI / 유틸리티)
- 재사용 가능한 컴포넌트
- 모듈화된 함수

## 🎨 디자인 특징

- **Tailwind CSS**: 유틸리티 우선 CSS 프레임워크
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원
- **다크 모드 준비**: CSS 변수로 테마 관리 가능
- **애니메이션**: hover, transition 효과

## 📝 라이선스

This project is for educational purposes.

