import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LOCALES } from '../utils/testData';

const BASE_URL = process.env.BASE_URL || 'https://www.91infra.com/';

LOCALES.forEach(({ path, name, comparePopular }) => {
    test.describe(`Compare Popular Section - ${name} (${path || 'Default'})`, () => {
        let homePage: HomePage;
        const cleanBaseUrl = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
        const fullUrl = path ? `${cleanBaseUrl}/${path}` : BASE_URL;

        test.beforeEach(async ({ page }) => {
            homePage = new HomePage(page);
            await page.goto(fullUrl);
        });

        test(`should display compare-popular section${comparePopular ? '' : ' (skipped: no test data provided)'} `, async ({ page }) => {
            if (!comparePopular) {
                test.skip();
                return;
            }

            // Verify the section and heading (delegated to page object)
            await homePage.verifyComparePopularSection(comparePopular);
        });

        test('should have the expected number of comparison items and first item CTA should navigate correctly', async ({ page }) => {
            if (!comparePopular || !comparePopular.items || comparePopular.items.length === 0) {
                test.skip();
                return;
            }

            const first = comparePopular.items[0];
            const container = page.locator('#compare-popular');
            await expect(container).toBeVisible();

            const items = container.locator('ul > li');
            await expect(items.first()).toBeVisible();
            const count = await items.count();
            expect(count).toBeGreaterThanOrEqual(comparePopular.items.length);

            // Verify CTA href and navigation for first item
            const firstItem = items.first();
            const cta = firstItem.locator('a', { hasText: first.ctaText }).first();
            await expect(cta).toBeVisible();
            const href = await cta.getAttribute('href');
            // href might be a path; ensure it ends with expected href
            expect(href && href.endsWith(first.href)).toBeTruthy();

            // Click and verify navigation goes to correct path
            await Promise.all([
                page.waitForNavigation(),
                cta.click()
            ]);

            const newPath = new URL(page.url()).pathname;
            expect(newPath.endsWith(first.href)).toBeTruthy();
        });
    });
});
