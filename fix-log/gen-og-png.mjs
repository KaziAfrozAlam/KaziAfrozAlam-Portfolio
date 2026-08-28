import { chromium } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const svgPath = path.join(root, 'public', 'og-image.svg');
const outPath = path.join(root, 'public', 'og-image.png');

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('file://' + svgPath);
const el = await page.$('svg');
if (!el) throw new Error('SVG element not found');
await el.screenshot({ path: outPath });
await browser.close();
console.log('Wrote', outPath);
