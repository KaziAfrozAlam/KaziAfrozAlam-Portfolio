import { chromium } from '@playwright/test';
const url = 'http://localhost:5173';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
await p.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

const res = await p.evaluate(() => {
  const sec = document.querySelector('#future-work');
  const cards = Array.from(sec.querySelectorAll('div[data-ev-id="ev_dab07857de"]'));
  const byLabel = (l) => cards.find((c) => c.querySelector('h3')?.textContent.trim() === l);

  const get = (l) => {
    const c = byLabel(l);
    if (!c) return null;
    return {
      label: c.querySelector('h3')?.textContent.trim(),
      badge: c.querySelector('[data-ev-id="ev_633ffa2a16"]')?.textContent.trim(),
      title: c.querySelector('[data-ev-id$="title"]')?.textContent.trim(),
      desc: c.querySelector('[data-ev-id$="desc"]')?.textContent.trim(),
      question: c.querySelector('[data-ev-id="ev_rich_question_text"]')?.textContent.trim() || null,
      flow: c.querySelector('[data-ev-id="ev_rich_flow"]')?.textContent.trim() || null,
      chips: Array.from(c.querySelectorAll('[data-ev-id="ev_rich_chip"], [data-ev-id="ev_cap_chip"]')).map((s) => s.textContent.trim()),
      links: c.querySelectorAll('a').length,
      text: c.textContent,
    };
  };

  const field = get('FIELD NOTES');
  const applied = get('APPLIED AI SYSTEMS');
  const cap = get('CAPSTONE WORK');
  const exp = byLabel('EXPERIMENTS');
  const res2 = byLabel('RESEARCH PROJECTS');
  const learn = byLabel('LEARNING QUEUE');

  return {
    cardCount: cards.length,
    labels: cards.map((c) => c.querySelector('h3')?.textContent.trim()),
    field,
    applied,
    fieldHasNo10x: field ? !/10×\s*(faster|improvement)|achieved\s*10×/i.test(field.text) : null,
    appliedHasNoFalseDone: applied ? !/\b(built|developed|implemented|completed|production-ready|deployed|live|achieved)\b/i.test(applied.text) : null,
    capStillPlanned: cap ? /PLANNED/.test(cap.badge || '') && !/10×\s*faster|achieved\s*10×/i.test(cap.text) : null,
    expItems: exp ? Array.from(exp.querySelectorAll('h4')).map((h) => h.textContent.trim()) : null,
    resItems: res2 ? Array.from(res2.querySelectorAll('h4')).map((h) => h.textContent.trim()) : null,
    learnItems: learn ? Array.from(learn.querySelectorAll('h4')).map((h) => h.textContent.trim()) : null,
  };
});
console.log(JSON.stringify(res, null, 2));
await b.close();
