import type { Reporter, TestCase, TestResult } from '@playwright/test/reporter';

function extractLabel(message: string, label: string): string | null {
  if (!message) return null;
  const re = new RegExp(`${label}:?\s*([\s\S]*?)(\n|$)`, 'i');
  const m = message.match(re);
  return m ? m[1].trim() : null;
}

export default class VerboseFailureReporter implements Reporter {
  onTestEnd(test: TestCase, result: TestResult) {
    if (result.status === 'failed') {
      const title = `${test.parent?.title || ''} - ${test.title}`;
      const message = result.error?.message ?? String(result.error ?? 'No error message');
      const expected = extractLabel(message, 'Expected') ?? extractLabel(message, 'expected');
      const actual = extractLabel(message, 'Received') ?? extractLabel(message, 'Actual') ?? extractLabel(message, 'actual');

      // Print a clear, structured failure log
      // eslint-disable-next-line no-console
      console.error(`\n🔴 TEST FAILED: ${title}\nMessage: ${message}\nExpected: ${expected ?? 'N/A'}\nActual: ${actual ?? 'N/A'}\n`);
    }
  }
}
