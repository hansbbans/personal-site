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

test.describe('Photos lightbox keyboard and dialog semantics', () => {
  test('a photo can be opened with the keyboard and focus returns on close', async ({ page }) => {
    await page.goto('/photos.html');
    const item = page.locator('.photo-item').nth(2);
    await item.focus();
    expect(await item.evaluate((el) => el === document.activeElement)).toBe(true);
    await page.keyboard.press('Enter');
    await expect(page.locator('#lightbox')).toHaveClass(/active/);
    expect(await page.evaluate(() => !!document.activeElement.closest('#lightbox'))).toBe(true);
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      expect(await page.evaluate(() => !!document.activeElement.closest('#lightbox'))).toBe(true);
    }
    await page.keyboard.press('Escape');
    await expect(page.locator('#lightbox')).not.toHaveClass(/active/);
    expect(await item.evaluate((el) => el === document.activeElement)).toBe(true);
  });

  test('lightbox is a labelled modal dialog with named buttons', async ({ page }) => {
    await page.goto('/photos.html');
    const lightbox = page.locator('#lightbox');
    await expect(lightbox).toHaveAttribute('role', 'dialog');
    await expect(lightbox).toHaveAttribute('aria-modal', 'true');
    for (const id of ['#lightbox-close', '#lightbox-prev', '#lightbox-next']) {
      await expect(page.locator(id)).toHaveAttribute('aria-label', /.+/);
    }
  });
});

test.describe('Food page map', () => {
  // Minimal Maps stub that, like the real loader, calls the callback named in the URL.
  const mapsStub = `
    window.__mapCenters = [];
    window.google = { maps: {
      Map: class { constructor(el, opts) { window.__mapCreated = true; window.__mapCenters.push(opts.center); }
        setCenter(c) { window.__mapCenters.push(c); } setZoom() {} fitBounds() {} getZoom() { return 12; }
        addListener() {} controls = {}; },
      Marker: class { constructor() {} setMap() {} addListener() {} },
      InfoWindow: class { open() {} close() {} setContent() {} },
      LatLngBounds: class { extend() {} },
      event: { trigger() {}, addListenerOnce() {}, addListener() {} },
      ControlPosition: {}, SymbolPath: {}, Size: class {}, Point: class {}
    } };
    window.initMap();`;

  const stubMaps = (page) => page.route(/maps\.googleapis\.com/, (route) =>
    route.fulfill({ contentType: 'text/javascript', body: mapsStub }));

  test('map is created even when the Maps API loads before food.js', async ({ page }) => {
    const errors = [];
    page.on('pageerror', (e) => { if (!e.message.includes('cloudflareinsights')) errors.push(e.message); });
    await stubMaps(page);
    await page.route(/js\/food\.js/, async (route) => {
      await new Promise((r) => setTimeout(r, 300));
      await route.continue();
    });
    await page.goto('/food.html');
    await page.waitForSelector('.card-interactive');
    expect(errors).toEqual([]);
    expect(await page.evaluate(() => window.__mapCreated === true)).toBe(true);
  });

  test('empty filter result keeps the map on the selected city', async ({ page }) => {
    await stubMaps(page);
    await page.goto('/food.html');
    await page.waitForSelector('.card-interactive');
    await page.click('#mapToggle');
    await page.locator('.city-tab', { hasText: 'Kyoto' }).click();
    await page.click('.main-category-pill[data-category="Bars & Drinks"]');
    const last = await page.evaluate(() => window.__mapCenters[window.__mapCenters.length - 1]);
    // Kyoto is ~35.0N 135.7E, not the NYC fallback
    expect(last.lat).toBeGreaterThan(34);
    expect(last.lat).toBeLessThan(36);
    expect(last.lng).toBeGreaterThan(135);
  });
});

test.describe('Small and short viewports', () => {
  test('every mobile menu link can be reached on a landscape phone', async ({ page }) => {
    await page.setViewportSize({ width: 667, height: 320 });
    await page.goto('/index.html');
    await page.click('.mobile-menu-toggle');
    await expect(page.locator('.nav-menu')).toHaveClass(/active/);
    await page.waitForTimeout(400); // slide-in transition
    const last = page.locator('.nav-menu a').last();
    await last.evaluate((el) => el.scrollIntoView({ block: 'end' }));
    const bottom = await last.evaluate((el) => el.getBoundingClientRect().bottom);
    expect(bottom).toBeLessThanOrEqual(320);
  });

  test('photos page does not scroll sideways at 320px', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto('/photos.html');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});

test.describe('Food admin add form', () => {
  test.beforeEach(async ({ page }) => {
    await page.route(/sheets\.googleapis\.com/, (route) =>
      route.fulfill({ contentType: 'application/json', body: JSON.stringify({ values: [] }) }));
    await page.goto('/food-admin.html');
  });

  test('auto-filled legacy category follows later subcategory changes', async ({ page }) => {
    await page.selectOption('#mainCategory', 'Asian');
    await page.selectOption('#subcategory', 'Japanese');
    await expect(page.locator('#legacyCategory')).toHaveValue('Japanese');
    await page.selectOption('#subcategory', 'Korean');
    await expect(page.locator('#legacyCategory')).toHaveValue('Korean');
  });

  test('a typed legacy category is not overwritten', async ({ page }) => {
    await page.selectOption('#mainCategory', 'Asian');
    await page.fill('#legacyCategory', 'Ramen');
    await page.selectOption('#subcategory', 'Japanese');
    await expect(page.locator('#legacyCategory')).toHaveValue('Ramen');
  });

  test('form reset after adding puts subcategory back to its initial state', async ({ page }) => {
    await page.selectOption('#mainCategory', 'Asian');
    await page.selectOption('#subcategory', 'Japanese');
    await page.fill('#restaurantName', 'Test Place');
    await page.click('button[onclick="app.addRestaurant()"]');
    await expect(page.locator('#subcategory')).toBeDisabled();
    await expect(page.locator('#subcategory option')).toHaveText(['Select main category first']);
  });

  test('an error is not hidden by an earlier success message timer', async ({ page }) => {
    await page.clock.install();
    await page.selectOption('#mainCategory', 'Asian');
    await page.selectOption('#subcategory', 'Japanese');
    await page.fill('#restaurantName', 'Test Place');
    await page.click('button[onclick="app.addRestaurant()"]');
    await page.clock.runFor(3000);
    await page.click('button[onclick="app.addRestaurant()"]'); // empty form -> error
    await expect(page.locator('#statusBar')).toHaveClass(/error/);
    await page.clock.runFor(3000);
    await expect(page.locator('#statusBar')).not.toHaveClass(/hidden/);
  });
});

test.describe('Sheets API errors', () => {
  for (const [path, grid, message] of [['/books.html', '#booksGrid', 'Unable to load books.'], ['/gear.html', '#gearGrid', 'Unable to load gear.']]) {
    test(`${path} shows the load error when the Sheets API returns an error`, async ({ page }) => {
      await page.route(/sheets\.googleapis\.com/, (route) => route.fulfill({
        status: 403, contentType: 'application/json',
        body: JSON.stringify({ error: { code: 403, message: 'API key not valid' } })
      }));
      await page.goto(path);
      await expect(page.locator(grid)).toContainText(message);
    });
  }
});

test.describe('Food admin cities', () => {
  test('every sheet in the spreadsheet is selectable and manageable', async ({ page }) => {
    const sheets = ['NYC', 'Toronto', 'Kyoto', 'Mexico City'];
    await page.route(/sheets\.googleapis\.com/, (route) => {
      const url = decodeURIComponent(route.request().url());
      if (!url.includes('/values/')) {
        return route.fulfill({ contentType: 'application/json', body: JSON.stringify({ sheets: sheets.map((title) => ({ properties: { title } })) }) });
      }
      const sheet = url.split('/values/')[1].split('?')[0];
      return route.fulfill({ contentType: 'application/json', body: JSON.stringify({ values: [['Name', 'Category'], [`${sheet} Spot`, 'Ramen']] }) });
    });
    await page.goto('/food-admin.html');
    await expect(page.locator('#citySelect option')).toHaveText(sheets);
    await page.click('button[data-tab="manage"]');
    await page.locator('#manageCityTabs .city-tab', { hasText: 'Mexico City' }).click();
    await expect(page.locator('#restaurantList')).toContainText('Mexico City Spot');
  });
});

test.describe('Food data rendering', () => {
  test('restaurant text is rendered as text, not HTML', async ({ page }) => {
    const data = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, '../../data/food-data.json'), 'utf8'));
    data.cities[0].restaurants[0].dishes = 'Bagel, <img src=x onerror="window.__xss=1">';
    data.cities[0].restaurants[0].name = 'Fish <b>&</b> Chips';
    await page.route(/maps\.googleapis\.com/, (route) => route.abort());
    await page.route(/data\/food-data\.json/, (route) => route.fulfill({ contentType: 'application/json', body: JSON.stringify(data) }));
    await page.goto('/food.html');
    await page.waitForSelector('.food-card');
    await page.waitForTimeout(300);
    expect(await page.evaluate(() => window.__xss)).toBeUndefined();
    await expect(page.locator('.food-card-name', { hasText: 'Fish <b>&</b> Chips' })).toHaveCount(1);
  });
});

test.describe('Michelin badges', () => {
  test('starred and Bib Gourmand restaurants show a Michelin badge', async ({ page }) => {
    await page.route(/maps\.googleapis\.com/, (route) => route.abort());
    await page.goto('/food.html');
    await page.locator('.city-tab', { hasText: 'NYC' }).click();
    const card = (name) => page.locator('.food-card', { has: page.locator('.food-card-name', { hasText: name }) });
    await expect(card('Atomix').locator('.badge-michelin')).toContainText('2');
    await expect(card('Rubirosa').locator('.badge-michelin')).toContainText('Bib Gourmand');
    await expect(card('Sushi Ishikawa').locator('.badge-michelin')).toHaveCount(0);
  });
});

test.describe('Dark mode contrast', () => {
  // Contrast of an element's text against its composited solid background.
  const contrastOf = (locator) => locator.evaluate((el) => {
    const parse = (c) => { const m = c.match(/[\d.]+/g).map(Number); return { r: m[0], g: m[1], b: m[2], a: m[3] ?? 1 }; };
    const layers = [];
    for (let node = el; node; node = node.parentElement) {
      const bg = parse(getComputedStyle(node).backgroundColor);
      if (bg.a > 0) { layers.push(bg); if (bg.a === 1) break; }
    }
    let base = { r: 255, g: 255, b: 255 };
    for (const l of layers.reverse()) base = { r: l.r * l.a + base.r * (1 - l.a), g: l.g * l.a + base.g * (1 - l.a), b: l.b * l.a + base.b * (1 - l.a) };
    const lum = ({ r, g, b }) => [r, g, b].map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; })
      .reduce((s, v, i) => s + v * [0.2126, 0.7152, 0.0722][i], 0);
    const fg = parse(getComputedStyle(el).color);
    const [hi, lo] = [lum(fg), lum(base)].sort((a, b) => b - a);
    return (hi + 0.05) / (lo + 0.05);
  });

  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.route(/maps\.googleapis\.com/, (route) => route.abort());
    await page.route(/sheets\.googleapis\.com/, (route) => route.fulfill({ contentType: 'application/json', body: JSON.stringify({ values: [
      ['Title', 'Author', 'Category', 'Rating', 'Status', 'Notes', 'Link'],
      ['Book', 'Author', 'Fiction', '4', 'Read', 'Notes', 'https://www.amazon.com/dp/B000000000']
    ] }) }));
  });

  test('primary button on the home page', async ({ page }) => {
    await page.goto('/index.html');
    expect(await contrastOf(page.locator('.cta-primary'))).toBeGreaterThanOrEqual(3);
  });

  test('active category pill, its count and the Amazon button on the books page', async ({ page }) => {
    await page.goto('/books.html');
    expect(await contrastOf(page.locator('.category-pill.active').first())).toBeGreaterThanOrEqual(3);
    expect(await contrastOf(page.locator('.category-pill.active .count').first())).toBeGreaterThanOrEqual(3);
    await page.locator('.book-cover-item').first().click();
    expect(await contrastOf(page.locator('.btn-amazon'))).toBeGreaterThanOrEqual(3);
  });

  test('home-city count badge on the food page', async ({ page }) => {
    await page.goto('/food.html');
    expect(await contrastOf(page.locator('.city-tab.home-base.active .city-count'))).toBeGreaterThanOrEqual(3);
  });
});

test.describe('Books detail panel scrolling', () => {
  const books = Array.from({ length: 30 }, (_, i) => [`Book ${i}`, `Author ${i}`, 'Fiction', '4', 'Read', 'Some notes', '']);
  test.beforeEach(async ({ page }) => {
    await page.route(/sheets\.googleapis\.com/, (route) =>
      route.fulfill({ contentType: 'application/json', body: JSON.stringify({ values: [['Title', 'Author', 'Category'], ...books] }) }));
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/books.html');
  });

  const panelVsNav = (page) => page.evaluate(() => ({
    navBottom: document.querySelector('.navbar').getBoundingClientRect().bottom,
    panel: document.querySelector('.book-detail-panel.visible').getBoundingClientRect().toJSON()
  }));

  test('opening a second book does not hide its panel under the sticky nav', async ({ page }) => {
    await page.locator('.book-cover-item').nth(0).click();
    await page.waitForTimeout(800);
    await page.locator('.book-cover-item').nth(14).click();
    await page.waitForTimeout(1000);
    const { navBottom, panel } = await panelVsNav(page);
    expect(panel.top).toBeGreaterThanOrEqual(navBottom);
  });

  test('a panel below the fold is scrolled into view', async ({ page }) => {
    await page.locator('.book-cover-item').nth(14).click();
    await page.waitForTimeout(1000);
    const { navBottom, panel } = await panelVsNav(page);
    expect(panel.top).toBeGreaterThanOrEqual(navBottom);
    expect(panel.top).toBeLessThan(667);
  });
});

test.describe('Photo placeholders', () => {
  test('placeholders match the theme and the photo shape', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    // Hold optimized images so the placeholders stay up
    await page.route(/images\/optimized\//, async (route) => {
      await new Promise((r) => setTimeout(r, 5000));
      await route.abort().catch(() => {});
    });
    await page.goto('/photos.html', { waitUntil: 'domcontentloaded' });
    const info = await page.locator('.photo-item img').first().evaluate(async (img) => {
      await img.decode().catch(() => {});
      const c = document.createElement('canvas');
      c.width = img.naturalWidth; c.height = img.naturalHeight;
      const ctx = c.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
      return { r, g, b, ratio: img.naturalWidth / img.naturalHeight, attrRatio: img.width / img.height,
        declared: Number(img.getAttribute('width')) / Number(img.getAttribute('height')) };
    });
    expect((info.r + info.g + info.b) / 3).toBeLessThan(80);
    expect(info.declared).toBeGreaterThan(0);
    expect(Math.abs(info.ratio - info.declared)).toBeLessThan(0.1);
  });
});
