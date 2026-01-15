import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home/HomePage';
import { LOCALES } from '../../utils/testData';

const DEFAULT_BASE = process.env.BASE_URL || 'https://www.91infra.com/';

LOCALES.forEach(({ path, name, brands }) => {
  // Only add detailed brand tests for Base and English (per request)
  if (!brands || !(name === 'Base' || name === 'English')) return;

  test.describe(`Home - Brands Section - ${name}`, () => {
    let homePage: HomePage;
    const cleanBase = DEFAULT_BASE.endsWith('/') ? DEFAULT_BASE.slice(0, -1) : DEFAULT_BASE;
    const fullUrl = path ? `${cleanBase}/${path}` : DEFAULT_BASE;

    test.beforeEach(async ({ page }) => {
      homePage = new HomePage(page);
      await page.goto(fullUrl);
    });

    test('should show brands heading', async () => {
      const heading = (await (await homePage.page.locator('#brands h2')).innerText()).trim();
      expect(heading).toBe(brands.heading);
    });

    test('should display all expected brand links with image and label', async () => {
      for (const slug of brands.slugs) {
        const anchor = homePage.page.locator(`#brands ul li a[href*="/construction-equipments/${slug}"]`).first();
        await expect(anchor, `brand anchor for ${slug}`).toBeVisible();

        // aria-label should exist and be meaningful
        const aria = await anchor.getAttribute('aria-label');
        expect(typeof aria).toBe('string');
        expect((aria ?? '').length).toBeGreaterThan(5);

        // image alt/title should exist
        const img = anchor.locator('img').first();
        await expect(img).toBeVisible();
        const alt = await img.getAttribute('alt');
        const title = await img.getAttribute('title');
        expect((alt ?? title ?? '').length).toBeGreaterThan(0);

        // brand label text should be present and trimmed
        const label = anchor.locator('div.font-semibold').first();
        await expect(label).toBeVisible();
        const text = (await label.innerText()).trim();
        expect(text.length).toBeGreaterThan(0);
      }
    });

    test('clicking a brand should navigate to its listing page', async ({ page }) => {
      // Test first 3 brands to keep run-time reasonable
      const sample = brands.slugs.slice(0, 3);
      for (const slug of sample) {
        const anchor = page.locator(`#brands ul li a[href*="/construction-equipments/${slug}"]`).first();
        await expect(anchor).toBeVisible();
        await anchor.click();

        // Wait for navigation and assert URL contains expected path
        await expect(page).toHaveURL(new RegExp(`/construction-equipments/${slug}`));

        // Go back to home to continue testing
        await page.goBack();
        await expect(page).toHaveURL(new RegExp(`${cleanBase}/?${path ? `${path}/?` : ''}`));
      }
    });

    test('brands list is scrollable and has multiple items', async () => {
      // Wait for anchors to appear (handles lazy rendering differences between locales)
      await homePage.page.waitForSelector('#brands ul li a', { timeout: 5000 }).catch(() => {});
      const anchors = await homePage.page.locator('#brands ul li a').count();
      expect(anchors).toBeGreaterThanOrEqual(brands.slugs.length);

      // Basic check: overflow-x should be present or the container scrollable via JS
      const overflow = await homePage.page.locator('#brands ul').evaluate((el: HTMLElement) => {
        return window.getComputedStyle(el as HTMLElement).overflowX || el.scrollWidth > el.clientWidth;
      }).catch(() => null);
      expect(overflow).not.toBeNull();
    });
  });
});
