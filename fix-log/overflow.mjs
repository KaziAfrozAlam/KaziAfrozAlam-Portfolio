import { chromium } from '@playwright/test';

const targets = [
  ['before', 'https://kaziafrozalam.netlify.app'],
  ['after', 'http://localhost:4173'],
];

const browser = await chromium.launch();
for (const [label, url] of targets) {
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  } catch (e) {
    console.log(`${label}: goto error ${e.message}`);
  }
  await page.waitForTimeout(2000);
  const r = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
    horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
  }));
  console.log(label, JSON.stringify(r));
  await page.close();
}
await browser.close();
