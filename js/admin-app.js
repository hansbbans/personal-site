// Photo Admin Application
// Enhanced with EXIF extraction, image optimization, batch editing, and live preview

class PhotoAdminApp {
    constructor() {
        this.photos = [];
        this.filteredPhotos = [];
        this.selectedPhotos = new Set();
        this.pendingUploads = [];
        this.changes = new Map();
        this.deletedPhotos = new Set();
        this.currentEditPhotoId = null;
        this.config = this.loadConfig();
        this.pica = window.pica ? window.pica() : null;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadPhotosIfAuthenticated();
    }

    // ==================== Configuration ====================

    loadConfig() {
        const defaults = {
            repoOwner: 'hansbbans',
            repoName: 'personal-site',
            githubToken: '',
            password: '', // Loaded from config.json - NEVER hardcoded
            maxWidth: 1920,
            jpegQuality: 85,
            autoOptimize: true
        };

        const saved = localStorage.getItem('photoAdminConfig');
        return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
    }

    async loadPasswordFromConfig() {
        try {
            const response = await fetch('config.json');
            if (response.ok) {
                const config = await response.json();
                if (!config.adminPassword) {
                    throw new Error('adminPassword not configured in config.json');
                }
                return config.adminPassword;
            }
        } catch (err) {
            console.error('Failed to load config.json:', err);
            alert('Configuration error: config.json not found or invalid. Please create config.json from config.example.json');
            throw new Error('Configuration required');
        }
    }

    saveConfig() {
        // Never store password in localStorage - always load from config.json
        // Remove password from config before saving to localStorage
        const configToSave = { ...this.config };
        delete configToSave.password;
        
        localStorage.setItem('photoAdminConfig', JSON.stringify(configToSave));
        this.showStatus('success', 'Settings saved successfully!');
    }

    // ==================== Authentication ====================

    async checkPassword() {
        const input = document.getElementById('passwordInput').value;
        const correctPassword = await this.loadPasswordFromConfig();
        
        if (input === correctPassword) {
            this.authenticate();
        } else {
            this.showPasswordError();
        }
    }

    authenticate() {
        sessionStorage.setItem('photoAdmin_authed', '1');
        document.getElementById('passwordGate').classList.add('hidden');
        document.getElementById('mainContent').classList.remove('hidden');
        this.loadExistingPhotos();
    }

    showPasswordError() {
        document.getElementById('passwordError').classList.remove('hidden');
        setTimeout(() => {
            document.getElementById('passwordError').classList.add('hidden');
        }, 3000);
    }

    logout() {
        if (confirm('Are you sure you want to logout?')) {
            sessionStorage.removeItem('photoAdmin_authed');
            location.reload();
        }
    }

    loadPhotosIfAuthenticated() {
        if (sessionStorage.getItem('photoAdmin_authed')) {
            document.getElementById('passwordGate').classList.add('hidden');
            document.getElementById('mainContent').classList.remove('hidden');
        }
    }

    // ==================== Photo Loading ====================

    async loadExistingPhotos() {
        if (!this.config.githubToken) {
            this.showStatus('error', 'Please configure GitHub token in settings');
            return;
        }

        this.showStatus('loading', 'Loading photos from GitHub...');

        try {
            const response = await fetch(
                `https://api.github.com/repos/${this.config.repoOwner}/${this.config.repoName}/contents/photos.html`,
                { headers: { 'Authorization': `token ${this.config.githubToken}` } }
            );

            if (!response.ok) throw new Error('Failed to fetch photos.html');

            const data = await response.json();
            this.photosHtmlSha = data.sha;
            const html = atob(data.content);
            
            this.photos = this.parsePhotosFromHtml(html);
            this.originalPhotosHtml = html;
            this.filteredPhotos = [...this.photos];
            this.deletedPhotos.clear();
            this.changes.clear();
            
            this.renderPhotoGrid();
            this.renderBatchGrid();
            this.updateFilters();
            this.updatePhotoCount();
            
            this.hideStatus();
            this.showStatus('success', `Loaded ${this.photos.length} photos`);

        } catch (err) {
            this.showStatus('error', `Error: ${err.message}`);
        }
    }

    parsePhotosFromHtml(html) {
        const photos = [];
        const regex = /<div class="photo-item"[^>]*>\s*<img src="([^"]+)"[^>]*alt="([^"]*)"[^>]*>\s*<div class="photo-overlay">\s*<span class="photo-location">([^<]*)<\/span>\s*(?:<span class="photo-year">([^<]*)<\/span>)?\s*<\/div>/g;
        
        let match;
        let index = 0;
        while ((match = regex.exec(html)) !== null) {
            photos.push({
                id: `photo_${index++}`,
                src: match[1],
                alt: match[2] || 'Photo',
                location: match[3] || 'Update location',
                year: match[4] || '',
                tags: [],
                description: '',
                exif: null
            });
        }
        
        return photos;
    }

    renderPhotoGrid() {
        const grid = document.getElementById('photoGrid');
        
        const visiblePhotos = this.filteredPhotos.filter(p => !this.deletedPhotos.has(p.id));
        
        if (visiblePhotos.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">🔍</div>
                    <p>No photos match your filters</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = visiblePhotos.map(photo => `
            <div class="photo-card ${this.selectedPhotos.has(photo.id) ? 'selected' : ''}" data-photo-id="${photo.id}">
                <div class="photo-card-header">
                    <input type="checkbox" class="photo-checkbox" 
                           ${this.selectedPhotos.has(photo.id) ? 'checked' : ''}
                           onchange="app.togglePhotoSelection('${photo.id}')">
                    <div class="photo-filename">${this.getFilename(photo.src)}</div>
                    <div class="photo-actions">
                        <button class="btn-action" onclick="app.editPhoto('${photo.id}')" title="Edit">✏️</button>
                        <button class="btn-action" onclick="app.deletePhoto('${photo.id}')" title="Delete">🗑️</button>
                    </div>
                </div>
                <div class="photo-preview">
                    <img src="${this.getImageUrl(photo.src)}" alt="${photo.alt}" loading="lazy">
                    <div class="photo-overlay">
                        <div class="photo-metadata">
                            📍 ${photo.location}<br>
                            📅 ${photo.year || 'No year'}
                            ${photo.tags.length > 0 ? `<br>🏷️ ${photo.tags.join(', ')}` : ''}
                        </div>
                    </div>
                </div>
                <div class="photo-details">
                    <div class="form-group">
                        <label>Location</label>
                        <input type="text" class="form-control" value="${photo.location}" 
                               onchange="app.updatePhotoField('${photo.id}', 'location', this.value)">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Year</label>
                            <input type="number" class="form-control" value="${photo.year}" 
                                   onchange="app.updatePhotoField('${photo.id}', 'year', this.value)">
                        </div>
                        <div class="form-group">
                            <label>Alt Text</label>
                            <input type="text" class="form-control" value="${photo.alt}" 
                                   onchange="app.updatePhotoField('${photo.id}', 'alt', this.value)">
                        </div>
                    </div>
                    ${this.changes.has(photo.id) ? '<div style="color: #f59e0b; font-size: 0.85rem; margin-top: 0.5rem;">● Unsaved changes</div>' : ''}
                </div>
            </div>
        `).join('');
    }

    renderBatchGrid() {
        const grid = document.getElementById('batchPhotoGrid');
        
        if (this.photos.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">🔄</div>
                    <p>Load photos from the Manage tab first</p>
                </div>
            `;
            return;
        }

        const visiblePhotos = this.photos.filter(p => !this.deletedPhotos.has(p.id));

        grid.innerHTML = visiblePhotos.map(photo => `
            <div class="photo-card ${this.selectedPhotos.has(photo.id) ? 'selected' : ''}" data-photo-id="${photo.id}">
                <div class="photo-card-header">
                    <input type="checkbox" class="photo-checkbox" 
                           ${this.selectedPhotos.has(photo.id) ? 'checked' : ''}
                           onchange="app.togglePhotoSelection('${photo.id}')">
                    <div class="photo-filename">${this.getFilename(photo.src)}</div>
                </div>
                <div class="photo-preview">
                    <img src="${this.getImageUrl(photo.src)}" alt="${photo.alt}" loading="lazy">
                    <div class="photo-overlay">
                        <div class="photo-metadata">
                            📍 ${photo.location}<br>
                            📅 ${photo.year || 'No year'}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        this.updateBatchActions();
    }

    getImageUrl(src) {
        if (src.startsWith('http')) return src;
        return `https://raw.githubusercontent.com/${this.config.repoOwner}/${this.config.repoName}/main/${src}`;
    }

    getFilename(src) {
        return src.split('/').pop();
    }

    updatePhotoField(photoId, field, value) {
        const photo = this.photos.find(p => p.id === photoId);
        if (!photo) return;

        photo[field] = value;
        this.changes.set(photoId, photo);
        
        this.renderPhotoGrid();
        this.enablePreviewButton();
    }

    togglePhotoSelection(photoId) {
        if (this.selectedPhotos.has(photoId)) {
            this.selectedPhotos.delete(photoId);
        } else {
            this.selectedPhotos.add(photoId);
        }

        this.renderBatchGrid();
        this.updateBatchActions();
    }

    updateBatchActions() {
        const count = this.selectedPhotos.size;
        const batchActions = document.getElementById('batchActions');
        const selectedCount = document.getElementById('selectedCount');

        if (count > 0) {
            batchActions.classList.remove('hidden');
            selectedCount.textContent = count;
        } else {
            batchActions.classList.add('hidden');
        }
    }

    deletePhoto(photoId) {
        if (!confirm('Delete this photo? This will remove it from the gallery.')) return;

        this.deletedPhotos.add(photoId);
        this.changes.set('deleted_' + photoId, { deleted: true });
        
        this.renderPhotoGrid();
        this.renderBatchGrid();
        this.updatePhotoCount();
        this.enablePreviewButton();
        this.showStatus('warning', 'Photo marked for deletion. Preview changes to confirm.');
    }

    editPhoto(photoId) {
        const photo = this.photos.find(p => p.id === photoId);
        if (!photo) return;

        this.currentEditPhotoId = photoId;
        
        // Populate edit form
        document.getElementById('editPhotoImage').src = this.getImageUrl(photo.src);
        document.getElementById('editLocation').value = photo.location;
        document.getElementById('editYear').value = photo.year;
        document.getElementById('editAlt').value = photo.alt;
        document.getElementById('editTags').value = photo.tags.join(', ');
        document.getElementById('editDescription').value = photo.description;
        
        // Show modal
        document.getElementById('editModal').classList.remove('hidden');
    }

    closeEditModal() {
        document.getElementById('editModal').classList.add('hidden');
        this.currentEditPhotoId = null;
    }

    savePhotoEdit() {
        if (!this.currentEditPhotoId) return;
        
        const photo = this.photos.find(p => p.id === this.currentEditPhotoId);
        if (!photo) return;

        photo.location = document.getElementById('editLocation').value;
        photo.year = document.getElementById('editYear').value;
        photo.alt = document.getElementById('editAlt').value;
        photo.tags = document.getElementById('editTags').value
            .split(',')
            .map(t => t.trim())
            .filter(t => t);
        photo.description = document.getElementById('editDescription').value;
        
        this.changes.set(this.currentEditPhotoId, photo);
        this.closeEditModal();
        this.renderPhotoGrid();
        this.enablePreviewButton();
        this.showStatus('success', 'Photo updated (preview to commit)');
    }

    // ==================== Upload & EXIF ====================

    setupEventListeners() {
        // Password enter key
        document.getElementById('passwordInput')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.checkPassword();
        });

        // Drop zone
        const dropZone = document.getElementById('dropZone');
        const fileInput = document.getElementById('fileInput');

        dropZone?.addEventListener('click', () => fileInput.click());
        
        dropZone?.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('drag-over');
        });

        dropZone?.addEventListener('dragleave', () => {
            dropZone.classList.remove('drag-over');
        });

        dropZone?.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
            this.handleFiles(e.dataTransfer.files);
        });

        fileInput?.addEventListener('change', (e) => {
            this.handleFiles(e.target.files);
        });

        // Settings inputs
        ['repoOwner', 'repoName', 'githubToken', 'maxWidth', 'jpegQuality', 'autoOptimize'].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.value = this.config[id];
            }
        });
    }

    async handleFiles(files) {
        this.showStatus('loading', 'Processing files...');
        
        for (const file of files) {
            if (!file.type.startsWith('image/')) continue;

            const reader = new FileReader();
            reader.onload = async (e) => {
                const dataUrl = e.target.result;
                
                // Extract EXIF data
                const exif = await this.extractExif(file);
                
                const upload = {
                    id: `upload_${Date.now()}_${Math.random()}`,
                    file,
                    dataUrl,
                    filename: file.name,
                    originalSize: file.size,
                    optimizedSize: null,
                    location: exif?.location || 'Update location',
                    year: exif?.year || new Date().getFullYear().toString(),
                    alt: '',
                    tags: [],
                    exif: exif,
                    status: 'pending'
                };

                this.pendingUploads.push(upload);
                this.renderUploadPreview();
            };
            reader.readAsDataURL(file);
        }
        
        this.hideStatus();
    }

    async extractExif(file) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    EXIF.getData({ ...file, src: e.target.result }, function() {
                        const exifData = {
                            camera: EXIF.getTag(this, 'Model') || null,
                            lens: EXIF.getTag(this, 'LensModel') || null,
                            focalLength: EXIF.getTag(this, 'FocalLength') || null,
                            aperture: EXIF.getTag(this, 'FNumber') || null,
                            iso: EXIF.getTag(this, 'ISOSpeedRatings') || null,
                            shutterSpeed: EXIF.getTag(this, 'ExposureTime') || null,
                            date: EXIF.getTag(this, 'DateTimeOriginal') || EXIF.getTag(this, 'DateTime') || null,
                            gpsLat: EXIF.getTag(this, 'GPSLatitude') || null,
                            gpsLng: EXIF.getTag(this, 'GPSLongitude') || null
                        };

                        // Extract year from date
                        if (exifData.date) {
                            const match = exifData.date.match(/^(\d{4})/);
                            if (match) exifData.year = match[1];
                        }

                        // Convert GPS to location (simplified - in production use reverse geocoding)
                        if (exifData.gpsLat && exifData.gpsLng) {
                            exifData.location = `GPS: ${exifData.gpsLat}, ${exifData.gpsLng}`;
                        }

                        resolve(exifData);
                    });
                } catch (err) {
                    console.error('EXIF extraction error:', err);
                    resolve(null);
                }
            };
            reader.readAsDataURL(file);
        });
    }

    renderUploadPreview() {
        const preview = document.getElementById('uploadPreview');
        const actions = document.getElementById('uploadActions');
        const stats = document.getElementById('uploadStats');

        if (this.pendingUploads.length === 0) {
            preview.innerHTML = '';
            actions.classList.add('hidden');
            return;
        }

        actions.classList.remove('hidden');

        const totalOriginal = this.pendingUploads.reduce((sum, u) => sum + u.originalSize, 0);
        const totalOptimized = this.pendingUploads.reduce((sum, u) => sum + (u.optimizedSize || u.originalSize), 0);
        const savings = totalOriginal - totalOptimized;
        const savingsPercent = (savings / totalOriginal * 100).toFixed(1);

        stats.innerHTML = `
            ${this.pendingUploads.length} file(s) | 
            Original: ${this.formatBytes(totalOriginal)} | 
            ${totalOptimized < totalOriginal ? `Optimized: ${this.formatBytes(totalOptimized)} | 
            <span style="color: var(--success)">Saved ${savingsPercent}%</span>` : ''}
        `;

        preview.innerHTML = this.pendingUploads.map(upload => `
            <div class="upload-card" data-upload-id="${upload.id}">
                <div class="photo-card-header">
                    <div class="photo-filename">${upload.filename}</div>
                    <button class="btn-action" onclick="app.removeUpload('${upload.id}')">×</button>
                </div>
                <div class="photo-preview">
                    <img src="${upload.dataUrl}" alt="Preview">
                    ${upload.optimizedSize ? `
                        <div class="optimization-badge" style="position: absolute; top: 0.5rem; right: 0.5rem;">
                            📉 ${this.formatBytes(upload.originalSize)} → ${this.formatBytes(upload.optimizedSize)}
                        </div>
                    ` : ''}
                </div>
                <div class="photo-details">
                    <div class="form-group">
                        <label>Location</label>
                        <input type="text" class="form-control" value="${upload.location}" 
                               onchange="app.updateUploadField('${upload.id}', 'location', this.value)">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Year</label>
                            <input type="number" class="form-control" value="${upload.year}" 
                                   onchange="app.updateUploadField('${upload.id}', 'year', this.value)">
                        </div>
                        <div class="form-group">
                            <label>Alt Text</label>
                            <input type="text" class="form-control" value="${upload.alt}" 
                                   placeholder="Photo description"
                                   onchange="app.updateUploadField('${upload.id}', 'alt', this.value)">
                        </div>
                    </div>
                    ${upload.exif && Object.values(upload.exif).some(v => v) ? `
                        <div class="exif-info">
                            ${upload.exif.camera ? `<div class="exif-row"><span class="exif-label">Camera:</span> <span class="exif-value">${upload.exif.camera}</span></div>` : ''}
                            ${upload.exif.lens ? `<div class="exif-row"><span class="exif-label">Lens:</span> <span class="exif-value">${upload.exif.lens}</span></div>` : ''}
                            ${upload.exif.aperture ? `<div class="exif-row"><span class="exif-label">Aperture:</span> <span class="exif-value">f/${upload.exif.aperture}</span></div>` : ''}
                            ${upload.exif.shutterSpeed ? `<div class="exif-row"><span class="exif-label">Shutter:</span> <span class="exif-value">${upload.exif.shutterSpeed}s</span></div>` : ''}
                            ${upload.exif.iso ? `<div class="exif-row"><span class="exif-label">ISO:</span> <span class="exif-value">${upload.exif.iso}</span></div>` : ''}
                            ${upload.exif.date ? `<div class="exif-row"><span class="exif-label">Date:</span> <span class="exif-value">${upload.exif.date}</span></div>` : ''}
                        </div>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }

    updateUploadField(uploadId, field, value) {
        const upload = this.pendingUploads.find(u => u.id === uploadId);
        if (upload) {
            upload[field] = value;
        }
    }

    removeUpload(uploadId) {
        this.pendingUploads = this.pendingUploads.filter(u => u.id !== uploadId);
        this.renderUploadPreview();
    }

    clearUpload() {
        if (this.pendingUploads.length === 0) return;
        if (!confirm('Clear all pending uploads?')) return;
        
        this.pendingUploads = [];
        this.renderUploadPreview();
    }

    async processUpload() {
        if (this.pendingUploads.length === 0) return;
        if (!this.config.githubToken) {
            this.showStatus('error', 'Please configure GitHub token in settings');
            return;
        }

        const uploadBtn = document.getElementById('uploadBtn');
        uploadBtn.disabled = true;
        uploadBtn.innerHTML = '⏳ Processing...';

        try {
            // Optimize images if enabled
            if (this.config.autoOptimize && this.pica) {
                this.showStatus('loading', 'Optimizing images...');
                for (const upload of this.pendingUploads) {
                    await this.optimizeImage(upload);
                }
                this.renderUploadPreview(); // Show updated sizes
            }

            // Upload to GitHub
            this.showStatus('loading', `Uploading ${this.pendingUploads.length} photo(s)...`);
            
            for (let i = 0; i < this.pendingUploads.length; i++) {
                const upload = this.pendingUploads[i];
                this.showStatus('loading', `Uploading ${i + 1}/${this.pendingUploads.length}: ${upload.filename}`);
                
                await this.uploadToGitHub(upload);
            }

            // Update photos.html
            await this.addPhotosToHtml(this.pendingUploads);

            this.showStatus('success', `✅ Uploaded ${this.pendingUploads.length} photo(s) successfully!`);
            this.pendingUploads = [];
            this.renderUploadPreview();
            
            // Reload gallery
            await this.loadExistingPhotos();
            
            // Switch to manage tab
            this.switchTab('manage');

        } catch (err) {
            this.showStatus('error', `Upload failed: ${err.message}`);
        } finally {
            uploadBtn.disabled = false;
            uploadBtn.innerHTML = '📤 Process & Upload';
        }
    }

    async optimizeImage(upload) {
        if (!this.pica) return;

        const img = new Image();
        img.src = upload.dataUrl;
        
        await new Promise(resolve => img.onload = resolve);

        const canvas = document.createElement('canvas');
        const maxWidth = this.config.maxWidth;
        
        if (img.width > maxWidth) {
            canvas.width = maxWidth;
            canvas.height = (img.height / img.width) * maxWidth;
        } else {
            canvas.width = img.width;
            canvas.height = img.height;
        }

        await this.pica.resize(img, canvas);
        
        const blob = await this.pica.toBlob(canvas, 'image/jpeg', this.config.jpegQuality / 100);
        upload.optimizedSize = blob.size;
        
        // Convert blob to base64
        const reader = new FileReader();
        const base64 = await new Promise(resolve => {
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.readAsDataURL(blob);
        });
        
        upload.optimizedDataUrl = base64;
    }

    async uploadToGitHub(upload) {
        const timestamp = Date.now();
        const ext = upload.filename.split('.').pop().toLowerCase();
        const filename = `photo_${timestamp}_${Math.random().toString(36).substr(2, 9)}.${ext}`;
        
        const base64 = upload.optimizedDataUrl || upload.dataUrl.split(',')[1];

        const response = await fetch(
            `https://api.github.com/repos/${this.config.repoOwner}/${this.config.repoName}/contents/images/${filename}`,
            {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${this.config.githubToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: `Add photo: ${filename}`,
                    content: base64
                })
            }
        );

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message || 'Upload failed');
        }

        upload.uploadedPath = `images/${filename}`;
    }

    async addPhotosToHtml(uploads) {
        // Fetch current photos.html
        const response = await fetch(
            `https://api.github.com/repos/${this.config.repoOwner}/${this.config.repoName}/contents/photos.html`,
            { headers: { 'Authorization': `token ${this.config.githubToken}` } }
        );

        const data = await response.json();
        let html = atob(data.content);

        // Generate new photo blocks
        const newPhotoBlocks = uploads.map(upload => `
                    <div class="photo-item">
                        <img src="${upload.uploadedPath}" alt="${upload.alt || 'Photo'}" loading="lazy">
                        <div class="photo-overlay">
                            <span class="photo-location">${upload.location}</span>
                            <span class="photo-year">${upload.year}</span>
                        </div>
                    </div>`).join('\n');

        // Insert after photos-grid opening tag
        const marker = '<div class="photos-grid">';
        html = html.replace(marker, marker + '\n' + newPhotoBlocks);

        // Commit updated HTML
        const updateResponse = await fetch(
            `https://api.github.com/repos/${this.config.repoOwner}/${this.config.repoName}/contents/photos.html`,
            {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${this.config.githubToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: `Add ${uploads.length} photo(s) to gallery`,
                    content: btoa(unescape(encodeURIComponent(html))),
                    sha: data.sha
                })
            }
        );

        if (!updateResponse.ok) {
            const err = await updateResponse.json();
            throw new Error(err.message || 'Failed to update photos.html');
        }
    }

    // ==================== Batch Editing ====================

    selectAll() {
        this.photos.filter(p => !this.deletedPhotos.has(p.id)).forEach(photo => this.selectedPhotos.add(photo.id));
        this.renderPhotoGrid();
        this.renderBatchGrid();
    }

    deselectAll() {
        this.selectedPhotos.clear();
        this.renderBatchGrid();
    }

    async selectByYear() {
        const year = prompt('Select photos from year:');
        if (!year) return;

        this.selectedPhotos.clear();
        this.photos.forEach(photo => {
            if (photo.year === year && !this.deletedPhotos.has(photo.id)) {
                this.selectedPhotos.add(photo.id);
            }
        });
        this.renderPhotoGrid();
        this.renderBatchGrid();
    }

    async selectByLocation() {
        const location = prompt('Select photos with location containing:');
        if (!location) return;

        this.selectedPhotos.clear();
        this.photos.forEach(photo => {
            if (photo.location.toLowerCase().includes(location.toLowerCase()) && !this.deletedPhotos.has(photo.id)) {
                this.selectedPhotos.add(photo.id);
            }
        });
        this.renderPhotoGrid();
        this.renderBatchGrid();
    }

    applyBatchEdit() {
        const location = document.getElementById('batchLocation').value;
        const year = document.getElementById('batchYear').value;
        const tags = document.getElementById('batchTags').value.split(',').map(t => t.trim()).filter(t => t);
        const description = document.getElementById('batchDescription').value;

        let count = 0;
        this.selectedPhotos.forEach(photoId => {
            const photo = this.photos.find(p => p.id === photoId);
            if (photo) {
                if (location) photo.location = location;
                if (year) photo.year = year;
                if (tags.length > 0) photo.tags = [...new Set([...photo.tags, ...tags])];
                if (description) photo.description = description;
                
                this.changes.set(photoId, photo);
                count++;
            }
        });

        this.showStatus('success', `Updated ${count} photo(s)`);
        this.renderPhotoGrid();
        this.renderBatchGrid();
        this.enablePreviewButton();
        this.cancelBatchEdit();
    }

    cancelBatchEdit() {
        document.getElementById('batchLocation').value = '';
        document.getElementById('batchYear').value = '';
        document.getElementById('batchTags').value = '';
        document.getElementById('batchDescription').value = '';
        this.deselectAll();
    }

    // ==================== Live Preview ====================

    enablePreviewButton() {
        document.getElementById('previewBtn').disabled = false;
    }

    async showPreview() {
        if (this.changes.size === 0 && this.deletedPhotos.size === 0) {
            this.showStatus('warning', 'No changes to preview');
            return;
        }

        // Generate preview HTML
        const previewHtml = this.generatePreviewHtml();
        
        // Show in modal
        const modal = document.getElementById('previewModal');
        const iframe = document.getElementById('previewFrame');
        
        modal.classList.remove('hidden');
        
        // Write preview HTML to iframe
        iframe.srcdoc = previewHtml;
    }

    generatePreviewHtml() {
        // Clone the original HTML and apply changes
        let html = this.originalPhotosHtml;
        
        // Filter out deleted photos
        const activePhotos = this.photos.filter(p => !this.deletedPhotos.has(p.id));
        
        // Generate updated photo blocks
        const photoBlocks = activePhotos.map(photo => `
                    <div class="photo-item">
                        <img src="${this.getImageUrl(photo.src)}" alt="${photo.alt}" loading="lazy">
                        <div class="photo-overlay">
                            <span class="photo-location">${photo.location}</span>
                            <span class="photo-year">${photo.year}</span>
                        </div>
                    </div>`).join('\n');

        // Replace photos-grid content
        const gridStart = html.indexOf('<div class="photos-grid">') + '<div class="photos-grid">'.length;
        const gridEnd = html.indexOf('</div>', html.indexOf('</div>', gridStart));
        
        html = html.substring(0, gridStart) + '\n' + photoBlocks + '\n                ' + html.substring(gridEnd);
        
        return html;
    }

    closePreview() {
        document.getElementById('previewModal').classList.add('hidden');
    }

    async commitChanges() {
        if (!confirm(`Commit ${this.changes.size} change(s) and ${this.deletedPhotos.size} deletion(s) to GitHub?`)) return;

        const modal = document.getElementById('previewModal');
        modal.classList.add('hidden');
        
        this.showStatus('loading', 'Committing changes...');

        try {
            const updatedHtml = this.generatePreviewHtml();
            
            const response = await fetch(
                `https://api.github.com/repos/${this.config.repoOwner}/${this.config.repoName}/contents/photos.html`,
                {
                    method: 'PUT',
                    headers: {
                        'Authorization': `token ${this.config.githubToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: `Update ${this.changes.size} photo(s) metadata`,
                        content: btoa(unescape(encodeURIComponent(updatedHtml))),
                        sha: this.photosHtmlSha
                    })
                }
            );

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message || 'Commit failed');
            }

            this.changes.clear();
            this.deletedPhotos.clear();
            this.showStatus('success', '✅ Changes committed successfully!');
            document.getElementById('previewBtn').disabled = true;
            
            // Reload
            await this.loadExistingPhotos();

        } catch (err) {
            this.showStatus('error', `Commit failed: ${err.message}`);
        }
    }

    // ==================== Filtering ====================

    filterPhotos() {
        const search = document.getElementById('searchInput').value.toLowerCase();
        const yearFilter = document.getElementById('filterYear').value;
        const locationFilter = document.getElementById('filterLocation').value;

        this.filteredPhotos = this.photos.filter(photo => {
            const matchesSearch = !search || 
                photo.location.toLowerCase().includes(search) ||
                photo.year.includes(search) ||
                this.getFilename(photo.src).toLowerCase().includes(search);
            
            const matchesYear = !yearFilter || photo.year === yearFilter;
            const matchesLocation = !locationFilter || photo.location === locationFilter;

            return matchesSearch && matchesYear && matchesLocation;
        });

        this.renderPhotoGrid();
    }

    updateFilters() {
        // Populate year filter
        const years = [...new Set(this.photos.map(p => p.year).filter(y => y))].sort().reverse();
        const yearSelect = document.getElementById('filterYear');
        yearSelect.innerHTML = '<option value="">All Years</option>' + 
            years.map(y => `<option value="${y}">${y}</option>`).join('');

        // Populate location filter
        const locations = [...new Set(this.photos.map(p => p.location).filter(l => l && l !== 'Update location'))].sort();
        const locationSelect = document.getElementById('filterLocation');
        locationSelect.innerHTML = '<option value="">All Locations</option>' + 
            locations.map(l => `<option value="${l}">${l}</option>`).join('');
    }

    updatePhotoCount() {
        const activeCount = this.photos.length - this.deletedPhotos.size;
        document.getElementById('totalPhotoCount').textContent = `${activeCount} photo${activeCount !== 1 ? 's' : ''}`;
    }

    // ==================== Tab Switching ====================

    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabName);
        });
        
        // Update tab panels
        document.querySelectorAll('.tab-panel').forEach(panel => {
            panel.classList.toggle('active', panel.id === `${tabName}Tab`);
        });
    }

    // ==================== Settings ====================

    showSettings() {
        document.getElementById('settingsModal').classList.remove('hidden');
    }

    closeSettings() {
        document.getElementById('settingsModal').classList.add('hidden');
    }

    saveSettings() {
        this.config.repoOwner = document.getElementById('repoOwner').value;
        this.config.repoName = document.getElementById('repoName').value;
        this.config.githubToken = document.getElementById('githubToken').value;
        this.config.maxWidth = parseInt(document.getElementById('maxWidth').value);
        this.config.jpegQuality = parseInt(document.getElementById('jpegQuality').value);
        this.config.autoOptimize = document.getElementById('autoOptimize').checked;

        this.saveConfig();
        this.closeSettings();
    }

    // ==================== Utilities ====================

    showStatus(type, message) {
        const statusBar = document.getElementById('statusBar');
        const statusContent = document.getElementById('statusContent');
        
        statusBar.className = 'status-bar ' + type;
        statusContent.innerHTML = type === 'loading' ? 
            `<span class="loading-spinner"></span> ${message}` : message;
        
        statusBar.classList.remove('hidden');

        if (type === 'success' || type === 'warning') {
            setTimeout(() => this.hideStatus(), 5000);
        }
    }

    hideStatus() {
        document.getElementById('statusBar').classList.add('hidden');
    }

    formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }
}

// Global app instance
let app;

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app = new PhotoAdminApp();
    });
} else {
    app = new PhotoAdminApp();
}

// Global functions for onclick handlers
function checkPassword() { app.checkPassword(); }
function logout() { app.logout(); }
function showSettings() { app.showSettings(); }
function closeSettings() { app.closeSettings(); }
function saveSettings() { app.saveSettings(); }
function switchTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
    document.querySelector(`[data-tab="${tab}"]`)?.classList.add('active');
    document.getElementById(`${tab}Tab`)?.classList.add('active');
}
function filterPhotos() { app.filterPhotos(); }
function loadExistingPhotos() { app.loadExistingPhotos(); }
function clearUpload() { app.clearUpload(); }
function processUpload() { app.processUpload(); }
function selectAll() { app.selectAll(); }
function deselectAll() { app.deselectAll(); }
function selectByYear() { app.selectByYear(); }
function selectByLocation() { app.selectByLocation(); }
function applyBatchEdit() { app.applyBatchEdit(); }
function cancelBatchEdit() { app.cancelBatchEdit(); }
function showPreview() { app.showPreview(); }
function closePreview() { app.closePreview(); }
function commitChanges() { app.commitChanges(); }
function hideStatus() { app.hideStatus(); }
function closeEditModal() { app.closeEditModal(); }
function savePhotoEdit() { app.savePhotoEdit(); }
