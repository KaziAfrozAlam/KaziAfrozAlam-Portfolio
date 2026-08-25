import { expect, test } from '@playwright/test';

test.describe('Portfolio smoke', () => {
  test('loads without runtime errors (desktop)', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
    page.on('console', (m) => {
      if (m.type() === 'error') errors.push(`console: ${m.text()}`);
    });

    await page.goto('/');
    await expect(page).toHaveTitle(/Kazi Afroz Alam/);
    await expect(page.locator('main#main')).toBeVisible();
    await expect(page.locator('header nav')).toBeVisible();
    await expect(page.getByText(/ENGINEERING SYSTEMS/)).toBeVisible();

    // No uncaught runtime exceptions.
    expect(errors.filter((e) => e.startsWith('pageerror'))).toEqual([]);
    if (errors.length) console.log('Console errors seen:', errors);
  });

  test('mobile navigation menu works', async ({ page }) => {
    await page.goto('/');
    const vp = page.viewportSize()?.width ?? 1280;
    test.skip(vp >= 1024, 'Hamburger is only rendered below the lg breakpoint');
    const open = page.getByRole('button', { name: 'Open menu' });
    await expect(open).toBeVisible();
    await open.click();
    const panel = page.locator('#mobile-nav');
    await expect(panel).toBeVisible();
    const projectsLink = panel.getByRole('link', { name: 'PROJECTS' });
    await expect(projectsLink).toBeVisible();
    await projectsLink.click();
    await expect(page).toHaveURL(/#projects$/);
  });

  test('skip link is keyboard reachable', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'Skip to content' });
    await expect(skip).toBeFocused();
  });

  test('key links have correct destinations', async ({ page }) => {
    await page.goto('/');
    const header = page.locator('header');
    await expect(header.getByRole('link', { name: 'GitHub', exact: true })).toHaveAttribute(
      'href',
      /^https:\/\/github\.com\//,
    );
    await expect(header.getByRole('link', { name: 'LinkedIn', exact: true })).toHaveAttribute(
      'href',
      /^https:\/\/linkedin\.com\//,
    );

    const vp = page.viewportSize()?.width ?? 1280;
    const resume =
      vp >= 1024
        ? header.getByRole('link', { name: /Resume/i })
        : (await page.getByRole('button', { name: 'Open menu' }).click(),
          page.locator('#mobile-nav').getByRole('link', { name: /Resume/i }));
    await expect(resume).toHaveAttribute('href', /\.pdf$/);
  });

  test('contact form enables submit when filled', async ({ page }) => {
    await page.goto('/#contact');
    const contact = page.locator('#contact');
    const name = contact.getByLabel('NAME');
    const email = contact.getByLabel('EMAIL');
    const message = contact.getByLabel('MESSAGE');
    const submit = contact.getByRole('button', { name: 'SEND MESSAGE', exact: true });

    await expect(submit).toBeDisabled();
    await name.fill('Test User');
    await email.fill('test@example.com');
    await message.fill('Smoke test message.');
    await expect(submit).toBeEnabled();
  });
});
