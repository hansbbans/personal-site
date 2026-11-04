// Mobile Menu Toggle with scroll lock
document.addEventListener('DOMContentLoaded', () => {
    const currentYear = String(new Date().getFullYear());
    document.querySelectorAll('.js-year').forEach((node) => {
        node.textContent = currentYear;
    });
    document.querySelectorAll('.footer p').forEach((node) => {
        node.innerHTML = node.innerHTML.replace(/\b20\d{2}\b/, currentYear);
    });

    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (!mobileMenuToggle || !navMenu) return;

    const mobileQuery = window.matchMedia('(max-width: 768px)');

    // The menu is only hidden while it is the closed off-canvas mobile menu.
    // On desktop it is always visible, so it must stay exposed and focusable.
    function syncMenuVisibility() {
        const hidden = mobileQuery.matches && !navMenu.classList.contains('active');
        if (mobileQuery.matches) {
            navMenu.setAttribute('aria-hidden', hidden ? 'true' : 'false');
        } else {
            navMenu.removeAttribute('aria-hidden');
        }
        navMenu.inert = hidden;
    }

    function setMenuOpen(isOpen) {
        mobileMenuToggle.classList.toggle('active', isOpen);
        navMenu.classList.toggle('active', isOpen);
        mobileMenuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        document.body.style.overflow = isOpen ? 'hidden' : '';
        syncMenuVisibility();
    }

    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    syncMenuVisibility();
    mobileQuery.addEventListener('change', syncMenuVisibility);

    mobileMenuToggle.addEventListener('click', () => {
        setMenuOpen(!navMenu.classList.contains('active'));
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            setMenuOpen(false);
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            setMenuOpen(false);
            // The closed menu is inert, so give focus back to its toggle
            mobileMenuToggle.focus();
        }
    });

    // Handle window resize - close menu on desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            setMenuOpen(false);
        }
    });

    document.addEventListener('click', (e) => {
        if (!(e.target instanceof Element)) return;
        if (!navMenu.classList.contains('active')) return;
        if (e.target.closest('.mobile-menu-toggle') || e.target.closest('.nav-menu')) return;
        setMenuOpen(false);
    });
});
