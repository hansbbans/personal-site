// Personality Interactions for Cards
document.addEventListener('DOMContentLoaded', () => {
    initPersonalityFeatures();
});

function initPersonalityFeatures() {
    // Add click interactions to all interactive cards
    addCardClickInteractions();
    
    // Add keyboard navigation
    addKeyboardNavigation();
    
    // Add subtle parallax scrolling for personality grids
    addParallaxScrolling();
    
    // Add card hover sound effects (subtle)
    addAudioFeedback();
    
    // Add theme-specific personality adjustments
    addThemePersonality();
}

// Enhanced Card Click Interactions
function addCardClickInteractions() {
    document.addEventListener('click', (e) => {
        const card = e.target.closest('.card-interactive');
        if (!card) return;
        
        // Create ripple effect
        createRippleEffect(card, e);
        
        // Add click animation
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
        
        // Analytics/tracking could go here
        trackCardInteraction(card);
    });
}

// Create ripple effect on click
function createRippleEffect(card, event) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    
    const rect = card.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 600ms ease-out;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        pointer-events: none;
        z-index: 1000;
    `;
    
    // Add ripple animation styles if not exist
    if (!document.getElementById('ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to { transform: scale(4); opacity: 0; }
            }
            .card-interactive { position: relative; overflow: hidden; }
        `;
        document.head.appendChild(style);
    }
    
    card.style.position = 'relative';
    card.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

// Keyboard Navigation for Cards
function addKeyboardNavigation() {
    let focusedCardIndex = -1;
    const cards = () => document.querySelectorAll('.card-interactive');
    
    document.addEventListener('keydown', (e) => {
        const currentCards = cards();
        if (currentCards.length === 0) return;
        
        switch(e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
                e.preventDefault();
                focusedCardIndex = Math.min(focusedCardIndex + 1, currentCards.length - 1);
                currentCards[focusedCardIndex]?.focus();
                break;
                
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                focusedCardIndex = Math.max(focusedCardIndex - 1, 0);
                currentCards[focusedCardIndex]?.focus();
                break;
                
            case 'Home':
                e.preventDefault();
                focusedCardIndex = 0;
                currentCards[0]?.focus();
                break;
                
            case 'End':
                e.preventDefault();
                focusedCardIndex = currentCards.length - 1;
                currentCards[focusedCardIndex]?.focus();
                break;
                
            case 'Enter':
            case ' ':
                if (document.activeElement?.classList.contains('card-interactive')) {
                    e.preventDefault();
                    document.activeElement.click();
                }
                break;
        }
    });
    
    // Make cards focusable
    cards().forEach((card, index) => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        
        card.addEventListener('focus', () => {
            focusedCardIndex = index;
            card.style.outline = '2px solid var(--primary)';
            card.style.outlineOffset = '4px';
        });
        
        card.addEventListener('blur', () => {
            card.style.outline = '';
            card.style.outlineOffset = '';
        });
    });
}

// Subtle Parallax Scrolling
function addParallaxScrolling() {
    const personalityGrids = document.querySelectorAll('.personality-grid');
    
    if (personalityGrids.length === 0 || window.innerWidth < 768) return;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        personalityGrids.forEach(grid => {
            const cards = grid.querySelectorAll('.card-interactive');
            cards.forEach((card, index) => {
                // Different cards move at slightly different rates
                const cardRate = rate + (index % 3) * 2;
                card.style.transform = `translateY(${cardRate}px)`;
            });
        });
    }
    
    // Throttle scroll events for performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Subtle Audio Feedback (Optional)
function addAudioFeedback() {
    // Only add audio if user has interacted (prevents autoplay restrictions)
    let audioEnabled = false;
    let audioContext = null;
    
    document.addEventListener('click', enableAudio, { once: true });
    
    function enableAudio() {
        audioEnabled = true;
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            // Audio not supported
            audioEnabled = false;
        }
    }
    
    function playTone(frequency, duration) {
        if (!audioEnabled || !audioContext) return;
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.01, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    }
    
    // Add hover sounds to different card types
    document.addEventListener('mouseenter', (e) => {
        if (!e.target.closest('.card-interactive')) return;
        
        const card = e.target.closest('.card-interactive');
        
        // Different frequencies for different card types
        if (card.closest('.gear-card')) {
            playTone(800, 0.1); // Tech-y higher pitch
        } else if (card.closest('.food-card')) {
            playTone(400, 0.1); // Warm mid-tone
        } else if (card.closest('.book-card')) {
            playTone(300, 0.15); // Deep, thoughtful tone
        }
    }, true);
}

// Theme-Specific Personality Adjustments
function addThemePersonality() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    function updatePersonalityForTheme() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const cards = document.querySelectorAll('.card-interactive');
        
        cards.forEach(card => {
            if (isDark) {
                // Add subtle glow effects for dark mode
                card.style.setProperty('--card-glow', '0 0 20px rgba(255, 255, 255, 0.1)');
            } else {
                // Remove glow for light mode
                card.style.removeProperty('--card-glow');
            }
        });
    }
    
    // Update on theme change
    themeToggle.addEventListener('click', () => {
        setTimeout(updatePersonalityForTheme, 100); // Allow theme transition
    });
    
    // Initial update
    updatePersonalityForTheme();
}

// Track Card Interactions (for analytics)
function trackCardInteraction(card) {
    const cardType = card.className.split(' ')[0]; // gear-card, food-card, etc.
    const cardCategory = card.getAttribute('data-category');
    const cardTitle = card.querySelector('.gear-card-name, .food-card-name, .book-card-title')?.textContent?.trim();
    
    // Could send to analytics service
    console.log(`Card interaction: ${cardType} - ${cardCategory} - ${cardTitle}`);
    
    // Could also trigger other features like:
    // - Save to "recently viewed"
    // - Update recommendation algorithm
    // - Show related items
}

// Enhanced Loading States
function enhanceLoadingStates() {
    const grids = document.querySelectorAll('.personality-grid');
    
    grids.forEach(grid => {
        const loadingMessage = grid.querySelector('.loading-message');
        if (!loadingMessage) return;
        
        // Add animated loading dots
        loadingMessage.innerHTML = 'Loading<span class="loading-dots">...</span>';
        
        // Add loading animation styles
        const style = document.createElement('style');
        style.textContent = `
            .loading-dots {
                animation: loadingDots 1.4s infinite ease-in-out;
            }
            @keyframes loadingDots {
                0%, 80%, 100% { opacity: 0; }
                40% { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    });
}

// Initialize enhanced loading on page load
enhanceLoadingStates();