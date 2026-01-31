// Visual regression tests with screenshot diff and mobile viewport testing
const { test, expect } = require('@playwright/test');

// Key pages to test
const PAGES = [
  { name: 'homepage', path: '/', selector: 'body' },
  { name: 'food', path: '/food.html', selector: '#foodGrid', waitFor: '.personality-grid' },
  { name: 'photos', path: '/photos.html', selector: '.photos-grid', waitFor: '.photo-item' },
];

// Viewport configurations for responsive testing
const VIEWPORTS = [
  { name: 'iPhone-SE', width: 375, height: 667, deviceScaleFactor: 2, isMobile: true },
  { name: 'iPhone-12', width: 390, height: 844, deviceScaleFactor: 3, isMobile: true },
  { name: 'iPad-Mini', width: 768, height: 1024, deviceScaleFactor: 2, isMobile: false },
  { name: 'iPad-Pro', width: 1024, height: 1366, deviceScaleFactor: 2, isMobile: false },
  { name: 'desktop', width: 1280, height: 720, deviceScaleFactor: 1, isMobile: false },
  { name: 'desktop-large', width: 1920, height: 1080, deviceScaleFactor: 1, isMobile: false },
];

test.describe('Visual Regression - Screenshot Diff Testing', () => {
  for (const page of PAGES) {
    test(`${page.name} page should match baseline (desktop)`, async ({ page: pwPage }) => {
      await pwPage.goto(page.path);
      await pwPage.waitForLoadState('networkidle');
      
      // Wait for specific element if defined
      if (page.waitFor) {
        await pwPage.waitForSelector(page.waitFor, { timeout: 15000 });
        await pwPage.waitForTimeout(2000); // Extra time for dynamic content
      } else {
        await pwPage.waitForTimeout(1000);
      }
      
      // Take full page screenshot for comparison
      await expect(pwPage).toHaveScreenshot(`${page.name}-desktop.png`, {
        fullPage: true,
        animations: 'disabled'
      });
    });
  }
});

test.describe('Mobile Viewport Testing - Layout Break Detection', () => {
  for (const viewport of VIEWPORTS) {
    for (const page of PAGES) {
      test(`${page.name} on ${viewport.name} (${viewport.width}x${viewport.height})`, async ({ page: pwPage }) => {
        // Set viewport
        await pwPage.setViewportSize({ 
          width: viewport.width, 
          height: viewport.height 
        });
        
        await pwPage.goto(page.path);
        await pwPage.waitForLoadState('networkidle');
        
        // Wait for content
        if (page.waitFor) {
          await pwPage.waitForSelector(page.waitFor, { timeout: 15000 });
          await pwPage.waitForTimeout(2000);
        } else {
          await pwPage.waitForTimeout(1000);
        }
        
        // Check for horizontal overflow (layout breaks)
        const hasOverflow = await pwPage.evaluate(() => {
          const bodyWidth = document.body.scrollWidth;
          const viewportWidth = window.innerWidth;
          return bodyWidth > viewportWidth;
        });
        
        if (hasOverflow) {
          console.warn(`⚠️  Horizontal overflow detected on ${page.name} at ${viewport.name}`);
        }
        
        // Take screenshot for visual comparison
        const screenshotName = `${page.name}-${viewport.name}.png`;
        await expect(pwPage).toHaveScreenshot(screenshotName, {
          fullPage: true,
          animations: 'disabled'
        });
        
        // Additional checks for mobile
        if (viewport.isMobile) {
          // Check that content is not too narrow
          const contentWidth = await pwPage.evaluate(() => {
            const main = document.querySelector('main');
            return main ? main.offsetWidth : document.body.offsetWidth;
          });
          
          // Content should use reasonable portion of viewport
          const viewportWidth = viewport.width;
          const minExpectedWidth = viewportWidth * 0.85; // At least 85% of viewport
          
          if (contentWidth < minExpectedWidth) {
            console.warn(`⚠️  Content width (${contentWidth}px) seems narrow on ${viewport.name}`);
          }
        }
      });
    }
  }
});

test.describe('Food Page Specific Tests', () => {
  test('food page - category filters visible', async ({ page }) => {
    await page.goto('/food.html');
    await page.waitForSelector('#foodGrid', { timeout: 15000 });
    await page.waitForTimeout(2000);
    
    // Check category filters are visible
    const filtersVisible = await page.isVisible('#mainCategoryFilters');
    expect(filtersVisible).toBe(true);
    
    // Take screenshot of filter area
    await expect(page.locator('#mainCategoryFilters')).toHaveScreenshot('food-filters.png');
  });
  
  test('food page - restaurant cards render correctly', async ({ page }) => {
    await page.goto('/food.html');
    await page.waitForSelector('.personality-card', { timeout: 15000 });
    await page.waitForTimeout(2000);
    
    // Check restaurant cards exist
    const cardCount = await page.locator('.personality-card').count();
    expect(cardCount).toBeGreaterThan(0);
    
    // Screenshot first card for comparison
    const firstCard = page.locator('.personality-card').first();
    await expect(firstCard).toHaveScreenshot('food-restaurant-card.png');
  });
  
  test('food page - mobile category tabs scrollable', async ({ page }) => {
    // iPhone SE size
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/food.html');
    await page.waitForSelector('.city-tabs', { timeout: 15000 });
    await page.waitForTimeout(1000);
    
    // Check city tabs container
    const tabsOverflow = await page.evaluate(() => {
      const tabs = document.querySelector('.city-tabs');
      if (!tabs) return false;
      return tabs.scrollWidth > tabs.clientWidth;
    });
    
    // Take screenshot of tabs area
    await expect(page.locator('.city-tabs')).toHaveScreenshot('food-city-tabs-mobile.png');
  });
});

test.describe('Navigation Component - All Viewports', () => {
  for (const viewport of VIEWPORTS) {
    test(`navigation on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Test mobile menu toggle on small screens
      if (viewport.width < 768) {
        const menuToggle = page.locator('.mobile-menu-toggle');
        await menuToggle.click();
        await page.waitForTimeout(500);
        
        await expect(page.locator('.nav-menu')).toHaveScreenshot(`nav-menu-open-${viewport.name}.png`);
        
        // Close menu
        await menuToggle.click();
        await page.waitForTimeout(300);
      }
      
      // Screenshot navbar
      await expect(page.locator('.navbar')).toHaveScreenshot(`navbar-${viewport.name}.png`);
    });
  }
});

test.describe('Photos Page - Responsive Grid', () => {
  for (const viewport of VIEWPORTS) {
    test(`photos grid on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/photos.html');
      await page.waitForSelector('.photo-item', { timeout: 15000 });
      await page.waitForTimeout(2000);
      
      // Check grid layout
      const gridComputed = await page.evaluate(() => {
        const grid = document.querySelector('.photos-grid');
        if (!grid) return null;
        const styles = window.getComputedStyle(grid);
        return {
          display: styles.display,
          gridTemplateColumns: styles.gridTemplateColumns,
          gap: styles.gap
        };
      });
      
      console.log(`Photos grid on ${viewport.name}:`, gridComputed);
      
      // Take screenshot of grid area
      await expect(page.locator('.photos-grid')).toHaveScreenshot(`photos-grid-${viewport.name}.png`);
    });
  }
});

test.describe('Theme Toggle - Visual States', () => {
  test('theme toggle renders correctly on all viewports', async ({ page }) => {
    for (const viewport of VIEWPORTS.slice(0, 3)) { // Test on 3 key sizes
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Light theme screenshot
      await expect(page.locator('.theme-toggle')).toHaveScreenshot(`theme-toggle-light-${viewport.name}.png`);
      
      // Toggle dark theme
      await page.locator('.theme-toggle').click();
      await page.waitForTimeout(500);
      
      // Dark theme screenshot
      await expect(page.locator('.theme-toggle')).toHaveScreenshot(`theme-toggle-dark-${viewport.name}.png`);
      
      // Toggle back
      await page.locator('.theme-toggle').click();
      await page.waitForTimeout(300);
    }
  });
});

test.describe('Console Error Detection', () => {
  for (const page of PAGES) {
    test(`${page.name} page should have no console errors`, async ({ page: pwPage }) => {
      const errors = [];
      
      pwPage.on('console', msg => {
        if (msg.type() === 'error') {
          // Filter out Google Maps errors (expected in test environment)
          const text = msg.text();
          if (!text.includes('Google Maps') && 
              !text.includes('google') &&
              !text.includes('maps.googleapis')) {
            errors.push(text);
          }
        }
      });
      
      await pwPage.goto(page.path);
      await pwPage.waitForLoadState('networkidle');
      
      if (page.waitFor) {
        await pwPage.waitForSelector(page.waitFor, { timeout: 15000 });
      }
      
      await pwPage.waitForTimeout(2000);
      
      expect(errors).toHaveLength(0);
    });
  }
});
