import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

const BASE_URL = process.env.BASE_URL || 'https://www.91infra.com/';

// Define the locales to test with expected data
const LOCALES = [
    {
        path: '',
        name: 'Base',
        expectedTitle: 'New Construction Equipment, Latest Construction Equipment News in India',
        expectedDesc: 'Thinking of buying a Construction Equipment? 91Infra helps you in researching with reviews, specifications, customer ratings all in one place.'
    },
    {
        path: 'en',
        name: 'English',
        expectedTitle: 'New Construction Equipment, Latest Construction Equipment News in India',
        expectedDesc: 'Thinking of buying a Construction Equipment? 91Infra helps you in researching with reviews, specifications, customer ratings all in one place.'
    },
    {
        path: 'hi',
        name: 'Hindi',
        expectedTitle: 'नए निर्माण उपकरण, भारत में नवीनतम वाणिज्यिक वाहन समाचार',
        expectedDesc: 'निर्माण उपकरण खरीदने की सोच रहे हैं? 91इन्फ्रा आपको एक ही स्थान पर समीक्षा, विशिष्टताओं, ग्राहक रेटिंग के साथ शोध करने में मदद करता है।'
    }
];

LOCALES.forEach(({ path, name, expectedTitle, expectedDesc }) => {
    test.describe(`91infra Home Page Tests - ${name} (${path || 'Default'})`, () => {
        let homePage: HomePage;
        // Construct the full URL, ensuring no double slashes if BASE_URL ends with /
        const cleanBaseUrl = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
        const fullUrl = path ? `${cleanBaseUrl}/${path}` : BASE_URL;

        test.beforeEach(async ({ page }) => {
            homePage = new HomePage(page);
        });

        test('should load home page with 200 status code', async ({ page }) => {
            console.log(`Testing URL: ${fullUrl}`);
            const response = await page.goto(fullUrl);
            expect(response?.status()).toBe(200);
        });

        test('should have correct SEO metadata', async ({ page }) => {
            await homePage.goto(fullUrl);
            const seo = await homePage.getSeoMetadata();

            console.log(`[${name}] SEO Metadata:`, seo);

            expect(seo.title).toBe(expectedTitle);
            expect(seo.metaDescription).toBe(expectedDesc);
        });

        test('should have valid LD+JSON schema', async ({ page }) => {
            await homePage.goto(fullUrl);
            const schema = await homePage.getSchema();
            expect(schema).not.toBeNull();
            expect(Array.isArray(schema)).toBe(true);

            const webPageEntity = schema.find((item: any) => item['@type'] === 'WebPage');
            expect(webPageEntity).toBeDefined();
            expect(webPageEntity.name).toBe(expectedTitle);
            expect(webPageEntity.description).toBe(expectedDesc);

            const orgEntity = schema.find((item: any) => item['@type'] === 'Organization');
            expect(orgEntity).toBeDefined();
            expect(orgEntity.name).toBe('91infra');
        });

        // test('should display Popular Construction Equipment section', async ({ page }) => {
        //     await homePage.goto(fullUrl);
        //     await homePage.verifyPopularSection();
        // });

        test('should display Brand links', async ({ page }) => {
            await homePage.goto(fullUrl);
            await homePage.verifyBrandsSection();
        });
    });
});
