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
npx playwright test --project=chromium
```

Run a single test file:

```bash
npx playwright test src/tests/header.spec.ts --project=chromium
```

Open the HTML report after a run:

```bash
npx playwright show-report
```

---

## 📁 Project structure (what's in each file)

Top-level files:

- `package.json` — npm scripts and devDependencies. Use `npm test` or `npx playwright test` to run tests.
- `playwright.config.ts` — Playwright configuration (projects, reporter). This project registers the HTML reporter and the custom reporter at `./src/reporters/verbose-failure-reporter.ts`.
- `playwright-report/` — generated HTML report artifacts when you run tests.
- `test-results/` — per-test run artifacts (screenshots, error contexts) captured by Playwright.

Source files:

- `src/tests/` — test files:
  - `header.spec.ts` — header-related UI tests (logo, global search, language switch, location selector, navigation items).
  - `home.spec.ts` — home page tests (SEO metadata, brand/masthead checks, popular equipment section).

- `src/pages/` — Page Objects and components:
  - `components/Header.ts` — Encapsulates header interactions and verifications: logo validation, global search helper (`searchFor`), language switch, location selector, and navigation verification.
  - `pages/HomePage.ts` — (if present) page object(s) for the home page sections; used by `home.spec.ts`.

- `src/fixtures/` — (optional) Playwright fixtures if present to provide shared setup/teardown or injected data.

- `src/utils/testData.ts` — Test data and locale definitions (used to parametrize tests across `Base`, `English`, and `Hindi`).

- `src/utils/assertions.ts` — Centralized assertion helpers used across page objects and tests. These helpers:
  - Provide clearer, consistent error messages in the format: `[AssertionError] <context> | Expected: <expected> | Actual: <actual>`
  - Wrap Playwright's `expect` calls for friendlier diagnostics (e.g., `assertVisible`, `assertHaveAttribute`, `assertContainText`, `assertEditable`, `assertUrl`).

- `src/reporters/verbose-failure-reporter.ts` — Custom Playwright reporter that listens for failed tests and logs a compact/clear failure summary including `Message`, `Expected`, and `Actual` values (it parses error messages for those labels). This complements the assertion helpers to produce concise failing logs in CI.


---

## 🧪 How the tests are structured & how they run

- Tests are written using Playwright Test (`test`, `expect`) and use Page Objects to keep UI logic in `src/pages`.
- Tests are parameterized using `LOCALES` from `src/utils/testData.ts` — so the header/home tests run for multiple locales (Base/English/Hindi) automatically.
- Playwright config (`playwright.config.ts`) registers the **HTML** reporter and the custom `verbose-failure-reporter` which prints extra details for failed tests.

Best practices in this repo:
- Keep selectors scoped in page objects (avoid scattered raw selectors in tests).
- Use the assertion helpers in `src/utils/assertions.ts` for consistent failure messages.
- Keep `searchFor` resilient — the header search library includes a fallback when an exact suggestion isn't found.

---

## 🛠️ Developer tips & how to add tests

1. Add a new Page Object in `src/pages` for a new area of the site.
2. Use the helper assertions from `src/utils/assertions.ts` for verifications.
3. Add tests in `src/tests/` and import the page object.
4. Run locally with `npx playwright test <file>` or the entire suite.

To run a test and generate trace/screenshots for debugging:

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

If you'd like, I can also:
- Add an example failing test that demonstrates the reporter's output, or
- Add a small guide on how to reproduce a failure and capture traces.

Let me know which one you prefer and I will add it. ✨
