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

        test('should perform global search and redirect', async ({ page }) => {
            // Only run this test if we can predict the outcome, e.g., on Base/English
            if (name === 'Base' || name === 'English') {
                await header.searchFor('ace', 'ACE LC 85');
                await expect(page).toHaveURL(/.*\/construction-equipments\/ace/);
                //construction-equipments/ace
            }
        });

        test('should switch language and update URL', async ({ page }) => {
            // Test flow: Base/English -> Hindi -> English
            if (name === 'Base') {
                // Provide explicit expected text because "English" -> "Hindi"
                await header.switchLanguage('English', 'Hindi');
                await expect(page).toHaveURL(/.*\/hi/);

                // Go back to English from Hindi page
                // Note: on /hi page, the current lang is Hindi
                // Re-initializing header or just using existing methods logic needs care
                // The header element is effectively the same, just text changes
                await header.switchLanguage('Hindi', 'English');
                await expect(page).toHaveURL(/^https:\/\/www\.91infra\.com\/$/);
            }
        });

        test('should display and verify navigation menu items', async () => {
            if (headerData.navItems) {
                await header.verifyNavigationItems(headerData.navItems);
            }
        });

        test('should select location', async () => {
            if (name === 'Base' || name === 'English') {
                await header.selectLocation('delhi', 'New Delhi G.P.O. - New Delhi,');
            }
        });
    });
});
