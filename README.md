# [byeolha.me](https://byeolha.me)

세상과 나를 연결하는 매개체, 나만의 블로그, 나만의 공간.

Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4와 로컬 MDX로 만든 정적 블로그입니다. 테마는 next-themes, 댓글은 Giscus를 사용합니다.

## 실행과 검증

Node.js 24 이상과 npm을 사용합니다.

```bash
npm ci
npm run dev
```

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm start
```

프로덕션 빌드는 `next build --webpack`을 사용합니다. GitHub Actions는 push와 pull request에서 lint, 타입 검사, 테스트, 빌드를 실행합니다.

선택 환경 변수는 `GA_ID`(Google Analytics), `NAVER_SITE_VERIFICATION`(네이버 사이트 인증)입니다. 필요하면 로컬 `.env.local`에 설정합니다.

## 글 작성

글은 `posts/{category}/{series}/{slug}/content.mdx`, 이미지는 `public/posts/{category}/{series}/{slug}/`에 둡니다. 새 글 배포에는 다시 빌드해야 합니다.

```yaml
---
title: 글 제목
createDate: 2026-10-16 11:00:00
modifiedDate: 2026-10-16 11:00:00
keywords: React, Next.js, 자료구조
description: 글을 소개하는 짧은 문장
thumbnail: /assets/image/defaultThumbnail.png
---
```

- `title`, `createDate`, `modifiedDate`는 필수입니다.
- 날짜는 `YYYY-MM-DD` 또는 `YYYY-MM-DD HH:mm:ss`이며 모두 한국 시간(Asia/Seoul)입니다. 날짜만 적으면 자정으로 해석합니다.
- 수정 시각은 작성 시각보다 앞설 수 없습니다. 날짜 누락, 존재하지 않는 날짜, 잘못된 필드 타입은 빌드를 실패시킵니다.
- `keywords`, `description`, `thumbnail`은 생략하거나 비워 둘 수 있습니다.
- `/`로 시작하는 로컬 본문 이미지는 빌드 시 `public/`의 원본 크기를 읽어 width·height를 자동 지정합니다. 파일이 없거나 크기를 읽을 수 없으면 빌드 오류가 발생합니다.
- 본문 이미지는 화면 너비에 맞춰 비율을 유지하며 지연 로딩합니다. 기존 `width=400`·`width=50%` 옵션과 캡션을 유지합니다.
- 로컬 이미지는 Next.js Image의 `srcset`·`sizes`로 화면에 맞는 크기를 제공하며, 지원 브라우저에는 WebP로 전송합니다. 원본 파일은 보존합니다. 이미지 최적화는 Next.js 서버 또는 Vercel 이미지 최적화 기능을 사용합니다.
- 외부 이미지는 크기를 추정하거나 빌드 중 다운로드하지 않고 일반 이미지로 표시합니다. 반응형·지연 로딩은 적용되지만 변환·압축은 외부 서버가 제공하는 원본을 따릅니다.
- `description` 미지정 시 Markdown·MDX에서 문구를 보존해 최대 140자의 설명을 생성합니다. 링크 주소·이미지·코드 블록·실행 표현식은 제외하며 인라인 코드는 유지합니다.
- 키워드는 쉼표로 구분합니다. 미지정 시 본문에서 자동 추출하지만, 조사 제거는 간단한 규칙이므로 직접 지정하는 편이 정확합니다.
- 소개 문서는 `app/resume/content.mdx`에서 관리하며 같은 frontmatter 규칙을 따릅니다.

코드 블록은 `utils/codeTheme.ts`의 밝은·어두운 구문 테마를 함께 생성하며, 사이트 테마에 맞춰 색상과 배경을 전환합니다.

## 사이트 설정

사이트 정보와 작품 목록은 `config/config.ts`에서 관리합니다. 작품의 상태와 `updatedAt`은 수동 관리하며 빌드 중 외부 GitHub API를 호출하지 않습니다.

공통 페이지 메타데이터는 `utils/metadata.ts`, 글 데이터 검증은 `utils/postMatter.ts`, 글 로딩은 `utils/posts.ts`에 있습니다. 사이트맵의 글 수정일은 frontmatter에서 가져오며, 정적 페이지에는 추정 수정일을 넣지 않습니다.

## 앞으로 할 일

폰트 최적화, 시리즈 탐색·목차·검색을 검토하고 있습니다. 글 목록의 긴 제목과 날짜는 모바일에서도 분리해 표시하며, 넓은 본문 표는 표 안에서 가로 스크롤할 수 있습니다. 점검 내역은 [PROJECT_ISSUES.md](PROJECT_ISSUES.md)에 기록합니다.

## 참고한 블로그

로직과 Next.js 설명: [김도형님의 개발 블로그](https://d5br5.dev/blog)

디자인 영감: [김평안님의 개발 블로그](https://bepyan.me)
