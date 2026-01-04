import { test, expect } from '@playwright/test';
import { Header } from '../pages/components/Header';
import { LOCALES } from '../utils/testData';

const BASE_URL = process.env.BASE_URL || 'https://www.91infra.com/';

LOCALES.forEach(({ path, name, header: headerData }) => {
    test.describe(`91infra Header Tests - ${name} (${path || 'Default'})`, () => {
        let header: Header;
        const cleanBaseUrl = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
        const fullUrl = path ? `${cleanBaseUrl}/${path}` : BASE_URL;

        test.beforeEach(async ({ page }) => {
            header = new Header(page);
            await page.goto(fullUrl);
        });

        test('should display Logo correctly', async () => {
            await header.verifyLogo(headerData.logoHref);
        });

        test('should display Global Search input with correct placeholder', async () => {
            await header.verifyGlobalSearch(headerData.searchPlaceholder);
        });

        test('should display Language Switcher with correct text', async () => {
            await header.verifyLanguageSwitcher(headerData.langText);
        });

        test('should display Location Selector', async () => {
            await header.verifyLocationSelector();
        });
    });
});
