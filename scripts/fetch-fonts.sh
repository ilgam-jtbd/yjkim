#!/usr/bin/env bash
# 렌더 환경용 로컬 웹폰트 캐시를 만든다.
#
# 왜: 이 실행 환경의 headless Chromium 은 프록시를 타지 못해 CDN 폰트를 받지 못한다.
# 그러면 PDF 가 시스템 대체 서체로 나간다. curl 은 프록시를 타므로 curl 로 받아 두고
# scripts/render.mjs 가 @font-face 를 로컬 파일로 주입한다.
#
# 사용: bash scripts/fetch-fonts.sh [출력 디렉터리]   (기본 /tmp/pdfgen/fonts)
set -euo pipefail
OUT="${1:-/tmp/pdfgen/fonts}"
UA="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
mkdir -p "$OUT/woff2"; cd "$OUT"

# 1) Google Fonts — 제목용 명조, 라벨용 고정폭 (unicode-range 서브셋 전부)
curl -sf -A "$UA" -o gf.css \
  "https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@700;900&family=JetBrains+Mono:wght@500;700&display=swap"
grep -o 'https://fonts.gstatic.com[^)]*' gf.css | sort -u \
  | xargs -P 12 -I{} sh -c 'f=$(basename "{}"); [ -s "$f" ] || curl -s -m 30 -o "$f" "{}"'

# 2) Pretendard — jsdelivr 는 막혀 있어 GitHub 릴리즈 zip 에서 woff2 만 꺼낸다 (400~900 웨이트)
if [ ! -s woff2/Pretendard-Bold.woff2 ]; then
  curl -sfL -m 180 -o pret.zip "https://github.com/orioncactus/pretendard/releases/download/v1.3.9/Pretendard-1.3.9.zip"
  unzip -o -q pret.zip \
    'web/static/woff2/Pretendard-Regular.woff2' 'web/static/woff2/Pretendard-Medium.woff2' \
    'web/static/woff2/Pretendard-SemiBold.woff2' 'web/static/woff2/Pretendard-Bold.woff2' \
    'web/static/woff2/Pretendard-ExtraBold.woff2' 'web/static/woff2/Pretendard-Black.woff2'
  mv -f web/static/woff2/*.woff2 woff2/ && rm -rf web pret.zip
fi

# 3) 로컬 경로로 다시 쓴 @font-face 묶음
python3 - "$OUT" <<'PYEOF'
import re, io, os, sys
out = sys.argv[1]
gf = io.open(f'{out}/gf.css', encoding='utf-8').read()
gf = re.sub(r'url\((https://fonts\.gstatic\.com/[^)]*)\)',
            lambda m: f'url(file://{out}/' + os.path.basename(m.group(1)) + ')', gf)
W = {'Regular': 400, 'Medium': 500, 'SemiBold': 600, 'Bold': 700, 'ExtraBold': 800, 'Black': 900}
pret = [f"@font-face{{font-family:'Pretendard';font-weight:{w};font-style:normal;font-display:swap;"
        f"src:url(file://{out}/woff2/Pretendard-{n}.woff2) format('woff2')}}" for n, w in W.items()]
io.open(f'{out}/local-fonts.css', 'w', encoding='utf-8').write(
    '/* 렌더 환경 전용 로컬 폰트 */\n' + '\n'.join(pret) + '\n' + gf)
print(f'local-fonts.css: Pretendard {len(pret)} faces + Google Fonts {gf.count("@font-face")} faces')
PYEOF
