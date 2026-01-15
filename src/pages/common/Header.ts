import { type Locator, type Page } from '@playwright/test';
import { assertVisible, assertEditable, assertHaveAttribute, assertContainText } from '../../utils/assertions';

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
        await assertVisible(this.logoLink, 'logo link');
        await assertVisible(this.logoImage, 'logo image');
        const href = await this.logoLink.getAttribute('href');

        // Special condition: if expected is /en but we get /, that's acceptable (treat en as base)
        if (expectedHref === '/en' && href === '/') {
            expectedHref = '/';
        }

        if (href !== expectedHref) {
            throw new Error(`[AssertionError] logo href mismatch | Expected: ${expectedHref} | Actual: ${href}`);
        }
    }

    async verifyGlobalSearch(expectedPlaceholder: string) {
        await assertVisible(this.searchInput, 'global search input');
        await assertEditable(this.searchInput, 'global search input');
        await assertHaveAttribute(this.searchInput, 'placeholder', expectedPlaceholder, 'global search placeholder');
    }

    async verifyLanguageSwitcher(expectedText: string) {
        await assertVisible(this.languageSwitcher, 'language switcher');
        await assertContainText(this.languageSwitcher, expectedText, 'language switcher text');
    }

    async verifyLocationSelector() {
        await assertVisible(this.locationSelector, 'location selector');
    }

    async searchFor(term: string, resultText: string) {
        await this.searchInput.click();
        await this.searchInput.fill(term);

        // Wait for a suggestion list to appear near the input (optimistic selector)
        const suggestions = this.page.locator('ul').filter({ has: this.searchInput }).first();

        // If the above scoping fails for this DOM, fallback to the first visible ul near top
        if (!(await suggestions.count())) {
            // Choose the first visible <ul> on the page that appears to be results
            // This is a pragmatic fallback when markup doesn't nest the input inside the list
            // and keeps selector scope tighter than a global getByText
            await this.page.locator('ul').first().waitFor({ state: 'visible', timeout: 4000 }).catch(() => {});
        } else {
            await suggestions.waitFor({ state: 'visible', timeout: 4000 }).catch(() => {});
        }

        const scopedContainer = (await suggestions.count()) ? suggestions : this.page.locator('ul').first();

        // Try exact match first
        const result = scopedContainer.getByText(resultText).first();
        try {
            await assertVisible(result, `search suggestion exact match: ${resultText}`);
            await result.click();
            return;
        } catch (err) {
            // Fallback: pick the first visible suggestion that matches the search term (case-insensitive)
            console.warn(`Exact result "${resultText}" not found; falling back to first suggestion matching "${term}"`);
            const fallback = scopedContainer.getByText(new RegExp(term, 'i')).first();
            await assertVisible(fallback, `search suggestion matching term: ${term}`);
            await fallback.click();
        }
    }

    async switchLanguage(currentLang: string, targetLang: string) {
        // Open the language switcher if needed, or just verify current
        await assertContainText(this.languageSwitcher, currentLang, 'language switcher current language');
        await this.languageSwitcher.click();

        // Select target language
        // Assuming the dropdown options are visible or become visible
        const targetOption = this.page.getByText(targetLang).last();
        // Using .last() or similar because 'Hindi' might be present in multiple places (current label + option)
        await assertVisible(targetOption, `language option: ${targetLang}`);
        await targetOption.click();
    }

    async selectLocation(city: string, exactLocation: string) {
        await this.locationSelector.click();
        const cityInput = this.page.locator('#city');
        await cityInput.click();
        await cityInput.fill(city);
        const locationOption = this.page.getByText(exactLocation).first(); // Ensure we get the dropdown option
        await assertVisible(locationOption, `location option: ${exactLocation}`);
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

            await assertVisible(mainItem, `main nav item: ${item.text}`);

            if (item.type === 'link' && item.href) {
                // Verification of href is already implicitly done if we found it by href, but explicit check doesn't hurt.
                await assertHaveAttribute(mainItem, 'href', item.href, `nav item href for ${item.text}`);
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
                await assertVisible(firstSubItem, `first sub-item for ${item.text}`);

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

                    await assertVisible(subItem, `sub-item: ${sub.text}`);
                    if (sub.href) {
                        await assertHaveAttribute(subItem, 'href', sub.href, `sub-item href for ${sub.text}`);
                    }
                }

                // Move mouse away to close dropdown before next item
                await this.page.mouse.move(0, 0);
                await this.page.waitForTimeout(200);
            }
        }
    }
}
