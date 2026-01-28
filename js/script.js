// Configuration
const GOOGLE_SHEETS_API_KEY = 'AIzaSyBo_QKk0hkE8Kkp2sUS4qOLzSiYpI-bfr0';
const SPREADSHEET_ID = '1EneuCtSuzmZI6P7Flwd0oRIsrrziX2fyduylwQIW3cc';

// State
let currentCity = 0;
let citiesData = [];
let map;
let markers = [];
let filters = {
    cuisine: 'all',
    minRating: 0
};

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Load restaurant data
    loadRestaurantData();
});

// Google Sheets Integration
async function loadRestaurantData() {
    try {
        // Fetch spreadsheet metadata to get sheet names
        const metadataUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}?key=${GOOGLE_SHEETS_API_KEY}`;
        const metadataResponse = await fetch(metadataUrl);
        const metadata = await metadataResponse.json();

        if (!metadata.sheets) {
            console.error('No sheets found in the spreadsheet');
            return;
        }

        // Get all sheet names (each represents a city)
        const sheetNames = metadata.sheets.map(sheet => sheet.properties.title);

        // Fetch data from all sheets
        citiesData = await Promise.all(
            sheetNames.map(async (sheetName) => {
                const dataUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(sheetName)}?key=${GOOGLE_SHEETS_API_KEY}`;
                const dataResponse = await fetch(dataUrl);
                const data = await dataResponse.json();

                return {
                    name: sheetName,
                    restaurants: parseRestaurantData(data.values)
                };
            })
        );

        // Render city tabs
        renderCityTabs();

        // Show first city by default
        if (citiesData.length > 0) {
            showCity(0);
        }
    } catch (error) {
        console.error('Error loading restaurant data:', error);
        document.querySelector('.restaurants-list').innerHTML =
            '<p class="loading-message">Unable to load restaurant data. Please check your Google Sheets API configuration.</p>';
    }
}

function parseRestaurantData(values) {
    if (!values || values.length < 2) return [];

    // Headers: Name, Category, Date Last Visited, Address, Dishes, Latitude, Longitude, Yelp Rating, Google Rating
    const headers = values[0].map(h => h.toLowerCase());
    const restaurants = [];

    for (let i = 1; i < values.length; i++) {
        const row = values[i];
        if (!row[0]) continue; // Skip empty rows

        const restaurant = {
            name: row[0] || '',
            category: row[1] || '',
            dateVisited: row[2] || null,
            address: row[3] || '',
            dishes: row[4] || '',
            lat: parseFloat(row[5]) || null,
            lng: parseFloat(row[6]) || null,
            yelpRating: parseFloat(row[7]) || null,
            googleRating: parseFloat(row[8]) || null
        };

        restaurants.push(restaurant);
    }

    return restaurants;
}

function renderCityTabs() {
    const cityTabsContainer = document.querySelector('.city-tabs');
    cityTabsContainer.innerHTML = '';

    citiesData.forEach((city, index) => {
        const button = document.createElement('button');
        button.className = `city-tab ${index === 0 ? 'active' : ''}`;
        button.textContent = city.name;
        button.dataset.city = index;
        button.addEventListener('click', () => showCity(index));
        cityTabsContainer.appendChild(button);
    });

    // Render filters after city tabs
    renderFilters();
}

function renderFilters() {
    // Get all unique cuisines across all cities
    const allCuisines = new Set();
    citiesData.forEach(city => {
        city.restaurants.forEach(r => {
            if (r.category && r.category.trim()) {
                allCuisines.add(r.category.trim());
            }
        });
    });

    const cuisineOptions = Array.from(allCuisines).sort();

    // Create filter container
    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter-container';
    filterContainer.innerHTML = `
        <div class="filter-group">
            <label for="cuisine-filter">Cuisine:</label>
            <select id="cuisine-filter">
                <option value="all">All Cuisines</option>
                ${cuisineOptions.map(c => `<option value="${c}">${c}</option>`).join('')}
            </select>
        </div>
        <div class="filter-group">
            <label for="rating-filter">Min Google Rating:</label>
            <select id="rating-filter">
                <option value="0">Any Rating</option>
                <option value="4">4.0+</option>
                <option value="4.3">4.3+</option>
                <option value="4.5">4.5+</option>
                <option value="4.7">4.7+</option>
            </select>
        </div>
        <div class="filter-results"></div>
    `;

    // Insert after city tabs
    const cityTabs = document.querySelector('.city-tabs');
    cityTabs.parentNode.insertBefore(filterContainer, cityTabs.nextSibling);

    // Add event listeners
    document.getElementById('cuisine-filter').addEventListener('change', (e) => {
        filters.cuisine = e.target.value;
        applyFilters();
    });

    document.getElementById('rating-filter').addEventListener('change', (e) => {
        filters.minRating = parseFloat(e.target.value);
        applyFilters();
    });
}

function applyFilters() {
    const restaurants = citiesData[currentCity].restaurants;
    const filtered = filterRestaurants(restaurants);
    renderRestaurants(filtered);
    updateMap(filtered);
    updateFilterResults(filtered.length, restaurants.length);
}

function filterRestaurants(restaurants) {
    return restaurants.filter(r => {
        // Filter by cuisine
        if (filters.cuisine !== 'all') {
            if (!r.category || r.category.trim().toLowerCase() !== filters.cuisine.toLowerCase()) {
                return false;
            }
        }
        // Filter by minimum Google rating
        if (filters.minRating > 0) {
            if (!r.googleRating || r.googleRating < filters.minRating) {
                return false;
            }
        }
        return true;
    });
}

function updateFilterResults(shown, total) {
    const resultsEl = document.querySelector('.filter-results');
    if (resultsEl) {
        if (shown === total) {
            resultsEl.textContent = '';
        } else {
            resultsEl.textContent = `Showing ${shown} of ${total} restaurants`;
        }
    }
}

function showCity(index) {
    currentCity = index;

    // Update active tab
    document.querySelectorAll('.city-tab').forEach((tab, i) => {
        tab.classList.toggle('active', i === index);
    });

    // Apply filters and render
    const filtered = filterRestaurants(citiesData[index].restaurants);
    renderRestaurants(filtered);
    updateMap(filtered);
    updateFilterResults(filtered.length, citiesData[index].restaurants.length);
}

function renderRestaurants(restaurants) {
    const restaurantsList = document.querySelector('.restaurants-list');

    if (restaurants.length === 0) {
        restaurantsList.innerHTML = '<p class="loading-message">No restaurants match your filters.</p>';
        return;
    }

    restaurantsList.innerHTML = restaurants.map(restaurant => `
        <div class="restaurant-card">
            <div class="restaurant-header">
                <h3>${restaurant.name}</h3>
                ${restaurant.googleRating ? `
                    <span class="restaurant-rating" title="Google Maps rating">
                        ⭐ ${restaurant.googleRating.toFixed(1)}
                    </span>
                ` : ''}
            </div>
            ${restaurant.category ? `<p class="gear-category">${restaurant.category}</p>` : ''}
            <p class="restaurant-address">${restaurant.address}</p>
            ${restaurant.dateVisited ? `
                <p class="restaurant-date">Last visited: ${restaurant.dateVisited}</p>
            ` : ''}
            ${restaurant.dishes ? `
                <div class="restaurant-dishes">
                    <strong>Recommended dishes:</strong><br>
                    ${restaurant.dishes.split(',').map(dish =>
                        `<span class="dish-tag">${dish.trim()}</span>`
                    ).join('')}
                </div>
            ` : ''}
        </div>
    `).join('');
}

// Google Maps Integration
function initMap() {
    // Default to center of US if no data
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: { lat: 37.7749, lng: -122.4194 },
        styles: [
            {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
            }
        ]
    });

    // If data is already loaded, update the map
    if (citiesData.length > 0) {
        updateMap(citiesData[currentCity].restaurants);
    }
}

function updateMap(restaurants) {
    if (!map) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    markers = [];

    // Filter restaurants with valid coordinates
    const validRestaurants = restaurants.filter(r => r.lat && r.lng);

    if (validRestaurants.length === 0) {
        // If no coordinates, try to geocode based on city name or show default
        const cityName = citiesData[currentCity]?.name || '';
        // Default city centers as fallback
        const cityCenters = {
            'New York': { lat: 40.7128, lng: -74.0060 },
            'NYC': { lat: 40.7128, lng: -74.0060 },
            'San Francisco': { lat: 37.7749, lng: -122.4194 },
            'SF': { lat: 37.7749, lng: -122.4194 },
            'Los Angeles': { lat: 34.0522, lng: -118.2437 },
            'LA': { lat: 34.0522, lng: -118.2437 },
            'Chicago': { lat: 41.8781, lng: -87.6298 },
            'Seattle': { lat: 47.6062, lng: -122.3321 },
            'Austin': { lat: 30.2672, lng: -97.7431 },
            'Boston': { lat: 42.3601, lng: -71.0589 },
            'Miami': { lat: 25.7617, lng: -80.1918 },
            'Tokyo': { lat: 35.6762, lng: 139.6503 },
            'London': { lat: 51.5074, lng: -0.1278 },
            'Paris': { lat: 48.8566, lng: 2.3522 },
            'Seoul': { lat: 37.5665, lng: 126.9780 }
        };
        const center = cityCenters[cityName] || { lat: 37.7749, lng: -122.4194 };
        map.setCenter(center);
        map.setZoom(12);
        return;
    }

    // Add markers for each restaurant
    const bounds = new google.maps.LatLngBounds();

    validRestaurants.forEach(restaurant => {
        const position = { lat: restaurant.lat, lng: restaurant.lng };

        const marker = new google.maps.Marker({
            position: position,
            map: map,
            title: restaurant.name,
            animation: google.maps.Animation.DROP
        });

        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div style="padding: 8px; max-width: 200px;">
                    <h3 style="margin: 0 0 8px 0; font-size: 16px;">${restaurant.name}</h3>
                    <p style="margin: 0; font-size: 14px; color: #666;">${restaurant.address}</p>
                </div>
            `
        });

        marker.addListener('click', () => {
            // Close all other info windows
            markers.forEach(m => {
                if (m.infoWindow) m.infoWindow.close();
            });
            infoWindow.open(map, marker);
        });

        marker.infoWindow = infoWindow;
        markers.push(marker);

        bounds.extend(position);
    });

    // Fit map to show all markers
    if (validRestaurants.length === 1) {
        map.setCenter(bounds.getCenter());
        map.setZoom(15);
    } else {
        map.fitBounds(bounds);
        // Add listener to prevent over-zooming on fitBounds
        google.maps.event.addListenerOnce(map, 'bounds_changed', () => {
            if (map.getZoom() > 16) {
                map.setZoom(16);
            }
        });
    }
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Account for fixed navbar
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Photo modal (optional enhancement)
document.querySelectorAll('.photo-item').forEach(item => {
    item.addEventListener('click', function() {
        // You can add a lightbox/modal functionality here if desired
        console.log('Photo clicked:', this.querySelector('img').alt);
    });
});
