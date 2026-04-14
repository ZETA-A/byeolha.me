# 프로젝트 점검 및 수정 현황

이 문서는 프로젝트 점검 결과와 실제 수정 반영 상태를 정리한 최신 메모다.
초기 진단에서 발견된 주요 문제들은 현재 모두 수정 완료된 상태다.

## 현재 상태 요약

이번 정리에서 아래 항목들을 반영했다.

1. `/project` 페이지의 외부 GitHub API 의존성 제거
2. `Giscus` 스크립트 중복 삽입 가능성 제거
3. `lint` 실행 경로 정상화
4. 정적 페이지의 불필요한 클라이언트 애니메이션 제거
5. 포스트 날짜 타입과 파싱 구조 정리
6. `html lang` 값을 실제 사이트 언어에 맞게 수정
7. `sitemap`의 날짜 생성 방식 정리
8. 임시 주석 제거

현재 검증 결과는 아래와 같다.

- `npm run lint` 통과
- `npx tsc --noEmit` 통과
- `npm run build` 통과

---

## 수정 완료 항목

### 1. `/project` 페이지의 외부 API 의존성 제거

### 관련 파일

- `components/ProjectList.tsx`
- `config/config.ts`
- `utils/getLastArticle.ts`

### 변경 내용

기존에는 `/project` 페이지 렌더링 시 GitHub API를 직접 호출해 마지막 커밋 날짜를 가져오고 있었다.
이 구조를 제거하고, 프로젝트 목록 데이터는 로컬 설정값만 사용하도록 변경했다.

함께 반영한 내용:

- `getLastArticle.ts` 삭제
- `ProjectItems` 타입에서 `git` 정보 제거
- `updatedAt` 기반의 단순하고 예측 가능한 표시 방식으로 변경

### 기대 효과

- 네트워크 상태와 무관하게 안정적으로 빌드 가능
- GitHub API rate limit 영향 제거
- `/project` 페이지 생성 시간과 실패 가능성 감소

---

### 2. `Giscus` 중복 스크립트 삽입 방지

### 관련 파일

- `components/Giscus.tsx`

### 변경 내용

기존 구현은 테마가 바뀔 때마다 Giscus 스크립트를 다시 append 할 수 있는 구조였다.
현재는 최초 마운트 시에만 스크립트를 삽입하고, 이후 테마 변경은 `postMessage`로만 처리하도록 수정했다.

### 기대 효과

- 댓글 iframe/script 중복 생성 가능성 감소
- 테마 전환 시 동작 예측 가능성 향상
- 댓글 영역 재마운트 관련 리스크 감소

---

### 3. `lint` 실행 구조 정상화

### 관련 파일

- `package.json`
- `eslint.config.mjs`

### 변경 내용

기존 `next lint` 스크립트는 현재 Next 16 환경에서 정상 동작하지 않았다.
이를 `eslint .` 기반으로 바꾸고, flat config 형태의 ESLint 설정을 다시 구성했다.

또한 실제 검증 기준과 맞추기 위해 `build` 스크립트도 `next build --webpack`으로 정리했다.

### 기대 효과

- 로컬에서 일관되게 lint 가능
- 품질 점검 흐름 재사용 가능
- CI에 연결하기 쉬운 상태 확보

---

### 4. 정적 페이지의 불필요한 hydration 비용 감소

### 관련 파일

- `app/page.tsx`
- `app/diary/page.tsx`
- `app/note/page.tsx`
- `app/project/page.tsx`
- `app/resume/page.tsx`
- `app/posts/[category]/[series]/[slug]/page.tsx`
- `app/not-found.tsx`

### 변경 내용

정적인 콘텐츠 영역을 넓게 감싸고 있던 `react-awesome-reveal` 의존 애니메이션을 제거했다.
읽기 중심 페이지에서 서버 컴포넌트 장점을 해치던 부분을 정리한 셈이다.

### 기대 효과

- 불필요한 클라이언트 JS 부담 감소
- 정적 페이지의 구조 단순화
- 읽기 중심 사이트에 더 적합한 렌더링 구조 확보

---

### 5. 날짜 타입과 데이터 파싱 구조 정리

### 관련 파일

- `config/types.d.ts`
- `utils/posts.ts`
- `components/post/PostHeader.tsx`
- `components/post/PostList.tsx`
- `app/posts/[category]/[series]/[slug]/page.tsx`
- `app/sitemap.ts`

### 변경 내용

기존에는 frontmatter 원본은 문자열인데 타입은 `Date`로 선언되어 있었고, 문자열 포맷과 재파싱이 섞여 있었다.
현재는 아래 구조로 정리했다.

- frontmatter 원본 타입은 `string`
- 파싱 단계에서 `createdAt`, `modifiedAt`을 `Date`로 변환
- 표시용 문자열은 `createDateDisplay`, `modifiedDateDisplay`로 분리
- 정렬, 메타데이터, sitemap은 정규화된 날짜 필드를 기준으로 사용

### 기대 효과

- 타입과 실제 데이터 구조 일치
- 날짜 관련 버그 가능성 감소
- 유지보수성과 가독성 향상

---

### 6. 문서 언어 설정 수정

### 관련 파일

- `app/layout.tsx`

### 변경 내용

`html lang="en"`을 `html lang="ko"`로 수정했다.

### 기대 효과

- 접근성 개선
- 스크린리더 언어 해석 정확도 개선
- 한국어 중심 콘텐츠에 더 적합한 SEO 신호 제공

---

### 7. `sitemap` 날짜 값 정리

### 관련 파일

- `app/sitemap.ts`
- `utils/posts.ts`

### 변경 내용

기존에는 정적 페이지가 모두 빌드 시각 `new Date()`를 사용하고 있었고, 포스트도 포맷된 문자열을 다시 `Date`로 만들고 있었다.
현재는 아래처럼 정리했다.

- 포스트는 `modifiedAt` 기준 사용
- 정적 페이지는 사이트 기준일(`siteConfig.since`) 기반 고정값 사용

### 기대 효과

- sitemap 날짜 의미가 더 명확해짐
- 검색엔진에 덜 혼란스러운 신호 제공

---

### 8. 임시 메모성 주석 제거

### 관련 파일

- `app/page.tsx`

### 변경 내용

홈 페이지 하단에 남아 있던 작업 메모성 주석을 제거했다.

### 기대 효과

- 코드 노이즈 감소
- 완성도와 유지보수성 개선

---

## 검증 결과

아래 명령 기준으로 정상 동작을 확인했다.

```bash
npm run lint
npx tsc --noEmit
npm run build
```

모든 명령이 통과했다.

---

## 남아 있는 선택 과제

현재 문서 기준의 "문제"는 대부분 해결되었다.
다만 아래 항목들은 앞으로 선택적으로 더 다듬을 수 있다.

### 1. 프로젝트 업데이트 날짜 자동화

지금은 외부 API 의존성을 제거하기 위해 `updatedAt`을 로컬 데이터로 관리하고 있다.
이후 필요하면 다음 중 하나로 확장할 수 있다.

- 빌드 전에 별도 스크립트로 메타데이터 생성
- CMS 또는 로컬 JSON 관리 방식 도입
- GitHub Actions에서 사전 계산 후 반영

### 2. 페이지 진입 효과를 CSS 기반으로 재도입

현재는 hydration 비용을 줄이기 위해 페이지 전반의 애니메이션을 제거했다.
필요하다면 추후 아래 방향으로 재도입 가능하다.

- CSS keyframes 기반의 가벼운 등장 효과
- 특정 소형 UI 요소에만 제한적으로 적용

### 3. 프로젝트 문서 업데이트

`README.md`에 아래 내용을 반영하면 현재 상태와 더 잘 맞는다.

- 실제 빌드 명령
- lint 명령 변경
- 프로젝트 데이터 관리 방식

---

## 총평

초기 점검에서 확인된 주요 운영 리스크와 구조적 문제는 이번 수정에서 모두 반영했다.
현재 프로젝트는 이전보다 다음 측면에서 더 안정적이다.

- 빌드 재현성
- 정적 페이지 성능
- 날짜 데이터 일관성
- lint/품질 점검 가능성
- 외부 의존성 없는 운영 안정성

다음 단계는 "문제 수정"보다는 "운영 편의성"과 "문서 정리"에 가까운 작업이 될 가능성이 크다.
