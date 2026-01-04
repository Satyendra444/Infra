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

    async verifyNavigationItems(navItems: any[]) {
        for (const item of navItems) {
            console.log(`Verifying Main Item: ${item.text}`);

            // Found the main item. Use getByText but match carefully around the text.
            // Since the text in the DOM might have whitespace, we can use exact: false (default).
            // But to be more specific inside the header, we can scope it.
            const headerNav = this.page.locator('ul.hidden.lg\\:flex');

            // Note: The structure in the snippet shows:
            // Link: <a ...> Text<svg></a>
            // Span: <span ...> Text<svg></span>

            let mainItem;
            if (item.href) {
                // If expected href is present, use it for more robust location (avoids encoding issues with text)
                // Need to match exactly inside the nav container
                mainItem = headerNav.locator(`a[href="${item.href}"]`).first();
            } else {
                // Fallback to text for spans or items without specific href
                mainItem = headerNav.getByText(item.text).first();
            }

            await expect(mainItem).toBeVisible();

            if (item.type === 'link' && item.href) {
                // Verification of href is already implicitly done if we found it by href, but explicit check doesn't hurt.
                await expect(mainItem).toHaveAttribute('href', item.href);
            }

            if (item.subItems && item.subItems.length > 0) {
                // Hover to open dropdown
                console.log(`  Verifying Sub-items for: ${item.text}`);
                await mainItem.hover();

                // Wait for dropdown to become visible by waiting for first sub-item
                const firstSub = item.subItems[0];
                let firstSubItem;
                if (firstSub.href) {
                    firstSubItem = headerNav.locator(`a[href="${firstSub.href}"]`).first();
                } else {
                    firstSubItem = headerNav.getByRole('link', { name: firstSub.text }).first();
                }
                await firstSubItem.waitFor({ state: 'visible', timeout: 3000 });

                for (const sub of item.subItems) {
                    console.log(`    Checking sub-item: ${sub.text}`);
                    // Sub-items are links in the dropdown
                    // Use href for more reliable location, especially for non-ASCII text
                    let subItem;
                    if (sub.href) {
                        subItem = headerNav.locator(`a[href="${sub.href}"]`).first();
                    } else {
                        subItem = headerNav.getByRole('link', { name: sub.text }).first();
                    }

                    await expect(subItem).toBeVisible();
                    if (sub.href) {
                        await expect(subItem).toHaveAttribute('href', sub.href);
                    }
                }

                // Move mouse away to close dropdown before next item
                await this.page.mouse.move(0, 0);
                await this.page.waitForTimeout(200);
            }
        }
    }
}
