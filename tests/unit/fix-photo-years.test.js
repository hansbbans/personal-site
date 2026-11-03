const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const script = path.join(__dirname, '../../fix-photo-years.js');
const item = (file, year) => `
  <div class="photo-item">
    <img src="images/${file}" alt="Photo" loading="lazy">
    <div class="photo-overlay">
      <span class="photo-location">Somewhere</span>
      <span class="photo-year">${year}</span>
    </div>
  </div>`;

test('only fills the TBD year of the photo it belongs to', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'years-'));
  fs.writeFileSync(path.join(dir, 'photos.html'), item('a.jpg', '2019') + item('b.jpg', 'TBD'));
  fs.writeFileSync(path.join(dir, 'photo-metadata.json'), JSON.stringify({ 'a.jpg': { year: 2016 }, 'b.jpg': { year: 2024 } }));
  execFileSync('node', [script], { cwd: dir, stdio: 'pipe' });
  const html = fs.readFileSync(path.join(dir, 'photos.html'), 'utf8');
  expect(html).toBe(item('a.jpg', '2019') + item('b.jpg', '2024'));
  fs.rmSync(dir, { recursive: true });
});
