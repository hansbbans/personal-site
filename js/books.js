// Books Page Script
const GOOGLE_SHEETS_API_KEY = SITE_CONFIG.googleSheetsApiKey;
const BOOKS_SPREADSHEET_ID = SITE_CONFIG.spreadsheets.books;

// Category emoji mapping
const CATEGORY_EMOJI = {
    'fiction': '📖',
    'non-fiction': '📰',
    'sci-fi': '🚀',
    'fantasy': '🐉',
    'christian': '✝️',
    'business': '💼',
    'self-help': '🧠',
    'biography': '👤',
    'history': '🏛️',
    'memoir': '📝',
    'philosophy': '🤔',
    'science': '🔬',
    'psychology': '🧩',
    'default': '📚'
};

// State
let currentCategory = 'all';
let booksData = [];

// Get emoji for category
function getCategoryEmoji(category) {
    if (!category) return CATEGORY_EMOJI.default;
    const key = category.toLowerCase().trim();
    return CATEGORY_EMOJI[key] || CATEGORY_EMOJI.default;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadBooksData();
});

// Load data from Google Sheets
async function loadBooksData() {
    try {
        const dataUrl = `https://sheets.googleapis.com/v4/spreadsheets/${BOOKS_SPREADSHEET_ID}/values/Sheet1?key=${GOOGLE_SHEETS_API_KEY}`;
        const response = await fetch(dataUrl);
        const data = await response.json();
        
        booksData = parseBookData(data.values);
        
        renderCategoryFilters();
        renderBooks();
    } catch (error) {
        console.error('Error loading books:', error);
        document.getElementById('booksGrid').innerHTML = 
            '<p class="loading-message">Unable to load books.</p>';
    }
}

function parseBookData(values) {
    if (!values || values.length < 2) return [];
    
    // Headers: Title, Author, Category, Rating, Status, Notes, Amazon Link
    const books = [];
    for (let i = 1; i < values.length; i++) {
        const row = values[i];
        if (!row[0]) continue;
        
        // Extract ISBN/ASIN from Amazon link
        const amazonLink = row[6] || '';
        const asinMatch = amazonLink.match(/\/dp\/([A-Z0-9]+)/i);
        const isbn = asinMatch ? asinMatch[1] : null;
        
        books.push({
            title: row[0] || '',
            author: row[1] || '',
            category: row[2] || '',
            rating: row[3] ? parseFloat(row[3]) : null,
            status: row[4] || 'Read',
            notes: row[5] || '',
            amazonLink: amazonLink,
            isbn: isbn,
            // Use Amazon's image server for covers
            coverUrl: isbn ? `https://images-na.ssl-images-amazon.com/images/P/${isbn}.01.LZZZZZZZ.jpg` : null
        });
    }
    return books;
}

// Render category filter pills
function renderCategoryFilters() {
    const container = document.getElementById('categoryFilters');
    const categories = {};
    
    // Count categories
    booksData.forEach(book => {
        if (book.category && book.category.trim()) {
            const cat = book.category.trim();
            categories[cat] = (categories[cat] || 0) + 1;
        }
    });
    
    const sorted = Object.entries(categories)
        .sort((a, b) => b[1] - a[1]); // Sort by count
    
    container.innerHTML = `
        <button class="category-pill active" data-category="all">
            All <span class="count">${booksData.length}</span>
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
            renderBooks();
        });
    });
}

// Get filtered books
function getFilteredBooks() {
    if (currentCategory === 'all') {
        return booksData;
    }
    return booksData.filter(book => 
        book.category && book.category.trim().toLowerCase() === currentCategory.toLowerCase()
    );
}

// Render books
function renderBooks() {
    const grid = document.getElementById('booksGrid');
    const books = getFilteredBooks();
    const stats = document.getElementById('booksStats');
    
    // Update stats
    if (currentCategory === 'all') {
        stats.textContent = `${booksData.length} books`;
    } else {
        stats.textContent = `${books.length} of ${booksData.length} books`;
    }
    
    if (books.length === 0) {
        grid.innerHTML = `
            <div class="books-empty">
                <div class="books-empty-icon">📚</div>
                <div class="books-empty-text">No books in this category yet</div>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = books.map((book, index) => {
        // Add personality features for book cards
        const isHighRated = book.rating && parseFloat(book.rating) >= 4.5;
        const isFavorite = isHighRated || (book.notes && book.notes.length > 100);
        const isReading = book.status && book.status.toLowerCase() === 'reading';
        const isFeatured = isFavorite && index % 8 === 0; // Featured books
        const personalityClass = isFavorite ? 'favorite' : '';
        const interactiveClass = 'card-interactive';
        
        return `
        <a href="${book.amazonLink || '#'}" target="_blank" rel="noopener" class="book-card-link">
            <div class="book-card ${personalityClass} ${interactiveClass}" 
                 data-category="${book.category || 'general'}"
                 data-rating="${book.rating || 0}"
                 title="Click to view on Amazon">
                <div class="book-spine"></div>
                <div class="book-card-cover">
                    ${book.coverUrl 
                        ? `<img src="${book.coverUrl}" alt="${book.title}" loading="lazy" onerror="this.parentElement.innerHTML='<span class=\\'book-card-cover-placeholder\\'>📖</span>'">`
                        : `<span class="book-card-cover-placeholder">📖</span>`
                    }
                    ${book.rating ? `
                        <span class="book-card-rating">⭐ ${book.rating}</span>
                    ` : ''}
                    ${isReading ? `
                        <span class="book-card-status reading">📖 Reading</span>
                    ` : ''}
                    ${book.status && book.status.toLowerCase() === 'to read' ? `
                        <span class="book-card-status to-read">📚 To Read</span>
                    ` : ''}
                </div>
                <div class="book-card-body">
                    ${book.category ? `
                        <span class="book-card-category">
                            ${getCategoryEmoji(book.category)} ${book.category}
                        </span>
                    ` : ''}
                    <h3 class="book-card-title ${isFeatured ? 'card-title' : ''}">${book.title}</h3>
                    <p class="book-card-author">by ${book.author}</p>
                    ${book.notes ? `
                        <p class="book-card-notes">${book.notes}</p>
                    ` : ''}
                    <div class="page-curl"></div>
                </div>
                <div class="card-tooltip">Click to view on Amazon</div>
            </div>
        </a>
        `;
    }).join('');
}
