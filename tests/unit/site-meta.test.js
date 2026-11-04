const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.join(__dirname, '../..');
const pages = fs.readdirSync(root).filter((f) => f.endsWith('.html'));

describe('og:image', () => {
  const images = pages.flatMap((page) => {
    const html = fs.readFileSync(path.join(root, page), 'utf8');
    return [...html.matchAll(/property="og:image" content="https:\/\/hanscho\.com\/([^"]+)"/g)].map((m) => [page, m[1]]);
  });

  test.each(images)('%s og:image %s exists and is under the 5 MB share-preview limit', (page, file) => {
    const full = path.join(root, file);
    expect(fs.existsSync(full)).toBe(true);
    expect(fs.statSync(full).size).toBeLessThan(5 * 1024 * 1024);
  });
});

const hasJq = (() => { try { execFileSync('jq', ['--version'], { stdio: 'ignore' }); return true; } catch { return false; } })();

describe('log-activity.sh', () => {
  // The script needs jq (present on macOS dev machines and ubuntu-latest)
  (hasJq ? test : test.skip)('a title with double quotes is logged and does not wipe the log', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'activity-'));
    const logFile = path.join(dir, 'activity-log.json');
    fs.writeFileSync(logFile, JSON.stringify([{ type: 'task', title: 'old', timestamp: 'x' }]));
    execFileSync('bash', [path.join(root, 'log-activity.sh'), 'task', 'Fixed the "photos" page'], {
      env: { ...process.env, LOG_FILE: logFile }
    });
    const log = JSON.parse(fs.readFileSync(logFile, 'utf8'));
    expect(log.map((e) => e.title)).toEqual(['Fixed the "photos" page', 'old']);
    fs.rmSync(dir, { recursive: true });
  });
});
