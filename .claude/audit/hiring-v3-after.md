# 채용 관점 실측 — after · 2026-09-02 19:24 UTC

측정 도구: `scripts/audit-hiring.mjs` · 뷰포트 390 / 768 / 1200 · 1화면 = 844px · 로컬 폰트 주입


## 1–2. 커밋 · 파일 구조

- **main commit**: 5beb66b 채용 관점 재편 — 5사례 · Sealo 하향 · 이력서 A4 2쪽 · 모바일 12화면 (#33)
- **브랜치**: claude/cso-ceo-dashboard-repo-20qwzw
```
"\352\271\200\354\227\260\354\236\254_\354\235\264\353\240\245\354\204\234_2026.pdf"
"\352\271\200\354\227\260\354\236\254_\354\236\220\352\270\260\354\206\214\352\260\234\354\204\234_2026.pdf"
.claude/audit/hiring-v3-after.md
.claude/audit/hiring-v3-before.md
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
scripts/audit-hiring.mjs
scripts/check-facts.mjs
scripts/fetch-fonts.sh
scripts/render.mjs
sitemap.xml
```

## 3–8. 문서 · 정본 · 검사기

- **index.html**: 43,029 B · 674 줄
- **resume.html**: 24,978 B · 354 줄
- **cover-letter.html**: 14,211 B · 176 줄
- **case-velor-ai.html**: 16,902 B · 227 줄
- **.claude/facts.json**: 13,521 B · 371 줄
- **scripts/check-facts.mjs**: 6,039 B · 126 줄
- **facts.json**: docs 4 · career 9 · claims 28 · rules 12 · dated_terms 13

## 9–11 · 25–27. 뷰포트별 높이 · 가로 오버플로 · JS 오류 · alt 누락

| 문서 | 폭 | 총 높이 | 화면 수 | scrollWidth | 오버플로 요소 | JS 오류 | alt 누락 |
|---|---|---|---|---|---|---|---|
| index.html | 390 | 10,268 | 12.2 | 390 ✓ | — | 0 | 0 |
| index.html | 768 | 9,203 | 10.9 | 768 ✓ | — | 0 | 0 |
| index.html | 1200 | 7,514 | 8.9 | 1200 ✓ | — | 0 | 0 |
| resume.html | 390 | 4,738 | 5.6 | 390 ✓ | — | 0 | 0 |
| resume.html | 768 | 2,895 | 3.4 | 768 ✓ | — | 0 | 0 |
| resume.html | 1200 | 2,790 | 3.3 | 1200 ✓ | — | 0 | 0 |
| cover-letter.html | 390 | 3,345 | 4.0 | 390 ✓ | — | 0 | 0 |
| cover-letter.html | 768 | 2,116 | 2.5 | 768 ✓ | — | 0 | 0 |
| cover-letter.html | 1200 | 2,116 | 2.5 | 1200 ✓ | — | 0 | 0 |
| case-velor-ai.html | 390 | 5,717 | 6.8 | 390 ✓ | — | 0 | 0 |
| case-velor-ai.html | 768 | 4,770 | 5.7 | 768 ✓ | — | 0 | 0 |
| case-velor-ai.html | 1200 | 4,857 | 5.8 | 1200 ✓ | — | 0 | 0 |

## 12–15. index 390px — 섹션별 · 사례별 높이, 사례 순서

총 높이 **10,268px = 12.2화면** (목표 ≤ 10,200px / 12화면)

| 섹션 | 높이 | 화면 |
|---|---|---|
| top | 861 | 1.02 |
| solve | 1,100 | 1.30 |
| cases | 4,491 | 5.32 |
| how | 560 | 0.66 |
| plan | 496 | 0.59 |
| ip | 243 | 0.29 |
| career | 1,278 | 1.51 |
| press | 399 | 0.47 |
| contact | 637 | 0.75 |
| footer | 142 | 0.17 |

| 사례 | 제목 | 높이 | 화면 | 이미지 |
|---|---|---|---|---|
| 01 | 웍스메이트 — 거래가 구조화되지 않은 시장을 거래액 250억의 사업으로. | 1,037 | 1.23 | 0 |
| 02 | 어바웃피싱 — 측정 체계를 복구하고 ROAS 643%. | 772 | 0.91 | 0 |
| 03 | 애즈유 — 시니어 D2C 자사몰 회원을 +827%로. | 701 | 0.83 | 0 |
| 04 | VELOR — 새로운 시장을 서비스로 검증하다. | 928 | 1.10 | 2 |
| 05 | 시니어 서비스 자문 — 42일 · 산출물 50건. | 788 | 0.93 | 0 |
- **사례 순서**: 01 웍스메이트 → 02 어바웃피싱 → 03 애즈유 → 04 VELOR → 05 시니어

## 30. 390px 첫 3화면(0–2,532px)에 노출되는 정보

- 채용 문의
- CSO · CBO / 사업전략 · 신규사업 · BD · Growth
- 수요와 공급이 따로 노는 시장에거래가 일어나게 만드는 사업을 해왔습니다.
- 거래가 안 되는 시장에도 수요와 공급은 있습니다. 없는 것은 믿을 근거입니다. 저는 그 근거를 구조로 만듭니다.
- 김연재 YJ Kim · 이커머스 마켓플레이스 · 건설 인력 O2O · 시니어 D2C · 레저 슈퍼앱에서 사업전략과 신규사업을 총괄해 왔습니다.
- 13만 건누적 매칭건설 인력 O2O · 공동창업
- 250억플랫폼 거래액지분매각 Exit
- 100억+누적 투자유치한국투자파트너스 리드 외
- +827%시니어 D2C 회원 성장제약 계열 건기식 자사몰
- 이력서 PDF (2쪽)
- 회사에서 저에게 맡기면 되는 일, 네 가지입니다.
- 회사 이름이 아니라 반복해서 풀어온 문제로 정리했습니다.
- 양면 시장을 붙이는 일
- 수요와 공급 중 어느 쪽을 먼저 채울지 정하고, 한쪽이 다른 쪽을 부르는 구조를 설계합니다.
- 0→1 신규사업을 굴러가게 만드는 일
- 기획서에서 멈추지 않고 돌아가는 서비스까지 갑니다. 가설은 실사용 데이터로 확인합니다.
- 측정 체계부터 세우고 숫자를 올리는 일
- 대시보드가 없으면 대시보드부터. 팀이 같은 숫자를 보게 한 뒤 광고와 퍼널을 개선합니다.
- 돈과 파트너를 데려오는 일
- 기관 IR 문서와 미팅을 리드하고, 공공·대기업 파트너십을 사업 수요로 바꿉니다.
- 숫자로 보는 다섯 개의 사례.
- 각 사례는 문제 → 결정 → 결과 순서입니다. 자문 사례의 고객사명은 계약상 표기하지 않았습니다.
- 웍스메이트 — 거래가 구조화되지 않은 시장을 거래액 250억의 사업으로.
- 시장은 있었지만 거래가 전화와 인맥으로 흩어져 있었습니다. 전략본부를 신설해 조직을 키우고, 공급자가 남을 이유를 구조로 만들어 하루 단위 노동을 거래가 쌓이는 
- 책임 범위 · 조직 3 → 50명 · 전략본부 신설·총괄
- 13만 건 누적 매칭
- 250억 거래액

첫 3화면 체크 — 누구인가 ✓ · 포지션 ✓ · 해결할 문제 ✓ · 숫자 근거 ✓ · 연락 ✓ · **Sealo 노출 ✓ 없음**

## 16 · 19 · 20 · 리더십/자랑 표현 — 문서별 출현 횟수

| 문서 | "직접" | "파일럿" | 최상급 | 자랑성 표현 | "혼자" | Sealo/씰로 | 조직 인원(명) | 직보/보고 | 예산 |
|---|---|---|---|---|---|---|---|---|---|
| index.html | 1 | 0 | 0 | 0 | 0 | 2 | 4 | 0 | 0 |
| resume.html | 0 | 0 | 0 | 0 | 0 | 2 | 2 | 0 | 0 |
| cover-letter.html | 2 | 0 | 0 | 0 | 0 | 0 | 2 | 0 | 0 |
| case-velor-ai.html | 1 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 |

## 17–18. Sealo 노출 위치 · 이미지

- **index.html**: L612 — 1줄
- **resume.html**: L272 — 1줄
- **images/sealo-proto.jpg**: 없음
- **images/sealo-offer.jpg**: 없음

## 21. PDF 페이지 수

- **김연재_이력서_2026.pdf**: 2 페이지 · 343 KB · URI 링크 8건 (한도 2)
- **김연재_자기소개서_2026.pdf**: 2 페이지 · 297 KB · URI 링크 2건

## 22–24. 링크 — 포트폴리오 · VELOR · 내부 링크/이미지 존재

- **index.html**: velor.kr 1개 · 포트폴리오 링크 1개 · 내부 참조 9개 · **깨진 내부 참조 0**
  - velor.kr: https://velor.kr
- **resume.html**: velor.kr 1개 · 포트폴리오 링크 2개 · 내부 참조 6개 · **깨진 내부 참조 0**
  - velor.kr: https://velor.kr/
- **cover-letter.html**: velor.kr 1개 · 포트폴리오 링크 2개 · 내부 참조 7개 · **깨진 내부 참조 0**
  - velor.kr: https://velor.kr
- **case-velor-ai.html**: velor.kr 5개 · 포트폴리오 링크 1개 · 내부 참조 9개 · **깨진 내부 참조 0**
  - velor.kr: https://velor.kr/ai · https://velor.kr/ai-claude · https://velor.kr/ai-chatgpt · https://velor.kr/ai-gemini-google · https://velor.kr/ai/tools

외부 링크(velor.kr·언론)는 이 실행 환경의 프록시가 차단해 HTTP 상태를 직접 확인할 수 없다. 09-02 기준값(velor.kr 8개 전부 200)을 참고값으로 둔다.

## 28. CI 상태 (main 최신 실행)

```
Daily Recruit Digest Email | completed | success | 5beb66b
정본 대조 | completed | success | 5beb66b
Deploy static content to Pages | completed | success | 5beb66b
Deploy static content to Pages | completed | success | dafff72
```

## 29. 정본 ↔ 문서 대조 (check-facts)

```
정본 대조 통과 — 문서 4종, 경력 9건, 수치 28건
```
