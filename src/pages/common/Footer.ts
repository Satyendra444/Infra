import { type Locator, type Page } from '@playwright/test';
import { assertVisible, assertContainText, assertHaveAttribute } from '../../utils/assertions';

export class Footer {
    readonly page: Page;
    private readonly footerContainer: Locator;

    constructor(page: Page) {
        this.page = page;
        // Find the footer area by looking for a container that has "About 91Infra" or its Hindi equivalent
        // and also contains the copyright text.
        this.footerContainer = page.locator('div, section').filter({
            has: page.locator('h3').filter({ hasText: /About 91Infra|91Infra के बारे में/ })
        }).filter({
            hasText: /© 20\d\d|All rights reserved/
        }).last();
    }

    /**
     * Get the footer container
     */
    public getFooterContainer(): Locator {
        return this.footerContainer;
    }

    /**
     * Verify footer logo section
     */
    async verifyLogoSection(expectedData?: { logoAlt?: string; logoTitle?: string; descriptionText?: string }) {
        const logoImg = this.getFooterContainer().locator('img[alt="91Infra"], img[src*="logo"]').first();
        await assertVisible(logoImg, 'footer logo image');

        // Verify attributes
        if (expectedData?.logoAlt) {
            await assertHaveAttribute(logoImg, 'alt', expectedData.logoAlt, 'footer logo alt text');
        }
        if (expectedData?.logoTitle) {
            await assertHaveAttribute(logoImg, 'title', expectedData.logoTitle, 'footer logo title');
        }

        // Verify description text
        if (expectedData?.descriptionText) {
            const descElement = this.getFooterContainer().locator('p').filter({ hasText: expectedData.descriptionText.substring(0, 20) }).first();
            await assertVisible(descElement, 'footer description');
            await assertContainText(descElement, expectedData.descriptionText.substring(0, 50), 'footer description text');
        }
    }

    /**
     * Verify footer section headers
     */
    async verifySectionHeader(sectionIndex: number, expectedTitle: string) {
        const sectionHeader = this.getFooterContainer().locator('h3').nth(sectionIndex);

        await assertVisible(sectionHeader, `footer section header ${sectionIndex}`);
        await assertContainText(sectionHeader, expectedTitle, `footer section title: ${expectedTitle}`);
    }

    /**
     * Verify "About 91Infra" section links
     */
    async verifyAboutSection(expectedLinks?: Array<{ text: string; href: string }>) {
        const sections = this.getFooterContainer().locator('div').filter({ has: this.page.locator('h3') });
        let aboutSection: Locator | null = null;

        const count = await sections.count();
        for (let i = 0; i < count; i++) {
            const header = sections.nth(i).locator('h3');
            const text = await header.innerText();
            if (text.includes('About') || text.includes('बारे')) {
                aboutSection = sections.nth(i);
                break;
            }
        }

        if (!aboutSection) {
            throw new Error('[AssertionError] About section not found');
        }

        await assertVisible(aboutSection, 'about section');

        if (expectedLinks && expectedLinks.length > 0) {
            for (const link of expectedLinks) {
                const linkElement = aboutSection.locator('a').filter({ hasText: link.text }).first();
                await assertVisible(linkElement, `about link: ${link.text}`);

                const href = await linkElement.getAttribute('href');
                if (href !== link.href) {
                    throw new Error(`[AssertionError] about link href mismatch | Text: ${link.text} | Expected: ${link.href} | Actual: ${href}`);
                }
            }
        }
    }

    /**
     * Verify "Work With Us" section links
     */
    async verifyWorkWithUsSection(expectedLinks?: Array<{ text: string; href: string }>) {
        const sections = this.getFooterContainer().locator('div').filter({ has: this.page.locator('h3') });
        let workSection: Locator | null = null;

        const count = await sections.count();
        for (let i = 0; i < count; i++) {
            const header = sections.nth(i).locator('h3');
            const text = await header.innerText();
            if (text.includes('Work') || text.includes('काम')) {
                workSection = sections.nth(i);
                break;
            }
        }

        if (!workSection) {
            throw new Error('[AssertionError] Work With Us section not found');
        }

        await assertVisible(workSection, 'work with us section');

        if (expectedLinks && expectedLinks.length > 0) {
            for (const link of expectedLinks) {
                const linkElement = workSection.locator('a').filter({ hasText: link.text }).first();
                await assertVisible(linkElement, `work with us link: ${link.text}`);

                const href = await linkElement.getAttribute('href');
                if (href !== link.href) {
                    throw new Error(`[AssertionError] work with us link href mismatch | Text: ${link.text} | Expected: ${link.href} | Actual: ${href}`);
                }
            }
        }
    }

    /**
     * Verify "Useful Links" section links
     */
    async verifyUsefulLinksSection(expectedLinks?: Array<{ text: string; href: string }>) {
        const sections = this.getFooterContainer().locator('div').filter({ has: this.page.locator('h3') });
        let usefulSection: Locator | null = null;

        const count = await sections.count();
        for (let i = 0; i < count; i++) {
            const header = sections.nth(i).locator('h3');
            const text = await header.innerText();
            if (text.includes('Useful') || text.includes('उपयोगी')) {
                usefulSection = sections.nth(i);
                break;
            }
        }

        if (!usefulSection) {
            throw new Error('[AssertionError] Useful Links section not found');
        }

        await assertVisible(usefulSection, 'useful links section');

        if (expectedLinks && expectedLinks.length > 0) {
            for (const link of expectedLinks) {
                const linkElement = usefulSection.locator('a').filter({ hasText: link.text }).first();
                await assertVisible(linkElement, `useful link: ${link.text}`);

                const href = await linkElement.getAttribute('href');
                if (href !== link.href) {
                    throw new Error(`[AssertionError] useful link href mismatch | Text: ${link.text} | Expected: ${link.href} | Actual: ${href}`);
                }
            }
        }
    }

    /**
     * Verify all footer sections are visible
     */
    async verifyFooterStructure() {
        const footer = this.getFooterContainer();
        await assertVisible(footer, 'footer container');

        // The footer has multiple sections including the logo/desc, about, work, useful, partner, etc.
        const sections = footer.locator('> div');
        const sectionCount = await sections.count();

        if (sectionCount < 2) { // Minimum requirement for the main sections to be present
            throw new Error(`[AssertionError] footer structure mismatch | Expected at least 2 top-level sections | Found: ${sectionCount}`);
        }
    }

    /**
     * Verify responsive grid layout
     */
    async verifyResponsiveLayout() {
        // Since we don't have a footer tag, we look for a container with grid or flex layout
        const footerGrid = this.getFooterContainer();
        const classes = await footerGrid.getAttribute('class');

        if (!classes || (!classes.includes('grid') && !classes.includes('flex'))) {
            throw new Error(`[AssertionError] footer should have responsive layout | Found classes: ${classes}`);
        }
    }

    /**
     * Verify footer link navigation
     */
    async navigateToLink(linkText: string) {
        const link = this.getFooterContainer().locator('a').filter({ hasText: linkText }).first();
        await assertVisible(link, `footer link: ${linkText}`);
        await link.click();
    }

    /**
     * Get footer description text
     */
    async getDescriptionText(): Promise<string> {
        const desc = this.getFooterContainer().locator('p').filter({ hasText: /91Infra is a rapidly growing|91इंफ्रा एक तेजी से बढ़ता/ }).first();
        return await desc.innerText();
    }

    /**
     * Verify footer is visible at bottom of page
     */
    async verifyFooterPosition() {
        const footer = this.getFooterContainer();
        await assertVisible(footer, 'footer area');
    }
}
