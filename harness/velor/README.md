# velor 하네스 (Harness Package)

velor(시니어 전문가 ↔ 기업·VC 매칭 플랫폼)의 반복 업무를 **Agent · Skill · Orchestrator** 구조로 묶은 하네스 패키지입니다.
[`jikime/harness-lab`](https://github.com/jikime/harness-lab) 의 하네스 엔지니어링 규약을 따릅니다.

> 이 폴더는 **이식용(portable) 패키지**입니다. velor 실제 코드베이스(velor.kr)에 적용할 때는
> 아래 파일들을 velor 레포의 `.claude/` 구조로 복사해 사용하세요. (이 레포(yjkim)는 정적 사이트라
> 보관·버전관리 용도로만 둡니다.)

## 어디에 무엇이 있나

| 파일 | 역할 | velor 레포 복사 위치 |
| --- | --- | --- |
| `velor-orchestrator/SKILL.md` | 전체 진행을 묶는 입구 스킬(팀장) | `.claude/skills/velor-orchestrator/SKILL.md` |
| `agents/velor-growth-experiment.md` | 그로스·CRO 실험 설계·판정 | `.claude/agents/velor-growth-experiment.md` |
| `agents/velor-matching-recruiter.md` | 시니어 전문가 매칭·리크루팅 | `.claude/agents/velor-matching-recruiter.md` |
| `agents/velor-ir-advisor.md` | IR·투자 자료 | `.claude/agents/velor-ir-advisor.md` |
| `agents/velor-content-marketer.md` | 콘텐츠·마케팅(SEO/GEO·광고·CRM) | `.claude/agents/velor-content-marketer.md` |
| `references/velor-context.md` | velor BM·퍼널·지표·스택 공유 컨텍스트 | `.claude/skills/velor-orchestrator/references/velor-context.md` |
| `artifacts/README.md` | 산출물 지도 | `artifacts/README.md` |

## 쓰는 법 (3가지 모드)

- **빠른 설계**: "velor 그로스 실험 하나 설계해줘" → `velor-growth-experiment` 단독 실행
- **함께 설계**: 목표만 있고 자료가 부족 → 오케스트레이터가 핵심 질문 3개로 빈칸 채움
- **실행 하네스**: 여러 역할이 협업(예: 신규 랜딩 실험 + 카피 + 리드 측정) → 오케스트레이터가 순서·전달물·검증을 묶음

자연어로 "velor …" 라고 요청하면 `velor-orchestrator` 가 먼저 판단해 적절한 에이전트로 라우팅합니다.

## 산출물 원칙
- 모든 중간/최종 결과는 `artifacts/` 에 파일로 남깁니다(대화에만 두지 않음).
- 외부 발송·게시·결제·실데이터 변경은 **사람 승인** 게이트를 둡니다.
