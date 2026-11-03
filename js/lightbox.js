// Enhanced lightbox with photo navigation
class PhotoLightbox {
    constructor() {
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImg = document.getElementById('lightbox-img');
        this.lightboxClose = document.getElementById('lightbox-close');
        this.lightboxPrev = document.getElementById('lightbox-prev');
        this.lightboxNext = document.getElementById('lightbox-next');
        this.lightboxCounter = document.getElementById('lightbox-counter');
        
        this.photoItems = [];
        this.currentIndex = 0;
        
        this.init();
    }

    init() {
        if (!this.lightbox || !this.lightboxImg || !this.lightboxClose || !this.lightboxPrev || !this.lightboxNext || !this.lightboxCounter) {
            return;
        }

        // Get all photo items and their data
        this.updatePhotoItems();
        
        // Setup event listeners
        this.setupEventListeners();
    }

    updatePhotoItems() {
        // Get fresh photo items (important for dynamic loading)
        this.photoItems = Array.from(document.querySelectorAll('.photo-item:not(.is-filtered-out)')).flatMap(item => {
            const img = item.querySelector('img');
            if (!img) return [];

            return [{
                element: item,
                img: img,
                // photo-loader swaps src for a placeholder until the photo scrolls into view
                src: img.dataset.fullSrc || img.src,
                alt: img.alt || 'Photo'
            }];
        });
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (!(e.target instanceof Element)) return;
            const photoItem = e.target.closest('.photo-item');
            if (!photoItem) return;

            this.updatePhotoItems();
            const index = this.photoItems.findIndex(item => item.element === photoItem);
            if (index !== -1) {
                this.openLightbox(index);
            }
        });

        // Make photos reachable and openable from the keyboard
        document.querySelectorAll('.photo-item').forEach((item) => {
            const img = item.querySelector('img');
            if (!img) return;
            item.setAttribute('tabindex', '0');
            item.setAttribute('role', 'button');
            item.setAttribute('aria-label', `View photo: ${img.alt || 'Photo'}`);
            item.addEventListener('keydown', (e) => {
                if (e.key !== 'Enter' && e.key !== ' ') return;
                e.preventDefault();
                item.click();
            });
        });

        // Navigation buttons
        this.lightboxClose.addEventListener('click', () => this.closeLightbox());
        this.lightboxPrev.addEventListener('click', () => this.previousPhoto());
        this.lightboxNext.addEventListener('click', () => this.nextPhoto());

        // Click outside to close
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.closeLightbox();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.lightbox.classList.contains('active')) return;
            
            switch(e.key) {
                case 'Tab': {
                    // Keep focus inside the dialog
                    const focusables = [this.lightboxClose, this.lightboxPrev, this.lightboxNext];
                    const current = focusables.indexOf(document.activeElement);
                    const step = e.shiftKey ? -1 : 1;
                    e.preventDefault();
                    focusables[(current + step + focusables.length) % focusables.length].focus();
                    break;
                }
                case 'Escape':
                    this.closeLightbox();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    this.previousPhoto();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.nextPhoto();
                    break;
            }
        });

        // Touch/swipe support for mobile
        this.setupTouchNavigation();
    }

    setupTouchNavigation() {
        let startX = 0;
        let endX = 0;
        let isTracking = false;

        this.lightboxImg.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            endX = startX;
            isTracking = true;
        });

        this.lightboxImg.addEventListener('touchmove', (e) => {
            if (!isTracking) return;
            endX = e.touches[0].clientX;
        });

        this.lightboxImg.addEventListener('touchend', () => {
            if (!isTracking) return;
            isTracking = false;

            const diffX = startX - endX;
            const threshold = 50; // Minimum swipe distance

            if (Math.abs(diffX) >= threshold) {
                if (diffX > 0) {
                    this.nextPhoto(); // Swipe left = next
                } else {
                    this.previousPhoto(); // Swipe right = previous
                }
            }
        });
    }

    openLightbox(index) {
        // Update photo items in case new ones were loaded
        this.updatePhotoItems();
        if (index < 0 || index >= this.photoItems.length) return;
        
        this.currentIndex = index;
        this.updateLightboxContent();
        this.returnFocusTo = document.activeElement;
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.lightboxClose.focus();
    }

    closeLightbox() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
        const opener = this.photoItems[this.currentIndex]?.element || this.returnFocusTo;
        if (opener && typeof opener.focus === 'function') opener.focus();
    }

    previousPhoto() {
        if (this.photoItems.length === 0) return;

        this.currentIndex = this.currentIndex === 0 
            ? this.photoItems.length - 1 
            : this.currentIndex - 1;
        this.updateLightboxContent();
    }

    nextPhoto() {
        if (this.photoItems.length === 0) return;

        this.currentIndex = this.currentIndex === this.photoItems.length - 1 
            ? 0 
            : this.currentIndex + 1;
        this.updateLightboxContent();
    }

    updateLightboxContent() {
        if (!this.photoItems[this.currentIndex]) return;

        const currentPhoto = this.photoItems[this.currentIndex];
        
        // Get the original high-quality image for lightbox
        const originalSrc = currentPhoto.src;
        const filename = originalSrc.split('/').pop();
        
        // Always use the original uncompressed image in lightbox for best quality
        let bestSrc;
        if (originalSrc.includes('/optimized/')) {
            // If currently showing optimized version, get original
            bestSrc = `images/${filename}`;
        } else {
            // Already showing original
            bestSrc = originalSrc;
        }

        // Update image with smooth transition
        this.lightboxImg.style.opacity = '0.5';
        
        // Create new image to preload
        const tempImg = new Image();
        tempImg.onload = () => {
            this.lightboxImg.src = bestSrc;
            this.lightboxImg.alt = currentPhoto.alt;
            this.lightboxImg.style.opacity = '1';
        };
        tempImg.onerror = () => {
            // Fallback to original if optimized version fails
            this.lightboxImg.src = originalSrc;
            this.lightboxImg.alt = currentPhoto.alt;
            this.lightboxImg.style.opacity = '1';
        };
        tempImg.src = bestSrc;

        // Update counter
        this.lightboxCounter.textContent = `${this.currentIndex + 1} / ${this.photoItems.length}`;

        // Show/hide navigation arrows for single photo
        if (this.photoItems.length <= 1) {
            this.lightboxPrev.style.display = 'none';
            this.lightboxNext.style.display = 'none';
        } else {
            this.lightboxPrev.style.display = 'flex';
            this.lightboxNext.style.display = 'flex';
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PhotoLightbox();
});
