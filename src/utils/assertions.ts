import { Locator, Page, expect } from '@playwright/test';

function buildMessage(context: string, expected: string, actual: string) {
    return `[AssertionError] ${context} | Expected: ${expected} | Actual: ${actual}`;
}

export async function assertVisible(locator: Locator, context = 'element to be visible') {
    try {
        await expect(locator).toBeVisible();
    } catch (err: any) {
        // Determine if element is present at all
        const count = await locator.count().catch(() => 0);
        const actual = count === 0 ? 'not found' : 'not visible';
        throw new Error(buildMessage(context, 'visible', actual));
    }
}

export async function assertEditable(locator: Locator, context = 'element to be editable') {
    try {
        await expect(locator).toBeEditable();
    } catch (err: any) {
        const isDisabled = await locator.isDisabled().catch(() => false);
        const actual = isDisabled ? 'disabled' : 'not editable';
        throw new Error(buildMessage(context, 'editable', actual));
    }
}

export async function assertHaveAttribute(locator: Locator, attr: string, expected: string, context?: string) {
    try {
        await expect(locator).toHaveAttribute(attr, expected);
    } catch (err: any) {
        const actual = (await locator.getAttribute(attr)) ?? 'missing';
        throw new Error(buildMessage(context ?? `attribute ${attr}`, expected, actual));
    }
}

export async function assertContainText(locator: Locator, expected: string, context = 'element to contain text') {
    try {
        await expect(locator).toContainText(expected);
    } catch (err: any) {
        const actual = await locator.innerText().catch(() => 'missing');
        throw new Error(buildMessage(context, expected, actual));
    }
}

export async function assertUrl(page: Page, expected: RegExp | string, context = 'page URL') {
    try {
        if (expected instanceof RegExp) {
            await expect(page).toHaveURL(expected);
        } else {
            await expect(page).toHaveURL(expected);
        }
    } catch (err: any) {
        const actual = page.url();
        throw new Error(buildMessage(context, String(expected), actual));
    }
}
