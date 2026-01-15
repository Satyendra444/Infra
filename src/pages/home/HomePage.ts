import { type Locator, type Page, expect } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly popularSectionHeader: Locator;
    readonly popularTabs: Locator;
    readonly popularCards: Locator;
    readonly brandLinks: Locator;

    constructor(page: Page) {
        this.page = page;
        this.popularSectionHeader = page.getByRole('heading', { name: 'Most Popular Construction Equipment' });
        this.popularTabs = page.locator('nav[role="tablist"] button');
        this.popularCards = page.locator('section[role="tabpanel"] > ul > li');
        this.brandLinks = page.locator('#brands ul li a');
    }

    async goto(url: string) {
        await this.page.goto(url);
    }

    async getSeoMetadata() {
        const title = await this.page.title();
        const metaDescription = await this.page.getAttribute('meta[name="description"]', 'content');
        const h1 = await this.page.locator('h1').first();

        return { title, metaDescription, h1 };
    }

    async getSchema() {
        const schemaScript = this.page.locator('script[type="application/ld+json"]');
        const schemaText = await schemaScript.textContent();
        if (schemaText) {
            return JSON.parse(schemaText);
        }
        return null;
    }

    async verifyPopularSection() {
        await expect(this.popularSectionHeader).toBeVisible();
        await expect(this.popularCards.first()).toBeVisible();
    }

    async verifyComparePopularSection(compareData?: { sectionTitle?: string, items?: Array<any> }) {
        const container = this.page.locator('#compare-popular');
        await expect(container).toBeVisible();

        if (compareData?.sectionTitle) {
            const heading = container.locator('h3').first();
            await expect(heading).toBeVisible();
            await expect(heading).toHaveText(compareData.sectionTitle);
        }

        const items = container.locator('ul > li');
        await expect(items.first()).toBeVisible();

        if (compareData?.items && compareData.items.length > 0) {
            const toCheck = Math.min(3, compareData.items.length);
            for (let i = 0; i < toCheck; i++) {
                const expected = compareData.items[i];
                const item = items.nth(i);

                const cta = item.locator('a', { hasText: expected.ctaText }).first();
                await expect(cta).toBeVisible();
                const href = await cta.getAttribute('href');
                expect(href && href.endsWith(expected.href)).toBeTruthy();

                const productWrappers = item.locator('div.flex > div');
                await expect(productWrappers.first(), 'left product wrapper exists').toBeVisible();
                await expect(productWrappers.nth(1), 'right product wrapper exists').toBeVisible();

                const leftWrapper = productWrappers.first();
                const rightWrapper = productWrappers.nth(1);

                const leftAnchor = leftWrapper.locator('a').first();
                await expect(leftAnchor, 'left anchor visible').toBeVisible();
                const leftBrand = leftAnchor.locator('div.font-semibold h3').first();
                const leftModel = leftAnchor.locator('div.font-semibold h3').nth(1);
                const leftPrice = leftAnchor.locator('div.text-sm.font-bold').first();
                if (expected.left?.brand) {
                    await expect(leftBrand).toContainText(expected.left.brand, { timeout: 3000 });
                }
                if (expected.left?.model) {
                    await expect(leftModel).toContainText(expected.left.model, { timeout: 3000 });
                }
                if (expected.left?.priceContains) {
                    await expect(leftPrice).toContainText(expected.left.priceContains, { timeout: 3000 });
                }

                const rightAnchor = rightWrapper.locator('a').first();
                await expect(rightAnchor, 'right anchor visible').toBeVisible();
                const rightBrand = rightAnchor.locator('div.font-semibold h3').first();
                const rightModel = rightAnchor.locator('div.font-semibold h3').nth(1);
                const rightPrice = rightAnchor.locator('div.text-sm.font-bold').first();
                if (expected.right?.brand) {
                    await expect(rightBrand).toContainText(expected.right.brand, { timeout: 3000 });
                }
                if (expected.right?.model) {
                    await expect(rightModel).toContainText(expected.right.model, { timeout: 3000 });
                }
                if (expected.right?.priceContains) {
                    await expect(rightPrice).toContainText(expected.right.priceContains, { timeout: 3000 });
                }
            }
        }
    }

    async verifyBrandsSection(expectedHeading?: string, expectedBrandSlugs?: string[]) {
        const brandsContainer = this.page.locator('#brands');
        if (expectedHeading) {
            const heading = brandsContainer.locator('h2').first();
            await expect(heading).toBeVisible();
            await expect(heading).toHaveText(expectedHeading);
        }

        await expect(this.brandLinks.first()).toBeVisible();

        if (expectedBrandSlugs && expectedBrandSlugs.length > 0) {
            for (const slug of expectedBrandSlugs) {
                const sel = `#brands ul li a[href*="/construction-equipments/${slug}"]`;
                const anchor = this.page.locator(sel).first();
                await expect(anchor, `brand link for ${slug}`).toBeVisible();

                const img = anchor.locator('img').first();
                await expect(img).toBeVisible();

                const label = anchor.locator('div.font-semibold').first();
                await expect(label).toBeVisible();
                const labelText = (await label.innerText()).trim();
                expect(labelText.length).toBeGreaterThan(0);
            }
        }
    }
}
