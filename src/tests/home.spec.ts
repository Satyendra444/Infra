import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { Masthead } from '../pages/components/Masthead';
import { PopularEquipment } from '../pages/components/PopularEquipment';
import { LOCALES } from '../utils/testData';

const BASE_URL = process.env.BASE_URL || 'https://www.91infra.com/';

LOCALES.forEach(({ path, name, expectedTitle, expectedDesc, masthead: mastheadData, popularEquipment: popularEquipmentData }) => {
    test.describe(`91infra Home Page Tests - ${name} (${path || 'Default'})`, () => {
        let homePage: HomePage;
        let masthead: Masthead;
        let popularEquipment: PopularEquipment;
        const cleanBaseUrl = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
        const fullUrl = path ? `${cleanBaseUrl}/${path}` : BASE_URL;

        test.beforeEach(async ({ page }) => {
            homePage = new HomePage(page);
            masthead = new Masthead(page);
            popularEquipment = new PopularEquipment(page);
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

            // 1. Verify WebPage Entity
            const webPageEntity = schema.find((item: any) => item['@type'] === 'WebPage');
            expect(webPageEntity, 'WebPage schema missing').toBeDefined();
            expect(webPageEntity['@context']).toBe('https://schema.org');
            // The URL in the snippet was hardcoded to base, but logically might change.
            // For regression, we verify it exists and is valid string.
            expect(typeof webPageEntity.url).toBe('string');
            expect(webPageEntity.name).toBe(expectedTitle);
            expect(webPageEntity.description).toBe(expectedDesc);

            // Primary Image
            expect(webPageEntity.primaryImageOfPage).toBeDefined();
            expect(webPageEntity.primaryImageOfPage['@type']).toBe('ImageObject');
            expect(webPageEntity.primaryImageOfPage.url).toContain('91Infra-logo.png');

            // Publisher
            expect(webPageEntity.publisher).toBeDefined();
            expect(webPageEntity.publisher['@type']).toBe('Organization');
            expect(webPageEntity.publisher.name).toBe('91infra');

            // 2. Verify Organization Entity
            const orgEntity = schema.find((item: any) => item['@type'] === 'Organization');
            expect(orgEntity, 'Organization schema missing').toBeDefined();
            expect(orgEntity['@context']).toBe('https://schema.org');
            expect(orgEntity.name).toBe('91infra');
            // Allow org URL to match the configured BASE_URL hostname (supports dev vs prod)
            expect(typeof orgEntity.url).toBe('string');
            const orgHostname = new URL(orgEntity.url).hostname;
            const baseHostname = new URL(BASE_URL).hostname;
            const allowedOrgHosts = [baseHostname];
            if (baseHostname !== 'www.91infra.com') allowedOrgHosts.push('www.91infra.com');
            expect(allowedOrgHosts).toContain(orgHostname);
            expect(orgEntity.logo).toContain('91Infra-logo.png');

            // Contact Point
            expect(orgEntity.contactPoint).toBeDefined();
            expect(orgEntity.contactPoint['@type']).toBe('ContactPoint');
            expect(orgEntity.contactPoint.telephone).toBeDefined();
            expect(orgEntity.contactPoint.contactType).toBe('Customer service');

            // Same As
            expect(Array.isArray(orgEntity.sameAs)).toBe(true);
            expect(orgEntity.sameAs).toContain('https://www.facebook.com/91infra');
            expect(orgEntity.sameAs).toContain('https://www.instagram.com/91infra/');

            // 3. Verify WebSite Entity
            const webSiteEntity = schema.find((item: any) => item['@type'] === 'WebSite');
            expect(webSiteEntity, 'WebSite schema missing').toBeDefined();
            expect(webSiteEntity['@context']).toBe('https://schema.org/');
            expect(webSiteEntity.name).toBe('91infra');
            // Accept WebSite URL if hostname matches configured BASE_URL (or allow production host for dev)
            expect(typeof webSiteEntity.url).toBe('string');
            const siteHostname = new URL(webSiteEntity.url).hostname;
            const allowedSiteHosts = [new URL(BASE_URL).hostname];
            if (allowedSiteHosts[0] !== 'www.91infra.com') allowedSiteHosts.push('www.91infra.com');
            expect(allowedSiteHosts).toContain(siteHostname);

            // Potential Action (Search)
            expect(webSiteEntity.potentialAction).toBeDefined();
            expect(webSiteEntity.potentialAction['@type']).toBe('SearchAction');
            expect(webSiteEntity.potentialAction.target).toContain('search?q={search_term_string}');
            expect(webSiteEntity.potentialAction['query-input']).toBe('required name=search_term_string');
        });

        test('should display Brand links', async ({ page }) => {
            await homePage.goto(fullUrl);
            await homePage.verifyBrandsSection();
        });

        test('should display and verify masthead with brand selector', async ({ page }) => {
            await homePage.goto(fullUrl);
            await masthead.verifyMasthead(mastheadData);
        });

        test('should display and verify popular equipment section', async ({ page }) => {
            await homePage.goto(fullUrl);
            await popularEquipment.verifyPopularSection(popularEquipmentData);
        });
    });
});
