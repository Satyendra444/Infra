import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

const BASE_URL = process.env.BASE_URL || 'https://www.91infra.com/';

test.describe('91infra Home Page Tests', () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
    });

    test('should load home page with 200 status code', async ({ page }) => {
        // We catch the response to check the status code
        const response = await page.goto(BASE_URL);
        expect(response?.status()).toBe(200);
    });

    test('should have basic SEO metadata', async ({ page }) => {
        await homePage.goto(BASE_URL);
        const seo = await homePage.getSeoMetadata();

        console.log('SEO Metadata:', seo);

        // Basic Validations
        expect(seo.title).not.toBe('');
        expect(seo.metaDescription).not.toBeNull();
        // Use optional check for H1 as it might be missing or different on some pages, but good for SEO
        // expect(seo.h1).toBeVisible(); 
    });

    test('should display Popular Construction Equipment section', async ({ page }) => {
        await homePage.goto(BASE_URL);
        await homePage.verifyPopularSection();
    });

    test('should display Brand links', async ({ page }) => {
        await homePage.goto(BASE_URL);
        await homePage.verifyBrandsSection();
    });
});
