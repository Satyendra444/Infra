import { type Locator, type Page, expect } from '@playwright/test';

export class NewsSection {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private getSection() {
        return this.page.locator('section').filter({ has: this.page.getByRole('heading', { name: 'Latest News', exact: false }) }).first();
    }

    getArticleCards(section: Locator) {
        return section.locator('ul > li');
    }

    async verifyLatestNewsSection(expectedData?: { sectionTitle?: string; tabButtonText?: string; footerLinkText?: string; footerLinkHref?: string; sampleArticles?: Array<any> }) {
        const section = this.page.locator('#main').locator('section').filter({ has: this.page.getByRole('heading', { name: expectedData?.sectionTitle || 'Latest News' }) }).first();
        // fallback: locate any section with heading text
        if (!(await section.count())) {
            const alt = this.page.getByRole('heading', { name: expectedData?.sectionTitle || 'Latest News' }).first();
            await expect(alt).toBeVisible();
        } else {
            await expect(section).toBeVisible();
        }

        const container = (await section.count()) ? section : this.page.getByRole('heading', { name: expectedData?.sectionTitle || 'Latest News' }).first().locator('..').first();

        // Tab button
        if (expectedData?.tabButtonText) {
            const tab = container.getByRole('tab', { name: expectedData.tabButtonText, exact: false }).first();
            await expect(tab).toBeVisible();
        }

        const items = container.locator('ul > li');
        await expect(items.first()).toBeVisible();

        if (expectedData?.sampleArticles && expectedData.sampleArticles.length > 0) {
            const toCheck = Math.min(3, expectedData.sampleArticles.length);
            for (let i = 0; i < toCheck; i++) {
                const expected = expectedData.sampleArticles[i];
                const article = items.nth(i);

                await expect(article).toBeVisible();

                // Image alt/title
                const img = article.locator('img').first();
                await expect(img).toBeVisible();
                const alt = await img.getAttribute('alt');
                const titleAttr = await img.getAttribute('title');
                if (expected.titleContains) {
                    expect((alt || titleAttr || '').includes(expected.titleContains)).toBeTruthy();
                }

                // Title link
                const titleLink = article.locator('a').first();
                await expect(titleLink).toBeVisible();
                const titleText = await titleLink.innerText();
                if (expected.titleContains) {
                    expect(titleText.includes(expected.titleContains)).toBeTruthy();
                }

                // Excerpt
                // Excerpt: prefer a non-anchor element that contains expected excerpt text
                if (expected.excerptContains) {
                    const excerptEl = article.locator(':scope :not(a)').filter({ hasText: expected.excerptContains }).first();
                    if ((await excerptEl.count()) === 0) {
                        // fallback: try the original selector and log what we find
                        const excerpt = article.locator('span.line-clamp-2').first();
                        const excerptText = (await excerpt.count()) ? await excerpt.innerText() : '';
                        expect(excerptText.includes(expected.excerptContains)).toBeTruthy();
                    } else {
                        await expect(excerptEl).toBeVisible();
                    }
                }

                // Author and date
                const meta = article.locator('div.text-xs').first();
                await expect(meta).toBeVisible();
                const metaText = (await meta.innerText()).trim();
                if (expected.author) expect(metaText).toContain(expected.author);
                if (expected.dateContains) expect(metaText).toContain(expected.dateContains);

                // Read time
                const readTime = article.locator('span.flex.items-center').first();
                await expect(readTime).toBeVisible();
                const readTimeText = await readTime.innerText();
                if (expected.readTime) expect(readTimeText).toContain(expected.readTime);

                // Clickable title navigates to expected href
                const linkHref = await titleLink.getAttribute('href');
                expect(linkHref && linkHref.endsWith(expected.href)).toBeTruthy();
            }
        }

        // Footer link
        if (expectedData?.footerLinkText) {
            const footer = container.locator(`a[aria-label*="footer link"]`).first();
            await expect(footer).toBeVisible();
            if (expectedData.footerLinkText) await expect(footer).toContainText(expectedData.footerLinkText);
            if (expectedData.footerLinkHref) await expect(footer).toHaveAttribute('href', expectedData.footerLinkHref);
        }
    }
}
