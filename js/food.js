// Food Page Script
const GOOGLE_SHEETS_API_KEY = 'AIzaSyBo_QKk0hkE8Kkp2sUS4qOLzSiYpI-bfr0';
const SPREADSHEET_ID = '1EneuCtSuzmZI6P7Flwd0oRIsrrziX2fyduylwQIW3cc';

// Category emoji mapping
const CATEGORY_EMOJI = {
    'pizza': '🍕',
    'korean': '🇰🇷',
    'japanese': '🇯🇵',
    'sushi': '🍣',
    'mexican': '🌮',
    'thai': '🇹🇭',
    'chinese': '🇨🇳',
    'taiwanese': '🇹🇼',
    'vietnamese': '🇻🇳',
    'indian': '🇮🇳',
    'italian': '🇮🇹',
    'french': '🇫🇷',
    'american': '🇺🇸',
    'peruvian': '🇵🇪',
    'caribbean': '🌴',
    'haitian': '🇭🇹',
    'mediterranean': '🫒',
    'greek': '🇬🇷',
    'middle eastern': '🧆',
    'seafood': '🦞',
    'bbq': '🍖',
    'ramen': '🍜',
    'coffee': '☕',
    'bakery': '🥐',
    'dessert': '🍰',
    'default': '🍽️'
};

// State
let currentCity = 0;
let currentCategory = 'all';
let citiesData = [];
let map;
let markers = [];
let mapVisible = false;

// Get emoji for category
function getCategoryEmoji(category) {
    if (!category) return CATEGORY_EMOJI.default;
    const key = category.toLowerCase().trim();
    return CATEGORY_EMOJI[key] || CATEGORY_EMOJI.default;
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
        renderCategoryFilters();
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
        
        restaurants.push({
            name: row[0] || '',
            category: row[1] || '',
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

// Render category filter pills
function renderCategoryFilters() {
    const container = document.getElementById('categoryFilters');
    const allCategories = {};
    
    // Count categories across ALL cities for consistent filters
    citiesData.forEach(city => {
        city.restaurants.forEach(r => {
            if (r.category && r.category.trim()) {
                const cat = r.category.trim();
                allCategories[cat] = (allCategories[cat] || 0) + 1;
            }
        });
    });
    
    const sorted = Object.entries(allCategories)
        .sort((a, b) => b[1] - a[1]); // Sort by count
    
    container.innerHTML = `
        <button class="category-pill active" data-category="all">
            All
        </button>
        ${sorted.map(([cat, count]) => `
            <button class="category-pill" data-category="${cat}">
                <span class="category-emoji">${getCategoryEmoji(cat)}</span>
                ${cat}
            </button>
        `).join('')}
    `;
    
    container.querySelectorAll('.category-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            currentCategory = pill.dataset.category;
            container.querySelectorAll('.category-pill').forEach(p => 
                p.classList.toggle('active', p.dataset.category === currentCategory)
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
    
    if (currentCategory === 'all') {
        return cityData.restaurants;
    }
    
    return cityData.restaurants.filter(r => 
        r.category && r.category.trim().toLowerCase() === currentCategory.toLowerCase()
    );
}

// Show city
function showCity(index) {
    currentCity = index;
    currentCategory = 'all'; // Reset filter when switching cities
    
    // Update active tab
    document.querySelectorAll('.city-tab').forEach((tab, i) => {
        tab.classList.toggle('active', i === index);
    });
    
    // Reset category filter UI
    document.querySelectorAll('.category-pill').forEach(pill => {
        pill.classList.toggle('active', pill.dataset.category === 'all');
    });
    
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
    
    // Update stats
    const total = citiesData[currentCity].restaurants.length;
    if (currentCategory === 'all') {
        stats.textContent = `${total} spots in ${citiesData[currentCity].name}`;
    } else {
        stats.textContent = `${restaurants.length} of ${total} spots`;
    }
    
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
        const isFeatured = isHighRated && index % 6 === 0; // Featured high-rated restaurants
        const featuredClass = isFeatured ? 'featured' : '';
        
        // Build Google Maps link from address
        const mapsLink = r.address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(r.name + ' ' + r.address)}` : null;
        
        return `
        <div class="food-card ${featuredClass}" 
             data-category="${r.category || 'general'}"
             data-rating="${r.googleRating || 0}">
            <div class="food-card-header">
                <div class="food-card-top">
                    <h3 class="food-card-name ${isFeatured ? 'card-title' : ''}">${r.name}</h3>
                    ${r.googleRating ? `
                        <div class="rating">${'⭐'.repeat(Math.floor(r.googleRating))} ${r.googleRating.toFixed(1)}</div>
                    ` : ''}
                </div>
                ${r.category ? `
                    <span class="food-card-category">
                        ${getCategoryEmoji(r.category)} ${r.category}
                    </span>
                ` : ''}
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
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: { lat: 40.7128, lng: -74.0060 },
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
    
    valid.forEach(r => {
        const position = { lat: r.lat, lng: r.lng };
        
        const marker = new google.maps.Marker({
            position,
            map,
            title: r.name,
            animation: google.maps.Animation.DROP
        });
        
        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div style="padding: 8px; max-width: 220px;">
                    <h3 style="margin: 0 0 4px; font-size: 15px; font-weight: 600;">${r.name}</h3>
                    ${r.category ? `<p style="margin: 0 0 4px; font-size: 12px; color: #0d9488;">${getCategoryEmoji(r.category)} ${r.category}</p>` : ''}
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
