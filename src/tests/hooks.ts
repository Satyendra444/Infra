import { test } from '@playwright/test';

// Global hook to log expected vs actual when tests fail and our assertions throw structured messages
test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === 'failed') {
        const err = testInfo.error;
        if (err) {
            // Print helpful formatted errors if our assertion helpers created them
            const msg = String(err.message ?? err);
            // Try to parse our expected/actual pattern
            const match = msg.match(/Expected: (.*) \| Actual: (.*)$/);
            if (match) {
                const [, expected, actual] = match;
                // Use console.error so it's easy to find in CI logs
                console.error('--- Test Failure Details ---');
                console.error(`Test: ${testInfo.title}`);
                console.error(`Expected: ${expected}`);
                console.error(`Actual: ${actual}`);
                console.error('----------------------------');
            } else {
                // Fallback: print full error
                console.error('Test failed:', msg);
            }
        }
    }
});
