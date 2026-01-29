# 🧪 Testing Suite

Comprehensive testing setup for hanscho.com to ensure reliability, performance, and visual consistency.

## 🏗️ Test Structure

```
tests/
├── e2e/                    # End-to-end tests (Playwright)
│   ├── photos.spec.js      # Photo gallery functionality
│   └── navigation.spec.js  # Navigation & mobile menu
├── unit/                   # Unit tests (Jest)
│   └── photo-loader.test.js # JavaScript component tests
├── performance/            # Performance tests (Lighthouse CI)
│   └── lighthouse.spec.js   # Performance benchmarks
├── visual/                 # Visual regression tests
│   └── screenshots.spec.js # UI consistency tests
└── setup/                  # Test configuration
    └── jest.setup.js       # Jest test environment
```

## 🚀 Quick Start

### Install Dependencies
```bash
npm install
npm run install-browsers  # Install Playwright browsers
```

### Run All Tests
```bash
./run-tests.sh            # Comprehensive test suite
```

### Individual Test Types
```bash
npm run test:unit          # Unit tests only
npm run test:e2e           # E2E tests only
npm run test:performance   # Lighthouse performance tests
npm run test:coverage      # Unit tests with coverage report
```

### Development
```bash
npm run test:watch         # Unit tests in watch mode
npm run serve              # Start local server for manual testing
```

## 📊 What's Tested

### ✅ Photo Gallery
- **Lazy Loading**: Progressive image loading as user scrolls
- **Lightbox Navigation**: Arrow keys, touch swipes, keyboard shortcuts
- **Responsive Images**: Correct image sizes for different viewports
- **Metadata Display**: Location and year information
- **Performance**: Image optimization and loading speed

### 🧭 Navigation
- **Mobile Menu**: Touch interaction, scroll locking, escape handling
- **Responsive Design**: Desktop, tablet, and mobile layouts
- **iPad-specific**: Fixed scroll bleeding issue
- **Keyboard Navigation**: Full accessibility support

### 🚀 Performance
- **Core Web Vitals**: LCP, FCP, CLS within targets
- **Image Optimization**: Proper WebP/JPEG serving
- **Bundle Size**: Efficient JavaScript loading
- **Accessibility**: Color contrast, alt text, keyboard navigation

### 👀 Visual Regression
- **UI Consistency**: Screenshots across updates
- **Component States**: Normal, hover, active states
- **Responsive Layouts**: Multiple viewport sizes
- **Theme Variations**: Light/dark mode consistency

## 🎯 Performance Targets

| Metric | Target | Description |
|--------|--------|-------------|
| **First Contentful Paint** | < 2.0s | Time to first content |
| **Largest Contentful Paint** | < 2.5s | Main content load time |
| **Cumulative Layout Shift** | < 0.1 | Visual stability score |
| **Performance Score** | > 80 | Overall Lighthouse score |
| **Accessibility Score** | > 90 | A11y compliance |

## 🔧 Configuration

### Playwright (E2E Tests)
- **Browsers**: Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari, iPad
- **Viewport Testing**: Responsive design validation
- **Network Conditions**: Fast 3G simulation
- **Screenshots**: Failure capture for debugging

### Jest (Unit Tests)
- **Environment**: jsdom for DOM testing
- **Coverage**: 70% threshold for branches, functions, lines
- **Mocks**: IntersectionObserver, Image, Canvas APIs
- **Timeout**: 10s for async operations

### Lighthouse (Performance)
- **Metrics**: Core Web Vitals + custom thresholds
- **Assertions**: Performance, accessibility, best practices
- **Multiple Runs**: Average of 3 runs for consistency
- **Desktop Preset**: Optimized for desktop experience

## 📈 CI/CD Integration

### GitHub Actions
- **Automated Testing**: On every push and PR
- **Multi-Browser Support**: Cross-browser compatibility
- **Performance Monitoring**: Lighthouse CI integration  
- **Visual Regression**: Screenshot comparison
- **Security Scanning**: Dependency vulnerability checks

### Test Results
- **Coverage Reports**: Detailed unit test coverage
- **E2E Reports**: Interactive HTML reports with traces
- **Performance Reports**: Lighthouse audit results
- **Visual Diffs**: Screenshot comparison results

## 🐛 Debugging

### Test Failures
```bash
# Run specific test
npx playwright test photos.spec.js

# Debug mode (opens browser)
npx playwright test --debug

# View test report
npx playwright show-report
```

### Performance Issues
```bash
# Detailed Lighthouse audit
npx lhci autorun --upload.target=temporary-public-storage

# Local performance testing
npm run serve & npm run test:performance
```

### Visual Differences
```bash
# Update visual baselines
npx playwright test --update-snapshots

# Compare visual diffs
npx playwright show-report visual-test-results
```

## 📝 Writing New Tests

### E2E Test Template
```javascript
test('should do something', async ({ page }) => {
  await page.goto('/path');
  await page.waitForSelector('.selector');
  
  // Your test actions
  await page.click('.button');
  
  // Assertions
  await expect(page.locator('.result')).toBeVisible();
});
```

### Unit Test Template
```javascript
test('should test component behavior', () => {
  // Setup
  document.body.innerHTML = '<div>test</div>';
  
  // Execute
  const component = new MyComponent();
  component.doSomething();
  
  // Assert
  expect(component.state).toBe('expected');
});
```

### Performance Test Template
```javascript
test('should meet performance targets', async ({ page }) => {
  const startTime = Date.now();
  await page.goto('/path');
  const loadTime = Date.now() - startTime;
  
  expect(loadTime).toBeLessThan(2000);
});
```

## 🔄 Maintenance

### Regular Tasks
- **Update Baselines**: When UI intentionally changes
- **Review Performance**: Monitor Core Web Vitals trends
- **Security Audits**: Keep dependencies updated
- **Browser Compatibility**: Test new browser versions

### Thresholds Review
- **Performance Budgets**: Adjust based on real-world data
- **Visual Diff Tolerance**: Fine-tune for false positives
- **Test Timeouts**: Optimize for CI environment

---

## 🎯 Benefits

✅ **Catch Issues Early**: Prevent bugs from reaching production  
✅ **Performance Monitoring**: Ensure fast, optimized user experience  
✅ **Visual Consistency**: Maintain professional appearance  
✅ **Cross-Browser Support**: Work reliably everywhere  
✅ **Accessibility Compliance**: Inclusive user experience  
✅ **Confident Deployments**: Deploy with confidence