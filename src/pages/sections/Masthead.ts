import { Page, expect } from '@playwright/test';

export class Masthead {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Locators
    get bannerImage() {
        return this.page.locator('img[alt="banner"]');
    }

    get selectorCard() {
        // The card is inside a container and has specific classes
        return this.page.locator('.container .bg-white.rounded-lg').first();
    }

    get cardTitle() {
        return this.selectorCard.locator('h2');
    }

    get categoryButton() {
        return this.selectorCard.locator('button.border-primary');
    }

    get brandInput() {
        return this.selectorCard.locator('input[type="text"]');
    }

    get searchButton() {
        return this.selectorCard.locator('button:has-text("Search"), button:has-text("खोजें")');
    }

    // Verification Methods
    async verifyMasthead(expectedData: {
        cardTitle: string;
        categoryButtonText: string;
        brandPlaceholder: string;
        searchButtonText: string;
    }) {
        // Verify banner image is visible
        await expect(this.bannerImage).toBeVisible();

        // Verify selector card is visible (desktop only)
        await expect(this.selectorCard).toBeVisible();

        // Verify card title
        await expect(this.cardTitle).toHaveText(expectedData.cardTitle);

        // Verify category button
        await expect(this.categoryButton).toBeVisible();
        await expect(this.categoryButton).toHaveText(expectedData.categoryButtonText);

        // Verify brand input placeholder
        await expect(this.brandInput).toBeVisible();
        await expect(this.brandInput).toHaveAttribute('placeholder', expectedData.brandPlaceholder);

        // Verify search button
        await expect(this.searchButton).toBeVisible();
        await expect(this.searchButton).toHaveText(expectedData.searchButtonText);

        // Verify search button is disabled initially
        await expect(this.searchButton).toBeDisabled();
    }
}
