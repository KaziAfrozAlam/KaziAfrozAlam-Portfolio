import { chromium } from '@playwright/test';
const url = process.argv[2] || 'http://localhost:5173';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
await p.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

const result = await p.evaluate(() => {
  const sec = document.querySelector('#research');
  const articles = Array.from(sec.querySelectorAll('article'));
  const checkCards = articles.filter((a) => a.textContent.includes('CHECKMATE'));
  const card = checkCards[0];
  const cardText = card ? card.textContent : '';
  const links = card ? Array.from(card.querySelectorAll('a')).map((a) => ({ text: a.textContent.trim(), href: a.href })) : [];
  // Ensure not in other sections
  const future = document.querySelector('#future-work');
  const futureHas = future ? future.textContent.includes('CHECKMATE') : false;
  return {
    totalArticles: articles.length,
    checkmateCards: checkCards.length,
    hasCategory: cardText.includes('RESEARCH PROJECT'),
    hasViewPublication: links.some((l) => l.text.includes('VIEW PUBLICATION')),
    hasViewCode: links.some((l) => l.text.includes('VIEW CODE')),
    hasDOI: cardText.includes('10.1007/978-981-95-5835-3_74'),
    hasPaperTitle: cardText.includes('Automated Evaluation and Assessment System Using AI'),
    hasAuthors: cardText.includes('Kazi Afroz Alam'),
    springerHref: links.find((l) => l.href.includes('doi.org'))?.href || null,
    githubHref: links.find((l) => l.href.includes('github.com'))?.href || null,
    futureHasCheckmate: futureHas,
  };
});
console.log(JSON.stringify(result, null, 2));
await b.close();
