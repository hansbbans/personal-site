#!/usr/bin/env node
// Fill photo-metadata.json with capture dates read from each gallery photo's
// EXIF data. Existing entries are merged, never replaced: curated year,
// location, date and description values are kept; only missing fields are
// filled in.
const fs = require('fs');
const path = require('path');

// Minimal EXIF reader: returns DateTimeOriginal (or DateTime) as YYYY-MM-DD.
function readExifDate(file) {
  const buf = fs.readFileSync(file);
  if (buf.readUInt16BE(0) !== 0xffd8) return null;
  let offset = 2;
  while (offset + 4 <= buf.length) {
    const marker = buf.readUInt16BE(offset);
    const size = buf.readUInt16BE(offset + 2);
    if (marker === 0xffe1 && buf.toString('latin1', offset + 4, offset + 10) === 'Exif\0\0') {
      return parseTiffDate(buf, offset + 10);
    }
    if ((marker & 0xff00) !== 0xff00 || marker === 0xffda) break;
    offset += 2 + size;
  }
  return null;
}

function parseTiffDate(buf, tiff) {
  const little = buf.toString('latin1', tiff, tiff + 2) === 'II';
  const u16 = (o) => (little ? buf.readUInt16LE(o) : buf.readUInt16BE(o));
  const u32 = (o) => (little ? buf.readUInt32LE(o) : buf.readUInt32BE(o));
  const readIfd = (ifd) => {
    const tags = {};
    const count = u16(tiff + ifd);
    for (let i = 0; i < count; i++) {
      const entry = tiff + ifd + 2 + i * 12;
      tags[u16(entry)] = { count: u32(entry + 4), value: u32(entry + 8) };
    }
    return tags;
  };
  const ascii = (tag) => (tag ? buf.toString('latin1', tiff + tag.value, tiff + tag.value + tag.count - 1) : null);

  const ifd0 = readIfd(u32(tiff + 4));
  const exif = ifd0[0x8769] ? readIfd(ifd0[0x8769].value) : {};
  const raw = ascii(exif[0x9003]) || ascii(ifd0[0x0132]);
  const m = raw && raw.match(/^(\d{4}):(\d{2}):(\d{2})/);
  return m && m[1] !== '0000' ? `${m[1]}-${m[2]}-${m[3]}` : null;
}

function extract(rootDir) {
  const metadataPath = path.join(rootDir, 'photo-metadata.json');
  const metadata = fs.existsSync(metadataPath) ? JSON.parse(fs.readFileSync(metadataPath, 'utf8')) : {};
  const imagesDir = path.join(rootDir, 'images');
  const files = fs.readdirSync(imagesDir).filter((f) => /\.jpe?g$/i.test(f)).sort();

  for (const file of files) {
    const entry = metadata[file] || {};
    const date = readExifDate(path.join(imagesDir, file));
    if (date) {
      if (!entry.date) entry.date = date;
      if (!entry.year) entry.year = date.slice(0, 4);
    }
    if (!entry.location) entry.location = 'Update location';
    metadata[file] = entry;
    console.log(`${file}: ${entry.year || 'no date'}`);
  }

  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2) + '\n');
  return metadata;
}

module.exports = { readExifDate, extract };

if (require.main === module) {
  extract(path.join(__dirname, '..'));
  console.log('\n✅ Metadata merged into photo-metadata.json');
}
