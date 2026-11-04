const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '../..');

describe.each(['admin.html', 'admin-enhanced.html', 'food-admin.html'])('%s', (page) => {
  beforeAll(() => {
    document.documentElement.innerHTML = fs.readFileSync(path.join(root, page), 'utf8');
  });

  test('every form control has an accessible name', () => {
    const unnamed = [...document.querySelectorAll('input, select, textarea')]
      .filter((el) => el.type !== 'hidden')
      .filter((el) => !el.getAttribute('aria-label') && !el.closest('label') &&
        !(el.id && document.querySelector(`label[for="${el.id}"]`)))
      .map((el) => el.id || el.outerHTML.slice(0, 60));
    expect(unnamed).toEqual([]);
  });

  test('every image has an alt attribute', () => {
    const missing = [...document.querySelectorAll('img:not([alt])')].map((el) => el.id || el.outerHTML.slice(0, 60));
    expect(missing).toEqual([]);
  });
});
