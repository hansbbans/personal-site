// Photo Admin Management System
class PhotoAdmin {
    constructor() {
        this.photos = [];
        this.filteredPhotos = [];
        this.currentFilter = 'all';
        this.currentSort = 'date-desc';
        this.metadata = {};
        this.pendingChanges = new Map();
        
        this.init();
    }
    
    async init() {
        await this.loadPhotoMetadata();
        await this.loadExistingPhotos();
        this.renderInterface();
        this.setupEventListeners();
    }
    
    async loadPhotoMetadata() {
        try {
            const response = await fetch('photo-metadata.json');
            if (response.ok) {
                this.metadata = await response.json();
            }
        } catch (err) {
            console.log('No metadata file found, will extract from HTML');
        }
    }
    
    async loadExistingPhotos() {
        try {
            // Load photos from the live HTML page
            const response = await fetch('photos.html');
            const html = await response.text();
            
            // Parse photos from HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const photoItems = doc.querySelectorAll('.photo-item');
            
            this.photos = Array.from(photoItems).map((item, index) => {
                const img = item.querySelector('img');
                const locationSpan = item.querySelector('.photo-location');
                const yearSpan = item.querySelector('.photo-year');
                
                if (!img) return null;
                
                const filename = img.src.split('/').pop();
                const metadata = this.metadata[filename] || {};
                
                return {
                    id: `photo_${index}`,
                    filename: filename,
                    src: img.src,
                    alt: img.alt || 'Photo',
                    location: locationSpan?.textContent?.trim() || 'Update location',
                    year: yearSpan?.textContent?.trim() || metadata.year || 'Unknown',
                    originalDate: metadata.date || null,
                    fileSize: null, // Would need API call to get actual size
                    dimensions: null,
                    lastModified: null
                };
            }).filter(photo => photo !== null);
            
            this.filteredPhotos = [...this.photos];
            console.log(`Loaded ${this.photos.length} photos`);
            
        } catch (err) {
            console.error('Failed to load existing photos:', err);
            this.showStatus('error', 'Failed to load existing photos');
        }
    }
    
    renderInterface() {
        const container = document.getElementById('photoManagement');
        if (!container) return;
        
        container.innerHTML = `
            <div class="photo-admin-header">
                <div class="admin-title">
                    <h2>📸 Manage Gallery (${this.photos.length} photos)</h2>
                    <div class="admin-actions">
                        <button class="btn btn-secondary" onclick="photoAdmin.refreshGallery()">🔄 Refresh</button>
                        <button class="btn btn-primary" onclick="photoAdmin.saveAllChanges()" id="saveAllBtn" disabled>💾 Save Changes</button>
                    </div>
                </div>
                
                <div class="admin-controls">
                    <div class="filter-controls">
                        <select id="filterSelect" onchange="photoAdmin.setFilter(this.value)">
                            <option value="all">All Photos</option>
                            <option value="no-location">Missing Location</option>
                            <option value="no-year">Missing Year</option>
                            <option value="recent">Recently Added</option>
                        </select>
                        
                        <select id="sortSelect" onchange="photoAdmin.setSorting(this.value)">
                            <option value="date-desc">Newest First</option>
                            <option value="date-asc">Oldest First</option>
                            <option value="filename">Filename</option>
                            <option value="location">Location</option>
                        </select>
                        
                        <div class="search-box">
                            <input type="text" id="searchInput" placeholder="Search photos..." 
                                   oninput="photoAdmin.search(this.value)">
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="photo-admin-grid" id="photoAdminGrid">
                ${this.renderPhotoGrid()}
            </div>
            
            <div class="bulk-actions" id="bulkActions" style="display: none;">
                <div class="bulk-header">
                    <span id="selectedCount">0 photos selected</span>
                    <div class="bulk-buttons">
                        <button class="btn btn-secondary" onclick="photoAdmin.clearSelection()">Clear Selection</button>
                        <button class="btn btn-danger" onclick="photoAdmin.deleteSelected()">Delete Selected</button>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderPhotoGrid() {
        if (this.filteredPhotos.length === 0) {
            return `
                <div class="no-photos">
                    <div class="no-photos-icon">📷</div>
                    <p>No photos found</p>
                </div>
            `;
        }
        
        return this.filteredPhotos.map(photo => `
            <div class="admin-photo-card" data-photo-id="${photo.id}">
                <div class="admin-photo-header">
                    <input type="checkbox" class="photo-checkbox" onchange="photoAdmin.toggleSelection('${photo.id}')">
                    <div class="photo-filename">${photo.filename}</div>
                    <button class="btn-delete" onclick="photoAdmin.deletePhoto('${photo.id}')" title="Delete photo">🗑️</button>
                </div>
                
                <div class="admin-photo-preview">
                    <img src="${photo.src}" alt="${photo.alt}" loading="lazy">
                    <div class="photo-info-overlay">
                        <span class="photo-year-display">${photo.year}</span>
                    </div>
                </div>
                
                <div class="admin-photo-details">
                    <div class="detail-group">
                        <label>Location:</label>
                        <input type="text" 
                               value="${photo.location}" 
                               data-field="location"
                               data-photo-id="${photo.id}"
                               onchange="photoAdmin.updateField('${photo.id}', 'location', this.value)"
                               placeholder="Enter location...">
                    </div>
                    
                    <div class="detail-row">
                        <div class="detail-group">
                            <label>Year:</label>
                            <input type="number" 
                                   value="${photo.year === 'Unknown' ? '' : photo.year}" 
                                   data-field="year"
                                   data-photo-id="${photo.id}"
                                   onchange="photoAdmin.updateField('${photo.id}', 'year', this.value)"
                                   min="1900" max="2030" 
                                   placeholder="YYYY">
                        </div>
                        
                        <div class="detail-group">
                            <label>Alt Text:</label>
                            <input type="text" 
                                   value="${photo.alt}" 
                                   data-field="alt"
                                   data-photo-id="${photo.id}"
                                   onchange="photoAdmin.updateField('${photo.id}', 'alt', this.value)"
                                   placeholder="Photo description">
                        </div>
                    </div>
                    
                    ${photo.originalDate ? `
                        <div class="photo-metadata">
                            <small>Original: ${photo.originalDate}</small>
                        </div>
                    ` : ''}
                    
                    ${this.pendingChanges.has(photo.id) ? `
                        <div class="pending-changes">
                            <span class="change-indicator">● Unsaved changes</span>
                        </div>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }
    
    updateField(photoId, field, value) {
        const photo = this.photos.find(p => p.id === photoId);
        if (!photo) return;
        
        // Track changes
        if (!this.pendingChanges.has(photoId)) {
            this.pendingChanges.set(photoId, { ...photo });
        }
        
        // Update the change tracking
        const changes = this.pendingChanges.get(photoId);
        changes[field] = value;
        
        // Update visual indicator
        this.updateChangeIndicators();
        
        // Enable save button
        document.getElementById('saveAllBtn').disabled = false;
    }
    
    updateChangeIndicators() {
        this.pendingChanges.forEach((changes, photoId) => {
            const card = document.querySelector(`[data-photo-id="${photoId}"]`);
            if (card) {
                const indicator = card.querySelector('.pending-changes');
                if (indicator) {
                    indicator.style.display = 'block';
                } else {
                    // Add indicator if not exists
                    const details = card.querySelector('.admin-photo-details');
                    details.insertAdjacentHTML('beforeend', `
                        <div class="pending-changes">
                            <span class="change-indicator">● Unsaved changes</span>
                        </div>
                    `);
                }
            }
        });
    }
    
    async saveAllChanges() {
        if (this.pendingChanges.size === 0) return;
        
        const saveBtn = document.getElementById('saveAllBtn');
        saveBtn.disabled = true;
        saveBtn.textContent = 'Saving...';
        
        try {
            this.showStatus('loading', `Saving changes to ${this.pendingChanges.size} photos...`);
            
            // Apply all pending changes to the photos array
            this.pendingChanges.forEach((changes, photoId) => {
                const photo = this.photos.find(p => p.id === photoId);
                if (photo) {
                    Object.assign(photo, changes);
                }
            });
            
            // Generate updated HTML
            await this.updatePhotosHTML();
            
            this.pendingChanges.clear();
            this.showStatus('success', 'All changes saved successfully!');
            
            // Re-render to remove change indicators
            document.getElementById('photoAdminGrid').innerHTML = this.renderPhotoGrid();
            
        } catch (err) {
            this.showStatus('error', `Failed to save changes: ${err.message}`);
        } finally {
            saveBtn.disabled = true;
            saveBtn.textContent = '💾 Save Changes';
        }
    }
    
    async updatePhotosHTML() {
        const owner = document.getElementById('repoOwner').value;
        const repo = document.getElementById('repoName').value;
        const token = document.getElementById('githubToken').value;
        
        if (!owner || !repo || !token) {
            throw new Error('GitHub configuration not complete');
        }
        
        // Get current photos.html
        const response = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/contents/photos.html`,
            { headers: { 'Authorization': `token ${token}` } }
        );
        
        if (!response.ok) {
            throw new Error('Could not fetch photos.html');
        }
        
        const fileData = await response.json();
        let content = atob(fileData.content);
        
        // Replace the photos section with updated content
        const startMarker = '<div class="photos-grid">';
        const endMarker = '</div>\n                    </div>';
        
        const startIndex = content.indexOf(startMarker);
        const endIndex = content.indexOf(endMarker, startIndex);
        
        if (startIndex === -1 || endIndex === -1) {
            throw new Error('Could not find photos grid in HTML');
        }
        
        // Generate new photo HTML
        const newPhotosHTML = this.photos.map(photo => `
                    <div class="photo-item">
                        <img src="${photo.src}" alt="${photo.alt}" loading="lazy">
                        <div class="photo-overlay">
                            <span class="photo-location">${photo.location}</span>
                            <span class="photo-year">${photo.year}</span>
                        </div>
                    </div>`).join('\n');
        
        // Replace content
        const updatedContent = content.substring(0, startIndex + startMarker.length) + 
                              '\n' + newPhotosHTML + '\n                    ' +
                              content.substring(endIndex);
        
        // Commit updated file
        const updateResponse = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/contents/photos.html`,
            {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: `Update photo metadata via admin panel`,
                    content: btoa(updatedContent),
                    sha: fileData.sha
                })
            }
        );
        
        if (!updateResponse.ok) {
            const err = await updateResponse.json();
            throw new Error(err.message || 'Failed to update photos.html');
        }
    }
    
    deletePhoto(photoId) {
        if (!confirm('Are you sure you want to delete this photo? This cannot be undone.')) {
            return;
        }
        
        const photo = this.photos.find(p => p.id === photoId);
        if (!photo) return;
        
        // Remove from arrays
        this.photos = this.photos.filter(p => p.id !== photoId);
        this.filteredPhotos = this.filteredPhotos.filter(p => p.id !== photoId);
        this.pendingChanges.delete(photoId);
        
        // Mark for deletion (you'd implement actual file deletion via GitHub API)
        if (!this.deletedPhotos) this.deletedPhotos = [];
        this.deletedPhotos.push(photo);
        
        // Re-render
        document.getElementById('photoAdminGrid').innerHTML = this.renderPhotoGrid();
        document.getElementById('saveAllBtn').disabled = false;
        
        this.showStatus('warning', `Photo ${photo.filename} marked for deletion. Save changes to apply.`);
    }
    
    toggleSelection(photoId) {
        const checkbox = document.querySelector(`[data-photo-id="${photoId}"] .photo-checkbox`);
        const card = document.querySelector(`[data-photo-id="${photoId}"]`);
        
        if (checkbox.checked) {
            card.classList.add('selected');
        } else {
            card.classList.remove('selected');
        }
        
        this.updateBulkActions();
    }
    
    updateBulkActions() {
        const selected = document.querySelectorAll('.photo-checkbox:checked');
        const bulkActions = document.getElementById('bulkActions');
        const selectedCount = document.getElementById('selectedCount');
        
        if (selected.length > 0) {
            bulkActions.style.display = 'block';
            selectedCount.textContent = `${selected.length} photo${selected.length > 1 ? 's' : ''} selected`;
        } else {
            bulkActions.style.display = 'none';
        }
    }
    
    clearSelection() {
        document.querySelectorAll('.photo-checkbox').forEach(cb => {
            cb.checked = false;
        });
        document.querySelectorAll('.admin-photo-card').forEach(card => {
            card.classList.remove('selected');
        });
        this.updateBulkActions();
    }
    
    deleteSelected() {
        const selected = document.querySelectorAll('.photo-checkbox:checked');
        if (selected.length === 0) return;
        
        if (!confirm(`Delete ${selected.length} selected photos? This cannot be undone.`)) {
            return;
        }
        
        selected.forEach(checkbox => {
            const photoId = checkbox.closest('[data-photo-id]').dataset.photoId;
            this.deletePhoto(photoId);
        });
        
        this.clearSelection();
    }
    
    setFilter(filter) {
        this.currentFilter = filter;
        this.applyFilters();
    }
    
    setSorting(sort) {
        this.currentSort = sort;
        this.applyFilters();
    }
    
    search(query) {
        this.searchQuery = query.toLowerCase();
        this.applyFilters();
    }
    
    applyFilters() {
        let filtered = [...this.photos];
        
        // Apply filter
        switch (this.currentFilter) {
            case 'no-location':
                filtered = filtered.filter(p => !p.location || p.location === 'Update location');
                break;
            case 'no-year':
                filtered = filtered.filter(p => !p.year || p.year === 'Unknown');
                break;
            case 'recent':
                // Last 30 days (rough estimate based on filename timestamp)
                const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
                filtered = filtered.filter(p => {
                    const match = p.filename.match(/photo_(\d+)_/);
                    return match && parseInt(match[1]) > thirtyDaysAgo;
                });
                break;
        }
        
        // Apply search
        if (this.searchQuery) {
            filtered = filtered.filter(p => 
                p.filename.toLowerCase().includes(this.searchQuery) ||
                p.location.toLowerCase().includes(this.searchQuery) ||
                p.year.toString().includes(this.searchQuery)
            );
        }
        
        // Apply sorting
        filtered.sort((a, b) => {
            switch (this.currentSort) {
                case 'date-asc':
                    return parseInt(a.year) - parseInt(b.year);
                case 'date-desc':
                    return parseInt(b.year) - parseInt(a.year);
                case 'filename':
                    return a.filename.localeCompare(b.filename);
                case 'location':
                    return a.location.localeCompare(b.location);
                default:
                    return 0;
            }
        });
        
        this.filteredPhotos = filtered;
        document.getElementById('photoAdminGrid').innerHTML = this.renderPhotoGrid();
    }
    
    async refreshGallery() {
        this.showStatus('loading', 'Refreshing gallery...');
        await this.loadExistingPhotos();
        this.renderInterface();
        this.showStatus('success', 'Gallery refreshed!');
    }
    
    showStatus(type, message) {
        const status = document.getElementById('adminStatus');
        if (status) {
            status.className = 'admin-status ' + type;
            status.textContent = message;
            
            if (type === 'success' || type === 'warning') {
                setTimeout(() => {
                    status.className = 'admin-status';
                    status.textContent = '';
                }, 5000);
            }
        }
    }
}

// Initialize photo admin when page loads
let photoAdmin;
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if we're on the admin page and authenticated
    if (document.getElementById('photoManagement') && sessionStorage.getItem('authed')) {
        photoAdmin = new PhotoAdmin();
    }
});