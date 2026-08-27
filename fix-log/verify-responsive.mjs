import { chromium } from '@playwright/test';
const url = 'http://localhost:5173';
const b = await chromium.launch();
for (const w of [1440, 1024, 768, 375, 320]) {
  const p = await b.newPage({ viewport: { width: w, height: 900 } });
  await p.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  const r = await p.evaluate(() => {
    const sec = document.querySelector('#future-work');
    const cards = sec.querySelectorAll('div[data-ev-id="ev_dab07857de"]').length;
    return { scrollW: document.documentElement.scrollWidth, clientW: document.documentElement.clientWidth, cards };
  });
  const overflow = r.scrollW > r.clientW + 1;
  console.log(`w=${w} cards=${r.cards} scrollW=${r.scrollW} clientW=${r.clientW} overflow=${overflow ? 'YES' : 'no'}`);
  await p.close();
}
await b.close();
