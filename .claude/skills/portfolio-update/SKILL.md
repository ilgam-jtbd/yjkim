---
name: portfolio-update
description: 김연재 구직 문서 3종(포트폴리오 index.html · 이력서 resume.html · 자기소개서 cover-letter.html)을 고칠 때 항상 같은 절차로 진행한다. 경력·날짜·수치 변경, 사례(케이스) 추가·수정, 문구 수정, 디자인 변경, PDF 재생성, GitHub Pages 배포 요청에서 사용한다. "이력서 고쳐줘", "경력 추가", "날짜 수정", "사례 넣어줘", "배포해줘" 같은 요청이면 문서 종류를 명시하지 않아도 이 스킬을 연다. 정본(.claude/facts.json) 우선 원칙과 비공개 정보 차단이 예외 없이 적용된다.
---

# 구직 문서 갱신

세 문서는 같은 사실을 서로 다른 길이로 말합니다. 그래서 **한 곳만 고치면 반드시 어긋납니다.**
지금까지 어긋난 것들 — 애즈유 시작 연월, Sealo 시작 연월, VELOR 수치, 특허 건수. 전부 같은 원인입니다.

## 철칙 세 가지

1. **정본이 먼저다.** `.claude/facts.json` 을 고치고 문서를 고칩니다. 반대로 하지 않습니다.
2. **근거 없는 수치는 쓰지 않는다.** 캡처에서 읽은 값이면 `(캡처 시점)` 을 붙입니다. 추정치는 쓰지 않습니다.
3. **비공개는 협상하지 않는다.** `facts.json` 의 `never_publish` 에 있는 것은 어떤 이유로도 문서에 넣지 않습니다.

## 절차

### 1. 정본 갱신
`.claude/facts.json` 의 `career` · `claims` 를 먼저 고칩니다.
새 수치를 넣을 때는 출처를 확인합니다 — 확인 못 하면 넣지 않고 사용자에게 묻습니다.

### 2. 문서 반영
| 문서 | 성격 | 반영 깊이 |
| --- | --- | --- |
| `index.html` | 포트폴리오 — 화면·근거 중심 | 케이스 카드, 타임라인, 히어로 KPI |
| `resume.html` | 이력서 — A4 인쇄 최적화 | 경력 불릿, 지표 표, 특허 표 |
| `cover-letter.html` | 자기소개서 — 서술 ~1,500자 | 해당 문단만 |

케이스를 새로 넣으면 **번호(`.num`)를 전부 재배열**하고 섹션 헤드라인의 사례 개수도 함께 고칩니다. 사례 순서는 정본 `case_order`(웍스메이트 → 어바웃피싱 → 애즈유 → VELOR → 자문)를 따르고, Sealo 는 사례에 넣지 않습니다.

### 3. 대조 (필수)
```
node scripts/check-facts.mjs
```
`✗` 가 하나라도 있으면 커밋하지 않습니다. `!` 는 읽고 판단합니다.

### 4. 렌더 검증 + PDF (필수)
```
bash scripts/fetch-fonts.sh            # 세션당 1회 — 로컬 폰트 캐시 (없으면 PDF 가 대체 서체로 나감)
PUPPETEER_PATH=<puppeteer 경로> node scripts/render.mjs
```
390 / 768 / 1200px 오버플로 0, PDF 2종 재생성. 캡처는 `/tmp/yjkim-render` 에 남습니다.
**이 환경의 Chromium 은 CDN 폰트를 못 받습니다.** `fetch-fonts.sh` 가 curl 로 Pretendard·Noto Serif KR·JetBrains Mono 를
받아 두면 `render.mjs` 가 자동으로 주입합니다. 로그에 "로컬 폰트 주입" 이 안 보이면 PDF 를 배포하지 마십시오.
**새 블록을 넣었으면 캡처를 눈으로 봅니다.** 오버플로 검사는 잘림·줄바꿈 붕괴를 잡지 못합니다 —
실제로 놓친 사례가 둘 있습니다(공고 이미지 `object-fit:cover` 잘림, 특허 표 모바일 붕괴).

한국어 렌더가 깨지면 `fonts-noto-cjk` 를 설치합니다.

### 4b. 채용 관점 실측 (구조를 바꿨을 때)
```
node scripts/audit-hiring.mjs .claude/audit/<이름>-after.md --label after
```
390px 총 높이 ≤ 10,200px(12화면) · index "직접" ≤ 10 · 이력서 PDF 2쪽 · 첫 3화면에 Sealo 없음 · 최상급·자랑성 표현 0. 수정 전에 `-before.md` 를 먼저 남겨 같은 잣대로 비교합니다.

### 5. 배포
```
git push -u origin claude/cso-ceo-dashboard-repo-20qwzw
```
PR 생성 → 머지 → Actions `Deploy static content to Pages` 성공 확인.
`ilgam-jtbd.github.io` 는 이 환경의 프록시에서 403이 납니다. **배포 확인은 Actions 결과로 합니다.**

## 자주 틀리는 것

- **케이스 번호** — 새 사례를 중간에 넣고 뒤 번호를 안 고침
- **PDF** — HTML만 고치고 PDF를 다시 안 만듦 (사이트에서 내려받는 파일이 옛날 것이 됨)
- **모바일 표** — 열이 많은 표는 600px 이하에서 카드 스택으로 바꿔야 함
- **이미지 잘림** — `.plate img` 는 `height:auto`. `aspect-ratio` + `object-fit:cover` 를 다시 넣지 않습니다.
- **자문처 익명** — 회사명·제휴사·계약 조건은 문서 어디에도 넣지 않습니다. 본문에 "계약상 밝히지 않습니다" 를 남겨 감추는 것이 아니라 지키는 것으로 읽히게 합니다.

## 디자인 토큰
`facts.json` 의 `tokens` 가 정본입니다. 본문 Pretendard 17px · 행간 1.65 · 터치 타깃 48px · `word-break:keep-all`.
**제목·인용은 Noto Serif KR 700 이상**(명조는 시간과 검증을 함축), **영문 라벨·번호는 JetBrains Mono**, 수치는 `tabular-nums`.
Light·Thin 웨이트와 빨강(`#D71921`) 계열은 쓰지 않습니다.

## 언어 규율
- 첫 문장은 `[분야] — [반복해서 푼 문제] + [결과]`. 상단 포지셔닝에 연차를 쓰지 않습니다.
- 매니페스토(정본 `positioning.manifesto`)에서 각 사례의 접근 문장이 내려와야 합니다.
- "국내 최초·세계 최초·업계 유일" 금지 — 기간·건수·특허번호 같은 검증 가능한 사실로 대체합니다 (대조 검사가 막습니다).
- 신뢰 장치는 이미 가진 것을 노출합니다 — 특허번호, 언론 원문 링크, 라이브 서비스, 캡처 일자.
