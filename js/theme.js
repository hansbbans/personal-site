// Dark Mode Toggle with localStorage persistence
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    // Explicit toggle choices live under THEME_KEY. The old 'theme' key was
    // also written on every page load, so it can't be told apart from an
    // explicit choice; drop it so those visitors follow the OS again.
    const THEME_KEY = 'theme-preference';
    localStorage.removeItem('theme');
    
    // Night mode is the site's default look; daylight is opt-in via the toggle.
    const getPreferredTheme = () => localStorage.getItem(THEME_KEY) || 'dark';
    
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
    
    applyTheme(getPreferredTheme());
    
    // Toggle theme on button click
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }
});
