// Dark Mode Toggle with localStorage persistence
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    // Explicit toggle choices live under THEME_KEY. The old 'theme' key was
    // also written on every page load, so it can't be told apart from an
    // explicit choice; drop it so those visitors follow the OS again.
    const THEME_KEY = 'theme-preference';
    localStorage.removeItem('theme');
    
    // Check for saved theme preference or default to system preference
    const getPreferredTheme = () => {
        const savedTheme = localStorage.getItem(THEME_KEY);
        if (savedTheme) {
            return savedTheme;
        }
        // Check system preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };
    
    // Apply theme
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            html.setAttribute('data-theme', 'dark');
        } else {
            html.removeAttribute('data-theme');
        }
    };

    // Apply and remember an explicit user choice
    const setTheme = (theme) => {
        applyTheme(theme);
        localStorage.setItem(THEME_KEY, theme);
    };
    
    // Initialize theme without storing it, so the OS preference keeps applying
    // until the user picks a theme with the toggle.
    applyTheme(getPreferredTheme());
    
    // Toggle theme on button click
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Only update if user hasn't explicitly set a preference
        if (!localStorage.getItem(THEME_KEY)) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
});
