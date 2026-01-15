# 91Infra Test Suite 🚧

A Playwright-based end-to-end test suite for the 91Infra website. This repository contains tests, page objects, utilities, custom reporters, and test results for automated UI validation.

---

## 🚀 Quick Start

Prerequisites:
- Node.js 16+ (recommended)
- npm or yarn

Install dependencies:

```bash
npm install
# or
# yarn
```

Run the full test suite (Chromium is configured by default):

```bash
npm test
# or
npx playwright test --project=chromium
```

Run against the dev environment using the convenience npm script:

```bash
npm run test:dev
```

Run a single test file (uses baseURL from config):

```bash
npx playwright test src/tests/header.spec.ts --project=chromium
```

Open the HTML report after a run:

```bash
npm run test:report
# or
npx playwright show-report
```

Environment note: the tests use `baseURL` from `playwright.config.ts`, which falls back to production by default. To override the URL manually, set the `BASE_URL` environment variable:

Windows (PowerShell):

```powershell
$env:BASE_URL = 'https://dev.91infra.com/'; npm test
```

macOS / Linux:

```bash
BASE_URL=https://dev.91infra.com/ npm test
```

---

## 📁 Project structure (what's in each file)

Top-level files:

- `package.json` — npm scripts and devDependencies. Use `npm test` or `npx playwright test` to run tests.
- `playwright.config.ts` — Playwright configuration (projects, reporter). This project registers the HTML reporter and the custom reporter at `./src/reporters/verbose-failure-reporter.ts`.
- `playwright-report/` — generated HTML report artifacts when you run tests.
- `test-results/` — per-test run artifacts (screenshots, error contexts) captured by Playwright.

Source files:

- `src/tests/` — test files (all parameterized across `Base`, `English`, and `Hindi` locales):
  - `header.spec.ts` — header-related UI tests (logo, global search, language switch, location selector, navigation items).
  - `home.spec.ts` — home page tests (SEO metadata, brand/masthead checks, popular equipment section).
  - `brands.spec.ts` — brand section tests (display and navigation for brand listings).
  - `compare-popular.spec.ts` — popular comparison section tests (display and navigation for comparison cards).
  - `news.spec.ts` — latest news section tests (display, article metadata validation, navigation, footer link).

- `src/pages/` — Page Objects and components:
  - `components/Header.ts` — Encapsulates header interactions and verifications: logo validation, global search helper (`searchFor`), language switch, location selector, and navigation verification.
  - `components/PopularEquipment.ts` — Verifies the most popular equipment section (display, tab buttons, product cards, footer link).
  - `components/NewsSection.ts` — Verifies the latest news section (section heading, tab button, article cards with images, titles, excerpts, author/date, read time, footer link).
  - `pages/HomePage.ts` — Home page page object; encapsulates verification of popular equipment, compare popular, and brands sections; used by `home.spec.ts`.

- `src/fixtures/` — (optional) Playwright fixtures if present to provide shared setup/teardown or injected data.

- `src/utils/testData.ts` — Lightweight aggregator for test data. It imports localized data from the `testData/` directory and exports the `LOCALES` array used to parameterize tests.

- `src/utils/testData/` — **Modular Test Data Architecture**:
  - `types.ts` — Centralized TypeScript interfaces for Header, Footer, SEO, and Page-specific data.
  - `common.ts` — Shared components (Header, Footer) for all locales.
  - `home.ts` — Home-page specific content (Masthead, Sections, Page-specific SEO).

- `src/utils/assertions.ts` — Centralized assertion helpers used across page objects and tests. These helpers:
  - Provide clearer, consistent error messages in the format: `[AssertionError] <context> | Expected: <expected> | Actual: <actual>`
  - Wrap Playwright's `expect` calls for friendlier diagnostics (e.g., `assertVisible`, `assertHaveAttribute`, `assertContainText`, `assertEditable`, `assertUrl`).

- `src/reporters/verbose-failure-reporter.ts` — Custom Playwright reporter that listens for failed tests and logs a compact/clear failure summary including `Message`, `Expected`, and `Actual` values (it parses error messages for those labels). This complements the assertion helpers to produce concise failing logs in CI.


---

## 🧪 How the tests are structured & how they run

- Tests are written using Playwright Test (`test`, `expect`) and use Page Objects to keep UI logic in `src/pages`.
- Tests are **parameterized using `LOCALES`** from `src/utils/testData.ts` — the test suite automatically runs each test across multiple locales (`Base`, `English`, `Hindi`).
  - Example: 1 test written once runs 3 times (once per locale).
  - Locale-specific URLs are built from `path` in `LOCALES` (e.g., `BASE_URL`, `BASE_URL/en`, `BASE_URL/hi`).
  - Some tests (e.g., `news.spec.ts`) may filter to specific locales where data is available.
- Playwright config (`playwright.config.ts`) registers the **HTML** reporter and the custom `verbose-failure-reporter` which prints extra details for failed tests.

### Test Coverage by Section

| Section | Locales | Tests | Details |
|---------|---------|-------|---------|
| Header | Base, English, Hindi | ✅ `header.spec.ts` | Logo, search (with fallback), language switch, location selector, nav items |
| SEO / Home | Base, English, Hindi | ✅ `home.spec.ts` | Page title, description, brand/masthead, popular equipment, compare popular, brands |
| Popular Equipment | Base, English, Hindi | ✅ `home.spec.ts` | Section display, tab button, product cards, footer link, navigation |
| Compare Popular | Base, English, Hindi | ✅ `compare-popular.spec.ts` | Section display, comparison items (left/right products), footer link, navigation |
| Brands | Base, English, Hindi | ✅ `brands.spec.ts` | Section display, brand links, navigation to brand pages |
| Latest News | Base, English, Hindi | ✅ `news.spec.ts` | Section display, article metadata (title, excerpt, author, date, read time), footer link, navigation |

Best practices in this repo:
- Keep selectors scoped in page objects (avoid scattered raw selectors in tests).
- Use the assertion helpers in `src/utils/assertions.ts` for consistent failure messages.
- Keep `searchFor` resilient — the header search library includes a fallback when an exact suggestion isn't found.
- Parametrize tests across locales using `LOCALES` and `.filter()` to subset as needed (e.g., `news.spec.ts` includes only `Base`, `English`, and `Hindi`).
- Use locale-aware test data from `src/utils/testData.ts` to ensure strings match the actual UI in each language.

---

## 🛠️ Developer tips & how to add tests

### Adding a new test

1. **Add test data** in `src/utils/testData.ts` under the appropriate `LOCALES` object (e.g., for `Base`, `English`, `Hindi`).
   - Use consistent keys across all locales (e.g., if you add `mySection` to `Base`, add it to `English` and `Hindi` too, even if empty).
2. **Create a Page Object** in `src/pages/components/` (or `src/pages/`) to encapsulate UI interactions and verifications for that section.
3. **Write tests** in `src/tests/` using the locale-aware pattern (see `news.spec.ts` or `compare-popular.spec.ts`):
   ```typescript
   LOCALES.filter(l => ['Base', 'English', 'Hindi'].includes(l.name)).forEach(({ path, name, mySection }) => {
       test.describe(`My Section - ${name} (${path || 'Default'})`, () => {
           // ... tests
       });
   });
   ```
4. Run locally with `npx playwright test src/tests/mytest.spec.ts --project=chromium` or the entire suite with `npm test`.

### Debugging a test

```bash
npx playwright test <test> --trace on --project=chromium
```

To view the trace for a retry or failing test, use:

```bash
npx playwright show-trace trace.zip
```

---

## 🔍 Reporter and assertion behavior

- Assertion helpers throw errors with a clear message containing `Expected` and `Actual` labels. Example:

```
[AssertionError] logo href mismatch | Expected: /en | Actual: /
```

- The `verbose-failure-reporter` listens for failed tests and extracts these labels from the thrown errors. When a test fails it prints a one-line summary with the parsed **Expected** and **Actual** values for quick triage in CI logs.

- Note: some schema values on the dev environment may still reference production (www) hosts. The LD+JSON tests accept either the configured `BASE_URL` hostname or the production hostname when running against dev to avoid false negatives.

---

## ✅ Troubleshooting

- If tests fail due to flaky suggestions (search), the `Header.searchFor` method includes a fallback that clicks the first matching suggestion.
- If a selector seems to be missing, confirm the page at the time of failure and use Playwright's `page.pause()` or `--debug` mode to investigate.

---

## 🤝 Contribution

- Please open a PR for new tests or refactors.
- Add unit/functional tests for new reporters/helpers where possible.
- Keep changes small and test locally before pushing.

---

## 🚀 Future Plans & Roadmap
 
 To achieve "Pro QA" status, the following improvements are planned:
 
 1.  **Expand Page Coverage**: Implement basic "Page Load" and SEO tests for:
     -   Brand Listing Pages
     -   Model Detail Pages
     -   Price/Category Pages
 2.  **Visual Regression Testing**: Integrate Playwright Snapshot testing (`expect(page).toHaveScreenshot()`) for critical UI components like the Header, Footer, and Masthead to catch CSS regressions.
 3.  **Mobile Coverage**: Enable and configure mobile viewport projects in `playwright.config.ts` to ensure responsiveness across iOS/Android devices.
 4.  **CI/CD Integration**: Add a GitHub Actions workflow (`.github/workflows/playwright.yml`) to automatically run the test suite on every Push and Pull Request.
 5.  **Schema Validation Helper**: Abstract the LD+JSON validation into a reusable utility to ensure consistent metadata standards across all pages.
 
 ---
 
 If you'd like, I can also:
 - Add an example failing test that demonstrates the reporter's output, or
 - Add a small guide on how to reproduce a failure and capture traces.
 
 Let me know which one you prefer and I will add it. ✨
