import { chromium } from '@playwright/test';
const url = process.argv[2] || 'http://localhost:5173';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
await p.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

const res = await p.evaluate(() => {
  const sec = document.querySelector('#future-work');
  const cards = Array.from(sec.querySelectorAll('div[data-ev-id="ev_dab07857de"]'));
  const labels = cards.map((c) => c.querySelector('h3')?.textContent.trim());

  const cap = cards.find((c) => c.querySelector('h3')?.textContent.trim() === 'CAPSTONE WORK');
  const capText = cap ? cap.textContent : '';
  const capTitle = cap?.querySelector('[data-ev-id="ev_cap_title"]')?.textContent.trim();
  const capBadge = cap?.querySelector('[data-ev-id="ev_633ffa2a16"]')?.textContent.trim();
  const capStatus = cap?.querySelector('[data-ev-id="ev_cap_status"]')?.textContent.trim();
  const capGoalLabel = cap?.querySelector('[data-ev-id="ev_cap_goallabel"]')?.textContent.trim();
  const capGoal = cap?.querySelector('[data-ev-id="ev_cap_goaldetail"]')?.textContent.trim();
  const capChips = cap ? Array.from(cap.querySelectorAll('[data-ev-id="ev_cap_chip"]')).map((s) => s.textContent.trim()) : [];
  const capHasLink = cap ? cap.querySelectorAll('a').length : -1;

  // Protected sections content
  const expCard = cards.find((c) => c.querySelector('h3')?.textContent.trim() === 'EXPERIMENTS');
  const expItems = expCard ? Array.from(expCard.querySelectorAll('h4')).map((h) => h.textContent.trim()) : [];
  const resCard = cards.find((c) => c.querySelector('h3')?.textContent.trim() === 'RESEARCH PROJECTS');
  const resItems = resCard ? Array.from(resCard.querySelectorAll('h4')).map((h) => h.textContent.trim()) : [];
  const learnCard = cards.find((c) => c.querySelector('h3')?.textContent.trim() === 'LEARNING QUEUE');
  const learnItems = learnCard ? Array.from(learnCard.querySelectorAll('h4')).map((h) => h.textContent.trim()) : [];

  return {
    labels,
    capTitle, capBadge, capStatus, capGoalLabel, capGoal, capChips, capHasLink,
    capMentionsAchieved10x: /10×\s*faster|achieved\s*10×|reduced by 10×/i.test(capText),
    expItems, resItems, learnItems,
  };
});
console.log(JSON.stringify(res, null, 2));
await b.close();
