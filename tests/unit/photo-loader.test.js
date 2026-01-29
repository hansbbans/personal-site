// Unit tests for photo loader functionality
/**
 * @jest-environment jsdom
 */

// Mock Intersection Observer
global.IntersectionObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock Image constructor
global.Image = class {
  constructor() {
    setTimeout(() => {
      if (this.onload) this.onload();
    }, 100);
  }
};

describe('PhotoLoader', () => {
  let photoLoader;
  
  beforeEach(() => {
    // Set up DOM
    document.body.innerHTML = `
      <div class="photos-grid">
        <div class="photo-item">
          <img src="images/photo_1769612758616_0.jpg" alt="Photo" loading="lazy">
          <div class="photo-overlay">
            <span class="photo-location">Update location</span>
            <span class="photo-year">2018</span>
          </div>
        </div>
        <div class="photo-item">
          <img src="images/photo_1769612759768_1.jpg" alt="Photo" loading="lazy">
          <div class="photo-overlay">
            <span class="photo-location">Update location</span>
            <span class="photo-year">2017</span>
          </div>
        </div>
      </div>
    `;
    
    // Load PhotoLoader class (simulate loading from file)
    eval(require('fs').readFileSync('./js/photo-loader.js', 'utf8'));
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  test('should initialize with photo items', () => {
    photoLoader = new PhotoLoader();
    
    expect(photoLoader.images).toBeDefined();
    expect(photoLoader.observer).toBeDefined();
    expect(photoLoader.images.size).toBe(2);
  });

  test('should create intersection observer', () => {
    photoLoader = new PhotoLoader();
    
    expect(IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        rootMargin: '50px',
        threshold: 0.1
      })
    );
  });

  test('should set up photo items correctly', () => {
    photoLoader = new PhotoLoader();
    
    const photoItems = document.querySelectorAll('.photo-item');
    photoItems.forEach(item => {
      const img = item.querySelector('img');
      expect(photoLoader.images.has(img)).toBe(true);
      
      const imageData = photoLoader.images.get(img);
      expect(imageData).toMatchObject({
        small: expect.stringContaining('images/optimized/small/'),
        medium: expect.stringContaining('images/optimized/medium/'),
        large: expect.stringContaining('images/optimized/large/'),
        loaded: false,
        item: item
      });
    });
  });

  test('should determine optimal image size based on container width', () => {
    photoLoader = new PhotoLoader();
    
    const img = document.querySelector('img');
    
    // Mock container width
    Object.defineProperty(img.closest('.photo-item'), 'offsetWidth', {
      value: 300,
      configurable: true
    });
    
    expect(photoLoader.getOptimalSize(img)).toBe('small');
    
    // Change width
    Object.defineProperty(img.closest('.photo-item'), 'offsetWidth', {
      value: 600,
      configurable: true
    });
    
    expect(photoLoader.getOptimalSize(img)).toBe('medium');
    
    // Larger width
    Object.defineProperty(img.closest('.photo-item'), 'offsetWidth', {
      value: 900,
      configurable: true
    });
    
    expect(photoLoader.getOptimalSize(img)).toBe('large');
  });

  test('should set placeholder correctly', () => {
    photoLoader = new PhotoLoader();
    
    const img = document.querySelector('img');
    const originalSrc = img.src;
    
    photoLoader.setPlaceholder(img);
    
    expect(img.src).not.toBe(originalSrc);
    expect(img.src).toContain('data:image');
    expect(img.style.filter).toBe('blur(10px)');
  });

  test('should load image with smooth transition', async () => {
    photoLoader = new PhotoLoader();
    
    const img = document.querySelector('img');
    img.classList.add('photo-loading');
    
    await photoLoader.loadImage(img);
    
    expect(img.classList.contains('photo-loading')).toBe(false);
    expect(img.classList.contains('photo-loaded')).toBe(true);
    
    const imageData = photoLoader.images.get(img);
    expect(imageData.loaded).toBe(true);
  });
});

describe('PhotoLoader Error Handling', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="photo-item">
        <img src="images/photo_test.jpg" alt="Photo" loading="lazy">
      </div>
    `;
    
    // Mock Image with error
    global.Image = class {
      constructor() {
        setTimeout(() => {
          if (this.onerror) this.onerror();
        }, 100);
      }
    };
    
    eval(require('fs').readFileSync('./js/photo-loader.js', 'utf8'));
  });

  test('should handle image load errors gracefully', async () => {
    const photoLoader = new PhotoLoader();
    const img = document.querySelector('img');
    const originalSrc = img.src;
    
    await photoLoader.loadImage(img);
    
    // Should fallback to original src on error
    expect(img.src).toBe(originalSrc);
    expect(img.style.filter).toBe('none');
  });
});

describe('PhotoLoader Integration', () => {
  test('should work with dynamically added photos', () => {
    document.body.innerHTML = '<div class="photos-grid"></div>';
    
    eval(require('fs').readFileSync('./js/photo-loader.js', 'utf8'));
    const photoLoader = new PhotoLoader();
    
    expect(photoLoader.images.size).toBe(0);
    
    // Add photo dynamically
    document.querySelector('.photos-grid').innerHTML = `
      <div class="photo-item">
        <img src="images/new_photo.jpg" alt="Photo" loading="lazy">
      </div>
    `;
    
    // Update photo items
    photoLoader.updatePhotoItems();
    
    expect(photoLoader.images.size).toBe(1);
  });
});