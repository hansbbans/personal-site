// Gear Page Script
const GOOGLE_SHEETS_API_KEY = SITE_CONFIG.googleSheetsApiKey;
const GEAR_SPREADSHEET_ID = SITE_CONFIG.spreadsheets.gear;
const GearCategoryFilterUtils = window.CategoryFilterUtils || {
    buildCategoryCounts(items, categorySelector) {
        const counts = {};

        items.forEach((item) => {
            const category = categorySelector(item);
            if (typeof category !== 'string') return;
            const trimmed = category.trim();
            if (!trimmed) return;
            counts[trimmed] = (counts[trimmed] || 0) + 1;
        });

        return Object.entries(counts).sort((a, b) => {
            if (b[1] !== a[1]) return b[1] - a[1];
            return a[0].localeCompare(b[0]);
        });
    },
    matchesCategory(category, selectedCategory) {
        if (selectedCategory === 'all') return true;
        if (typeof category !== 'string') return false;
        return category.trim().toLowerCase() === String(selectedCategory).trim().toLowerCase();
    }
};

// Category emoji mapping
const CATEGORY_EMOJI = {
    'electronics': '💻',
    'edc': '🎒',
    'audio': '🎧',
    'camera': '📷',
    'travel': '✈️',
    'office': '🖥️',
    'fitness': '💪',
    'default': '📦'
};

// Badge styles
const BADGE_STYLES = {
    'daily driver': { emoji: '⭐', class: 'badge-daily-driver' },
    'favorite': { emoji: '❤️', class: 'badge-favorite' },
    'must have': { emoji: '🔥', class: 'badge-must-order' }
};

// State
let currentCategory = 'all';
let gearData = [];

// Get emoji for category
function getCategoryEmoji(category) {
    if (!category) return CATEGORY_EMOJI.default;
    const key = category.toLowerCase().trim();
    return CATEGORY_EMOJI[key] || CATEGORY_EMOJI.default;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadGearData();
});

// Load data from Google Sheets
async function loadGearData() {
    try {
        const dataUrl = `https://sheets.googleapis.com/v4/spreadsheets/${GEAR_SPREADSHEET_ID}/values/Sheet1?key=${GOOGLE_SHEETS_API_KEY}`;
        const response = await fetch(dataUrl);
        const data = await response.json();
        
        gearData = parseGearData(data.values);
        
        renderCategoryFilters();
        renderGear();
    } catch (error) {
        console.error('Error loading gear:', error);
        document.getElementById('gearGrid').innerHTML = 
            '<p class="loading-message">Unable to load gear.</p>';
    }
}

function parseGearData(values) {
    if (!values || values.length < 2) return [];
    
    // Headers: Name, Category, Description, Badge, Amazon Link, ASIN
    const items = [];
    for (let i = 1; i < values.length; i++) {
        const row = values[i];
        if (!row[0]) continue;
        
        items.push({
            name: row[0] || '',
            category: row[1] || '',
            description: row[2] || '',
            badge: row[3] || '',
            amazonLink: row[4] || '',
            asin: row[5] || ''
        });
    }
    return items;
}

// Render category filter pills
function renderCategoryFilters() {
    const container = document.getElementById('categoryFilters');
    const sorted = GearCategoryFilterUtils.buildCategoryCounts(gearData, (item) => item.category);
    
    container.innerHTML = `
        <button class="category-pill active" data-category="all">
            All <span class="count">${gearData.length}</span>
        </button>
        ${sorted.map(([cat, count]) => `
            <button class="category-pill" data-category="${cat}">
                <span class="category-emoji">${getCategoryEmoji(cat)}</span>
                ${cat}
                <span class="count">${count}</span>
            </button>
        `).join('')}
    `;
    
    container.querySelectorAll('.category-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            currentCategory = pill.dataset.category;
            container.querySelectorAll('.category-pill').forEach(p => 
                p.classList.toggle('active', p.dataset.category === currentCategory)
            );
            renderGear();
        });
    });
}

// Get filtered gear
function getFilteredGear() {
    return gearData.filter((item) => GearCategoryFilterUtils.matchesCategory(item.category, currentCategory));
}

// Get badge HTML
function getBadgeHtml(badge) {
    if (!badge) return '';
    const key = badge.toLowerCase().trim();
    const style = BADGE_STYLES[key];
    if (!style) return '';
    return `<span class="badge ${style.class}">${style.emoji} ${badge}</span>`;
}

// Get personality badge for standout items
function getPersonalityBadge(badge) {
    if (!badge) return '';
    
    const key = badge.toLowerCase().trim();
    let badgeClass = 'personality-badge';
    let emoji = '⭐';
    
    if (key.includes('daily')) {
        badgeClass += ' badge-daily-driver';
        emoji = '⚡';
    } else if (key.includes('favorite')) {
        badgeClass += ' badge-favorite';
        emoji = '❤️';
    } else if (key.includes('must')) {
        badgeClass += ' badge-must-have';
        emoji = '🔥';
    }
    
    return `<div class="${badgeClass}">${emoji}</div>`;
}

// Render gear
function renderGear() {
    const grid = document.getElementById('gearGrid');
    const items = getFilteredGear();
    const stats = document.getElementById('gearStats');
    
    // Update stats
    if (currentCategory === 'all') {
        stats.textContent = `${gearData.length} items`;
    } else {
        stats.textContent = `${items.length} of ${gearData.length} items`;
    }
    
    if (items.length === 0) {
        grid.innerHTML = `
            <div class="gear-empty">
                <div class="gear-empty-icon">🎒</div>
                <div class="gear-empty-text">No gear in this category yet</div>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = items.map((item, index) => {
        // Add some personality variations
        const isStandout = item.badge && (item.badge.toLowerCase().includes('daily') || item.badge.toLowerCase().includes('favorite'));
        const isFeatured = isStandout && index % 7 === 0; // Every 7th standout item is featured large
        const personalityClass = isStandout ? 'standout' : '';
        const featuredClass = isFeatured ? 'featured-large' : '';
        const interactiveClass = 'card-interactive';
        
        return `
        <div class="gear-card ${personalityClass} ${featuredClass} ${interactiveClass}" 
             data-category="${item.category || 'misc'}"
             title="Click for details">
            ${isStandout ? getPersonalityBadge(item.badge) : ''}
            <div class="gear-card-body">
                <div class="gear-card-header">
                    ${item.category ? `
                        <span class="gear-card-category">
                            ${getCategoryEmoji(item.category)} ${item.category}
                        </span>
                    ` : ''}
                    ${getBadgeHtml(item.badge)}
                </div>
                <h3 class="gear-card-name ${isFeatured ? 'card-title' : ''}">
                    ${item.amazonLink 
                        ? `<a href="${item.amazonLink}" target="_blank" rel="noopener">${item.name}</a>`
                        : item.name
                    }
                </h3>
                ${item.description ? `
                    <p class="gear-card-description">${item.description}</p>
                ` : ''}
                ${item.amazonLink ? `
                    <div class="card-tooltip">Click to view on Amazon</div>
                ` : ''}
            </div>
        </div>
        `;
    }).join('');
}
