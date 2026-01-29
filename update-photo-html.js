#!/usr/bin/env node

// Update photos.html with metadata (location + year)
const fs = require('fs');

console.log('🔄 Updating photos.html with metadata...');

// Read metadata
const metadata = JSON.parse(fs.readFileSync('photo-metadata.json', 'utf8'));

// Read current HTML
let html = fs.readFileSync('photos.html', 'utf8');

// Update each photo item
Object.keys(metadata).forEach(filename => {
    const photo = metadata[filename];
    const srcPattern = `src="images/${filename}"`;
    
    // Find the photo item containing this image
    const photoItemRegex = new RegExp(
        `<div class="photo-item">([\\s\\S]*?)${filename.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([\\s\\S]*?)</div>(?=\\s*(?:<div class="photo-item">|</div>|$))`,
        'g'
    );
    
    html = html.replace(photoItemRegex, (match, before, after) => {
        // Extract current overlay content to preserve any manual updates
        const overlayMatch = match.match(/<span class="photo-location">(.*?)<\/span>/);
        const currentLocation = overlayMatch ? overlayMatch[1] : 'Update location';
        
        // Only update if still showing "Update location"
        const location = currentLocation === 'Update location' ? 'Update location' : currentLocation;
        
        return `<div class="photo-item">
                        <img src="images/${filename}" alt="Photo from ${photo.year}" loading="lazy">
                        <div class="photo-overlay">
                            <span class="photo-location">${location}</span>
                            <span class="photo-year">${photo.year}</span>
                        </div>
                    </div>`;
    });
});

// Write updated HTML
fs.writeFileSync('photos.html', html);

console.log('✅ Updated photos.html with years from metadata');
console.log('📅 Years displayed:', [...new Set(Object.values(metadata).map(p => p.year))].sort().join(', '));
console.log('');
console.log('💡 Next steps:');
console.log('   1. Update CSS for .photo-year styling');
console.log('   2. Manually update locations in the HTML');
console.log('   3. Consider adding location metadata extraction');