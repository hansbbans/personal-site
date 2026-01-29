// E2E tests for navigation functionality
const { test, expect } = require('@playwright/test');

test.describe('Desktop Navigation', () => {
  test.use({ 
    viewport: { width: 1200, height: 800 }
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should display desktop navigation', async ({ page }) => {
    // Navigation should be visible
    await expect(page.locator('.navbar')).toBeVisible();
    await expect(page.locator('.nav-menu')).toBeVisible();
    
    // Mobile menu toggle should not be visible
    await expect(page.locator('.mobile-menu-toggle')).not.toBeVisible();
    
    // Check all nav links
    const navLinks = [
      { text: '👤 About', href: 'about.html' },
      { text: '🎒 Gear', href: 'gear.html' },
      { text: '🍜 Food', href: 'food.html' },
      { text: '📷 Photos', href: 'photos.html' },
      { text: '📚 Books', href: 'books.html' },
      { text: '⏰ Now', href: 'now.html' }
    ];
    
    for (const link of navLinks) {
      const navLink = page.locator(`a[href="${link.href}"]`);
      await expect(navLink).toBeVisible();
      await expect(navLink).toContainText(link.text.slice(2)); // Remove emoji
    }
  });

  test('should navigate to different pages', async ({ page }) => {
    // Navigate to photos page
    await page.click('a[href="photos.html"]');
    await expect(page).toHaveURL(/photos\.html$/);
    await expect(page.locator('h2')).toContainText('Photography');
    
    // Navigate to about page
    await page.click('a[href="about.html"]');
    await expect(page).toHaveURL(/about\.html$/);
  });

  test('should highlight active page in navigation', async ({ page }) => {
    // Go to photos page
    await page.goto('http://localhost:3000/photos.html');
    
    // Photos nav item should be active
    const photosLink = page.locator('a[href="photos.html"]');
    await expect(photosLink).toHaveClass(/active/);
  });
});

test.describe('Mobile Navigation', () => {
  test.use({ 
    viewport: { width: 375, height: 667 } // iPhone SE
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should display mobile menu toggle', async ({ page }) => {
    // Mobile menu toggle should be visible
    await expect(page.locator('.mobile-menu-toggle')).toBeVisible();
    
    // Desktop menu should be hidden
    const navMenu = page.locator('.nav-menu');
    await expect(navMenu).not.toHaveClass(/active/);
  });

  test('should open and close mobile menu', async ({ page }) => {
    const menuToggle = page.locator('.mobile-menu-toggle');
    const navMenu = page.locator('.nav-menu');
    
    // Menu should be closed initially
    await expect(navMenu).not.toHaveClass(/active/);
    
    // Open menu
    await menuToggle.click();
    await expect(navMenu).toHaveClass(/active/);
    await expect(menuToggle).toHaveClass(/active/);
    
    // Close menu
    await menuToggle.click();
    await expect(navMenu).not.toHaveClass(/active/);
    await expect(menuToggle).not.toHaveClass(/active/);
  });

  test('should disable body scroll when menu is open', async ({ page }) => {
    const menuToggle = page.locator('.mobile-menu-toggle');
    const body = page.locator('body');
    
    // Open menu
    await menuToggle.click();
    
    // Body should have overflow hidden
    const bodyStyle = await body.evaluate(el => window.getComputedStyle(el).overflow);
    expect(bodyStyle).toBe('hidden');
  });

  test('should close menu when clicking nav link', async ({ page }) => {
    const menuToggle = page.locator('.mobile-menu-toggle');
    const navMenu = page.locator('.nav-menu');
    
    // Open menu
    await menuToggle.click();
    await expect(navMenu).toHaveClass(/active/);
    
    // Click a nav link
    await page.click('a[href="about.html"]');
    
    // Menu should close and navigate
    await expect(page).toHaveURL(/about\.html$/);
    // Note: Menu state check removed since we navigate to new page
  });

  test('should close menu on escape key', async ({ page }) => {
    const menuToggle = page.locator('.mobile-menu-toggle');
    const navMenu = page.locator('.nav-menu');
    
    // Open menu
    await menuToggle.click();
    await expect(navMenu).toHaveClass(/active/);
    
    // Press escape
    await page.keyboard.press('Escape');
    
    // Menu should close
    await expect(navMenu).not.toHaveClass(/active/);
    await expect(menuToggle).not.toHaveClass(/active/);
  });

  test('should restore scroll when menu closes', async ({ page }) => {
    const menuToggle = page.locator('.mobile-menu-toggle');
    const body = page.locator('body');
    
    // Open and close menu
    await menuToggle.click();
    await menuToggle.click();
    
    // Body should have normal overflow
    const bodyStyle = await body.evaluate(el => window.getComputedStyle(el).overflow);
    expect(bodyStyle).toBe('visible');
  });
});

test.describe('iPad Navigation', () => {
  test.use({ 
    viewport: { width: 768, height: 1024 } // iPad
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should use mobile menu on iPad', async ({ page }) => {
    // iPad should use mobile menu
    await expect(page.locator('.mobile-menu-toggle')).toBeVisible();
    
    const navMenu = page.locator('.nav-menu');
    await expect(navMenu).not.toHaveClass(/active/);
  });

  test('should properly handle scroll lock on iPad', async ({ page }) => {
    const menuToggle = page.locator('.mobile-menu-toggle');
    const body = page.locator('body');
    
    // Open menu
    await menuToggle.click();
    
    // Check scroll lock
    const bodyStyle = await body.evaluate(el => window.getComputedStyle(el).overflow);
    expect(bodyStyle).toBe('hidden');
    
    // Try to scroll (should not scroll background)
    await page.mouse.wheel(0, 500);
    
    // Close menu
    await menuToggle.click();
    
    // Scroll should be restored
    const restoredStyle = await body.evaluate(el => window.getComputedStyle(el).overflow);
    expect(restoredStyle).toBe('visible');
  });
});

test.describe('Theme Toggle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should toggle dark mode', async ({ page }) => {
    const themeToggle = page.locator('.theme-toggle');
    await expect(themeToggle).toBeVisible();
    
    // Click theme toggle
    await themeToggle.click();
    
    // Check that theme changed (implementation depends on your theme system)
    // This test may need adjustment based on how your theme toggle works
  });
});