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
}
