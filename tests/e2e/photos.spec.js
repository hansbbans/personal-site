// E2E tests for photo gallery functionality
const { test, expect } = require('@playwright/test');

test.describe('Photo Gallery', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/photos.html');
    // Wait for photos to load
    await page.waitForSelector('.photo-item', { timeout: 10000 });
  });

  test('should display all photos with metadata', async ({ page }) => {
    // Check that photos are loaded
    const photoItems = await page.locator('.photo-item').count();
    expect(photoItems).toBeGreaterThan(30); // Should have 35+ photos

    // Check first photo has location and year
    const firstPhoto = page.locator('.photo-item').first();
    await expect(firstPhoto.locator('.photo-location')).toBeVisible();
    await expect(firstPhoto.locator('.photo-year')).toBeVisible();
    
    // Check year format (should be 4 digits)
    const yearText = await firstPhoto.locator('.photo-year').textContent();
    expect(yearText).toMatch(/^\d{4}$/);
  });

  test('should lazy load images progressively', async ({ page, browserName, isMobile }) => {
    // Linux headless WebKit with mobile emulation never delivers
    // IntersectionObserver entries, even on a bare test page; macOS WebKit
    // (Mobile Safari project) passes.
    test.fixme(browserName === 'webkit' && isMobile && process.platform === 'linux',
      'IntersectionObserver does not fire in Linux headless mobile WebKit');
    const images = page.locator('.photo-item img');
    const total = await images.count();
    await expect(images.first()).toBeVisible();

    // Bring each photo on screen in turn, the way a reader scrolls through.
    // (scrollIntoViewIfNeeded waits for rendered frames, which headless
    // WebKit on Linux otherwise skips while the page is idle.)
    for (let i = 0; i < total; i++) {
      await images.nth(i).scrollIntoViewIfNeeded();
    }

    // Every photo has swapped its placeholder for a real image
    await expect.poll(() => page.locator('.photo-item img[src*="images/"]').count(), { timeout: 10000 }).toBe(total);
  });

  test('should open lightbox on photo click', async ({ page }) => {
    // Click first photo
    await page.locator('.photo-item').first().click();
    
    // Lightbox should be visible
    await expect(page.locator('.lightbox')).toHaveClass(/active/);
    await expect(page.locator('.lightbox-content')).toBeVisible();
    
    // Counter should show
    await expect(page.locator('.lightbox-counter')).toBeVisible();
    const counterText = await page.locator('.lightbox-counter').textContent();
    expect(counterText).toMatch(/^\d+ \/ \d+$/);
  });

  test('should navigate between photos in lightbox', async ({ page }) => {
    // Open lightbox
    await page.locator('.photo-item').first().click();
    await expect(page.locator('.lightbox')).toHaveClass(/active/);
    
    // Test next button
    const initialCounter = await page.locator('.lightbox-counter').textContent();
    await page.locator('.lightbox-next').click();
    
    // Counter should change
    const newCounter = await page.locator('.lightbox-counter').textContent();
    expect(newCounter).not.toBe(initialCounter);
    
    // Test previous button
    await page.locator('.lightbox-prev').click();
    const backCounter = await page.locator('.lightbox-counter').textContent();
    expect(backCounter).toBe(initialCounter);
  });

  test('should navigate with keyboard arrows', async ({ page }) => {
    // Open lightbox
    await page.locator('.photo-item').first().click();
    await expect(page.locator('.lightbox')).toHaveClass(/active/);
    
    const initialCounter = await page.locator('.lightbox-counter').textContent();
    
    // Use right arrow
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(500);
    
    const newCounter = await page.locator('.lightbox-counter').textContent();
    expect(newCounter).not.toBe(initialCounter);
    
    // Use left arrow to go back
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(500);
    
    const backCounter = await page.locator('.lightbox-counter').textContent();
    expect(backCounter).toBe(initialCounter);
  });

  test('should close lightbox with escape key', async ({ page }) => {
    // Open lightbox
    await page.locator('.photo-item').first().click();
    await expect(page.locator('.lightbox')).toHaveClass(/active/);
    
    // Press escape
    await page.keyboard.press('Escape');
    
    // Lightbox should be closed
    await expect(page.locator('.lightbox')).not.toHaveClass(/active/);
  });

  test('should close lightbox with close button', async ({ page }) => {
    // Open lightbox
    await page.locator('.photo-item').first().click();
    await expect(page.locator('.lightbox')).toHaveClass(/active/);
    
    // Click close button
    await page.locator('.lightbox-close').click();
    
    // Lightbox should be closed
    await expect(page.locator('.lightbox')).not.toHaveClass(/active/);
  });

  test('should load high-quality images in lightbox', async ({ page }) => {
    // Open lightbox
    await page.locator('.photo-item').first().click();
    await expect(page.locator('.lightbox')).toHaveClass(/active/);
    
    // Get lightbox image src
    const lightboxImg = page.locator('.lightbox-content');
    await lightboxImg.waitFor({ state: 'visible' });
    
    const imgSrc = await lightboxImg.getAttribute('src');
    
    // Should be loading original image, not optimized small version
    expect(imgSrc).not.toContain('/optimized/small/');
    expect(imgSrc).toMatch(/^images\//); // Should start with images/
  });
});

test.describe('Photo Gallery Mobile', () => {
  test.use({ 
    viewport: { width: 375, height: 667 } // iPhone SE
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/photos.html');
    await page.waitForSelector('.photo-item');
  });

  test('should display photos in mobile layout', async ({ page }) => {
    // Check that photos are visible on mobile
    const photoItems = await page.locator('.photo-item').count();
    expect(photoItems).toBeGreaterThan(30);
    
    // Check responsive layout (should have fewer columns)
    const firstPhoto = page.locator('.photo-item').first();
    await expect(firstPhoto).toBeVisible();
  });

  test('should support touch navigation in lightbox', async ({ page }) => {
    // Open lightbox
    await page.locator('.photo-item').first().click();
    await expect(page.locator('.lightbox')).toHaveClass(/active/);
    
    // Navigation arrows should be properly sized for mobile
    const nextBtn = page.locator('.lightbox-next');
    const prevBtn = page.locator('.lightbox-prev');
    
    await expect(nextBtn).toBeVisible();
    await expect(prevBtn).toBeVisible();
    
    // Close button should be appropriately sized
    const closeBtn = page.locator('.lightbox-close');
    await expect(closeBtn).toBeVisible();
  });
});