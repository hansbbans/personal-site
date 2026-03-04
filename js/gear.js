// Gear Page Script
const GOOGLE_SHEETS_API_KEY = SITE_CONFIG.googleSheetsApiKey;
const GEAR_SPREADSHEET_ID = SITE_CONFIG.spreadsheets.gear;

let gearData = [];

document.addEventListener('DOMContentLoaded', () => {
    loadGearData();
});

async function loadGearData() {
    try {
        const dataUrl = `https://sheets.googleapis.com/v4/spreadsheets/${GEAR_SPREADSHEET_ID}/values/Sheet1?key=${GOOGLE_SHEETS_API_KEY}`;
        const response = await fetch(dataUrl);
        const data = await response.json();
        gearData = parseGearData(data.values);
        renderGear();
    } catch (error) {
        console.error('Error loading gear:', error);
        document.getElementById('gearGrid').innerHTML =
            '<p class="loading-message">Unable to load gear.</p>';
    }
}

function parseGearData(values) {
    if (!values || values.length < 2) return [];
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

function renderGear() {
    const container = document.getElementById('gearGrid');

    if (gearData.length === 0) {
        container.innerHTML = '<p class="loading-message">No gear yet.</p>';
        return;
    }

    const grouped = groupByCategory(gearData);
    const sortedCategories = Array.from(grouped.keys()).sort((a, b) => {
        const aIsDefault = a.toLowerCase() === 'gear';
        const bIsDefault = b.toLowerCase() === 'gear';
        if (aIsDefault && !bIsDefault) return -1;
        if (!aIsDefault && bIsDefault) return 1;
        return a.localeCompare(b);
    });

    container.innerHTML = '<div class="gear-hierarchy">' +
        sortedCategories.map((category) => {
            const items = grouped.get(category) || [];
            return '<section class="gear-category-group">' +
                '<h3 class="gear-category-title">' + escapeHtml(formatCategoryLabel(category)) + '</h3>' +
                '<ol class="gear-category-list">' +
                    items.map((item) => {
                        const link = getSafeExternalUrl(item.amazonLink);
                        const itemName = escapeHtml(item.name);
                        const description = item.description
                            ? '<span class="gear-item-description"> — ' + escapeHtml(item.description) + '</span>'
                            : '';
                        const itemLabel = link
                            ? '<a href="' + escapeAttr(link) + '" target="_blank" rel="noopener">' + itemName + '</a>'
                            : '<span>' + itemName + '</span>';
                        return '<li class="gear-category-item">' + itemLabel + description + '</li>';
                    }).join('') +
                '</ol>' +
            '</section>';
        }).join('') +
    '</div>';
}

function groupByCategory(items) {
    const grouped = new Map();
    items.forEach((item) => {
        const category = normalizeCategory(item.category);
        if (!grouped.has(category)) grouped.set(category, []);
        grouped.get(category).push(item);
    });
    return grouped;
}

function normalizeCategory(category) {
    if (typeof category !== 'string') return 'Gear';
    const trimmed = category.trim();
    return trimmed ? trimmed : 'Gear';
}

function formatCategoryLabel(category) {
    return category
        .split(/\s+/)
        .map((word) => {
            if (!word) return '';
            if (word.toUpperCase() === word && word.length <= 5) return word;
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(' ');
}

function getSafeExternalUrl(url) {
    if (typeof url !== 'string') return '';
    const trimmed = url.trim();
    if (!trimmed) return '';
    return /^https?:\/\//i.test(trimmed) ? trimmed : '';
}

function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function escapeAttr(str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}
