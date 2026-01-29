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
        // Get all photo items and their data
        this.updatePhotoItems();
        
        // Setup event listeners
        this.setupEventListeners();
    }

    updatePhotoItems() {
        // Get fresh photo items (important for dynamic loading)
        const items = document.querySelectorAll('.photo-item');
        this.photoItems = Array.from(items).map(item => {
            const img = item.querySelector('img');
            return {
                element: item,
                img: img,
                src: img.src,
                alt: img.alt || 'Photo'
            };
        });
    }

    setupEventListeners() {
        // Photo item clicks
        this.photoItems.forEach((item, index) => {
            item.element.addEventListener('click', () => {
                this.openLightbox(index);
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
        let currentX = 0;
        let isDragging = false;

        this.lightboxImg.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });

        this.lightboxImg.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        });

        this.lightboxImg.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;

            const diffX = startX - currentX;
            const threshold = 50; // Minimum swipe distance

            if (Math.abs(diffX) > threshold) {
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
        
        this.currentIndex = index;
        this.updateLightboxContent();
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    previousPhoto() {
        this.currentIndex = this.currentIndex === 0 
            ? this.photoItems.length - 1 
            : this.currentIndex - 1;
        this.updateLightboxContent();
    }

    nextPhoto() {
        this.currentIndex = this.currentIndex === this.photoItems.length - 1 
            ? 0 
            : this.currentIndex + 1;
        this.updateLightboxContent();
    }

    updateLightboxContent() {
        if (!this.photoItems[this.currentIndex]) return;

        const currentPhoto = this.photoItems[this.currentIndex];
        
        // Get the best quality version of the image
        const originalSrc = currentPhoto.src;
        const filename = originalSrc.split('/').pop();
        
        // Try to use the large optimized version if available, fallback to original
        let bestSrc = originalSrc;
        if (originalSrc.includes('/optimized/')) {
            bestSrc = originalSrc;
        } else {
            // Check if optimized version exists
            const largePath = `images/optimized/large/${filename}`;
            bestSrc = largePath;
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