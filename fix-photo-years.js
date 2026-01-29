#!/usr/bin/env node

// Safely update photo years based on metadata
const fs = require('fs');

console.log('🔧 Fixing photo years...');

// Read metadata
const metadata = JSON.parse(fs.readFileSync('photo-metadata.json', 'utf8'));

// Read current HTML
let html = fs.readFileSync('photos.html', 'utf8');

// Update each photo year individually
Object.keys(metadata).forEach(filename => {
    const year = metadata[filename].year;
    
    // Create specific pattern for this image
    const pattern = `src="images/${filename}"`;
    
    if (html.includes(pattern)) {
        // Find this photo's year span and update it
        const beforePattern = new RegExp(`(src="images/${filename.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[\\s\\S]*?<span class="photo-year">)TBD(</span>)`);
        html = html.replace(beforePattern, `$1${year}$2`);
        console.log(`Updated ${filename} → ${year}`);
    }
});

// Write updated HTML
fs.writeFileSync('photos.html', html);

console.log('✅ Photo years updated safely');
console.log('🔍 Checking result...');

// Verify
const finalCount = (html.match(/photo-item/g) || []).length;
console.log(`📸 Photo items: ${finalCount}`);

const yearCount = (html.match(/photo-year/g) || []).length;
console.log(`📅 Years added: ${yearCount}`);