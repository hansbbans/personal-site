// Jest setup file
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