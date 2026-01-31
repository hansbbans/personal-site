#!/usr/bin/env node
/**
 * Parse Google Maps Takeout data to find potential restaurants
 * - Saved places (all)
 * - Visited places with 4+ star ratings (equivalent to 4.2+ on 5-point scale)
 * - Excludes mega chains/franchises
 */

const fs = require('fs');
const path = require('path');

// Mega chains to exclude
const MEGA_CHAINS = [
    'mcdonald', 'burger king', 'wendy', 'taco bell', 'kfc', 'popeyes',
    'chick-fil-a', "chick fil a", 'subway', 'starbucks', 'dunkin', 
    'domino', 'pizza hut', 'papa john', 'little caesars', 'chipotle',
    "chipotle's", 'panera', "panera's", 'applebee', "applebee's", 
    'olive garden', 'red lobster', 'tgi friday', "tgi friday's",
    'chili', "chili's", 'outback', 'cheesecake factory', 
    'the cheesecake factory', 'ihop', "ihop's", 'denny', "denny's",
    'cracker barrel', 'golden corral', 'buffalo wild wings',
    'hooters', "hooters's", 'hard rock cafe', 'planet hollywood',
    'rainforest cafe', 'dave & buster', "dave and buster's",
    'shake shack', "shake shack's", 'five guys', "five guys'",
    'in-n-out', 'innout', 'inn out', 'whataburger', 'culver',
    'sonic', "sonic's", 'jack in the box', 'arbys', "arby's",
    'dairy queen', 'dq grill', 'baskin robbins', 'cold stone',
    'ben & jerry', 'haagen dazs', 'krispy kreme', 'dunkin donuts'
];

function isMegaChain(name) {
    if (!name) return false;
    const lowerName = name.toLowerCase();
    return MEGA_CHAINS.some(chain => lowerName.includes(chain));
}

function parseSavedPlaces(filePath) {
    console.log('Parsing Saved Places...');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const places = [];
    
    for (const feature of data.features) {
        const props = feature.properties;
        if (!props.location || !props.location.name) continue;
        
        const name = props.location.name;
        if (isMegaChain(name)) continue;
        
        places.push({
            name: name,
            address: props.location.address || '',
            source: 'Saved',
            rating: '',
            lat: feature.geometry?.coordinates?.[1] || '',
            lng: feature.geometry?.coordinates?.[0] || '',
            notes: 'Saved place'
        });
    }
    
    console.log(`  Found ${places.length} saved places (excluding chains)`);
    return places;
}

function parseReviews(filePath) {
    console.log('Parsing Reviews...');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const places = [];
    
    for (const feature of data.features) {
        const props = feature.properties;
        if (!props.location || !props.location.name) continue;
        
        const rating = props.five_star_rating_published;
        // Filter for 4+ stars (equivalent to 4.2+ on 5-point scale)
        if (!rating || rating < 4) continue;
        
        const name = props.location.name;
        if (isMegaChain(name)) continue;
        
        // Check if it's a food-related review
        const hasFoodRating = props.questions?.some(q => 
            q.question?.toLowerCase().includes('food')
        );
        
        places.push({
            name: name,
            address: props.location.address || '',
            source: 'Review',
            rating: rating,
            lat: feature.geometry?.coordinates?.[1] || '',
            lng: feature.geometry?.coordinates?.[0] || '',
            notes: hasFoodRating ? 'Rated food highly' : 'High rating'
        });
    }
    
    console.log(`  Found ${places.length} reviewed places with 4+ stars`);
    return places;
}

function createCSV(places) {
    const headers = ['Name', 'Address', 'Source', 'Rating', 'Latitude', 'Longitude', 'Notes'];
    const rows = places.map(p => [
        `"${p.name.replace(/"/g, '""')}"`,
        `"${p.address.replace(/"/g, '""')}"`,
        p.source,
        p.rating,
        p.lat,
        p.lng,
        `"${p.notes}"`
    ]);
    
    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}

// Main execution
const basePath = path.join(__dirname, 'Takeout/Maps (your places)');
const savedPath = path.join(basePath, 'Saved Places.json');
const reviewsPath = path.join(basePath, 'Reviews.json');

console.log('=== Google Maps Restaurant Parser ===\n');

// Parse both files
const savedPlaces = parseSavedPlaces(savedPath);
const reviewedPlaces = parseReviews(reviewsPath);

// Combine and sort by source then name
const allPlaces = [...savedPlaces, ...reviewedPlaces].sort((a, b) => {
    if (a.source !== b.source) return a.source.localeCompare(b.source);
    return a.name.localeCompare(b.name);
});

console.log(`\nTotal potential restaurants: ${allPlaces.length}`);

// Write CSV
const csv = createCSV(allPlaces);
const outputPath = path.join(__dirname, 'potentials.csv');
fs.writeFileSync(outputPath, csv);

console.log(`\nCSV saved to: ${outputPath}`);
console.log('\nBreakdown by source:');
console.log(`  Saved Places: ${savedPlaces.length}`);
console.log(`  Reviews (4+ stars): ${reviewedPlaces.length}`);

// Also log a preview
console.log('\n=== Preview (first 10) ===');
allPlaces.slice(0, 10).forEach(p => {
    console.log(`  ${p.name} (${p.source})${p.rating ? ` - ${p.rating}★` : ''}`);
});
