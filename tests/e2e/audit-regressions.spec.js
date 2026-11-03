// Regression tests for bugs found in the November 2026 audit.
const { test, expect } = require('@playwright/test');

test.describe('Navigation accessibility', () => {
  test('desktop nav links are not hidden from assistive tech', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/index.html');
    const ariaHidden = await page.locator('.nav-menu').getAttribute('aria-hidden');
    expect(ariaHidden).not.toBe('true');
  });

  test('closed mobile menu links are not reachable with Tab', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto('/index.html');
    for (let i = 0; i < 4; i++) {
      await page.keyboard.press('Tab');
      const inMenu = await page.evaluate(() => !!document.activeElement.closest('.nav-menu'));
      expect(inMenu).toBe(false);
    }
  });

  test('opened mobile menu links are reachable', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto('/index.html');
    await page.click('.mobile-menu-toggle');
    await expect(page.locator('.nav-menu')).toHaveAttribute('aria-hidden', 'false');
    await page.locator('.nav-menu a').first().focus();
    expect(await page.evaluate(() => !!document.activeElement.closest('.nav-menu'))).toBe(true);
  });
});

test.describe('Theme', () => {
  test('loading a page does not store a theme the user never chose', async ({ page }) => {
    await page.goto('/about.html');
    expect(await page.evaluate(() => localStorage.getItem('theme'))).toBeNull();
  });

  test('theme follows OS changes until the user picks one', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/about.html');
    await page.emulateMedia({ colorScheme: 'dark' });
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('toggle choice persists', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/about.html');
    await page.click('#theme-toggle');
    expect(await page.evaluate(() => localStorage.getItem('theme'))).toBe('dark');
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });
});

test.describe('Missing assets', () => {
  for (const path of ['/books.html', '/gear.html']) {
    test(`${path} requests no missing same-origin scripts`, async ({ page }) => {
      const missing = [];
      page.on('response', (res) => {
        if (res.url().startsWith('http://localhost:3000') && res.status() === 404) missing.push(res.url());
      });
      await page.goto(path);
      await page.waitForLoadState('load');
      expect(missing).toEqual([]);
    });
  }
});

test.describe('Photos lightbox', () => {
  test('opening a photo that has not scrolled into view shows the real image', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/photos.html');
    await page.locator('.photo-item').first().click();
    await expect(page.locator('#lightbox')).toHaveClass(/active/);
    await page.keyboard.press('ArrowLeft'); // wraps to the last photo, far below the fold
    await expect(page.locator('#lightbox-img')).not.toHaveAttribute('src', /^data:/);
    await expect(page.locator('#lightbox-img')).toHaveAttribute('src', /images\//);
  });
});

test.describe('Food page keyboard', () => {
  test('arrow keys and End still scroll the page', async ({ page }) => {
    await page.route(/maps\.googleapis\.com/, (route) => route.abort());
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/food.html');
    await page.waitForSelector('.card-interactive');
    await page.addStyleTag({ content: 'html { scroll-behavior: auto !important; }' });
    await page.keyboard.press('End');
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  });
});

test.describe('Books page', () => {
  const books = Array.from({ length: 12 }, (_, i) => [`Book ${i}`, `Author ${i}`, 'Fiction', '4', '', '', '']);
  const stubSheets = (page) => page.route(/sheets\.googleapis\.com/, (route) =>
    route.fulfill({ contentType: 'application/json', body: JSON.stringify({ values: [['Title', 'Author', 'Category'], ...books] }) }));

  for (const width of [800, 900, 1000]) {
    test(`no horizontal page scroll at ${width}px`, async ({ page }) => {
      await stubSheets(page);
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/books.html');
      await page.waitForSelector('.book-cover-item');
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }

  test('book covers can be opened with the keyboard', async ({ page }) => {
    await stubSheets(page);
    await page.goto('/books.html');
    const cover = page.locator('.book-cover-item').first();
    await cover.focus();
    expect(await cover.evaluate((el) => el === document.activeElement)).toBe(true);
    await page.keyboard.press('Enter');
    await expect(page.locator('.book-detail-panel.visible')).toHaveCount(1);
    await expect(cover).toHaveAttribute('aria-expanded', 'true');
  });
});
