import { test, expect } from '@playwright/test';

test('useComputed$ does not run when checking a parent conditional', async ({ page }) => {
  await page.goto('/test');

  const button = page.locator('#issue-4332-trigger');
  const text = page.locator('#issue-4332-result');

  await expect(text).toHaveText('');
  await button.click();
  await expect(text).toHaveText('0');
});
