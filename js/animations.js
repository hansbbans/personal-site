// Fade-in animation on scroll using Intersection Observer
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered delay for elements that appear together
                    const delay = index * 100; // 100ms stagger
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, Math.min(delay, 300)); // Cap at 300ms
                    
                    // Stop observing once visible
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        fadeElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        fadeElements.forEach(element => {
            element.classList.add('visible');
        });
    }
});
