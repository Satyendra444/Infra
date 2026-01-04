import { type Locator, type Page, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly popularSectionHeader: Locator;
  readonly popularTabs: Locator;
  readonly popularCards: Locator;
  readonly brandLinks: Locator;

  constructor(page: Page) {
    this.page = page;
    this.popularSectionHeader = page.getByRole('heading', { name: 'Most Popular Construction Equipment' });
    this.popularTabs = page.locator('nav[role="tablist"] button');
    this.popularCards = page.locator('section[role="tabpanel"] > ul > li');
    // Selecting brand links within the #brands container
    this.brandLinks = page.locator('#brands ul li a');
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async getSeoMetadata() {
    const title = await this.page.title();
    const metaDescription = await this.page.getAttribute('meta[name="description"]', 'content');
    const h1 = await this.page.locator('h1').first(); // Assuming there's only one h1
    // Some pages might use h2 or other tags as main heading if h1 is missing, but good SEO requires h1.
    // Based on snippet, I see h2/h3. I will check for h1 presence generally.
    
    return { title, metaDescription, h1 };
  }

  async verifyPopularSection() {
    await expect(this.popularSectionHeader).toBeVisible();
    await expect(this.popularCards.first()).toBeVisible();
  }

  async verifyBrandsSection() {
      // Logic to verify brands are visible
      await expect(this.brandLinks.first()).toBeVisible();
  }
}
