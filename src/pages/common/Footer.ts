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
        const h3 = this.getFooterContainer().locator('h3').filter({ hasText: /About|बारे/ }).first();

        if (!await h3.isVisible()) {
            throw new Error('[AssertionError] About section header not found');
        }

        const aboutSection = h3.locator('xpath=..');
        await assertVisible(aboutSection, 'about section container');

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
        const h3 = this.getFooterContainer().locator('h3').filter({ hasText: /Work|काम/ }).first();

        if (!await h3.isVisible()) {
            throw new Error('[AssertionError] Work With Us section header not found');
        }

        const workSection = h3.locator('xpath=..');
        await assertVisible(workSection, 'work with us section container');

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
        const h3 = this.getFooterContainer().locator('h3').filter({ hasText: /Useful|उपयोगी/ }).first();

        if (!await h3.isVisible()) {
            throw new Error('[AssertionError] Useful Links section header not found');
        }

        const usefulSection = h3.locator('xpath=..');
        await assertVisible(usefulSection, 'useful links section container');

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

        // Check if we have at least 3 h3 headers (About, Work, Useful)
        const h3s = footer.locator('h3');
        const count = await h3s.count();

        if (count < 3) {
            throw new Error(`[AssertionError] footer structure mismatch | Expected at least 3 headers | Found: ${count}`);
        }
    }

    /**
     * Verify responsive grid layout
     */
    async verifyResponsiveLayout() {
        // Look for a grid or flex container that houses the sections
        const footerGrid = this.getFooterContainer().locator('div').filter({ has: this.page.locator('h3') }).first();
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
     * Verify "Our Partner Website" section
     */
    /**
     * Verify "Our Partner Website" section
     */
    async verifyPartnerSection(expectedPartners?: Array<{ alt: string; logoSrc: string }>) {
        const container = this.getFooterContainer();
        const h3 = container.locator('h3').filter({ hasText: /Partner|साझेदार/i }).first();

        await assertVisible(h3, 'partner section header');

        if (expectedPartners && expectedPartners.length > 0) {
            for (const partner of expectedPartners) {
                // Find logo by alt text containing the brand name
                const brandName = partner.alt.split('.')[0];
                const logo = container.locator(`img[alt*="${brandName}" i]`).first();
                await assertVisible(logo, `partner logo: ${partner.alt}`);
                await assertHaveAttribute(logo, 'src', new RegExp(partner.logoSrc), `partner logo src: ${partner.alt}`);
            }
        }
    }

    /**
     * Verify "Get Connected" social section
     */
    async verifySocialSection(expectedSocial?: { title: string; icons: string[] }) {
        const container = this.getFooterContainer();
        const h3 = container.locator('h3').filter({ hasText: /Connected|जुड़ें/i }).first();

        await assertVisible(h3, 'social section header');

        if (expectedSocial?.title) {
            await assertContainText(h3, expectedSocial.title, 'social section title');
        }

        if (expectedSocial?.icons) {
            for (const icon of expectedSocial.icons) {
                // Find the SVG that contains the specific icon path
                // We use a broader CSS selector that handles potential namespacing
                const svgIcon = container.locator('svg').filter({
                    has: this.page.locator(`use[href*="${icon}"], use[*|href*="${icon}"]`)
                }).first();

                await assertVisible(svgIcon, `social icon: ${icon}`);

                // Also check if the 'use' tag itself is visible (some browsers/playwright versions)
                const useTag = svgIcon.locator('use').first();
                if (await useTag.count() > 0) {
                    await assertVisible(useTag, `social icon link: ${icon}`);
                }
            }
        }
    }

    /**
     * Verify footer is visible at bottom of page
     */
    async verifyFooterPosition() {
        const footer = this.getFooterContainer();
        await assertVisible(footer, 'footer area');
    }
}
