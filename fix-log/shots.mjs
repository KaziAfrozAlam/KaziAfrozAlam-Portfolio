import { chromium } from '@playwright/test';

const prefix = process.argv[2] || 'shot';
const url = process.argv[3] || 'http://localhost:4173';
const sizes = [
  ['mobile', 375, 812],
  ['tablet', 768, 1024],
  ['desktop', 1280, 800],
];

const browser = await chromium.launch();
for (const [name, w, h] of sizes) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  } catch (e) {
    console.log(`goto failed for ${name}: ${e.message}`);
  }
  await page.waitForTimeout(2500);
  await page.screenshot({ path: `fix-log/${prefix}-${name}.png`, fullPage: true });
  console.log(`captured ${prefix}-${name}.png (${w}x${h})`);
  await page.close();
}
await browser.close();
