# 채용 관점 실측 — before · 2026-09-02 04:30 UTC

측정 도구: `scripts/audit-hiring.mjs` · 뷰포트 390 / 768 / 1200 · 1화면 = 844px · 로컬 폰트 주입


## 1–2. 커밋 · 파일 구조

- **main commit**: dafff72 브랜드 진단 원칙을 퍼스널 브랜딩에 적용 — 타이포 규율·매니페스토·신뢰 장치·언어 대조 (#32)
- **브랜치**: claude/cso-ceo-dashboard-repo-20qwzw
```
"\352\271\200\354\227\260\354\236\254_\354\235\264\353\240\245\354\204\234_2026.pdf"
"\352\271\200\354\227\260\354\236\254_\354\236\220\352\270\260\354\206\214\352\260\234\354\204\234_2026.pdf"
.claude/facts.json
.claude/settings.json
.claude/skills/portfolio-update/SKILL.md
.github/workflows/check-facts.yml
.github/workflows/daily-recruit-email.yml
.github/workflows/static.yml
.nojekyll
CLAUDE.md
case-velor-ai.html
cover-letter.html
images/sealo-offer.jpg
images/sealo-proto.jpg
images/velor-ai-edu.jpg
images/velor-ai-tools.jpg
images/velor-bm.jpg
images/velor-business.jpg
images/velor-listings.jpg
images/velor-recruit.jpg
images/velor-tenders.jpg
index.html
og-image.png
resume.html
scripts/check-facts.mjs
scripts/fetch-fonts.sh
scripts/render.mjs
sitemap.xml
```

## 3–8. 문서 · 정본 · 검사기

- **index.html**: 57,924 B · 854 줄
- **resume.html**: 24,418 B · 352 줄
- **cover-letter.html**: 12,113 B · 150 줄
- **case-velor-ai.html**: 15,152 B · 213 줄
- **.claude/facts.json**: 10,345 B · 302 줄
- **scripts/check-facts.mjs**: 4,122 B · 92 줄
- **facts.json**: docs 4 · career 9 · claims 29 · rules 9 · dated_terms 7

## 9–11 · 25–27. 뷰포트별 높이 · 가로 오버플로 · JS 오류 · alt 누락

| 문서 | 폭 | 총 높이 | 화면 수 | scrollWidth | 오버플로 요소 | JS 오류 | alt 누락 |
|---|---|---|---|---|---|---|---|
| index.html | 390 | 19,618 | 23.2 | 390 ✓ | — | 0 | 0 |
| index.html | 768 | 14,274 | 16.9 | 768 ✓ | — | 0 | 0 |
| index.html | 1200 | 11,915 | 14.1 | 1200 ✓ | — | 0 | 0 |
| resume.html | 390 | 6,709 | 7.9 | 390 ✓ | — | 0 | 0 |
| resume.html | 768 | 4,153 | 4.9 | 768 ✓ | — | 0 | 0 |
| resume.html | 1200 | 4,080 | 4.8 | 1200 ✓ | — | 0 | 0 |
| cover-letter.html | 390 | 3,253 | 3.9 | 390 ✓ | — | 0 | 0 |
| cover-letter.html | 768 | 2,087 | 2.5 | 768 ✓ | — | 0 | 0 |
| cover-letter.html | 1200 | 2,087 | 2.5 | 1200 ✓ | — | 0 | 0 |
| case-velor-ai.html | 390 | 5,624 | 6.7 | 390 ✓ | — | 0 | 0 |
| case-velor-ai.html | 768 | 4,711 | 5.6 | 768 ✓ | — | 0 | 0 |
| case-velor-ai.html | 1200 | 4,798 | 5.7 | 1200 ✓ | — | 0 | 0 |

## 12–15. index 390px — 섹션별 · 사례별 높이, 사례 순서

총 높이 **19,618px = 23.2화면** (목표 ≤ 10,200px / 12화면)

| 섹션 | 높이 | 화면 |
|---|---|---|
| top | 1,284 | 1.52 |
| solve | 1,472 | 1.74 |
| cases | 9,845 | 11.66 |
| how | 828 | 0.98 |
| plan | 876 | 1.04 |
| ip | 1,602 | 1.90 |
| career | 2,069 | 2.45 |
| press | 737 | 0.87 |
| contact | 738 | 0.87 |
| footer | 106 | 0.13 |

| 사례 | 제목 | 높이 | 화면 | 이미지 |
|---|---|---|---|---|
| 01 | Sealo(씰로) — AI가 쓴 초안을 내 스타일로 다시 씁니다. | 1,463 | 1.73 | 2 |
| 02 | 시니어 서비스 자문 — 42일에 산출물 50건, 임원 다섯 자리 몫. | 2,729 | 3.23 | 0 |
| 03 | 시니어 전문지식 매칭 — 궁금해서 데모를 직접 만들었습니다. | 2,134 | 2.53 | 5 |
| 04 | 웍스메이트 — 하루 단위 노동을 거래 250억으로. | 1,044 | 1.24 | 0 |
| 05 | 애즈유 — 시니어 D2C 자사몰 회원을 +827%로. | 971 | 1.15 | 0 |
| 06 | 어바웃피싱 — 측정부터 만들고 ROAS 643%. | 1,006 | 1.19 | 0 |
- **사례 순서**: 01 Sealo(씰로) → 02 시니어 → 03 시니어 → 04 웍스메이트 → 05 애즈유 → 06 어바웃피싱

## 30. 390px 첫 3화면(0–2,532px)에 노출되는 정보

- 채용 문의
- CSO · CBO(사업개발) 포지션 탐색 중 · 2026
- 수요와 공급이 따로 노는 시장에거래를 붙이는 일을 세 산업에서 반복했습니다.
- 거래가 안 되는 시장에도 수요와 공급은 있습니다. 없는 것은 믿을 근거입니다. 저는 그 근거를 구조로 만듭니다.
- 플랫폼 사업개발 — 이커머스 마켓플레이스 · 건설 인력 · 시니어 전문지식, 세 번 붙였습니다. 건설 인력 O2O를 공동창업해 누적 매칭 13만 건 · 거래액 2
- 김연재 YJ Kim · 사업전략 · 신규사업개발(BD) · 데이터 그로스 · IR
- 13만 건누적 매칭거래액 250억 · 지분매각 Exit
- 100억+누적 투자유치 주도한국투자파트너스 리드 외
- +827%시니어 D2C 회원 성장제약 계열 건기식 자사몰
- 6건등록 특허 (출원 1건)AI 신뢰·추천 알고리즘
- 사례 먼저 보기
- 이력서 PDF
- 직접 만든 MVP 열어보기 ↗
- 회사에서 저에게 맡기면 되는 일, 네 가지입니다.
- 회사 이름이 아니라 반복해서 풀어온 문제로 정리했습니다. 각 항목의 근거는 아래 사례에서 화면과 숫자로 확인하실 수 있습니다.
- 양면 시장을 붙이는 일
- 수요와 공급 중 어느 쪽을 먼저 채울지 정하고, 한쪽이 다른 쪽을 부르게 만드는 구조를 설계합니다. 건설 인력, 낚시 선박, 시니어 전문가 — 도메인은 달라도 같
- 0→1 신규사업을 굴러가게 만드는 일
- 기획서에서 멈추지 않고 돌아가는 서비스까지 만듭니다. 새 시장 가설이 생기면 짧은 기간에 데모를 직접 만들어 실사용 데이터로 확인합니다.
- 측정 체계부터 만들고 숫자를 올리는 일
- 대시보드가 없으면 대시보드부터 만듭니다. GA4·GTM·서버사이드 트래킹을 직접 붙여 전환을 신뢰할 수 있게 만든 뒤 광고와 퍼널을 개선합니다.

첫 3화면 체크 — 누구인가 ✓ · 포지션 ✓ · 해결할 문제 ✓ · 숫자 근거 ✓ · 연락 ✓ · **Sealo 노출 ✓ 없음**

## 16 · 19 · 20 · 리더십/자랑 표현 — 문서별 출현 횟수

| 문서 | "직접" | "파일럿" | 최상급 | 자랑성 표현 | "혼자" | Sealo/씰로 | 조직 인원(명) | 직보/보고 | 예산 |
|---|---|---|---|---|---|---|---|---|---|
| index.html | 25 | 5 | 1 | 2 | 1 | 6 | 5 | 0 | 0 |
| resume.html | 13 | 1 | 0 | 0 | 0 | 4 | 2 | 0 | 0 |
| cover-letter.html | 7 | 0 | 0 | 0 | 2 | 1 | 2 | 0 | 0 |
| case-velor-ai.html | 1 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 |
- **index.html 제거 대상**: 국내 처음 · 임원 다섯 자리 · 혼자서도 팀 규모

## 17–18. Sealo 노출 위치 · 이미지

- **index.html**: L7, L286, L331, L366, L384, L388, L759(제목) — 7줄
- **resume.html**: L163, L178, L209(제목) — 3줄
- **cover-letter.html**: L129 — 1줄
- **images/sealo-proto.jpg**: 있음 (74,461 B)
- **images/sealo-offer.jpg**: 있음 (147,351 B)

## 21. PDF 페이지 수

- **김연재_이력서_2026.pdf**: 5 페이지 · 386 KB · URI 링크 6건
- **김연재_자기소개서_2026.pdf**: 2 페이지 · 294 KB · URI 링크 2건

## 22–24. 링크 — 포트폴리오 · VELOR · 내부 링크/이미지 존재

- **index.html**: velor.kr 1개 · 포트폴리오 링크 1개 · 내부 참조 12개 · **깨진 내부 참조 0**
  - velor.kr: https://velor.kr
- **resume.html**: velor.kr 1개 · 포트폴리오 링크 2개 · 내부 참조 3개 · **깨진 내부 참조 0**
  - velor.kr: https://velor.kr
- **cover-letter.html**: velor.kr 1개 · 포트폴리오 링크 2개 · 내부 참조 3개 · **깨진 내부 참조 0**
  - velor.kr: https://velor.kr
- **case-velor-ai.html**: velor.kr 5개 · 포트폴리오 링크 1개 · 내부 참조 4개 · **깨진 내부 참조 0**
  - velor.kr: https://velor.kr/ai · https://velor.kr/ai-claude · https://velor.kr/ai-chatgpt · https://velor.kr/ai-gemini-google · https://velor.kr/ai/tools

외부 링크(velor.kr·언론)는 이 실행 환경의 프록시가 차단해 HTTP 상태를 직접 확인할 수 없다. 09-02 기준값(velor.kr 8개 전부 200)을 참고값으로 둔다.

## 28. CI 상태 (main 최신 실행)

```
Deploy static content to Pages | completed | success | dafff72
정본 대조 | completed | success | dafff72
Daily Recruit Digest Email | completed | success | a0656d4
정본 대조 | completed | success | a0656d4
```

## 29. 정본 ↔ 문서 대조 (check-facts)

```
정본 대조 통과 — 문서 4종, 경력 9건, 수치 29건
```
