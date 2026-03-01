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

    container.innerHTML = '<ul class="simple-list">' +
        gearData.map(item =>
            '<li class="simple-list-item">' +
            (item.amazonLink
                ? '<a href="' + item.amazonLink + '" target="_blank" rel="noopener">' + item.name + '</a>'
                : '<span>' + item.name + '</span>') +
            (item.description ? ' &mdash; ' + item.description : '') +
            '</li>'
        ).join('') +
    '</ul>';
}
