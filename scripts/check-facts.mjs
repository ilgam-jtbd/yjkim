#!/usr/bin/env node
// 정본(.claude/facts.json)과 구직 문서 3종을 대조한다.
// 의존성 없음 — node scripts/check-facts.mjs
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const F = JSON.parse(readFileSync(join(ROOT, '.claude/facts.json'), 'utf8'));

const fail = [];
const warn = [];

const docs = Object.fromEntries(
  F.docs.map((d) => [d, readFileSync(join(ROOT, d), 'utf8')])
);
const text = (h) => h.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ');
const bodies = Object.fromEntries(Object.entries(docs).map(([k, v]) => [k, text(v)]));

// 1) 정본에 없는 연월이 문서에 등장하는가 (날짜 드리프트)
const known = new Set();
for (const c of F.career) for (const d of [c.from, c.to]) if (/^\d{4}\.\d{2}$/.test(d)) known.add(d);
// 이력서는 학력·수상 등 정본 밖 연월을 담으므로 index/cover-letter만 엄격 검사
for (const d of ['index.html', 'cover-letter.html']) {
  for (const m of new Set(bodies[d].match(/\b20\d{2}\.\d{2}\b/g) || [])) {
    if (!known.has(m)) fail.push(`${d}: 정본에 없는 연월 "${m}" — .claude/facts.json 의 career 를 먼저 고치십시오`);
  }
}

// 2) 정본 경력 기간이 각 문서에서 일관된가 (기간을 전부 적는 문서에만 적용)
for (const c of F.career.filter((x) => /^\d{4}\.\d{2}$/.test(x.from))) {
  for (const d of F.strict_dates) {
    if (!bodies[d].includes(c.org.replace(/\s*\(.*\)$/, '').replace('㈜', ''))) continue;
    if (!bodies[d].includes(c.from)) {
      warn.push(`${d}: "${c.org}" 언급되나 시작 시점 ${c.from} 표기 없음`);
    }
  }
}

// 3) 같은 지표가 문서마다 다른 값으로 쓰였는가
for (const { k, v } of F.claims) {
  const seen = F.docs.filter((d) => bodies[d].includes(v));
  if (seen.length === 0) warn.push(`정본 수치 "${k} = ${v}" 가 어느 문서에도 없음 — 정본에서 지우거나 문서에 반영하십시오`);
}

// 4) 비공개 항목이 새어 나갔는가 (자문처 익명 유지)
for (const d of F.docs) {
  if (/시놀|SINOR|대웅개발|케어허브/i.test(bodies[d])) {
    fail.push(`${d}: 비공개 대상(자문처·제휴사 실명)이 노출되었습니다`);
  }
}

// 5) 디자인 토큰 — 금지된 빨강 계열
for (const d of F.docs) {
  const reds = docs[d].match(/#D71921/gi);
  if (reds) fail.push(`${d}: 금지 색상 #D71921 사용 ${reds.length}회`);
}

// 6) PDF 링크가 실제 산출물명과 맞는가
for (const [src, pdf] of Object.entries(F.pdfs)) {
  if (!docs[src].includes(pdf)) fail.push(`${src}: PDF 내려받기 링크가 "${pdf}" 를 가리키지 않습니다`);
}

// 6b) 낡은 용어가 다시 들어왔는가
for (const [term, alt] of Object.entries(F.dated_terms || {})) {
  if (term.startsWith('_')) continue;
  for (const d of F.docs) {
    if (bodies[d].includes(term)) fail.push(`${d}: 낡은 용어 "${term}" — 대신 ${alt}`);
  }
}

// 7) 상단 포지셔닝(타이틀·메타·h1)이 Founder 프레이밍으로 새지 않았는가
// 과거 직함으로서의 Founder 표기는 사실이므로 통과시킨다 — 대상은 '지금 무엇으로 지원하는가'뿐이다.
for (const d of F.docs) {
  const top = [
    ...(docs[d].match(/<title>[\s\S]*?<\/title>/gi) || []),
    ...(docs[d].match(/<meta[^>]+(?:description|og:title|og:description)[^>]*>/gi) || []),
    ...(docs[d].match(/<h1[\s\S]*?<\/h1>/gi) || []),
  ].join(' ');
  if (/Founder|파운더/i.test(top)) warn.push(`${d}: 상단 포지셔닝에 Founder 프레이밍 — 구직 포지션은 ${F.person.target}`);
}

const out = (label, arr) => arr.forEach((m) => console.log(`${label} ${m}`));
out('✗', fail);
out('!', warn);
console.log(
  fail.length === 0
    ? `\n정본 대조 통과 — 문서 ${F.docs.length}종, 경력 ${F.career.length}건, 수치 ${F.claims.length}건${warn.length ? ` (경고 ${warn.length}건)` : ''}`
    : `\n실패 ${fail.length}건 · 경고 ${warn.length}건`
);
process.exit(fail.length ? 1 : 0);
