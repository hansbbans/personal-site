// Enhanced photo loading with progressive enhancement and blur placeholders
class PhotoLoader {
    constructor() {
        this.images = new Map();
        this.observer = null;
        this.init();
    }

    init() {
        // Create intersection observer for lazy loading
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            {
                rootMargin: '50px',
                threshold: 0.1
            }
        );

        // Setup all photo items
        this.setupPhotoItems();
    }

    setupPhotoItems() {
        const photoItems = document.querySelectorAll('.photo-item');
        
        photoItems.forEach((item, index) => {
            const img = item.querySelector('img');
            if (!img) return;

            const originalSrc = img.src;
            const filename = originalSrc.split('/').pop();
            
            // Store image info
            this.images.set(img, {
                small: `images/optimized/small/${filename}`,
                medium: `images/optimized/medium/${filename}`,
                large: `images/optimized/large/${filename}`,
                original: originalSrc,
                loaded: false,
                item: item
            });

            // Replace with placeholder initially
            this.setPlaceholder(img);
            
            // Add blur class
            img.classList.add('photo-loading');
            
            // Start observing
            this.observer.observe(item);
        });
    }

    setPlaceholder(img) {
        // Create a tiny blurred placeholder (you could generate these server-side)
        const canvas = document.createElement('canvas');
        canvas.width = 20;
        canvas.height = 15;
        const ctx = canvas.getContext('2d');
        
        // Simple gradient placeholder
        const gradient = ctx.createLinearGradient(0, 0, 20, 15);
        gradient.addColorStop(0, '#f0f0f0');
        gradient.addColorStop(1, '#e0e0e0');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 20, 15);
        
        img.src = canvas.toDataURL();
        img.style.filter = 'blur(10px)';
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const photoItem = entry.target;
                const img = photoItem.querySelector('img');
                this.loadImage(img);
                this.observer.unobserve(photoItem);
            }
        });
    }

    loadImage(img) {
        const imageData = this.images.get(img);
        if (!imageData || imageData.loaded) return;

        // Determine which size to load based on viewport/container size
        const size = this.getOptimalSize(img);
        const src = imageData[size];

        // Create new image for loading
        const tempImg = new Image();
        
        tempImg.onload = () => {
            // Smooth transition
            img.style.transition = 'filter 0.3s ease';
            img.src = src;
            img.style.filter = 'none';
            img.classList.remove('photo-loading');
            img.classList.add('photo-loaded');
            imageData.loaded = true;

            // Add stagger animation
            setTimeout(() => {
                imageData.item.classList.add('loaded');
            }, 50);
        };

        tempImg.onerror = () => {
            console.warn(`Failed to load ${src}, falling back to original`);
            img.src = imageData.original;
            img.style.filter = 'none';
        };

        tempImg.src = src;
    }

    getOptimalSize(img) {
        const container = img.closest('.photo-item');
        if (!container) return 'medium';

        const rect = container.getBoundingClientRect();
        const width = rect.width || container.offsetWidth;

        // Responsive size selection
        if (width <= 400) return 'small';
        if (width <= 800) return 'medium';
        return 'large';
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PhotoLoader();
});