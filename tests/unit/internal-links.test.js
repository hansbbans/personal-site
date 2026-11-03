// Every same-site link in the public pages must point at an existing file,
// and any #fragment must match an id on the target page.
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '../..');
const pages = fs.readdirSync(root).filter((f) => f.endsWith('.html'));
const idsOf = (file) => new Set([...fs.readFileSync(path.join(root, file), 'utf8').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));

describe.each(pages)('%s', (page) => {
  const html = fs.readFileSync(path.join(root, page), 'utf8').replace(/<!--[\s\S]*?-->/g, '');
  const links = [...html.matchAll(/\s(?:href|src)="([^"]+)"/g)].map((m) => m[1])
    .filter((url) => !/^(https?:|mailto:|tel:|data:|javascript:|\/\/)/.test(url) && !url.includes('${'));

  test.each(links.length ? links : ['(none)'])('%s resolves', (url) => {
    if (url === '(none)') return;
    const [target, fragment] = url.split('#');
    const file = (target || page).split('?')[0];
    expect(fs.existsSync(path.join(root, file))).toBe(true);
    if (fragment && fragment !== 'top' && file.endsWith('.html')) {
      expect(idsOf(file).has(fragment)).toBe(true);
    }
  });
});
