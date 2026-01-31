# Testing Suite Documentation

This directory contains the comprehensive testing suite for hanscho.com/personal-site.

## Test Types

### 1. Visual Regression Tests (`tests/visual/`)
- **Screenshot Diff Testing**: Compares page screenshots against baselines
- **Pages tested**: index, food.html, photos.html
- **Config**: `playwright.comprehensive.config.js`

### 2. Mobile Viewport Tests
- Tests at 6 viewport sizes: iPhone SE, iPhone 12, iPad Mini, iPad Pro, Desktop, Desktop Large
- Detects horizontal overflow and layout breaks
- Configured in `comprehensive-visual.spec.js`

### 3. JSON Schema Validation (`tests/schemas/`, `tests/setup/`)
- Validates `food-data.json` structure
- Checks coordinates (lat: -90 to 90, lng: -180 to 180)
- Validates ratings (0-5 range)
- Checks category consistency

### 4. Existing Tests
- Link checking (lychee)
- Lighthouse performance
- Console error detection
- E2E navigation tests

## Running Tests Locally

```bash
# Install dependencies
npm ci

# Install Playwright browsers
npx playwright install chromium

# Run all tests
npm test

# Run specific test suites
npm run test:visual          # Visual regression
npm run test:visual:update   # Update baselines
npm run test:schema          # JSON validation
npm run test:mobile          # Mobile viewport tests
npm run test:e2e             # E2E tests
```

## CI/CD Integration

All tests run on GitHub Actions:
- Push to main
- Pull requests
- Daily scheduled runs

## Updating Baselines

When intentional visual changes are made:

```bash
npm run test:visual:update
```

Commit the updated snapshots in `tests/visual/__snapshots__/`

## Test Artifacts

On failure, CI uploads:
- Test reports (`test-results/`)
- Actual screenshots
- Diff images
- HTML reports

## Directory Structure

```
tests/
├── e2e/                    # End-to-end tests
├── schemas/                # JSON schemas
│   └── food-data.schema.json
├── setup/                  # Test setup scripts
│   └── validate-food-data.js
├── unit/                   # Unit tests
├── visual/                 # Visual regression tests
│   ├── __snapshots__/      # Baseline screenshots
│   ├── comprehensive-visual.spec.js
│   └── screenshots.spec.js
└── README.md
```
