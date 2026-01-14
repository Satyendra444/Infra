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
        // Selecting brand links within the #brands container
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
        // Locate the script tag containing the schema
        const schemaScript = this.page.locator('script[type="application/ld+json"]');
        // Function to retrieve text content and parse it
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

    async verifyBrandsSection(expectedHeading?: string, expectedBrandSlugs?: string[]) {
        // Verify heading if provided
        const brandsContainer = this.page.locator('#brands');
        if (expectedHeading) {
            const heading = brandsContainer.locator('h2').first();
            await expect(heading).toBeVisible();
            await expect(heading).toHaveText(expectedHeading);
        }

        // Ensure there is at least one brand link
        await expect(this.brandLinks.first()).toBeVisible();

        if (expectedBrandSlugs && expectedBrandSlugs.length > 0) {
            for (const slug of expectedBrandSlugs) {
                // Accept anchors where href contains the brand path with or without locale prefix
                const sel = `#brands ul li a[href*="/construction-equipments/${slug}"]`;
                const anchor = this.page.locator(sel).first();
                await expect(anchor, `brand link for ${slug}`).toBeVisible();

                // Inside anchor, there should be an image with alt/title containing the brand name (case-insensitive)
                const img = anchor.locator('img').first();
                await expect(img).toBeVisible();

                // And a label div with the brand name text
                const label = anchor.locator('div.font-semibold').first();
                await expect(label).toBeVisible();
                const labelText = (await label.innerText()).trim();
                expect(labelText.length).toBeGreaterThan(0);
            }
        }
    }
}
