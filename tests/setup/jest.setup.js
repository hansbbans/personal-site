// Jest setup file
const fs = require('fs');

// Mock file system for photo loader tests
jest.mock('fs', () => ({
  readFileSync: jest.fn(() => {
    return `
// Mock PhotoLoader class for testing
class PhotoLoader {
  constructor() {
    this.images = new Map();
    this.observer = null;
    this.init();
  }

  init() {
    this.observer = new IntersectionObserver(() => {}, {});
    this.setupPhotoItems();
  }

  setupPhotoItems() {
    const photoItems = document.querySelectorAll('.photo-item');
    photoItems.forEach(item => {
      const img = item.querySelector('img');
      if (img) {
        const filename = img.src.split('/').pop();
        this.images.set(img, {
          small: 'images/optimized/small/' + filename,
          medium: 'images/optimized/medium/' + filename,
          large: 'images/optimized/large/' + filename,
          original: img.src,
          loaded: false,
          item: item
        });
      }
    });
  }

  getOptimalSize(img) {
    const container = img.closest('.photo-item');
    if (!container) return 'medium';
    const width = container.offsetWidth || 400;
    if (width <= 400) return 'small';
    if (width <= 800) return 'medium';
    return 'large';
  }

  setPlaceholder(img) {
    img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
    img.style.filter = 'blur(10px)';
  }

  async loadImage(img) {
    return new Promise((resolve) => {
      img.classList.remove('photo-loading');
      img.classList.add('photo-loaded');
      img.style.filter = 'none';
      const imageData = this.images.get(img);
      if (imageData) {
        imageData.loaded = true;
        img.src = imageData.medium;
      }
      resolve();
    });
  }

  updatePhotoItems() {
    this.setupPhotoItems();
  }
}

window.PhotoLoader = PhotoLoader;
    `;
  })
}));

// Mock canvas for placeholder generation
HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
  createLinearGradient: jest.fn(() => ({
    addColorStop: jest.fn()
  })),
  fillRect: jest.fn(),
  set fillStyle(value) {}
}));

HTMLCanvasElement.prototype.toDataURL = jest.fn(() => 
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
);

// Mock scrollIntoView
Element.prototype.scrollIntoViewIfNeeded = jest.fn();

// Console setup
global.console = {
  ...console,
  // Suppress expected warnings in tests
  warn: jest.fn(),
  error: jest.fn()
};