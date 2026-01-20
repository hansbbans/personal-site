// Configuration
const GOOGLE_SHEETS_API_KEY = 'AIzaSyBo_QKk0hkE8Kkp2sUS4qOLzSiYpI-bfr0';
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';

// State
let currentCity = 0;
let citiesData = [];
let map;
let markers = [];

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

    // Assume first row is headers: Name, Address, Dishes, Latitude, Longitude
    const headers = values[0].map(h => h.toLowerCase());
    const restaurants = [];

    for (let i = 1; i < values.length; i++) {
        const row = values[i];
        if (!row[0]) continue; // Skip empty rows

        const restaurant = {
            name: row[0] || '',
            address: row[1] || '',
            dishes: row[2] || '',
            lat: parseFloat(row[3]) || null,
            lng: parseFloat(row[4]) || null
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
}

function showCity(index) {
    currentCity = index;

    // Update active tab
    document.querySelectorAll('.city-tab').forEach((tab, i) => {
        tab.classList.toggle('active', i === index);
    });

    // Render restaurants
    renderRestaurants(citiesData[index].restaurants);

    // Update map
    updateMap(citiesData[index].restaurants);
}

function renderRestaurants(restaurants) {
    const restaurantsList = document.querySelector('.restaurants-list');

    if (restaurants.length === 0) {
        restaurantsList.innerHTML = '<p class="loading-message">No restaurants found for this city.</p>';
        return;
    }

    restaurantsList.innerHTML = restaurants.map(restaurant => `
        <div class="restaurant-card">
            <h3>${restaurant.name}</h3>
            <p class="restaurant-address">${restaurant.address}</p>
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
        // If no coordinates, just show default view
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
