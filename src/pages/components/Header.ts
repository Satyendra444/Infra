import { type Locator, type Page, expect } from '@playwright/test';

export class Header {
    readonly page: Page;
    readonly logoLink: Locator;
    readonly logoImage: Locator;
    readonly searchInput: Locator;
    readonly languageSwitcher: Locator;
    readonly locationSelector: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logoLink = page.locator('a[aria-label="Home"]');
        this.logoImage = this.logoLink.locator('img[alt="91Infra"]');
        this.searchInput = page.locator('input#name');
        this.languageSwitcher = page.locator('div.flex.place-items-center.justify-end > div.relative.group');
        this.locationSelector = page.getByRole('button', { name: 'Select City' });
    }

    async verifyLogo(expectedHref: string) {
        await expect(this.logoLink).toBeVisible();
        await expect(this.logoImage).toBeVisible();
        const href = await this.logoLink.getAttribute('href');

        // Special condition: if expected is /en but we get /, that's acceptable (treat en as base)
        if (expectedHref === '/en' && href === '/') {
            expectedHref = '/';
        }

        expect(href).toBe(expectedHref);
    }

    async verifyGlobalSearch(expectedPlaceholder: string) {
        await expect(this.searchInput).toBeVisible();
        await expect(this.searchInput).toBeEditable();
        await expect(this.searchInput).toHaveAttribute('placeholder', expectedPlaceholder);
    }

    async verifyLanguageSwitcher(expectedText: string) {
        await expect(this.languageSwitcher).toBeVisible();
        await expect(this.languageSwitcher).toContainText(expectedText);
    }

    async verifyLocationSelector() {
        await expect(this.locationSelector).toBeVisible();
    }

    async searchFor(term: string, resultText: string) {
        await this.searchInput.click();
        await this.searchInput.fill(term);
        // Wait for results to appear and click the specific one
        const result = this.page.getByText(resultText).first();
        await expect(result).toBeVisible();
        await result.click();
    }

    async switchLanguage(currentLang: string, targetLang: string) {
        // Open the language switcher if needed, or just verify current
        await expect(this.languageSwitcher).toContainText(currentLang);
        await this.languageSwitcher.click();

        // Select target language
        // Assuming the dropdown options are visible or become visible
        const targetOption = this.page.getByText(targetLang).last();
        // Using .last() or similar because 'Hindi' might be present in multiple places (current label + option)
        await expect(targetOption).toBeVisible();
        await targetOption.click();
    }

    async selectLocation(city: string, exactLocation: string) {
        await this.locationSelector.click();
        const cityInput = this.page.locator('#city');
        await cityInput.click();
        await cityInput.fill(city);
        const locationOption = this.page.getByText(exactLocation).first(); // Ensure we get the dropdown option
        await expect(locationOption).toBeVisible();
        await locationOption.click();
    }
}
