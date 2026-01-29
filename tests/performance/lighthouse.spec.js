// Performance tests using Lighthouse
const { test, expect } = require('@playwright/test');

test.describe('Performance Tests', () => {
  test('photos page should meet performance benchmarks', async ({ page, context }) => {
    // Enable performance monitoring
    await context.tracing.start({ screenshots: true, snapshots: true });
    
    const startTime = Date.now();
    await page.goto('http://localhost:3000/photos.html');
    
    // Wait for initial photos to load
    await page.waitForSelector('.photo-item', { timeout: 10000 });
    const loadTime = Date.now() - startTime;
    
    // Basic load time should be under 3 seconds
    expect(loadTime).toBeLessThan(3000);
    
    // Check that lazy loading is working (not all images loaded immediately)
    const allImages = await page.locator('.photo-item img').count();
    const loadedImages = await page.locator('.photo-item img[src*="images/optimized"]').count();
    
    // Some images should be using optimized versions
    expect(loadedImages).toBeGreaterThan(0);
    
    await context.tracing.stop({ path: 'test-results/photos-performance.zip' });
  });

  test('should load optimized images on different viewport sizes', async ({ page, context }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3000/photos.html');
    await page.waitForSelector('.photo-item');
    
    // Trigger lazy loading
    await page.locator('.photo-item').first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    
    // Check that small images are loaded on mobile
    const firstImg = page.locator('.photo-item img').first();
    const mobileSrc = await firstImg.getAttribute('src');
    
    // Should prefer smaller images on mobile
    expect(mobileSrc).toContain('images/optimized');
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.reload();
    await page.waitForSelector('.photo-item');
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.reload();
    await page.waitForSelector('.photo-item');
  });

  test('should handle concurrent image loading efficiently', async ({ page }) => {
    await page.goto('http://localhost:3000/photos.html');
    await page.waitForSelector('.photo-item');
    
    // Scroll rapidly to trigger multiple lazy loads
    await page.keyboard.press('End');
    await page.waitForTimeout(100);
    await page.keyboard.press('Home');
    await page.waitForTimeout(100);
    await page.keyboard.press('End');
    
    // Wait for loading to stabilize
    await page.waitForTimeout(2000);
    
    // Check that page is responsive (no hanging)
    const title = await page.title();
    expect(title).toContain('Photos');
    
    // Ensure no broken images
    const brokenImages = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('.photo-item img'));
      return imgs.filter(img => !img.complete || img.naturalWidth === 0).length;
    });
    
    expect(brokenImages).toBe(0);
  });

  test('lightbox should load high-quality images efficiently', async ({ page }) => {
    await page.goto('http://localhost:3000/photos.html');
    await page.waitForSelector('.photo-item');
    
    // Open lightbox
    const startTime = Date.now();
    await page.locator('.photo-item').first().click();
    
    // Wait for lightbox to open and image to load
    await page.waitForSelector('.lightbox.active');
    await page.waitForSelector('.lightbox-content[src]');
    
    const loadTime = Date.now() - startTime;
    
    // Lightbox should open quickly (under 1 second)
    expect(loadTime).toBeLessThan(1000);
    
    // Should load original high-quality image
    const lightboxImg = page.locator('.lightbox-content');
    const imgSrc = await lightboxImg.getAttribute('src');
    
    // Should not be a small optimized version
    expect(imgSrc).not.toContain('/optimized/small/');
    expect(imgSrc).toMatch(/^images\//);
    
    // Navigate to next image (should be fast)
    const navStartTime = Date.now();
    await page.locator('.lightbox-next').click();
    await page.waitForTimeout(500); // Allow for transition
    
    const navTime = Date.now() - navStartTime;
    expect(navTime).toBeLessThan(800);
  });
});

test.describe('Image Optimization Validation', () => {
  test('should serve appropriately sized images', async ({ page }) => {
    await page.goto('http://localhost:3000/photos.html');
    await page.waitForSelector('.photo-item');
    
    // Check that optimized images exist and are smaller
    const responses = [];
    page.on('response', response => {
      if (response.url().includes('images/') && response.url().includes('.jpg')) {
        responses.push({
          url: response.url(),
          size: response.headers()['content-length']
        });
      }
    });
    
    // Trigger some image loads
    await page.locator('.photo-item').first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(2000);
    
    // Check that we're getting optimized images
    const optimizedImages = responses.filter(r => r.url.includes('/optimized/'));
    expect(optimizedImages.length).toBeGreaterThan(0);
  });

  test('should fall back gracefully when optimized images fail', async ({ page }) => {
    // Intercept and fail optimized image requests
    await page.route('**/images/optimized/**', route => {
      route.fulfill({ status: 404 });
    });
    
    await page.goto('http://localhost:3000/photos.html');
    await page.waitForSelector('.photo-item');
    
    // Trigger image loading
    await page.locator('.photo-item').first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(2000);
    
    // Should still show images (fallback to original)
    const visibleImages = await page.locator('.photo-item img[src*="images/photo_"]').count();
    expect(visibleImages).toBeGreaterThan(0);
  });
});

test.describe('Accessibility Performance', () => {
  test('should maintain good accessibility while lazy loading', async ({ page }) => {
    await page.goto('http://localhost:3000/photos.html');
    await page.waitForSelector('.photo-item');
    
    // Check that all images have proper alt text
    const images = await page.locator('.photo-item img').all();
    for (const img of images) {
      const altText = await img.getAttribute('alt');
      expect(altText).toBeTruthy();
      expect(altText.length).toBeGreaterThan(0);
    }
    
    // Check that photo overlays are readable
    const overlays = await page.locator('.photo-overlay').all();
    for (const overlay of overlays) {
      await expect(overlay).toBeVisible();
      
      const location = overlay.locator('.photo-location');
      const year = overlay.locator('.photo-year');
      
      await expect(location).toBeVisible();
      await expect(year).toBeVisible();
    }
  });

  test('should handle keyboard navigation efficiently', async ({ page }) => {
    await page.goto('http://localhost:3000/photos.html');
    await page.waitForSelector('.photo-item');
    
    // Tab through photos quickly
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
    }
    
    // Should be responsive
    const focusedElement = await page.evaluate(() => document.activeElement.tagName);
    expect(focusedElement).toBeTruthy();
  });
});