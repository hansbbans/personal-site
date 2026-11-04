const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const { updateHtml } = require('../../update-photo-html');
const { extract } = require('../../scripts/extract-photo-metadata');

const root = path.join(__dirname, '../..');
const item = (file, { alt = 'A descriptive alt', location = 'Somewhere', unknown = false, year = '2019' } = {}) => `
                    <div class="photo-item">
                        <img src="images/${file}" alt="${alt}" width="1200" height="800" loading="lazy">
                        <div class="photo-overlay">
                            <span class="photo-location${unknown ? ' photo-location-unknown' : ''}">${location}</span>
                            <span class="photo-year">${year}</span>
                        </div>
                    </div>`;

describe('update-photo-html.js', () => {
  test('updates only the matching photo and keeps alt text, classes and structure', () => {
    const before = item('a.jpg') + item('b.jpg', { unknown: true, location: 'Location unavailable' }) + item('c.jpg');
    const { html } = updateHtml(before, { 'b.jpg': { year: '2024', location: 'Update location' } });
    expect(html).toBe(item('a.jpg') + item('b.jpg', { unknown: true, location: 'Location unavailable', year: '2024' }) + item('c.jpg'));
  });

  test('fills a real location only where the page shows a placeholder', () => {
    const before = item('a.jpg', { location: 'Update location' }) + item('b.jpg', { location: 'Paris, France' });
    const { html } = updateHtml(before, { 'a.jpg': { year: '2019', location: 'Kyoto' }, 'b.jpg': { year: '2019', location: 'London' } });
    expect(html).toBe(item('a.jpg', { location: 'Kyoto' }) + item('b.jpg', { location: 'Paris, France' }));
  });

  test('running on the real gallery keeps every photo and balanced markup', () => {
    const before = fs.readFileSync(path.join(root, 'photos.html'), 'utf8');
    const metadata = JSON.parse(fs.readFileSync(path.join(root, 'photo-metadata.json'), 'utf8'));
    const { html } = updateHtml(before, metadata);
    const count = (h, re) => (h.match(re) || []).length;
    expect(count(html, /class="photo-item"/g)).toBe(count(before, /class="photo-item"/g));
    expect(count(html, /<div/g)).toBe(count(html, /<\/div>/g));
    expect(count(html, /alt="Photo from/g)).toBe(0);
    expect(count(html, /photo-location-unknown/g)).toBe(count(before, /photo-location-unknown/g));
  });
});

describe('extract-photo-metadata', () => {
  test('keeps curated fields and fills missing ones from EXIF', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'meta-'));
    fs.mkdirSync(path.join(dir, 'images'));
    for (const f of ['photo_1769611697853_1.jpg', 'R0002049.jpg']) {
      fs.copyFileSync(path.join(root, 'images', f), path.join(dir, 'images', f));
    }
    const curated = { year: '2025', location: 'Paris, France', date: '2025-05-16', description: 'Curated' };
    fs.writeFileSync(path.join(dir, 'photo-metadata.json'), JSON.stringify({ 'photo_1769611697853_1.jpg': curated }));
    jest.spyOn(console, 'log').mockImplementation(() => {});
    const result = extract(dir);
    expect(result['photo_1769611697853_1.jpg']).toEqual(curated);
    expect(result['R0002049.jpg']).toMatchObject({ year: '2025', date: '2025-05-12' });
    fs.rmSync(dir, { recursive: true });
  });

  test('shell wrapper runs the extractor', () => {
    const script = fs.readFileSync(path.join(root, 'extract-photo-metadata.sh'), 'utf8');
    expect(script).toContain('node scripts/extract-photo-metadata.js');
    execFileSync('bash', ['-n', path.join(root, 'extract-photo-metadata.sh')]);
  });
});
