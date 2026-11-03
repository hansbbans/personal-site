// photo-loader.js requests images/optimized/{small,medium,large}/<file> for
// every gallery photo, so each one needs all three sizes.
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '../..');
const html = fs.readFileSync(path.join(root, 'photos.html'), 'utf8').replace(/<!--[\s\S]*?-->/g, '');
const files = [...html.matchAll(/<img src="images\/([^"/]+)"/g)].map((m) => m[1]);

test('gallery has photos', () => {
  expect(files.length).toBeGreaterThan(0);
});

test.each(files)('%s has optimized small, medium and large versions', (file) => {
  for (const size of ['small', 'medium', 'large']) {
    expect(fs.existsSync(path.join(root, 'images/optimized', size, file))).toBe(true);
  }
});
