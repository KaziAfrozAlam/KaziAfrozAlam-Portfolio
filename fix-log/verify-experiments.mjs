import { chromium } from '@playwright/test';
const url = process.argv[2] || 'http://localhost:5173';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
await p.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
const data = await p.evaluate(() => {
  const sec = document.querySelector('#future-work');
  const cards = Array.from(sec.querySelectorAll('h3')).map((h) => {
    const card = h.closest('div[data-ev-id="ev_dab07857de"]');
    const titles = card ? Array.from(card.querySelectorAll('h4')).map((x) => x.textContent.trim()) : [];
    return { label: h.textContent.trim(), titles };
  });
  return cards;
});
console.log(JSON.stringify(data, null, 2));
await b.close();
