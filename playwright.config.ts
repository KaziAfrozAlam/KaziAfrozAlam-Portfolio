import { defineConfig, devices } from '@playwright/test';

// Smoke test config for the portfolio.
// Defaults to a local preview build (start it with: npm run build && npm run preview).
// To test the live deployment instead, set: BASE_URL=https://kaziafrozalam.netlify.app npx playwright test
// Requires: npm i -D @playwright/test && npx playwright install chromium
const BASE_URL = process.env.BASE_URL || 'http://localhost:4173';

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: BASE_URL,
    headless: true,
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 800 } },
    },
    {
      name: 'mobile',
      use: { ...devices['Pixel 5'], viewport: { width: 375, height: 812 } },
    },
  ],
});
