import { test, expect } from '@playwright/test';
import { LOCALES } from '../../utils/testData';
import { assertMeta, assertLink, assertHreflang } from '../../utils/assertions';

const BASE_URL = process.env.BASE_URL || 'https://www.91infra.com/';

LOCALES.forEach((locale) => {
    test.describe(`Home Page SEO Tests - ${locale.name} (${locale.path || 'Default'})`, () => {
        const cleanBaseUrl = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
        const fullUrl = locale.path ? `${cleanBaseUrl}/${locale.path}` : BASE_URL;

        test.beforeEach(async ({ page }) => {
            await page.goto(fullUrl);
        });

        test('should have correct Title and Description', async ({ page }) => {
            await expect(page).toHaveTitle(locale.seo.title);
            await assertMeta(page, 'description', locale.seo.description);
        });

        test('should have correct Open Graph tags', async ({ page }) => {
            await assertMeta(page, 'og:title', locale.seo.ogTitle);
            await assertMeta(page, 'og:description', locale.seo.ogDescription);
            await assertMeta(page, 'og:image', locale.seo.ogImage);
            await assertMeta(page, 'og:url', locale.seo.ogUrl);
            await assertMeta(page, 'og:type', locale.seo.ogType);
        });

        test('should have correct Twitter Card tags', async ({ page }) => {
            await assertMeta(page, 'twitter:title', locale.seo.twitterTitle);
            await assertMeta(page, 'twitter:description', locale.seo.twitterDescription);
            await assertMeta(page, 'twitter:image', locale.seo.twitterImage);
            await assertMeta(page, 'twitter:card', locale.seo.twitterCard);
        });

        test('should have correct Robots tag', async ({ page }) => {
            await assertMeta(page, 'robots', locale.seo.robots);
        });

        test('should have correct Canonical link', async ({ page }) => {
            await assertLink(page, 'canonical', locale.seo.canonical);
        });

        test('should have correct Hreflang links', async ({ page }) => {
            for (const { lang, href } of locale.seo.hreflangs) {
                await assertHreflang(page, lang, href);
            }
        });

        test('should have Shortcut Icon', async ({ page }) => {
            await assertLink(page, 'shortcut icon', '/infra_fav.webp');
        });
    });
});
