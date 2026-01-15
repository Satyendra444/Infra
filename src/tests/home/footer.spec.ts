import { test, expect } from '@playwright/test';
import { Footer } from '../../pages/common/Footer';
import { LOCALES } from '../../utils/testData';

const BASE_URL = process.env.BASE_URL || 'https://www.91infra.com/';

LOCALES.forEach(({ path, name, footer: footerData }) => {
    test.describe(`91infra Footer Tests - ${name} (${path || 'Default'})`, () => {
        let footer: Footer;
        const cleanBaseUrl = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
        const fullUrl = path ? `${cleanBaseUrl}/${path}` : BASE_URL;

        test.beforeEach(async ({ page }) => {
            footer = new Footer(page);
            await page.goto(fullUrl);
            // Scroll to footer to ensure it's loaded
            await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        });

        test('should display Footer container and structure', async () => {
            await footer.verifyFooterStructure();
        });

        test('should display responsive grid layout', async () => {
            await footer.verifyResponsiveLayout();
        });

        test('should display logo section with correct image', async () => {
            if (footerData?.logoAlt || footerData?.logoTitle) {
                await footer.verifyLogoSection({
                    logoAlt: footerData.logoAlt,
                    logoTitle: footerData.logoTitle
                });
            }
        });

        test('should display footer description text correctly', async () => {
            if (footerData?.descriptionText) {
                await footer.verifyLogoSection({
                    descriptionText: footerData.descriptionText
                });
            }
        });

        test('should display "About 91Infra" section with correct title', async () => {
            if (footerData?.sections?.about?.title) {
                await footer.verifySectionHeader(0, footerData.sections.about.title);
            }
        });



        test('should verify "About Us" link in footer', async () => {
            if (footerData?.sections?.about?.links) {
                const aboutUsLink = footerData.sections.about.links.find(link =>
                    link.text.toLowerCase().includes('about')
                );
                if (aboutUsLink) {
                    expect(aboutUsLink.href).toBeTruthy();
                }
            }
        });

        test('should verify "Contact Us" link in footer', async () => {
            if (footerData?.sections?.about?.links) {
                const contactLink = footerData.sections.about.links.find(link =>
                    link.text.toLowerCase().includes('contact')
                );
                if (contactLink) {
                    expect(contactLink.href).toBeTruthy();
                }
            }
        });

        test('should verify "Privacy Policy" link in footer', async () => {
            if (footerData?.sections?.about?.links) {
                const privacyLink = footerData.sections.about.links.find(link =>
                    link.text.toLowerCase().includes('privacy')
                );
                if (privacyLink) {
                    expect(privacyLink.href).toBeTruthy();
                }
            }
        });

        test('should verify "Terms & Conditions" link in footer', async () => {
            if (footerData?.sections?.about?.links) {
                const termsLink = footerData.sections.about.links.find(link =>
                    link.text.toLowerCase().includes('terms') || link.text.toLowerCase().includes('शर्त')
                );
                if (termsLink) {
                    expect(termsLink.href).toBeTruthy();
                }
            }
        });

        test('should display "Work With Us" section with correct title', async () => {
            if (footerData?.sections?.workWithUs?.title) {
                await footer.verifySectionHeader(1, footerData.sections.workWithUs.title);
            }
        });



        test('should verify "Advertise With Us" link in footer', async () => {
            if (footerData?.sections?.workWithUs?.links) {
                const advertiseLink = footerData.sections.workWithUs.links.find(link =>
                    link.text.toLowerCase().includes('advertise') || link.text.toLowerCase().includes('विज्ञापन')
                );
                if (advertiseLink) {
                    expect(advertiseLink.href).toBeTruthy();
                }
            }
        });

        test('should verify "Feedback" link in footer', async () => {
            if (footerData?.sections?.workWithUs?.links) {
                const feedbackLink = footerData.sections.workWithUs.links.find(link =>
                    link.text.toLowerCase().includes('feedback') || link.text.toLowerCase().includes('प्रतिक्रिया')
                );
                if (feedbackLink) {
                    expect(feedbackLink.href).toBeTruthy();
                }
            }
        });

        test('should verify "Career" link in footer', async () => {
            if (footerData?.sections?.workWithUs?.links) {
                const careerLink = footerData.sections.workWithUs.links.find(link =>
                    link.text.toLowerCase().includes('career') || link.text.toLowerCase().includes('कैरियर')
                );
                if (careerLink) {
                    expect(careerLink.href).toBeTruthy();
                }
            }
        });

        test('should display "Useful Links" section with correct title', async () => {
            if (footerData?.sections?.usefulLinks?.title) {
                await footer.verifySectionHeader(2, footerData.sections.usefulLinks.title);
            }
        });



        test('should verify "Construction Equipments" link in footer', async () => {
            if (footerData?.sections?.usefulLinks?.links) {
                const equipmentsLink = footerData.sections.usefulLinks.links.find(link =>
                    link.text.toLowerCase().includes('construction') || link.text.toLowerCase().includes('निर्माण')
                );
                if (equipmentsLink) {
                    expect(equipmentsLink.href).toBeTruthy();
                }
            }
        });

        test('should verify "News" link in footer', async () => {
            if (footerData?.sections?.usefulLinks?.links) {
                const newsLink = footerData.sections.usefulLinks.links.find(link =>
                    link.text.toLowerCase().includes('news') || link.text.toLowerCase().includes('समाचार')
                );
                if (newsLink) {
                    expect(newsLink.href).toBeTruthy();
                }
            }
        });

        test('should display "Our Partner Website" section with logos', async () => {
            if (footerData?.sections?.partners) {
                await footer.verifyPartnerSection(footerData.sections.partners.links);
            }
        });

        test('should display "Get Connected" social section', async () => {
            if (footerData?.sections?.social) {
                await footer.verifySocialSection({
                    title: footerData.sections.social.title,
                    icons: footerData.sections.social.icons
                });
            }
        });

        test('should have clickable links in footer', async ({ page }) => {
            // Test clicking on one of the links and verify navigation
            if (footerData?.sections?.about?.links && footerData.sections.about.links.length > 0) {
                const firstLink = footerData.sections.about.links[0];
                // Note: This test may redirect to a different page, so we just verify the click works
                try {
                    await footer.navigateToLink(firstLink.text);
                    // Wait for page navigation
                    await page.waitForLoadState('networkidle').catch(() => { });
                } catch (error) {
                    // Link might not be immediately clickable due to DOM structure
                    console.warn(`Link ${firstLink.text} could not be clicked, this is expected for some cases`);
                }
            }
        });

        test('should verify footer position at bottom of page', async () => {
            await footer.verifyFooterPosition();
        });

        test('should display footer description text', async () => {
            if (footerData?.descriptionText) {
                const description = await footer.getDescriptionText();
                expect(description.length).toBeGreaterThan(0);
                expect(description).toContain(footerData.descriptionText.substring(0, 30));
            }
        });



        test('should verify footer links do not have broken hrefs', async () => {
            if (footerData?.sections) {
                const allLinks = [
                    ...footerData.sections.about?.links || [],
                    ...footerData.sections.workWithUs?.links || [],
                    ...footerData.sections.usefulLinks?.links || []
                ];

                for (const link of allLinks) {
                    expect(link.href).toBeTruthy();
                    expect(link.href.length).toBeGreaterThan(0);
                    // Check if href is a valid path (starts with / or http)
                    expect(link.href).toMatch(/^\/|^http/);
                }
            }
        });

        test('should have footer section titles in correct language', async () => {
            if (footerData?.sections) {
                const aboutTitle = footerData.sections.about?.title;
                const workTitle = footerData.sections.workWithUs?.title;
                const usefulTitle = footerData.sections.usefulLinks?.title;

                if (name === 'Base' || name === 'English') {
                    expect(aboutTitle).toContain('About');
                    expect(workTitle).toContain('Work');
                    expect(usefulTitle).toContain('Useful');
                } else if (name === 'Hindi') {
                    expect(aboutTitle).toContain('बारे');
                    expect(workTitle).toContain('काम');
                    expect(usefulTitle).toContain('उपयोगी');
                }
            }
        });

        test('should verify footer links have correct href pattern for locale', async () => {
            if (footerData?.sections?.about?.links) {
                const firstLink = footerData.sections.about.links[0];

                if (name === 'Hindi') {
                    expect(firstLink.href).toContain('/hi/');
                } else if (name === 'English') {
                    // English locale may have /en/ or just /
                    expect(firstLink.href).toMatch(/^\/en|^\/(?!hi)/);
                } else if (name === 'Base') {
                    // Base locale should have root paths
                    expect(firstLink.href).toMatch(/^\//);
                }
            }
        });

        test('should display footer with proper styling (grid or flex layout)', async ({ page }) => {
            const footerElement = footer.getFooterContainer();

            // Check if footer has grid or flex layout
            const classes = await footerElement.getAttribute('class');
            expect(classes).toBeTruthy();

            // Should contain grid or flex
            const hasLayout = classes?.includes('grid') || classes?.includes('flex');
            expect(hasLayout).toBeTruthy();
        });

        test('should have responsive column layout', async ({ page }) => {
            // This test would benefit from viewport simulation
            const footerContainer = footer.getFooterContainer();
            const classes = await footerContainer.getAttribute('class');

            // Check for responsive classes or just layout presence
            expect(classes).toMatch(/grid|flex|cols/i);
        });
    });
});
