import { test, expect } from '@playwright/test';
import { NewsSection } from '../../pages/sections/NewsSection';
import { LOCALES } from '../../utils/testData';

const BASE_URL = process.env.BASE_URL || 'https://www.91infra.com/';

LOCALES.filter(l => ['Base', 'English', 'Hindi'].includes(l.name)).forEach(({ path, name, latestNews }) => {
    test.describe(`Latest News - ${name} (${path || 'Default'})`, () => {
        let news: NewsSection;
        const cleanBaseUrl = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
        const fullUrl = path ? `${cleanBaseUrl}/${path}` : BASE_URL;

        test.beforeEach(async ({ page }) => {
            news = new NewsSection(page);
            await page.goto(fullUrl);
        });

        test('should display Latest News section and heading', async ({ page }) => {
            if (!latestNews) {
                test.skip();
                return;
            }
            await news.verifyLatestNewsSection({ sectionTitle: latestNews.sectionTitle, tabButtonText: latestNews.tabButtonText });
        });

        test('first article title should navigate to correct article page', async ({ page }) => {
            if (!latestNews || !latestNews.sampleArticles || latestNews.sampleArticles.length === 0) {
                test.skip();
                return;
            }

            const first = latestNews.sampleArticles[0];
            const section = page.getByRole('heading', { name: latestNews.sectionTitle, exact: false }).first().locator('..').first();
            const firstArticle = section.locator('ul > li').first();
            const titleLink = firstArticle.locator('a').first();
            await expect(titleLink).toBeVisible();

            const href = await titleLink.getAttribute('href');
            expect(href && href.endsWith(first.href)).toBeTruthy();

            await Promise.all([
                page.waitForNavigation(),
                titleLink.click()
            ]);

            const newPath = new URL(page.url()).pathname;
            expect(newPath.endsWith(first.href)).toBeTruthy();
        });

        test('footer link should be visible and navigate', async ({ page }) => {
            if (!latestNews) {
                test.skip();
                return;
            }

            const section = page.getByRole('heading', { name: latestNews.sectionTitle, exact: false }).first().locator('..').first();
            const footer = section.locator('a[aria-label*="footer link"]').first();
            await expect(footer).toBeVisible();
            await expect(footer).toHaveText(latestNews.footerLinkText);
            await expect(footer).toHaveAttribute('href', latestNews.footerLinkHref);

            await Promise.all([
                page.waitForNavigation(),
                footer.click()
            ]);

            const newPath = new URL(page.url()).pathname;
            expect(newPath.endsWith(latestNews.footerLinkHref)).toBeTruthy();
        });
    });
});
