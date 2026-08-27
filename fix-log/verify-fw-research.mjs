import { chromium } from '@playwright/test';
const url = process.argv[2] || 'http://localhost:5173';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
await p.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

const res = await p.evaluate(() => {
  // Future Work -> RESEARCH PROJECTS card
  const fw = document.querySelector('#future-work');
  const fwCards = Array.from(fw.querySelectorAll('h3'));
  const researchCard = fwCards.find((h) => h.textContent.trim() === 'RESEARCH PROJECTS');
  const fwCardEl = researchCard ? researchCard.closest('div[data-ev-id="ev_dab07857de"]') : null;
  const fwText = fwCardEl ? fwCardEl.textContent : '';
  const fwLinks = fwCardEl ? Array.from(fwCardEl.querySelectorAll('a')).map((a) => ({ text: a.textContent.trim(), href: a.href })) : [];

  // Main Research section
  const sec = document.querySelector('#research');
  const articles = Array.from(sec.querySelectorAll('article'));
  const checkCards = articles.filter((a) => a.textContent.includes('CHECKMATE'));

  return {
    fwResearchCardExists: Boolean(researchCard),
    fwHasCheckmate: fwText.includes('CHECKMATE'),
    fwHasDOI: fwText.includes('10.1007/978-981-95-5835-3_74'),
    fwLink: fwLinks.find((l) => l.href.includes('doi.org'))?.href || null,
    researchCheckmateCards: checkCards.length,
  };
});
console.log(JSON.stringify(res, null, 2));
await b.close();
