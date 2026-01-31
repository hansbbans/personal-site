// Visual regression tests
// NOTE: For more comprehensive visual testing including food.html and mobile viewports,
// see comprehensive-visual.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Visual Regression Tests', () => {
  test('homepage should match visual baseline', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait for any animations to complete
    await page.waitForTimeout(1000);
    
    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true
    });
  });

  test('photos page should match visual baseline', async ({ page }) => {
    await page.goto('/photos.html');
    await page.waitForSelector('.photo-item', { timeout: 10000 });
    
    // Wait for photos to load
    await page.waitForTimeout(3000);
    
    await expect(page).toHaveScreenshot('photos-page.png', {
      fullPage: true
    });
  });

  test('photos page mobile layout', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/photos.html');
    await page.waitForSelector('.photo-item');
    await page.waitForTimeout(2000);
    
    await expect(page).toHaveScreenshot('photos-mobile.png', {
      fullPage: true
    });
  });

  test('photo lightbox should match baseline', async ({ page }) => {
    await page.goto('/photos.html');
    await page.waitForSelector('.photo-item');
    
    // Open lightbox
    await page.locator('.photo-item').first().click();
    await page.waitForSelector('.lightbox.active');
    await page.waitForTimeout(1000);
    
    await expect(page).toHaveScreenshot('photo-lightbox.png');
  });

  test('mobile menu should match baseline', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Open mobile menu
    await page.locator('.mobile-menu-toggle').click();
    await page.waitForSelector('.nav-menu.active');
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('mobile-menu.png');
  });

  test('about page should match baseline', async ({ page }) => {
    await page.goto('/about.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    await expect(page).toHaveScreenshot('about-page.png', {
      fullPage: true
    });
  });

  test('photo overlay should match baseline', async ({ page }) => {
    await page.goto('/photos.html');
    await page.waitForSelector('.photo-item');
    await page.waitForTimeout(2000);
    
    // Hover over first photo to show overlay
    await page.locator('.photo-item').first().hover();
    await page.waitForTimeout(500);
    
    await expect(page.locator('.photo-item').first()).toHaveScreenshot('photo-overlay.png');
  });

  test('theme toggle states', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Test light theme (default)
    await expect(page).toHaveScreenshot('light-theme.png', {
      clip: { x: 0, y: 0, width: 1200, height: 800 }
    });
    
    // Toggle to dark theme
    await page.locator('.theme-toggle').click();
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('dark-theme.png', {
      clip: { x: 0, y: 0, width: 1200, height: 800 }
    });
  });
});

test.describe('Responsive Visual Tests', () => {
  const viewports = [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1200, height: 800 },
  ];

  for (const viewport of viewports) {
    test(`photos grid layout on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/photos.html');
      await page.waitForSelector('.photo-item');
      await page.waitForTimeout(2000);
      
      // Take screenshot of just the photos grid
      await expect(page.locator('.photos-grid')).toHaveScreenshot(`photos-grid-${viewport.name}.png`);
    });
  }
});

test.describe('Component Visual Tests', () => {
  test('navigation component variations', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Desktop navigation
    await expect(page.locator('.navbar')).toHaveScreenshot('navbar-desktop.png');
    
    // Mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('.navbar')).toHaveScreenshot('navbar-mobile.png');
  });

  test('photo item component states', async ({ page }) => {
    await page.goto('/photos.html');
    await page.waitForSelector('.photo-item');
    await page.waitForTimeout(2000);
    
    const photoItem = page.locator('.photo-item').first();
    
    // Normal state
    await expect(photoItem).toHaveScreenshot('photo-item-normal.png');
    
    // Hover state
    await photoItem.hover();
    await page.waitForTimeout(500);
    await expect(photoItem).toHaveScreenshot('photo-item-hover.png');
  });

  test('lightbox component elements', async ({ page }) => {
    await page.goto('/photos.html');
    await page.waitForSelector('.photo-item');
    
    // Open lightbox
    await page.locator('.photo-item').first().click();
    await page.waitForSelector('.lightbox.active');
    await page.waitForTimeout(1000);
    
    // Test navigation arrows
    await expect(page.locator('.lightbox-nav')).toHaveScreenshot('lightbox-arrows.png');
    
    // Test counter
    await expect(page.locator('.lightbox-counter')).toHaveScreenshot('lightbox-counter.png');
    
    // Test close button
    await expect(page.locator('.lightbox-close')).toHaveScreenshot('lightbox-close.png');
  });
});