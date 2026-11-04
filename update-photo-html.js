#!/usr/bin/env node

// Update photos.html with metadata (year, plus location where the page still
// shows a placeholder). Only each photo's own overlay is touched; alt text,
// classes and every other photo stay as they are.
const fs = require('fs');

const PLACEHOLDER_LOCATIONS = ['Update location', 'Location unavailable', ''];
const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const escapeHtml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function updateHtml(html, metadata) {
    let updated = 0;
    for (const [filename, photo] of Object.entries(metadata)) {
        // The overlay has no nested divs, so the first </div> after it closes it
        const overlayRegex = new RegExp(
            `(<img src="images/${escapeRegExp(filename)}"[^>]*>\\s*<div class="photo-overlay">)([\\s\\S]*?)(</div>)`
        );
        html = html.replace(overlayRegex, (match, open, overlay, close) => {
            let next = overlay;

            if (photo.year) {
                const yearSpan = `<span class="photo-year">${escapeHtml(photo.year)}</span>`;
                next = /<span class="photo-year">[^<]*<\/span>/.test(next)
                    ? next.replace(/<span class="photo-year">[^<]*<\/span>/, yearSpan)
                    : next.replace(/(<\/span>)(\s*)$/, `$1$2    ${yearSpan}$2`);
            }

            const location = photo.location && !PLACEHOLDER_LOCATIONS.includes(photo.location) ? photo.location : null;
            if (location) {
                next = next.replace(/<span class="photo-location[^"]*">([^<]*)<\/span>/, (span, current) =>
                    PLACEHOLDER_LOCATIONS.includes(current.trim())
                        ? `<span class="photo-location">${escapeHtml(location)}</span>`
                        : span);
            }

            if (next !== overlay) updated++;
            return open + next + close;
        });
    }
    return { html, updated };
}

module.exports = { updateHtml };

if (require.main === module) {
    console.log('🔄 Updating photos.html with metadata...');
    const metadata = JSON.parse(fs.readFileSync('photo-metadata.json', 'utf8'));
    const { html, updated } = updateHtml(fs.readFileSync('photos.html', 'utf8'), metadata);
    fs.writeFileSync('photos.html', html);
    console.log(`✅ Updated ${updated} photo(s) in photos.html`);
}
