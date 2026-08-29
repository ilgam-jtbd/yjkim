#!/usr/bin/env node
// 반응형 검증 + 이력서·자기소개서 PDF 재생성.
// 사용:  npx puppeteer@23 --yes >/dev/null 2>&1; node scripts/render.mjs [--no-pdf] [--shot <선택자>]
// 지금까지 /tmp 에만 있던 스크립트라 컨테이너가 바뀌면 사라졌습니다. 저장소로 옮겨 둡니다.
import { readFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const F = JSON.parse(readFileSync(join(ROOT, '.claude/facts.json'), 'utf8'));
const OUT = process.env.RENDER_OUT || '/tmp/yjkim-render';
const noPdf = process.argv.includes('--no-pdf');

let puppeteer;
for (const p of [process.env.PUPPETEER_PATH, 'puppeteer', '/tmp/pdfgen/node_modules/puppeteer']) {
  if (!p) continue;
  try { puppeteer = createRequire(import.meta.url)(p); break; } catch {}
}
if (!puppeteer) {
  console.error('puppeteer 를 찾지 못했습니다.  npm i puppeteer  또는  PUPPETEER_PATH=<경로>');
  process.exit(2);
}

mkdirSync(OUT, { recursive: true });
const b = await puppeteer.launch({
  headless: 'shell',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none'],
});

let bad = 0;
for (const doc of F.docs) {
  for (const w of F.viewports) {
    const p = await b.newPage();
    await p.setViewport({ width: w, height: 1100, deviceScaleFactor: 1, isMobile: w < 500 });
    await p.goto(pathToFileURL(join(ROOT, doc)).href, { waitUntil: 'networkidle0', timeout: 60000 });
    await new Promise((r) => setTimeout(r, 900));
    const sw = await p.evaluate(() => document.documentElement.scrollWidth);
    const over = await p.evaluate(() => {
      const o = [];
      document.querySelectorAll('*').forEach((e) => {
        if (e.getBoundingClientRect().right > window.innerWidth + 2)
          o.push((e.className && e.className.toString().slice(0, 28)) || e.tagName);
      });
      return [...new Set(o)].slice(0, 4);
    });
    const ok = sw <= w;
    if (!ok) bad++;
    console.log(
      `${doc.padEnd(18)} ${String(w).padStart(4)}px  scrollWidth=${sw} ${ok ? 'ok' : 'OVERFLOW ✗'}` +
        (over.length ? `  | ${over.join(', ')}` : '')
    );
    await p.screenshot({ path: join(OUT, `${doc.replace('.html', '')}_${w}.png`), fullPage: false });
    await p.close();
  }
}

if (!noPdf) {
  for (const [src, pdf] of Object.entries(F.pdfs)) {
    const p = await b.newPage();
    await p.goto(pathToFileURL(join(ROOT, src)).href, { waitUntil: 'networkidle0', timeout: 60000 });
    await p.emulateMediaType('print');
    try { await p.evaluate(() => document.fonts && document.fonts.ready); } catch {}
    await new Promise((r) => setTimeout(r, 1000));
    await p.pdf({
      path: join(ROOT, pdf), format: 'A4', printBackground: true,
      margin: { top: '14mm', bottom: '14mm', left: '14mm', right: '14mm' },
    });
    console.log(`PDF -> ${pdf}`);
    await p.close();
  }
}

await b.close();
console.log(bad ? `\n오버플로 ${bad}건 — 배포 전에 고치십시오` : `\n반응형 통과 · 캡처 ${OUT}`);
process.exit(bad ? 1 : 0);
