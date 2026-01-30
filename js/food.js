// Food Page Script with Hierarchical Categories
const GOOGLE_SHEETS_API_KEY = 'AIzaSyBo_QKk0hkE8Kkp2sUS4qOLzSiYpI-bfr0';
const SPREADSHEET_ID = '1EneuCtSuzmZI6P7Flwd0oRIsrrziX2fyduylwQIW3cc';

// Hierarchical category structure
const FOOD_CATEGORIES = {
    "Asian": {
        emoji: "🥢",
        subcategories: ["Japanese", "Chinese", "Korean", "Thai", "Vietnamese", "Indian", "Other Asian"]
    },
    "European": {
        emoji: "🍝",
        subcategories: ["Italian", "French", "Spanish", "German", "Other European"]
    },
    "American": {
        emoji: "🍔",
        subcategories: ["Burgers/Diners", "BBQ/Southern", "Pizza", "Sandwiches/Delis", "Steakhouse", "Other American"]
    },
    "Mexican": {
        emoji: "🌮",
        subcategories: ["Tacos", "Burritos", "Seafood/Mariscos", "Regional", "Other Mexican"]
    },
    "Mediterranean/Middle Eastern": {
        emoji: "🧆",
        subcategories: ["Israeli", "Lebanese", "Turkish", "Persian/Iranian", "Greek", "Other Mediterranean/Middle Eastern"]
    },
    "Cafes & Desserts": {
        emoji: "☕",
        subcategories: ["Coffee/Cafes", "Bakeries", "Dessert Shops", "Ice Cream", "Other Cafes & Desserts"]
    },
    "Bars & Drinks": {
        emoji: "🍸",
        subcategories: ["Cocktail Bars", "Wine Bars", "Breweries/Pubs", "Other Bars & Drinks"]
    }
};

// Subcategory emoji mapping
const SUBCATEGORY_EMOJI = {
    // Asian
    "Japanese": "🇯🇵", "Sushi": "🍣", "Ramen": "🍜",
    "Chinese": "🇨🇳",
    "Korean": "🇰🇷",
    "Thai": "🇹🇭",
    "Vietnamese": "🇻🇳",
    "Indian": "🇮🇳",
    "Other Asian": "🌏",
    
    // European
    "Italian": "🇮🇹",
    "French": "🇫🇷",
    "Spanish": "🇪🇸",
    "German": "🇩🇪",
    "Other European": "🇪🇺",
    
    // American
    "Burgers/Diners": "🍔",
    "BBQ/Southern": "🍖",
    "Pizza": "🍕",
    "Sandwiches/Delis": "🥪",
    "Steakhouse": "🥩",
    "Other American": "🇺🇸",
    
    // Mexican
    "Tacos": "🌮",
    "Burritos": "🌯",
    "Seafood/Mariscos": "🦐",
    "Regional": "🌵",
    "Other Mexican": "🌶️",
    
    // Mediterranean/Middle Eastern
    "Israeli": "🇮🇱",
    "Lebanese": "🇱🇧",
    "Turkish": "🇹🇷",
    "Persian/Iranian": "🇮🇷",
    "Greek": "🇬🇷",
    "Other Mediterranean/Middle Eastern": "🧆",
    
    // Cafes & Desserts
    "Coffee/Cafes": "☕",
    "Bakeries": "🥐",
    "Dessert Shops": "🍰",
    "Ice Cream": "🍦",
    "Other Cafes & Desserts": "🍪",
    
    // Bars & Drinks
    "Cocktail Bars": "🍸",
    "Wine Bars": "🍷",
    "Breweries/Pubs": "🍺",
    "Other Bars & Drinks": "🥃"
};

// Legacy category to hierarchical mapping
const CATEGORY_MAPPING = {
    // Asian - Japanese
    "Sushi": { mainCategory: "Asian", subcategory: "Japanese" },
    "Japanese": { mainCategory: "Asian", subcategory: "Japanese" },
    "Ramen": { mainCategory: "Asian", subcategory: "Japanese" },
    
    // Asian - Chinese
    "Chinese": { mainCategory: "Asian", subcategory: "Chinese" },
    "Taiwanese": { mainCategory: "Asian", subcategory: "Other Asian" },
    
    // Asian - Korean
    "Korean": { mainCategory: "Asian", subcategory: "Korean" },
    
    // Asian - Thai
    "Thai": { mainCategory: "Asian", subcategory: "Thai" },
    
    // Asian - Vietnamese
    "Vietnamese": { mainCategory: "Asian", subcategory: "Vietnamese" },
    
    // Asian - Indian
    "Indian": { mainCategory: "Asian", subcategory: "Indian" },
    
    // European - Italian
    "Italian": { mainCategory: "European", subcategory: "Italian" },
    "Pizza": { mainCategory: "American", subcategory: "Pizza" },
    
    // American
    "American": { mainCategory: "American", subcategory: "Other American" },
    "Burgers": { mainCategory: "American", subcategory: "Burgers/Diners" },
    "BBQ": { mainCategory: "American", subcategory: "BBQ/Southern" },
    
    // Mexican
    "Mexican": { mainCategory: "Mexican", subcategory: "Other Mexican" },
    "Tacos": { mainCategory: "Mexican", subcategory: "Tacos" },
    
    // Mediterranean
    "Mediterranean": { mainCategory: "Mediterranean/Middle Eastern", subcategory: "Other Mediterranean/Middle Eastern" },
    "Greek": { mainCategory: "Mediterranean/Middle Eastern", subcategory: "Greek" },
    "Middle Eastern": { mainCategory: "Mediterranean/Middle Eastern", subcategory: "Other Mediterranean/Middle Eastern" },
    
    // Cafes & Desserts
    "Coffee": { mainCategory: "Cafes & Desserts", subcategory: "Coffee/Cafes" },
    "Cafe": { mainCategory: "Cafes & Desserts", subcategory: "Coffee/Cafes" },
    "Bakery": { mainCategory: "Cafes & Desserts", subcategory: "Bakeries" },
    "Dessert": { mainCategory: "Cafes & Desserts", subcategory: "Dessert Shops" },
    "Ice Cream": { mainCategory: "Cafes & Desserts", subcategory: "Ice Cream" },
    
    // Bars
    "Bar": { mainCategory: "Bars & Drinks", subcategory: "Other Bars & Drinks" },
    "Cocktail Bar": { mainCategory: "Bars & Drinks", subcategory: "Cocktail Bars" },
    "Wine Bar": { mainCategory: "Bars & Drinks", subcategory: "Wine Bars" },
    "Brewery": { mainCategory: "Bars & Drinks", subcategory: "Breweries/Pubs" },
    
    // Uncategorized/Other
    "Peruvian": { mainCategory: "Asian", subcategory: "Other Asian" },
    "Caribbean": { mainCategory: "American", subcategory: "Other American" },
    "Haitian": { mainCategory: "American", subcategory: "Other American" },
    "Seafood": { mainCategory: "American", subcategory: "Other American" },
};

// State
let currentCity = 0;
let currentMainCategory = 'all';
let currentSubcategory = 'all';
let citiesData = [];
let map;
let markers = [];
let mapVisible = false;

// Get emoji for subcategory
function getSubcategoryEmoji(subcategory) {
    return SUBCATEGORY_EMOJI[subcategory] || "🍽️";
}

// Get emoji for main category
function getMainCategoryEmoji(mainCategory) {
    return FOOD_CATEGORIES[mainCategory]?.emoji || "🍽️";
}

// Get CSS class name for category (for color coding)
function getCategoryClass(mainCategory) {
    const categoryMap = {
        "Asian": "asian",
        "European": "european",
        "American": "american",
        "Mexican": "mexican",
        "Mediterranean/Middle Eastern": "mediterranean",
        "Cafes & Desserts": "cafes",
        "Bars & Drinks": "bars"
    };
    return categoryMap[mainCategory] || "";
}

// Get category color for map pins
function getCategoryColor(mainCategory) {
    const colorMap = {
        "Asian": "#C41E3A",
        "European": "#1E3A5F",
        "American": "#D2691E",
        "Mexican": "#228B22",
        "Mediterranean/Middle Eastern": "#008B8B",
        "Cafes & Desserts": "#8B4513",
        "Bars & Drinks": "#4B0082"
    };
    return colorMap[mainCategory] || "#0d9488";
}

// Create custom colored map pin SVG
function createMapPin(color) {
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36">
            <path fill="${color}" d="M12 0C7.58 0 4 3.58 4 8c0 5.25 7 13 7 13s7-7.75 7-13c0-4.42-3.58-8-8-8z"/>
            <circle cx="12" cy="8" r="3" fill="white"/>
        </svg>
    `;
    return {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg),
        scaledSize: new google.maps.Size(36, 36),
        anchor: new google.maps.Point(18, 36),
        labelOrigin: new google.maps.Point(18, 10)
    };
}

// Map legacy category to new hierarchical system
function mapCategory(legacyCategory) {
    if (!legacyCategory) return { mainCategory: null, subcategory: null };
    const normalized = legacyCategory.trim();
    return CATEGORY_MAPPING[normalized] || { mainCategory: null, subcategory: null };
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadRestaurantData();
    setupMapToggle();
});

// Map toggle
function setupMapToggle() {
    const toggle = document.getElementById('mapToggle');
    const wrapper = document.getElementById('mapWrapper');
    
    toggle.addEventListener('click', () => {
        mapVisible = !mapVisible;
        toggle.classList.toggle('active', mapVisible);
        wrapper.classList.toggle('visible', mapVisible);
        toggle.innerHTML = mapVisible 
            ? '<span>📍</span> Hide Map' 
            : '<span>📍</span> Show Map';
        
        // Trigger map resize when shown
        if (mapVisible && map) {
            google.maps.event.trigger(map, 'resize');
            const restaurants = getFilteredRestaurants();
            updateMap(restaurants);
        }
    });
}

// Load data from Google Sheets
async function loadRestaurantData() {
    try {
        const metadataUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}?key=${GOOGLE_SHEETS_API_KEY}`;
        const metadataResponse = await fetch(metadataUrl);
        const metadata = await metadataResponse.json();

        if (!metadata.sheets) {
            console.error('No sheets found');
            return;
        }

        const sheetNames = metadata.sheets.map(s => s.properties.title);

        citiesData = await Promise.all(
            sheetNames.map(async (sheetName) => {
                const dataUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(sheetName)}?key=${GOOGLE_SHEETS_API_KEY}`;
                const response = await fetch(dataUrl);
                const data = await response.json();
                return {
                    name: sheetName,
                    restaurants: parseRestaurantData(data.values)
                };
            })
        );

        renderCityTabs();
        renderMainCategoryFilters();
        showCity(0);
    } catch (error) {
        console.error('Error loading data:', error);
        document.getElementById('foodGrid').innerHTML = 
            '<p class="loading-message">Unable to load restaurants.</p>';
    }
}

function parseRestaurantData(values) {
    if (!values || values.length < 2) return [];
    
    const restaurants = [];
    for (let i = 1; i < values.length; i++) {
        const row = values[i];
        if (!row[0]) continue;
        
        const legacyCategory = row[1] || '';
        const categoryInfo = mapCategory(legacyCategory);
        
        restaurants.push({
            name: row[0] || '',
            category: legacyCategory,
            mainCategory: categoryInfo.mainCategory,
            subcategory: categoryInfo.subcategory,
            dateVisited: row[2] || null,
            address: row[3] || '',
            dishes: row[4] || '',
            lat: parseFloat(row[5]) || null,
            lng: parseFloat(row[6]) || null,
            yelpRating: parseFloat(row[7]) || null,
            googleRating: parseFloat(row[8]) || null
        });
    }
    return restaurants;
}

// Render city tabs
function renderCityTabs() {
    const container = document.querySelector('.city-tabs');
    container.innerHTML = citiesData.map((city, i) => `
        <button class="city-tab ${i === 0 ? 'active' : ''}" data-city="${i}">
            ${city.name}
        </button>
    `).join('');
    
    container.querySelectorAll('.city-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const index = parseInt(tab.dataset.city);
            showCity(index);
        });
    });
}

// Render main category filters
function renderMainCategoryFilters() {
    const container = document.getElementById('mainCategoryFilters');
    
    container.innerHTML = `
        <button class="category-pill main-category-pill active" data-category="all">
            All
        </button>
        ${Object.entries(FOOD_CATEGORIES).map(([cat, info]) => `
            <button class="category-pill main-category-pill" data-category="${cat}">
                <span class="category-emoji">${info.emoji}</span>
                ${cat}
            </button>
        `).join('')}
    `;
    
    container.querySelectorAll('.main-category-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            currentMainCategory = pill.dataset.category;
            currentSubcategory = 'all'; // Reset subcategory when main changes
            
            container.querySelectorAll('.main-category-pill').forEach(p => 
                p.classList.toggle('active', p.dataset.category === currentMainCategory)
            );
            
            renderSubcategoryFilters();
            renderCards();
            if (mapVisible) {
                updateMap(getFilteredRestaurants());
            }
        });
    });
}

// Render subcategory filters
function renderSubcategoryFilters() {
    const container = document.getElementById('subcategoryFilters');
    
    if (currentMainCategory === 'all') {
        container.innerHTML = '';
        container.classList.add('hidden');
        return;
    }
    
    const subcategories = FOOD_CATEGORIES[currentMainCategory]?.subcategories || [];
    
    container.innerHTML = `
        <button class="category-pill subcategory-pill active" data-subcategory="all">
            All ${currentMainCategory}
        </button>
        ${subcategories.map(sub => `
            <button class="category-pill subcategory-pill" data-subcategory="${sub}">
                <span class="category-emoji">${getSubcategoryEmoji(sub)}</span>
                ${sub}
            </button>
        `).join('')}
    `;
    
    container.classList.remove('hidden');
    
    container.querySelectorAll('.subcategory-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            currentSubcategory = pill.dataset.subcategory;
            
            container.querySelectorAll('.subcategory-pill').forEach(p => 
                p.classList.toggle('active', p.dataset.subcategory === currentSubcategory)
            );
            
            renderCards();
            if (mapVisible) {
                updateMap(getFilteredRestaurants());
            }
        });
    });
}

// Get filtered restaurants for current city and category
function getFilteredRestaurants() {
    const cityData = citiesData[currentCity];
    if (!cityData) return [];
    
    let filtered = cityData.restaurants;
    
    if (currentMainCategory !== 'all') {
        filtered = filtered.filter(r => r.mainCategory === currentMainCategory);
    }
    
    if (currentSubcategory !== 'all') {
        filtered = filtered.filter(r => r.subcategory === currentSubcategory);
    }
    
    return filtered;
}

// Show city
function showCity(index) {
    currentCity = index;
    currentMainCategory = 'all';
    currentSubcategory = 'all';
    
    // Update active tab
    document.querySelectorAll('.city-tab').forEach((tab, i) => {
        tab.classList.toggle('active', i === index);
    });
    
    // Reset category filter UI
    document.querySelectorAll('.main-category-pill').forEach(pill => {
        pill.classList.toggle('active', pill.dataset.category === 'all');
    });
    
    renderSubcategoryFilters();
    renderCards();
    
    if (mapVisible) {
        updateMap(getFilteredRestaurants());
    }
}

// Render cards
function renderCards() {
    const grid = document.getElementById('foodGrid');
    const restaurants = getFilteredRestaurants();
    const stats = document.getElementById('foodStats');
    const cityData = citiesData[currentCity];
    const total = cityData?.restaurants.length || 0;
    
    // Update stats
    let statsText = '';
    if (currentMainCategory === 'all') {
        statsText = `${total} spots in ${cityData?.name}`;
    } else if (currentSubcategory === 'all') {
        statsText = `${restaurants.length} of ${total} spots (${currentMainCategory})`;
    } else {
        statsText = `${restaurants.length} of ${total} spots (${currentMainCategory} › ${currentSubcategory})`;
    }
    stats.textContent = statsText;
    
    if (restaurants.length === 0) {
        grid.innerHTML = `
            <div class="food-empty">
                <div class="food-empty-icon">🍽️</div>
                <div class="food-empty-text">No restaurants in this category yet</div>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = restaurants.map((r, index) => {
        // Add personality features for food cards
        const isHighRated = r.googleRating && r.googleRating >= 4.5;
        const isFeatured = isHighRated && index % 6 === 0;
        const featuredClass = isFeatured ? 'featured' : '';
        
        // Get category CSS class for color coding
        const categoryClass = getCategoryClass(r.mainCategory);
        
        // Build Google Maps link from address
        const mapsLink = r.address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(r.name + ' ' + r.address)}` : null;
        
        // Build category badge
        let categoryBadge = '';
        if (r.mainCategory && r.subcategory) {
            categoryBadge = `
                <span class="food-card-category">
                    <span class="main-cat">${getMainCategoryEmoji(r.mainCategory)} ${r.mainCategory}</span>
                    <span class="sub-cat">${getSubcategoryEmoji(r.subcategory)} ${r.subcategory}</span>
                </span>
            `;
        } else if (r.category) {
            categoryBadge = `
                <span class="food-card-category">
                    ${getSubcategoryEmoji(r.category)} ${r.category}
                </span>
            `;
        }
        
        return `
        <div class="food-card ${featuredClass} ${categoryClass ? 'category-' + categoryClass : ''}" 
             data-category="${r.mainCategory || r.category || 'general'}"
             data-subcategory="${r.subcategory || ''}"
             data-rating="${r.googleRating || 0}">
            <div class="food-card-header">
                <div class="food-card-top">
                    <h3 class="food-card-name ${isFeatured ? 'card-title' : ''}">${r.name}</h3>
                    ${r.googleRating ? `
                        <div class="rating">${'⭐'.repeat(Math.floor(r.googleRating))} ${r.googleRating.toFixed(1)}</div>
                    ` : ''}
                </div>
                ${categoryBadge}
            </div>
            <div class="food-card-body">
                ${r.address ? `
                    <a href="${mapsLink}" target="_blank" rel="noopener" class="food-card-address">📍 ${r.address}</a>
                ` : ''}
                ${r.dishes ? `
                    <div class="food-card-dishes">
                        <div class="food-card-dishes-label">🍽️ Must try</div>
                        <div class="food-card-dish-tags">
                            ${r.dishes.split(',').map((dish, i) => `
                                <span class="dish-pill ${i === 0 ? 'highlight' : ''}">${dish.trim()}</span>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        </div>
        `;
    }).join('');
}

// Google Maps
function initMap() {
    const cityCenters = {
        'NYC': { lat: 40.7128, lng: -74.0060 },
        'New York': { lat: 40.7128, lng: -74.0060 },
        'Toronto': { lat: 43.6532, lng: -79.3832 },
        'Tokyo': { lat: 35.6762, lng: 139.6503 },
        'Paris': { lat: 48.8566, lng: 2.3522 },
        'Portland': { lat: 45.5155, lng: -122.6789 }
    };
    
    const cityName = citiesData[currentCity]?.name || '';
    const center = cityCenters[cityName] || { lat: 40.7128, lng: -74.0060 };
    
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: center,
        styles: [
            { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] }
        ]
    });
}

function updateMap(restaurants) {
    if (!map) return;
    
    // Clear markers
    markers.forEach(m => m.setMap(null));
    markers = [];
    
    // Remove existing legend
    const existingLegend = document.querySelector('.map-legend');
    if (existingLegend) {
        existingLegend.remove();
    }
    
    const valid = restaurants.filter(r => r.lat && r.lng);
    
    if (valid.length === 0) {
        const cityCenters = {
            'NYC': { lat: 40.7128, lng: -74.0060 },
            'New York': { lat: 40.7128, lng: -74.0060 },
            'Toronto': { lat: 43.6532, lng: -79.3832 },
            'Tokyo': { lat: 35.6762, lng: 139.6503 },
            'Paris': { lat: 48.8566, lng: 2.3522 },
            'Portland': { lat: 45.5155, lng: -122.6789 }
        };
        const cityName = citiesData[currentCity]?.name || '';
        const center = cityCenters[cityName] || { lat: 40.7128, lng: -74.0060 };
        map.setCenter(center);
        map.setZoom(12);
        return;
    }
    
    const bounds = new google.maps.LatLngBounds();
    const categoriesInUse = new Set();
    
    valid.forEach(r => {
        const position = { lat: r.lat, lng: r.lng };
        const pinColor = getCategoryColor(r.mainCategory);
        categoriesInUse.add(r.mainCategory);
        
        const marker = new google.maps.Marker({
            position,
            map,
            title: r.name,
            animation: google.maps.Animation.DROP,
            icon: createMapPin(pinColor)
        });
        
        const categoryDisplay = r.subcategory || r.category || '';
        const categoryColor = getCategoryColor(r.mainCategory);
        
        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div style="padding: 8px; max-width: 220px; font-family: system-ui, -apple-system, sans-serif;">
                    <h3 style="margin: 0 0 4px; font-size: 15px; font-weight: 600; color: #333;">${r.name}</h3>
                    ${categoryDisplay ? `<p style="margin: 0 0 4px; font-size: 12px; color: ${categoryColor}; font-weight: 500;">${getSubcategoryEmoji(categoryDisplay)} ${categoryDisplay}</p>` : ''}
                    ${r.mainCategory ? `<p style="margin: 0 0 4px; font-size: 11px; color: #888;">${getMainCategoryEmoji(r.mainCategory)} ${r.mainCategory}</p>` : ''}
                    <p style="margin: 0; font-size: 13px; color: #666;">${r.address}</p>
                </div>
            `
        });
        
        marker.addListener('click', () => {
            markers.forEach(m => m.infoWindow?.close());
            infoWindow.open(map, marker);
        });
        
        marker.infoWindow = infoWindow;
        markers.push(marker);
        bounds.extend(position);
    });
    
    // Add category legend
    const mapWrapper = document.getElementById('mapWrapper');
    if (mapWrapper && categoriesInUse.size > 0) {
        const legend = document.createElement('div');
        legend.className = 'map-legend';
        
        const categoryOrder = ["Asian", "European", "American", "Mexican", "Mediterranean/Middle Eastern", "Cafes & Desserts", "Bars & Drinks"];
        const categoryClassMap = {
            "Asian": "asian",
            "European": "european",
            "American": "american",
            "Mexican": "mexican",
            "Mediterranean/Middle Eastern": "mediterranean",
            "Cafes & Desserts": "cafes",
            "Bars & Drinks": "bars"
        };
        
        legend.innerHTML = Array.from(categoriesInUse)
            .sort((a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b))
            .map(cat => `
                <div class="map-legend-item">
                    <div class="map-legend-pin ${categoryClassMap[cat]}"></div>
                    <span>${FOOD_CATEGORIES[cat]?.emoji || '🍽️'} ${cat}</span>
                </div>
            `).join('');
        
        mapWrapper.appendChild(legend);
    }
    
    if (valid.length === 1) {
        map.setCenter(bounds.getCenter());
        map.setZoom(15);
    } else {
        map.fitBounds(bounds);
        google.maps.event.addListenerOnce(map, 'bounds_changed', () => {
            if (map.getZoom() > 16) map.setZoom(16);
        });
    }
}
