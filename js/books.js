// Books Page Script
const GOOGLE_SHEETS_API_KEY = SITE_CONFIG.googleSheetsApiKey;
const BOOKS_SPREADSHEET_ID = SITE_CONFIG.spreadsheets.books;
const BooksCategoryFilterUtils = window.CategoryFilterUtils || {
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

// Spine color palette — rich, varied, legible with white text
const SPINE_COLORS = [
    '#1B4332', '#2D6A4F', '#40916C',
    '#023E8A', '#0353A4', '#1565C0',
    '#4A1942', '#6A0572', '#7B2D8B',
    '#7D1E1E', '#9B2226', '#7F1D1D',
    '#5C3317', '#7F4F24', '#936639',
    '#1A1A2E', '#2C3E50', '#37474F',
    '#3E1F47', '#4527A0', '#283593',
    '#0D3B66', '#1A3A4A', '#006064',
    '#4E342E', '#6D4C41', '#5D4037',
    '#1B5E20', '#33691E', '#004D40',
];

// State
let currentCategory = 'all';
let booksData = [];
let activeBookIndex = null;

const BOOKS_PER_SHELF = 10;

function getCategoryEmoji(category) {
    if (!category) return CATEGORY_EMOJI.default;
    const key = category.toLowerCase().trim();
    return CATEGORY_EMOJI[key] || CATEGORY_EMOJI.default;
}

function hashStr(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
}

function getSpineColor(book) {
    return SPINE_COLORS[hashStr(book.title + book.author) % SPINE_COLORS.length];
}

function getSpineWidth(book) {
    // 26–50px simulating book thickness
    return 26 + (hashStr(book.title) % 25);
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
            coverUrl: isbn ? `https://images-na.ssl-images-amazon.com/images/P/${isbn}.01.LZZZZZZZ.jpg` : null
        });
    }
    return books;
}

// Render category filter pills
function renderCategoryFilters() {
    const container = document.getElementById('categoryFilters');
    const sorted = BooksCategoryFilterUtils.buildCategoryCounts(booksData, (book) => book.category);

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
            activeBookIndex = null;
            renderBooks();
        });
    });
}

function getFilteredBooks() {
    return booksData.filter((book) => BooksCategoryFilterUtils.matchesCategory(book.category, currentCategory));
}

// Main render — builds bookshelf rows
function renderBooks() {
    const grid = document.getElementById('booksGrid');
    const books = getFilteredBooks();
    const stats = document.getElementById('booksStats');

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

    activeBookIndex = null;

    // Split into shelf rows
    const shelves = [];
    for (let i = 0; i < books.length; i += BOOKS_PER_SHELF) {
        shelves.push(books.slice(i, i + BOOKS_PER_SHELF));
    }

    grid.innerHTML = `
        <div class="bookshelf-container">
            ${shelves.map((shelf, shelfIdx) => `
                <div class="shelf-section" data-shelf="${shelfIdx}">
                    <div class="shelf-row">
                        ${shelf.map((book, bookIdx) => {
                            const globalIdx = shelfIdx * BOOKS_PER_SHELF + bookIdx;
                            const color = getSpineColor(book);
                            const width = getSpineWidth(book);
                            const lighterColor = color + 'cc'; // slight transparency for binding
                            return `
                                <div class="book-spine"
                                     data-book-index="${globalIdx}"
                                     data-shelf="${shelfIdx}"
                                     style="width:${width}px; background-color:${color};"
                                     title="${escapeAttr(book.title)} — ${escapeAttr(book.author)}">
                                    ${book.coverUrl ? `
                                    <div class="book-spine-cover">
                                        <img src="${book.coverUrl}" alt="" loading="lazy"
                                             onerror="this.parentElement.style.display='none'">
                                    </div>` : ''}
                                    <div class="book-spine-binding"></div>
                                    <div class="book-spine-text">
                                        <span class="book-spine-title">${escapeHtml(book.title)}</span>
                                        <span class="book-spine-author">${escapeHtml(book.author)}</span>
                                    </div>
                                    ${book.rating && book.rating >= 4.5 ? '<div class="book-spine-star">★</div>' : ''}
                                </div>
                            `;
                        }).join('')}
                    </div>
                    <div class="shelf-plank"></div>
                    <div class="book-detail-panel" id="detail-shelf-${shelfIdx}"></div>
                </div>
            `).join('')}
        </div>
    `;

    // Attach click handlers
    grid.querySelectorAll('.book-spine').forEach(spine => {
        spine.addEventListener('click', () => {
            const bookIdx = parseInt(spine.dataset.bookIndex);
            const shelfIdx = parseInt(spine.dataset.shelf);
            handleSpineClick(bookIdx, shelfIdx, books);
        });
    });
}

function handleSpineClick(bookIdx, shelfIdx, books) {
    const book = books[bookIdx];
    const panel = document.getElementById(`detail-shelf-${shelfIdx}`);
    const allPanels = document.querySelectorAll('.book-detail-panel');
    const allSpines = document.querySelectorAll('.book-spine');

    // Toggle off if same book clicked again
    if (activeBookIndex === bookIdx) {
        panel.classList.remove('visible');
        panel.innerHTML = '';
        allSpines.forEach(s => s.classList.remove('active'));
        activeBookIndex = null;
        return;
    }

    // Close all open panels and deactivate spines
    allPanels.forEach(p => { p.classList.remove('visible'); p.innerHTML = ''; });
    allSpines.forEach(s => s.classList.remove('active'));

    // Activate clicked spine
    const activeSpine = document.querySelector(`.book-spine[data-book-index="${bookIdx}"]`);
    if (activeSpine) activeSpine.classList.add('active');
    activeBookIndex = bookIdx;

    // Render and show detail panel
    panel.innerHTML = renderDetailPanel(book);
    panel.classList.add('visible');

    // Scroll so the shelf + panel is visible
    setTimeout(() => {
        panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 50);

    // Close button
    panel.querySelector('.btn-close-detail').addEventListener('click', (e) => {
        e.stopPropagation();
        panel.classList.remove('visible');
        panel.innerHTML = '';
        if (activeSpine) activeSpine.classList.remove('active');
        activeBookIndex = null;
    });
}

function renderDetailPanel(book) {
    const statusLower = (book.status || '').toLowerCase();
    const statusBadge = statusLower === 'reading'
        ? `<span class="book-card-status reading">📖 Reading</span>`
        : statusLower === 'to read'
            ? `<span class="book-card-status to-read">📚 To Read</span>`
            : '';

    return `
        <div class="book-detail-inner">
            <div class="book-detail-cover">
                ${book.coverUrl
                    ? `<img src="${book.coverUrl}" alt="${escapeAttr(book.title)}" onerror="this.parentElement.innerHTML='<span class=\\'detail-cover-placeholder\\'>📖</span>'">`
                    : `<span class="detail-cover-placeholder">📖</span>`
                }
            </div>
            <div class="book-detail-body">
                <h3 class="book-detail-title">${escapeHtml(book.title)}</h3>
                <p class="book-detail-author">by ${escapeHtml(book.author)}</p>
                <div class="book-detail-meta">
                    ${book.category ? `<span class="book-card-category">${getCategoryEmoji(book.category)} ${escapeHtml(book.category)}</span>` : ''}
                    ${book.rating ? `<span class="book-card-rating">⭐ ${book.rating}</span>` : ''}
                    ${statusBadge}
                </div>
                ${book.notes ? `<p class="book-detail-notes">${escapeHtml(book.notes)}</p>` : ''}
                <div class="book-detail-actions">
                    ${book.amazonLink ? `<a href="${book.amazonLink}" target="_blank" rel="noopener" class="btn-amazon">View on Amazon →</a>` : ''}
                    <button class="btn-close-detail">✕ Close</button>
                </div>
            </div>
        </div>
    `;
}

function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function escapeAttr(str) {
    if (!str) return '';
    return str.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
