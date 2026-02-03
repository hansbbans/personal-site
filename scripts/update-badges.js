#!/usr/bin/env node
/**
 * Restaurant Badge Updater
 * 
 * Cross-references your restaurant data with:
 * - Eater 38 lists
 * - Infatuation guides
 * - Michelin Guide
 * 
 * Usage: node update-badges.js --city=nyc
 */

const fs = require('fs');
const path = require('path');

// Configuration for each city's list URLs
const CITY_LISTS = {
  'NYC': {
    eater38: 'https://ny.eater.com/maps/best-new-york-restaurants-38-map',
    infatuation: 'https://www.theinfatuation.com/new-york/guides/best-restaurants-nyc',
    michelin: 'https://ny.eater.com/maps/michelin-starred-restaurants-nyc-2024'
  },
  'Chicago': {
    eater38: 'https://chicago.eater.com/maps/best-restaurants-chicago-eater-38',
    infatuation: 'https://www.theinfatuation.com/chicago/guides/best-restaurants-chicago',
    michelin: 'https://chicago.eater.com/maps/michelin-starred-restaurants-chicago'
  },
  'Philadelphia': {
    eater38: 'https://philly.eater.com/maps/best-restaurants-philadelphia-eater-38',
    infatuation: 'https://www.theinfatuation.com/philadelphia/guides/best-restaurants-philadelphia',
    michelin: null // No Michelin guide for Philly
  },
  'Denver': {
    eater38: 'https://denver.eater.com/maps/best-restaurants-denver-eater-38',
    infatuation: 'https://www.theinfatuation.com/denver/guides/best-restaurants-denver',
    michelin: null
  },
  'Phoenix': {
    eater38: 'https://phoenix.eater.com/maps/best-restaurants-phoenix-eater-38',
    infatuation: 'https://www.theinfatuation.com/phoenix/guides/best-restaurants-phoenix',
    michelin: null
  },
  'Los Angeles': {
    eater38: 'https://la.eater.com/maps/best-los-angeles-restaurants-eater-38',
    infatuation: 'https://www.theinfatuation.com/los-angeles/guides/best-restaurants-los-angeles',
    michelin: 'https://la.eater.com/maps/michelin-starred-restaurants-los-angeles'
  },
  'San Francisco': {
    eater38: 'https://sf.eater.com/maps/best-san-francisco-restaurants-eater-38',
    infatuation: 'https://www.theinfatuation.com/san-francisco/guides/best-restaurants-san-francisco',
    michelin: 'https://sf.eater.com/maps/michelin-starred-restaurants-san-francisco'
  },
  'Seattle': {
    eater38: 'https://seattle.eater.com/maps/best-seattle-restaurants-eater-38',
    infatuation: 'https://www.theinfatuation.com/seattle/guides/best-restaurants-seattle',
    michelin: null
  },
  'Boston': {
    eater38: 'https://boston.eater.com/maps/best-boston-restaurants-eater-38',
    infatuation: 'https://www.theinfatuation.com/boston/guides/best-restaurants-boston',
    michelin: 'https://boston.eater.com/maps/michelin-starred-restaurants-boston'
  },
  'Washington DC': {
    eater38: 'https://dc.eater.com/maps/best-washington-dc-restaurants-eater-38',
    infatuation: 'https://www.theinfatuation.com/washington-dc/guides/best-restaurants-washington-dc',
    michelin: 'https://dc.eater.com/maps/michelin-starred-restaurants-dc'
  },
  'Miami': {
    eater38: 'https://miami.eater.com/maps/best-miami-restaurants-eater-38',
    infatuation: 'https://www.theinfatuation.com/miami/guides/best-restaurants-miami',
    michelin: 'https://miami.eater.com/maps/michelin-starred-restaurants-miami'
  }
};

// Michelin star restaurants (manually curated from guide.michelin.com)
// Update this list annually when the new guide comes out (November)
const MICHELIN_STARS = {
  'NYC': {
    3: ['Sushi Sho', 'Eleven Madison Park', 'Le Bernardin', 'Per Se'],
    2: ['Aquavit', 'Atomix', 'Gabriel Kreuther', 'Jean-Georges', 'Jungsik', 'Ko', 'Marea', 'Masa', 'The Modern', 'Musket Room'],
    1: ['Al Coro', 'Atera', 'Batomos', 'Blue Hill at Stone Barns', 'Casa Mono', 'Caviar Russe', 'César Ramírez', 'CheLi', 'Claro', 'Clover Hill', 'Contra', 'Cote', 'Crown Shy', 'DANIEL', 'Dirt Candy', 'Don Angie', 'Estela', 'Francie', 'Francis', 'Frantzén', 'Gramercy Tavern', 'Hirohisa', 'Ichimura at Uchū', 'Joomak Banjum', 'Jua', 'Kochi', 'Kokkaku', 'Kono', 'Kru', 'Kyo Ya', 'Le Coucou', 'Le Pavillon', 'Luthun', 'Máximo Bistrot', 'Meadowsweet', 'Mezzaluna', 'Midtown Grill', 'Minetta Tavern', 'Noda', 'Noz 17', 'Okuda', 'One White Street', 'Oxalis', 'Oyu', 'Pasquale Jones', 'Red Paper Clip', 'Restaurant Yuu', 'Sakamai', 'Samurai Papa', 'Satsuki', 'Semma', 'Shion 69 Leonard Street', 'Shmei', 'Sola Pasta Bar', 'Sorella', 'Sota Atsumi', 'Sushi AMANE', 'Sushi Ichimura', 'Sushi Nakazawa', 'Sushi Noz', 'Sushi Yasuda', 'Talea', 'Tan', 'Tempura Matsui', 'Teruyuki Kusaka', 'The Four Horsemen', 'Torien', 'Torishin', 'Tori Shin', 'Tsukimi', 'Tuome', 'Vestry', 'Wallsé', 'Yoshino', 'ZZ\'s Clam Bar']
  }
};

// Michelin Bib Gourmand (affordable excellence)
const MICHELIN_BIB_GOURMAND = {
  'NYC': ['Hanoi House', 'L\'Artusi', 'Llama Inn', 'Rubirosa', 'Rubirosa', 'Casa Enrique', 'Claro', 'Contra', 'Crown Shy', 'Davelle', 'Di An Di', 'Dirt Candy', 'Don Angie', 'Gomi', 'Harta', 'Jeju Noodle Bar', 'Kochi', 'Kopitiam', 'Kru', 'Laut', 'Le Crocodile', 'Lilia', 'Llama San', 'Máximo Bistrot', 'Meadowsweet', 'Misi', 'Miss Ada', 'Naks', 'Nami Nori', 'Noodle Village', 'Okonomi', 'Oxomoco', 'Pig and Khao', 'Red Paper Clip', 'Sake Bar Hagi', 'SakaMai', 'Samurai Mama', 'Sauvage', 'Semma', 'Solace', 'Sushi Katsuei', 'Sushi of Gari', 'Szechuan Mountain House', 'Tailor', 'Tanoshi', 'The Four Horsemen', 'Tuome', 'Ugly Baby', 'Veselka', 'Wa Jeong', 'Wilfie & Nell', 'Win Son', 'Yopparai', 'Zaab Zaab']
};

// Load restaurant data
function loadRestaurantData() {
  const dataPath = path.join(__dirname, '..', 'data', 'food-data.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  return data;
}

// Save restaurant data
function saveRestaurantData(data) {
  const dataPath = path.join(__dirname, '..', 'data', 'food-data.json');
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
  console.log('✅ Data saved to food-data.json');
}

// Fuzzy match restaurant names (handles slight variations)
function fuzzyMatch(name1, name2) {
  const normalize = (str) => str.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  
  const n1 = normalize(name1);
  const n2 = normalize(name2);
  
  // Exact match
  if (n1 === n2) return true;
  
  // One contains the other
  if (n1.includes(n2) || n2.includes(n1)) return true;
  
  // Edit distance (simplified)
  const words1 = n1.split(' ');
  const words2 = n2.split(' ');
  const commonWords = words1.filter(w => words2.includes(w));
  
  // If more than half the words match
  if (commonWords.length >= Math.min(words1.length, words2.length) / 2) {
    return true;
  }
  
  return false;
}

// Update Michelin stars for a city
function updateMichelinStars(data, cityName) {
  const cityKey = Object.keys(MICHELIN_STARS).find(k => k.toLowerCase() === cityName.toLowerCase());
  if (!cityKey) {
    console.log(`No Michelin data available for ${cityName}`);
    return;
  }
  
  const cityData = data.cities.find(c => c.name.toLowerCase() === cityName.toLowerCase());
  if (!cityData) {
    console.log(`City ${cityName} not found in data`);
    return;
  }
  
  const stars = MICHELIN_STARS[cityKey];
  let updated = 0;
  
  cityData.restaurants.forEach(restaurant => {
    // Check 3 stars
    if (stars[3].some(michelinName => fuzzyMatch(restaurant.name, michelinName))) {
      restaurant.michelinStars = 3;
      updated++;
      console.log(`  ⭐⭐⭐ ${restaurant.name}`);
    }
    // Check 2 stars
    else if (stars[2].some(michelinName => fuzzyMatch(restaurant.name, michelinName))) {
      restaurant.michelinStars = 2;
      updated++;
      console.log(`  ⭐⭐ ${restaurant.name}`);
    }
    // Check 1 star
    else if (stars[1].some(michelinName => fuzzyMatch(restaurant.name, michelinName))) {
      restaurant.michelinStars = 1;
      updated++;
      console.log(`  ⭐ ${restaurant.name}`);
    }
  });
  
  // Check Bib Gourmand
  const bibList = MICHELIN_BIB_GOURMAND[cityKey] || [];
  cityData.restaurants.forEach(restaurant => {
    if (bibList.some(bibName => fuzzyMatch(restaurant.name, bibName))) {
      restaurant.michelinBibGourmand = true;
      if (!restaurant.michelinStars) {
        updated++;
        console.log(`  🍽️ Bib Gourmand: ${restaurant.name}`);
      }
    }
  });
  
  console.log(`Updated ${updated} restaurants with Michelin badges`);
}

// Generate report of restaurants to manually check
function generateReport(data, cityName) {
  const cityData = data.cities.find(c => c.name.toLowerCase() === cityName.toLowerCase());
  if (!cityData) return;
  
  console.log(`\n📊 Report for ${cityName}:`);
  console.log(`Total restaurants: ${cityData.restaurants.length}`);
  
  const withEater = cityData.restaurants.filter(r => r.onEaterList).length;
  const withInfatuation = cityData.restaurants.filter(r => r.onInfatuationList).length;
  const withMichelin = cityData.restaurants.filter(r => r.michelinStars || r.michelinBibGourmand).length;
  const favorites = cityData.restaurants.filter(r => r.isHansFavorite).length;
  
  console.log(`  🏆 Eater 38: ${withEater}`);
  console.log(`  🔥 Infatuation: ${withInfatuation}`);
  console.log(`  ⭐ Michelin: ${withMichelin}`);
  console.log(`  ❤️ Hans Favorites: ${favorites}`);
  
  // List restaurants without any badges
  const unbadged = cityData.restaurants.filter(r => 
    !r.onEaterList && 
    !r.onInfatuationList && 
    !r.michelinStars && 
    !r.michelinBibGourmand && 
    !r.isHansFavorite
  );
  
  if (unbadged.length > 0) {
    console.log(`\n📝 Restaurants without badges (${unbadged.length}):`);
    unbadged.forEach(r => console.log(`  - ${r.name}`));
  }
}

// Main function
function main() {
  const args = process.argv.slice(2);
  const cityArg = args.find(a => a.startsWith('--city='));
  const city = cityArg ? cityArg.split('=')[1] : 'NYC';
  
  console.log(`🍽️ Restaurant Badge Updater for ${city}\n`);
  
  const data = loadRestaurantData();
  
  // Update Michelin stars
  console.log('Checking Michelin Guide...');
  updateMichelinStars(data, city);
  
  // Generate report
  generateReport(data, city);
  
  // Show list URLs for manual checking
  const lists = CITY_LISTS[city];
  if (lists) {
    console.log('\n🔗 Manual verification URLs:');
    if (lists.eater38) console.log(`  Eater 38: ${lists.eater38}`);
    if (lists.infatuation) console.log(`  Infatuation: ${lists.infatuation}`);
    if (lists.michelin) console.log(`  Michelin: ${lists.michelin}`);
  }
  
  // Save changes
  saveRestaurantData(data);
  
  console.log('\n✨ Done! Review the changes and commit when ready.');
  console.log('\nNext steps:');
  console.log('1. Manually verify restaurants on Eater 38 and Infatuation lists');
  console.log('2. Update onEaterList and onInfatuationList fields in food-data.json');
  console.log('3. Run this script again after updating Michelin data (annually in November)');
}

main();
