// Food Admin Application
class FoodAdminApp {
    constructor() {
        this.citiesData = [];
        this.currentManageCity = 'NYC';
        this.config = this.loadConfig();
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadRestaurantData();
    }
    
    loadConfig() {
        const defaults = {
            repoOwner: 'hansbbans',
            repoName: 'personal-site',
            githubToken: '',
            spreadsheetId: '1EneuCtSuzmZI6P7Flwd0oRIsrrziX2fyduylwQIW3cc'
        };
        
        const saved = localStorage.getItem('foodAdminConfig');
        return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
    }
    
    setupEventListeners() {
        // City tabs in manage view
        document.querySelectorAll('#manageCityTabs .city-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                this.currentManageCity = tab.dataset.city;
                document.querySelectorAll('#manageCityTabs .city-tab').forEach(t => 
                    t.classList.toggle('active', t.dataset.city === this.currentManageCity)
                );
                this.renderRestaurantList();
            });
        });
    }
    
    switchTab(tabName) {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabName);
        });
        
        document.querySelectorAll('.tab-panel').forEach(panel => {
            panel.classList.toggle('active', panel.id === `${tabName}Tab`);
        });
        
        if (tabName === 'manage') {
            this.renderRestaurantList();
        }
    }
    
    updateSubcategories() {
        const mainCategory = document.getElementById('mainCategory').value;
        const subcategorySelect = document.getElementById('subcategory');
        
        if (!mainCategory) {
            subcategorySelect.innerHTML = '<option value="">Select main category first</option>';
            subcategorySelect.disabled = true;
            return;
        }
        
        const subcategories = FOOD_CATEGORIES[mainCategory]?.subcategories || [];
        subcategorySelect.innerHTML = `
            <option value="">Select subcategory...</option>
            ${subcategories.map(sub => `
                <option value="${sub}">${getSubcategoryEmoji(sub)} ${sub}</option>
            `).join('')}
        `;
        subcategorySelect.disabled = false;
        
        // Auto-suggest legacy category based on subcategory
        subcategorySelect.onchange = () => {
            const sub = subcategorySelect.value;
            const legacyInput = document.getElementById('legacyCategory');
            if (sub && !legacyInput.value) {
                // Find a reverse mapping or use subcategory name
                legacyInput.value = sub;
            }
        };
    }
    
    updateEditSubcategories() {
        const mainCategory = document.getElementById('editMainCategory').value;
        const subcategorySelect = document.getElementById('editSubcategory');
        
        if (!mainCategory) {
            subcategorySelect.innerHTML = '<option value="">Select main category first</option>';
            subcategorySelect.disabled = true;
            return;
        }
        
        const subcategories = FOOD_CATEGORIES[mainCategory]?.subcategories || [];
        const currentValue = subcategorySelect.value;
        
        subcategorySelect.innerHTML = `
            <option value="">Select subcategory...</option>
            ${subcategories.map(sub => `
                <option value="${sub}" ${sub === currentValue ? 'selected' : ''}>
                    ${getSubcategoryEmoji(sub)} ${sub}
                </option>
            `).join('')}
        `;
        subcategorySelect.disabled = false;
    }
    
    async loadRestaurantData() {
        try {
            const API_KEY = 'AIzaSyBo_QKk0hkE8Kkp2sUS4qOLzSiYpI-bfr0';
            const SPREADSHEET_ID = this.config.spreadsheetId;
            
            const metadataUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}?key=${API_KEY}`;
            const metadataResponse = await fetch(metadataUrl);
            const metadata = await metadataResponse.json();
            
            if (!metadata.sheets) {
                this.showStatus('error', 'No sheets found in spreadsheet');
                return;
            }
            
            const sheetNames = metadata.sheets.map(s => s.properties.title);
            
            this.citiesData = await Promise.all(
                sheetNames.map(async (sheetName) => {
                    const dataUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(sheetName)}?key=${API_KEY}`;
                    const response = await fetch(dataUrl);
                    const data = await response.json();
                    return {
                        name: sheetName,
                        restaurants: this.parseRestaurantData(data.values)
                    };
                })
            );
            
            this.renderRestaurantList();
        } catch (error) {
            console.error('Error loading data:', error);
            this.showStatus('error', 'Failed to load restaurant data');
        }
    }
    
    parseRestaurantData(values) {
        if (!values || values.length < 2) return [];
        
        const restaurants = [];
        for (let i = 1; i < values.length; i++) {
            const row = values[i];
            if (!row[0]) continue;
            
            const legacyCategory = row[1] || '';
            const categoryInfo = getCategoryInfo(legacyCategory);
            
            restaurants.push({
                index: i,
                name: row[0] || '',
                category: legacyCategory,
                mainCategory: categoryInfo.mainCategory,
                subcategory: categoryInfo.subcategory,
                dateVisited: row[2] || '',
                address: row[3] || '',
                dishes: row[4] || '',
                lat: row[5] || '',
                lng: row[6] || '',
                yelpRating: row[7] || '',
                googleRating: row[8] || ''
            });
        }
        return restaurants;
    }
    
    renderRestaurantList() {
        const list = document.getElementById('restaurantList');
        const cityData = this.citiesData.find(c => c.name === this.currentManageCity);
        
        if (!cityData || cityData.restaurants.length === 0) {
            list.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🍽️</div>
                    <p>No restaurants in ${this.currentManageCity} yet</p>
                </div>
            `;
            return;
        }
        
        list.innerHTML = cityData.restaurants.map(r => {
            const categoryDisplay = r.mainCategory && r.subcategory 
                ? `${getMainCategoryEmoji(r.mainCategory)} ${r.mainCategory} › ${getSubcategoryEmoji(r.subcategory)} ${r.subcategory}`
                : r.category || 'Uncategorized';
            
            return `
                <div class="restaurant-item" data-index="${r.index}">
                    <div class="restaurant-info">
                        <h4>${r.name}</h4>
                        <div class="restaurant-meta">
                            <span class="restaurant-category">${categoryDisplay}</span>
                            ${r.googleRating ? `<span>⭐ ${r.googleRating}</span>` : ''}
                            ${r.address ? `<span>📍 ${r.address.substring(0, 30)}${r.address.length > 30 ? '...' : ''}</span>` : ''}
                        </div>
                    </div>
                    <div class="restaurant-actions">
                        <button class="btn-secondary btn-small" onclick="app.editRestaurant('${r.index}')">Edit</button>
                        <button class="btn-action" onclick="app.deleteRestaurant('${r.index}')">🗑️</button>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    editRestaurant(index) {
        const cityData = this.citiesData.find(c => c.name === this.currentManageCity);
        const restaurant = cityData.restaurants.find(r => r.index == index);
        
        if (!restaurant) return;
        
        document.getElementById('editRestaurantIndex').value = index;
        document.getElementById('editRestaurantCity').value = this.currentManageCity;
        document.getElementById('editName').value = restaurant.name;
        document.getElementById('editMainCategory').value = restaurant.mainCategory || '';
        document.getElementById('editLegacyCategory').value = restaurant.category || '';
        document.getElementById('editAddress').value = restaurant.address || '';
        document.getElementById('editLatitude').value = restaurant.lat || '';
        document.getElementById('editLongitude').value = restaurant.lng || '';
        document.getElementById('editDishes').value = restaurant.dishes || '';
        document.getElementById('editYelpRating').value = restaurant.yelpRating || '';
        document.getElementById('editGoogleRating').value = restaurant.googleRating || '';
        
        // Update subcategories and set value
        this.updateEditSubcategories();
        document.getElementById('editSubcategory').value = restaurant.subcategory || '';
        
        document.getElementById('editModal').classList.remove('hidden');
    }
    
    closeEditModal() {
        document.getElementById('editModal').classList.add('hidden');
    }
    
    saveEdit() {
        const index = document.getElementById('editRestaurantIndex').value;
        const city = document.getElementById('editRestaurantCity').value;
        
        const updates = {
            name: document.getElementById('editName').value,
            mainCategory: document.getElementById('editMainCategory').value,
            subcategory: document.getElementById('editSubcategory').value,
            category: document.getElementById('editLegacyCategory').value,
            address: document.getElementById('editAddress').value,
            lat: document.getElementById('editLatitude').value,
            lng: document.getElementById('editLongitude').value,
            dishes: document.getElementById('editDishes').value,
            yelpRating: document.getElementById('editYelpRating').value,
            googleRating: document.getElementById('editGoogleRating').value
        };
        
        // In a real implementation, this would update the Google Sheet
        // For now, we'll just show a message
        this.showStatus('info', 'Note: Changes are not persisted. Use Google Sheets to edit data directly.');
        this.closeEditModal();
    }
    
    deleteRestaurant(index) {
        if (!confirm('Are you sure you want to delete this restaurant?')) return;
        
        // In a real implementation, this would delete from the Google Sheet
        this.showStatus('info', 'Note: Deletions are not persisted. Use Google Sheets to edit data directly.');
    }
    
    addRestaurant() {
        const city = document.getElementById('citySelect').value;
        const name = document.getElementById('restaurantName').value;
        const mainCategory = document.getElementById('mainCategory').value;
        const subcategory = document.getElementById('subcategory').value;
        const legacyCategory = document.getElementById('legacyCategory').value;
        
        if (!name || !mainCategory || !subcategory) {
            this.showStatus('error', 'Please fill in required fields: Name, Main Category, and Subcategory');
            return;
        }
        
        const restaurant = {
            city,
            name,
            mainCategory,
            subcategory,
            category: legacyCategory || subcategory,
            address: document.getElementById('address').value,
            lat: document.getElementById('latitude').value,
            lng: document.getElementById('longitude').value,
            dishes: document.getElementById('dishes').value,
            yelpRating: document.getElementById('yelpRating').value,
            googleRating: document.getElementById('googleRating').value,
            dateVisited: document.getElementById('dateVisited').value
        };
        
        // In a real implementation, this would add to the Google Sheet
        console.log('New restaurant:', restaurant);
        
        // Clear form
        document.getElementById('restaurantName').value = '';
        document.getElementById('mainCategory').value = '';
        document.getElementById('subcategory').value = '';
        document.getElementById('subcategory').disabled = true;
        document.getElementById('legacyCategory').value = '';
        document.getElementById('address').value = '';
        document.getElementById('latitude').value = '';
        document.getElementById('longitude').value = '';
        document.getElementById('dishes').value = '';
        document.getElementById('yelpRating').value = '';
        document.getElementById('googleRating').value = '';
        document.getElementById('dateVisited').value = '';
        
        this.showStatus('success', `Restaurant "${name}" prepared for ${city}! Note: Use Google Sheets to add it permanently.`);
    }
    
    showStatus(type, message) {
        const statusBar = document.getElementById('statusBar');
        const statusContent = document.getElementById('statusContent');
        
        statusBar.className = 'status-bar ' + type;
        statusContent.textContent = message;
        statusBar.classList.remove('hidden');
        
        if (type === 'success' || type === 'info') {
            setTimeout(() => this.hideStatus(), 5000);
        }
    }
    
    hideStatus() {
        document.getElementById('statusBar').classList.add('hidden');
    }
}

// Initialize app
let app;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app = new FoodAdminApp();
    });
} else {
    app = new FoodAdminApp();
}
