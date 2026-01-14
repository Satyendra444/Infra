import { Page, expect, Locator } from '@playwright/test';

export class PopularEquipment {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Locators - Internal helpers that require a section locator
    private getSection(tabText: string) {
        // Find the section that contains the specific tab button
        return this.page.locator('section').filter({
            has: this.page.getByRole('tab', { name: tabText, exact: false })
        }).filter({ visible: true }).first();
    }

    // Helper methods for card elements
    getEquipmentCards(section: Locator) {
        return section.locator('li.mb-2.rounded-xl');
    }

    getCardBrand(card: Locator): Locator {
        return card.locator('h3').first();
    }

    getCardModel(card: Locator): Locator {
        return card.locator('h3').nth(1);
    }

    getCardLink(card: Locator): Locator {
        return card.locator('a.font-semibold').first();
    }

    getCardImage(card: Locator): Locator {
        return card.locator('img');
    }

    getCardPrice(card: Locator): Locator {
        return card.locator('p.font-semibold').first();
    }

    getCardImageBadge(card: Locator): Locator {
        return card.locator('.shadow-md.flex.items-center.rounded-full');
    }

    getCardSpecs(card: Locator): Locator {
        return card.locator('ul.border-t li');
    }

    getCardCTAButton(card: Locator): Locator {
        return card.locator('button');
    }

    // Verification Methods
    async verifyPopularSection(expectedData: {
        sectionTitle: string;
        tabButtonText: string;
        ctaButtonText: string;
        footerLinkText: string;
        footerLinkHref: string;
        sampleCards: any[];
    }) {
        const section = this.getSection(expectedData.tabButtonText);
        await expect(section, `Section with tab "${expectedData.tabButtonText}" not found or visible`).toBeVisible();

        // Verify title
        const title = section.locator('h3').first();
        await expect(title).toHaveText(expectedData.sectionTitle);

        // Verify Tab
        const tab = section.locator('button[role="tab"]');
        await expect(tab).toBeVisible();
        await expect(tab).toHaveText(expectedData.tabButtonText);

        // Verify cards
        const cards = this.getEquipmentCards(section);

        // Wait for cards to be loaded (sometimes they load lazily)
        try {
            await cards.first().waitFor({ state: 'visible', timeout: 5000 });
        } catch (e) {
            // Silent catch, the assertion below will provide a better error message if cards are missing
        }

        const cardCount = await cards.count();
        expect(cardCount, `No cards found in section "${expectedData.sectionTitle}"`).toBeGreaterThanOrEqual(1);

        // Verify sample cards
        for (let i = 0; i < expectedData.sampleCards.length; i++) {
            const cardData = expectedData.sampleCards[i];
            const card = cards.nth(i);

            await expect(card).toBeVisible();

            // Brand & Model
            // In the HTML structure: <a> <h3>Brand</h3> <h3>Model</h3> </a>
            const brand = this.getCardBrand(card);
            const model = this.getCardModel(card);

            await expect(brand).toHaveText(cardData.brand);
            await expect(model).toHaveText(cardData.model);

            // Link
            const link = this.getCardLink(card);
            await expect(link).toHaveAttribute('href', cardData.href);

            // Price
            if (cardData.priceContains) {
                const price = this.getCardPrice(card);
                await expect(price).toContainText(cardData.priceContains);
            }

            // CTA
            const cta = this.getCardCTAButton(card);
            await expect(cta).toHaveText(expectedData.ctaButtonText);
        }

        // Footer Link
        const footer = section.locator('a[aria-label*="footer link"]');
        await expect(footer).toBeVisible();
        await expect(footer).toContainText(expectedData.footerLinkText);
        await expect(footer).toHaveAttribute('href', expectedData.footerLinkHref);
    }
}
