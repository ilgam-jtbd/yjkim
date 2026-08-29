# yjkim — 김연재 구직 사이트

정적 사이트입니다. 빌드 없음, 프레임워크 없음, 손으로 쓴 HTML 3개. GitHub Pages 로 배포합니다.

| 경로 | 내용 |
| --- | --- |
| `index.html` | 포트폴리오 (사례 6건, 화면 캡처 중심) |
| `resume.html` | 이력서 — A4 인쇄 최적화 |
| `cover-letter.html` | 자기소개서 |
| `.claude/facts.json` | **사실의 정본** — 경력·수치·비공개 목록·디자인 토큰 |
| `scripts/check-facts.mjs` | 정본 ↔ 문서 대조 (의존성 없음) |
| `scripts/render.mjs` | 반응형 검증 + PDF 재생성 (puppeteer) |
| `harness/velor/` | VELOR 하네스 패키지 — 이 저장소에서는 보관용, 실행하지 않음 |

## 문서를 고칠 때

`.claude/skills/portfolio-update/SKILL.md` 를 따릅니다. 요약하면:

1. `.claude/facts.json` 을 먼저 고친다
2. 문서 3종에 반영한다
3. `node scripts/check-facts.mjs` — `✗` 가 있으면 커밋 금지
4. `node scripts/render.mjs` — 오버플로 0 + PDF 재생성, 새 블록은 캡처를 눈으로 확인
5. PR → 머지 → Actions 배포 성공 확인

## 커밋

무엇을 바꿨는지가 아니라 **왜 바꿨는지**를 남깁니다. 제목 한 줄, 본문에 근거.
파일 목록은 diff 가 이미 말하므로 적지 않습니다.

## 절대 하지 않는 것

- `.claude/facts.json` 의 `never_publish` 항목을 문서에 넣는 것 — 자문처 회사명, 제휴사 실명, 미공개 지표, 계약·보상 조건
- 확인되지 않은 수치를 쓰는 것 — 캡처값은 `(캡처 시점)` 을 붙이고, 근거가 없으면 아예 쓰지 않는다
- 진행 중인 것을 완료처럼 쓰는 것
- Founder 프레이밍 — 구직 포지션은 **CSO · CBO (사업전략 · 신규사업개발)** 입니다
- 시크릿을 채팅·커밋·PR 본문에 적는 것 (`MAIL_USERNAME` / `MAIL_PASSWORD` 는 GitHub Settings 에서만)

## 환경 메모

- `ilgam-jtbd.github.io` 는 이 실행 환경의 프록시에서 **403** 이 납니다. 배포 확인은 Actions 결과로 합니다.
- `.github/workflows/daily-recruit-email.yml` 은 평일 11:00 KST (`cron: 0 2 * * 1-5`) 발송. 시크릿이 없으면 건너뜁니다.
- 한국어 PDF 렌더에는 `fonts-noto-cjk` 가 필요합니다.
