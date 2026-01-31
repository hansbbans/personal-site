// Comprehensive Visual Testing Configuration
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/visual',
  fullyParallel: false, // Run sequentially for consistent screenshots
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1, // Single worker for consistent baselines
  reporter: [
    ['html', { outputFolder: 'test-results/visual-report' }],
    ['json', { outputFile: 'test-results/visual-results.json' }],
    ['list']
  ],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  
  // Visual comparison settings
  expect: {
    timeout: 10000,
    toHaveScreenshot: {
      // Allow 2.5% pixel difference (handles fonts, anti-aliasing)
      maxDiffPixelRatio: 0.025,
      // Allow some color difference (font rendering)
      threshold: 0.2,
      // Disable animations for consistent screenshots
      animations: 'disabled',
      // Hide caret for consistent text input screenshots
      caret: 'hide',
      // Scale to reduce flaky diffs from different monitor DPIs
      scale: 'device'
    },
  },

  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 }
      },
    },
  ],

  webServer: {
    command: 'npx http-server -p 3000 -c-1 --silent',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
  
  // Output directory for screenshots
  outputDir: 'test-results/visual-artifacts',
});
