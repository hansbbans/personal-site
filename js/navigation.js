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

    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    navMenu.setAttribute('aria-hidden', 'true');

    function setMenuOpen(isOpen) {
        mobileMenuToggle.classList.toggle('active', isOpen);
        navMenu.classList.toggle('active', isOpen);
        mobileMenuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        navMenu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

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
