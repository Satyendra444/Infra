import { test, expect } from '@playwright/test';
import { LOCALES } from '../../utils/testData';
import { assertMeta, assertLink, assertHreflang } from '../../utils/assertions';

const BASE_URL = process.env.BASE_URL || 'https://www.91infra.com/';

LOCALES.forEach((locale) => {
    const { path, name, home } = locale;
    if (!home) return;
    const { seo } = home;

    test.describe(`Home Page SEO Tests - ${name} (${path || 'Default'})`, () => {
        const cleanBaseUrl = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
        const fullUrl = path ? `${cleanBaseUrl}/${path}` : BASE_URL;

        test.beforeEach(async ({ page }) => {
            await page.goto(fullUrl);
        });

        test('should have correct Title and Description', async ({ page }) => {
            await expect(page).toHaveTitle(seo.title);
            await assertMeta(page, 'description', seo.description);
        });

        test('should have correct Open Graph tags', async ({ page }) => {
            await assertMeta(page, 'og:title', seo.ogTitle);
            await assertMeta(page, 'og:description', seo.ogDescription);
            await assertMeta(page, 'og:image', seo.ogImage);
            await assertMeta(page, 'og:url', seo.ogUrl);
            await assertMeta(page, 'og:type', seo.ogType);
        });

        test('should have correct Twitter Card tags', async ({ page }) => {
            await assertMeta(page, 'twitter:title', seo.twitterTitle);
            await assertMeta(page, 'twitter:description', seo.twitterDescription);
            await assertMeta(page, 'twitter:image', seo.twitterImage);
            await assertMeta(page, 'twitter:card', seo.twitterCard);
        });

        test('should have correct Robots tag', async ({ page }) => {
            await assertMeta(page, 'robots', seo.robots);
        });

        test('should have correct Canonical link', async ({ page }) => {
            await assertLink(page, 'canonical', seo.canonical);
        });

        test('should have correct Hreflang links', async ({ page }) => {
            for (const { lang, href } of seo.hreflangs) {
                await assertHreflang(page, lang, href);
            }
        });

        test('should have Shortcut Icon', async ({ page }) => {
            await assertLink(page, 'shortcut icon', '/infra_fav.webp');
        });
    });
});
