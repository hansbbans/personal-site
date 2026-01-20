// Configuration
const GOOGLE_SHEETS_API_KEY = 'AIzaSyBo_QKk0hkE8Kkp2sUS4qOLzSiYpI-bfr0';
const GEAR_SPREADSHEET_ID = 'YOUR_GEAR_SPREADSHEET_ID_HERE'; // Replace with your gear spreadsheet ID

// Load gear data on page load
document.addEventListener('DOMContentLoaded', () => {
    loadGearData();
});

async function loadGearData() {
    try {
        const dataUrl = `https://sheets.googleapis.com/v4/spreadsheets/${GEAR_SPREADSHEET_ID}/values/Sheet1?key=${GOOGLE_SHEETS_API_KEY}`;
        const response = await fetch(dataUrl);
        const data = await response.json();

        if (!data.values || data.values.length < 2) {
            console.error('No gear data found');
            return;
        }

        renderGearSections(parseGearData(data.values));
    } catch (error) {
        console.error('Error loading gear data:', error);
    }
}

function parseGearData(values) {
    // Skip header row, assume columns: Category, Product Name, Description, URL
    const gearByCategory = {};

    for (let i = 1; i < values.length; i++) {
        const row = values[i];
        if (!row[0] || !row[1]) continue; // Skip if no category or product name

        const category = row[0];
        const productName = row[1];
        const description = row[2] || '';
        const url = row[3] || '';

        if (!gearByCategory[category]) {
            gearByCategory[category] = [];
        }

        gearByCategory[category].push({
            name: productName,
            description: description,
            url: url
        });
    }

    return gearByCategory;
}

function renderGearSections(gearByCategory) {
    const tocContainer = document.querySelector('.gear-toc ul');
    const contentContainer = document.querySelector('.gear-content');

    // Clear existing content
    tocContainer.innerHTML = '';
    contentContainer.innerHTML = '';

    // Generate sections for each category
    Object.keys(gearByCategory).forEach((category, index) => {
        const categoryId = category.toLowerCase().replace(/[^a-z0-9]+/g, '-');

        // Add to table of contents
        const tocItem = document.createElement('li');
        tocItem.innerHTML = `<a href="#${categoryId}">${category}</a>`;
        tocContainer.appendChild(tocItem);

        // Create section
        const section = document.createElement('section');
        section.id = categoryId;
        section.className = 'gear-section';

        const heading = document.createElement('h2');
        heading.textContent = category;
        section.appendChild(heading);

        const list = document.createElement('ul');
        list.className = 'gear-list';

        gearByCategory[category].forEach(item => {
            const listItem = document.createElement('li');

            // If URL exists, make product name a link
            if (item.url) {
                listItem.innerHTML = `<strong><a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.name}</a></strong> - ${item.description}`;
            } else {
                listItem.innerHTML = `<strong>${item.name}</strong> - ${item.description}`;
            }

            list.appendChild(listItem);
        });

        section.appendChild(list);
        contentContainer.appendChild(section);
    });
}
