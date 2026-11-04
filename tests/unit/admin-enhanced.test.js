/**
 * @jest-environment jsdom
 */
const fs = require('fs');
const path = require('path');
const { TextDecoder } = require('util');

// jsdom does not expose TextDecoder; browsers do.
global.TextDecoder = global.TextDecoder || TextDecoder;

const root = path.join(__dirname, '../..');
const photosHtml = fs.readFileSync(path.join(root, 'photos.html'), 'utf8');

const loadAdminClass = () => {
  const src = fs.readFileSync(path.join(root, 'js/admin-enhanced.js'), 'utf8');
  const classSrc = src.slice(0, src.indexOf('// Global app instance'));
  return new Function(`${classSrc}\nreturn PhotoAdminApp;`)();
};

const makeApp = () => {
  const PhotoAdminApp = loadAdminClass();
  const app = Object.create(PhotoAdminApp.prototype);
  app.config = { repoOwner: 'owner', repoName: 'repo', githubToken: 't' };
  app.deletedPhotos = new Set();
  app.changes = new Map();
  return app;
};

const realPhotoCount = (html) =>
  (html.replace(/<!--[\s\S]*?-->/g, '').match(/<div class="photo-item"/g) || []).length;

describe('PhotoAdminApp photos.html round trip', () => {
  test('parses every photo, including ones with an unknown location, and skips commented-out templates', () => {
    const app = makeApp();
    const photos = app.parsePhotosFromHtml(photosHtml);
    expect(photos).toHaveLength(realPhotoCount(photosHtml));
    expect(photos.map((p) => p.src)).not.toContain('images/your-photo-name.jpg');
  });

  test('committed HTML keeps all photos, relative image paths and the unknown-location class', () => {
    const app = makeApp();
    app.photos = app.parsePhotosFromHtml(photosHtml);
    app.originalPhotosHtml = photosHtml;
    const html = app.generatePreviewHtml();

    expect(realPhotoCount(html)).toBe(realPhotoCount(photosHtml));
    expect(html).not.toContain('raw.githubusercontent.com');
    expect((html.match(/photo-location-unknown/g) || []).length)
      .toBe((photosHtml.match(/photo-location-unknown/g) || []).length);
  });

  test('committed HTML keeps image width/height attributes', () => {
    const app = makeApp();
    app.photos = app.parsePhotosFromHtml(photosHtml);
    app.originalPhotosHtml = photosHtml;
    const html = app.generatePreviewHtml();
    const dims = (h) => [...h.replace(/<!--[\s\S]*?-->/g, '').matchAll(/<img [^>]*width="(\d+)" height="(\d+)"/g)].map((m) => m[0].match(/src="[^"]+"|width="\d+"|height="\d+"/g).join(' '));
    expect(dims(html)).toEqual(dims(photosHtml));
  });

  test('editing an unknown location drops the unknown-location class for that photo', () => {
    const app = makeApp();
    app.photos = app.parsePhotosFromHtml(photosHtml);
    app.originalPhotosHtml = photosHtml;
    const unknown = app.photos.find((p) => p.locationUnknown);
    unknown.location = 'Kraków';
    const html = app.generatePreviewHtml();
    expect(html).toContain('<span class="photo-location">Kraków</span>');
  });

  test('tag and description edits are written and read back', () => {
    const app = makeApp();
    app.photos = app.parsePhotosFromHtml(photosHtml);
    app.originalPhotosHtml = photosHtml;
    Object.assign(app.photos[0], { tags: ['travel', 'night'], description: 'Late set "after hours" <live>' });
    const html = app.generatePreviewHtml();
    const reparsed = app.parsePhotosFromHtml(html);
    expect(reparsed[0].tags).toEqual(['travel', 'night']);
    expect(reparsed[0].description).toBe('Late set "after hours" <live>');
    expect(reparsed).toHaveLength(app.photos.length);
  });

  test('special characters in location and alt survive repeated commits unchanged', () => {
    const app = makeApp();
    app.photos = app.parsePhotosFromHtml(photosHtml);
    app.originalPhotosHtml = photosHtml;
    Object.assign(app.photos[0], { location: 'Rock & Roll "Hall" <of> Fame', alt: 'A "quoted" alt & more' });
    const first = app.generatePreviewHtml();
    const again = makeApp();
    again.photos = again.parsePhotosFromHtml(first);
    again.originalPhotosHtml = first;
    expect(again.photos[0].location).toBe('Rock & Roll "Hall" <of> Fame');
    expect(again.photos[0].alt).toBe('A "quoted" alt & more');
    expect(again.generatePreviewHtml()).toBe(first);
  });

  test('decodes GitHub base64 content as UTF-8', () => {
    const app = makeApp();
    const b64 = Buffer.from(photosHtml, 'utf8').toString('base64').replace(/(.{60})/g, '$1\n');
    expect(app.decodeGitHubContent(b64)).toBe(photosHtml);
  });
});

describe('PhotoAdminApp upload naming', () => {
  test('optimized uploads are saved with a .jpg extension', async () => {
    const app = makeApp();
    global.fetch = jest.fn(async () => ({ ok: true, json: async () => ({}) }));
    await app.uploadToGitHub({ filename: 'shot.PNG', dataUrl: 'data:image/png;base64,AAAA', optimizedDataUrl: 'BBBB' });
    expect(global.fetch.mock.calls[0][0]).toMatch(/\.jpg$/);
  });

  test('unoptimized uploads keep their original extension', async () => {
    const app = makeApp();
    global.fetch = jest.fn(async () => ({ ok: true, json: async () => ({}) }));
    await app.uploadToGitHub({ filename: 'shot.PNG', dataUrl: 'data:image/png;base64,AAAA' });
    expect(global.fetch.mock.calls[0][0]).toMatch(/\.png$/);
  });
});
