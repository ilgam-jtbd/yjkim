#!/usr/bin/env node
// 채용 관점 실측 — 지시서 V3 §3 의 30개 항목을 측정해 마크다운으로 남긴다.
// 사용: node scripts/audit-hiring.mjs <출력.md> [--label before|after]
// 수정 전·후를 같은 잣대로 재기 위한 도구다. 값을 손으로 적지 않는다.
import { readFileSync, writeFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = process.argv[2] || join(ROOT, '.claude/audit/hiring-v3-audit.md');
const LABEL = (process.argv.indexOf('--label') > -1 && process.argv[process.argv.indexOf('--label') + 1]) || '';
const F = JSON.parse(readFileSync(join(ROOT, '.claude/facts.json'), 'utf8'));
const FONT_CSS = process.env.FONT_CSS || '/tmp/pdfgen/fonts/local-fonts.css';
const FONT_HOSTS = /cdn\.jsdelivr\.net|fonts\.googleapis\.com|fonts\.gstatic\.com/;
const useLocalFonts = existsSync(FONT_CSS);
const SCREEN = 844; // iPhone 14/15 뷰포트 높이

let puppeteer;
for (const p of [process.env.PUPPETEER_PATH, 'puppeteer', '/tmp/pdfgen/node_modules/puppeteer']) {
  if (!p) continue;
  try { puppeteer = createRequire(import.meta.url)(p); break; } catch {}
}
if (!puppeteer) { console.error('puppeteer 없음'); process.exit(2); }

const sh = (c) => { try { return execSync(c, { cwd: ROOT, encoding: 'utf8' }).trim(); } catch (e) { return `(실패: ${String(e.message).split('\n')[0]})`; } };
const docs = F.docs;
const html = Object.fromEntries(docs.map((d) => [d, readFileSync(join(ROOT, d), 'utf8')]));
const text = (h) => h.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ');
const body = Object.fromEntries(docs.map((d) => [d, text(html[d])]));
const count = (s, re) => (s.match(re) || []).length;

const SUPER = /국내\s*최초|세계\s*최초|업계\s*최초|업계\s*유일|국내\s*처음|세계\s*처음/g;
const BRAG = /혼자서도\s*팀\s*규모|임원\s*다섯\s*자리|누구보다|압도적|완벽하게|엄청난/g;

const md = [];
const H = (t) => md.push(`\n## ${t}\n`);
const row = (k, v) => md.push(`- **${k}**: ${v}`);

md.push(`# 채용 관점 실측 — ${LABEL || '측정'} · ${new Date().toISOString().slice(0, 16).replace('T', ' ')} UTC\n`);
md.push(`측정 도구: \`scripts/audit-hiring.mjs\` · 뷰포트 390 / 768 / 1200 · 1화면 = ${SCREEN}px · 로컬 폰트 ${useLocalFonts ? '주입' : '없음(대체 서체)'}\n`);

H('1–2. 커밋 · 파일 구조');
row('main commit', sh('git log --oneline -1'));
row('브랜치', sh('git branch --show-current'));
md.push('```\n' + sh("git ls-files | grep -v '^harness/' | sort") + '\n```');

H('3–8. 문서 · 정본 · 검사기');
for (const d of [...docs, '.claude/facts.json', 'scripts/check-facts.mjs']) {
  const p = join(ROOT, d);
  if (!existsSync(p)) { row(d, '없음'); continue; }
  const s = statSync(p).size, lines = readFileSync(p, 'utf8').split('\n').length;
  row(d, `${s.toLocaleString()} B · ${lines} 줄`);
}
row('facts.json', `docs ${F.docs.length} · career ${F.career.length} · claims ${F.claims.length} · rules ${F.rules.length} · dated_terms ${Object.keys(F.dated_terms || {}).filter((k) => !k.startsWith('_')).length}`);

// ── 브라우저 실측 ──
const b = await puppeteer.launch({ headless: 'shell', args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none'] });
async function open(doc, w) {
  const p = await b.newPage();
  const errs = [];
  p.on('pageerror', (e) => errs.push(String(e.message).slice(0, 120)));
  p.on('console', (m) => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push(m.text().slice(0, 120)); }); // 폰트 CDN 차단(net::ERR_FAILED)은 측정 환경 산물이라 제외
  if (useLocalFonts) { await p.setRequestInterception(true); p.on('request', (r) => (FONT_HOSTS.test(r.url()) ? r.abort() : r.continue())); }
  await p.setViewport({ width: w, height: SCREEN, deviceScaleFactor: 1, isMobile: w < 500 });
  await p.goto(pathToFileURL(join(ROOT, doc)).href, { waitUntil: 'networkidle0', timeout: 60000 });
  if (useLocalFonts) await p.addStyleTag({ path: FONT_CSS });
  try { await p.evaluate(() => document.fonts && document.fonts.ready); } catch {}
  await new Promise((r) => setTimeout(r, useLocalFonts ? 1400 : 800));
  return { p, errs };
}

H('9–11 · 25–27. 뷰포트별 높이 · 가로 오버플로 · JS 오류 · alt 누락');
md.push('| 문서 | 폭 | 총 높이 | 화면 수 | scrollWidth | 오버플로 요소 | JS 오류 | alt 누락 |');
md.push('|---|---|---|---|---|---|---|---|');
const heights = {};
for (const doc of docs) {
  for (const w of F.viewports) {
    const { p, errs } = await open(doc, w);
    const m = await p.evaluate((W) => {
      const over = [];
      document.querySelectorAll('*').forEach((e) => { if (e.getBoundingClientRect().right > W + 2) over.push((e.className && e.className.toString().slice(0, 20)) || e.tagName); });
      const noalt = [...document.querySelectorAll('img')].filter((i) => !i.getAttribute('alt')).length;
      return { h: document.documentElement.scrollHeight, sw: document.documentElement.scrollWidth, over: [...new Set(over)].slice(0, 3), noalt };
    }, w);
    heights[`${doc}@${w}`] = m.h;
    md.push(`| ${doc} | ${w} | ${m.h.toLocaleString()} | ${(m.h / SCREEN).toFixed(1)} | ${m.sw} ${m.sw > w ? '✗' : '✓'} | ${m.over.join(', ') || '—'} | ${errs.length ? errs.join(' / ') : '0'} | ${m.noalt} |`);
    await p.close();
  }
}

H('12–15. index 390px — 섹션별 · 사례별 높이, 사례 순서');
{
  const { p } = await open('index.html', 390);
  const secs = await p.evaluate(() => [...document.querySelectorAll('header[id], section[id], footer')].map((s) => ({ id: s.id || s.tagName.toLowerCase(), h: Math.round(s.getBoundingClientRect().height) })));
  const total = await p.evaluate(() => document.documentElement.scrollHeight);
  md.push(`총 높이 **${total.toLocaleString()}px = ${(total / SCREEN).toFixed(1)}화면** (목표 ≤ 10,200px / 12화면)\n`);
  md.push('| 섹션 | 높이 | 화면 |'); md.push('|---|---|---|');
  for (const s of secs) md.push(`| ${s.id} | ${s.h.toLocaleString()} | ${(s.h / SCREEN).toFixed(2)} |`);
  const cases = await p.evaluate(() => [...document.querySelectorAll('.case')].map((c) => ({ n: c.querySelector('.num')?.textContent.trim(), t: c.querySelector('h3')?.textContent.trim().slice(0, 40), h: Math.round(c.getBoundingClientRect().height), imgs: c.querySelectorAll('img').length })));
  md.push('\n| 사례 | 제목 | 높이 | 화면 | 이미지 |'); md.push('|---|---|---|---|---|');
  for (const c of cases) md.push(`| ${c.n} | ${c.t} | ${c.h.toLocaleString()} | ${(c.h / SCREEN).toFixed(2)} | ${c.imgs} |`);
  row('사례 순서', cases.map((c) => `${c.n} ${c.t.split(' ')[0]}`).join(' → '));

  H('30. 390px 첫 3화면(0–2,532px)에 노출되는 정보');
  const first3 = await p.evaluate((LIM) => {
    const out = [];
    document.querySelectorAll('h1,h2,h3,p,.kpi,.chip,.btn,.eyebrow,.lede,.sc h3').forEach((e) => {
      const r = e.getBoundingClientRect(); const t = e.textContent.replace(/\s+/g, ' ').trim();
      if (r.top < LIM && r.height > 0 && t && t.length > 3 && !out.includes(t)) out.push(t.slice(0, 90));
    });
    return out;
  }, SCREEN * 3);
  md.push(first3.map((t) => `- ${t}`).join('\n'));
  const f3 = first3.join(' ');
  md.push(`\n첫 3화면 체크 — 누구인가 ${/김연재/.test(f3) ? '✓' : '✗'} · 포지션 ${/CSO|CBO/.test(f3) ? '✓' : '✗'} · 해결할 문제 ${/수요|공급|거래/.test(f3) ? '✓' : '✗'} · 숫자 근거 ${/13만|250억|100억/.test(f3) ? '✓' : '✗'} · 연락 ${/문의|@/.test(f3) ? '✓' : '✗'} · **Sealo 노출 ${/Sealo|씰로/.test(f3) ? '✗ 있음' : '✓ 없음'}**`);
  await p.close();
}
await b.close();

H('16 · 19 · 20 · 리더십/자랑 표현 — 문서별 출현 횟수');
md.push('| 문서 | "직접" | "파일럿" | 최상급 | 자랑성 표현 | "혼자" | Sealo/씰로 | 조직 인원(명) | 직보/보고 | 예산 |');
md.push('|---|---|---|---|---|---|---|---|---|---|');
for (const d of docs) {
  const s = body[d];
  md.push(`| ${d} | ${count(s, /직접/g)} | ${count(s, /파일럿/g)} | ${count(s, SUPER)} | ${count(s, BRAG)} | ${count(s, /혼자/g)} | ${count(s, /Sealo|씰로/g)} | ${count(s, /\d+\s*(→|~|-)\s*\d+\s*명|\d+명/g)} | ${count(s, /직보|보고\s*라인|리포팅/g)} | ${count(s, /예산/g)} |`);
}
for (const d of docs) {
  const sup = [...new Set(body[d].match(SUPER) || [])], br = [...new Set(body[d].match(BRAG) || [])];
  if (sup.length || br.length) row(`${d} 제거 대상`, [...sup, ...br].join(' · '));
}

H('17–18. Sealo 노출 위치 · 이미지');
for (const d of docs) {
  const lines = html[d].split('\n').map((l, i) => [i + 1, l]).filter(([, l]) => /Sealo|씰로|sealo-/.test(l));
  if (lines.length) row(d, lines.map(([i, l]) => `L${i}${/class="(num|tl-co|exp-co)"/.test(l) ? '(제목)' : ''}`).join(', ') + ` — ${lines.length}줄`);
}
for (const img of ['images/sealo-proto.jpg', 'images/sealo-offer.jpg']) row(img, existsSync(join(ROOT, img)) ? `있음 (${statSync(join(ROOT, img)).size.toLocaleString()} B)` : '없음');

H('21. PDF 페이지 수');
for (const f of Object.entries(F.pdfs).filter(([k]) => k.endsWith('.html')).map(([, v]) => v)) {
  const p = join(ROOT, f);
  if (!existsSync(p)) { row(f, '없음'); continue; }
  const buf = readFileSync(p, 'latin1');
  const pages = (buf.match(/\/Type\s*\/Page(?!s)/g) || []).length;
  const links = (buf.match(/\/URI\s*\(/g) || []).length;
  row(f, `${pages} 페이지 · ${(statSync(p).size / 1024).toFixed(0)} KB · URI 링크 ${links}건${F.pdfs.resume_pages_max && f === F.pdfs['resume.html'] ? ` (한도 ${F.pdfs.resume_pages_max})` : ''}`);
}

H('22–24. 링크 — 포트폴리오 · VELOR · 내부 링크/이미지 존재');
for (const d of docs) {
  const hrefs = [...html[d].matchAll(/(?:href|src)="([^"#][^"]*)"/g)].map((m) => m[1]);
  const velor = [...new Set(hrefs.filter((h) => /velor\.kr/.test(h)))];
  const portfolio = [...new Set(hrefs.filter((h) => /ilgam-jtbd\.github\.io/.test(h)))];
  const local = [...new Set(hrefs.filter((h) => !/^(https?:|mailto:|tel:|data:)/.test(h)))].map((h) => h.split('?')[0].split('#')[0]).filter(Boolean);
  const broken = local.filter((h) => !existsSync(join(ROOT, decodeURIComponent(h))));
  row(d, `velor.kr ${velor.length}개 · 포트폴리오 링크 ${portfolio.length}개 · 내부 참조 ${local.length}개 · **깨진 내부 참조 ${broken.length}${broken.length ? ' → ' + broken.join(', ') : ''}**`);
  if (velor.length) md.push(`  - velor.kr: ${velor.join(' · ')}`);
}
md.push('\n외부 링크(velor.kr·언론)는 이 실행 환경의 프록시가 차단해 HTTP 상태를 직접 확인할 수 없다. 09-02 기준값(velor.kr 8개 전부 200)을 참고값으로 둔다.');

H('28. CI 상태 (main 최신 실행)');
md.push('```\n' + sh(`curl -s "https://api.github.com/repos/ilgam-jtbd/yjkim/actions/runs?branch=main&per_page=4" | python3 -c "import sys,json; [print(d['name'],'|',d['status'],'|',d['conclusion'],'|',d['head_sha'][:7]) for d in json.load(sys.stdin)['workflow_runs']]"`) + '\n```');

H('29. 정본 ↔ 문서 대조 (check-facts)');
md.push('```\n' + sh('node scripts/check-facts.mjs') + '\n```');

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, md.join('\n') + '\n');
console.log('감사 결과 ->', OUT);
console.log(`index@390 = ${heights['index.html@390']}px (${(heights['index.html@390'] / SCREEN).toFixed(1)}화면)`);
