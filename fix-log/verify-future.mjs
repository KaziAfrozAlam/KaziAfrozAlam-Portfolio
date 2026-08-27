import { chromium } from '@playwright/test';
const url = process.argv[2] || 'http://localhost:4173';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
await p.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
const labels = await p.evaluate(() => {
  const sec = document.querySelector('#future-work');
  if (!sec) return ['NO SECTION'];
  return Array.from(sec.querySelectorAll('h3')).map((h) => h.textContent.trim());
});
console.log('FUTURE-WORK CARD LABELS:', JSON.stringify(labels));
await b.close();
