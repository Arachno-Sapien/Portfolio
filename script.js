const THEME_STORAGE_KEY = 'portfolio-theme';
const root = document.documentElement;
const themeToggleButtons = document.querySelectorAll('[data-theme-toggle]');
const menu = document.querySelector('.menu-links');
const icon = document.querySelector('.hamburger-icon');

function applyTheme(theme) {
    root.dataset.theme = theme;

    themeToggleButtons.forEach((button) => {
        button.textContent = theme === 'dark' ? '☾ Dark' : '☀ Light';
        button.setAttribute(
            'aria-label',
            theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
        );
    });
}

function toggleTheme() {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
}

const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
const initialTheme = root.dataset.theme || (storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : 'dark');
applyTheme(initialTheme);
themeToggleButtons.forEach((button) => button.addEventListener('click', toggleTheme));

function toggleMenu() {
    menu.classList.toggle('open');
    icon.classList.toggle('open');
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const revealSections = document.querySelectorAll('.reveal');

// Reveal sections as they enter the viewport. IntersectionObserver lets the
// browser batch this work; a scroll listener would run on every frame.
if (!prefersReducedMotion.matches && 'IntersectionObserver' in window) {
    const show = (section) => {
        section.classList.add('is-visible');
        revealObserver.unobserve(section);
    };

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    show(entry.target);
                }
            });

            // A jump (deep link such as /#contact, or the browser restoring scroll
            // on reload) can carry sections from below the fold to above it without
            // ever intersecting, which would strand them at opacity 0. Sweep any
            // section the viewport has already passed.
            revealSections.forEach((section) => {
                if (
                    !section.classList.contains('is-visible') &&
                    section.getBoundingClientRect().bottom < 0
                ) {
                    show(section);
                }
            });
        },
        // threshold 0 plus a bottom inset fires once a section's top edge is
        // comfortably inside the viewport. A ratio threshold would never be met by
        // a section taller than the screen.
        { threshold: 0, rootMargin: '0px 0px -120px 0px' }
    );

    revealSections.forEach((section) => revealObserver.observe(section));
} else {
    revealSections.forEach((section) => section.classList.add('is-visible'));
}

const scrollTopButton = document.querySelector('[data-scroll-top]');
const topSentinel = document.getElementById('top-sentinel');

// Show the back-to-top button once the 1px sentinel at the top of the page has
// scrolled roughly 300px out of view, rather than sampling window.scrollY.
if (scrollTopButton && topSentinel && 'IntersectionObserver' in window) {
    const sentinelObserver = new IntersectionObserver(
        (entries) => {
            scrollTopButton.classList.toggle('is-visible', !entries[0].isIntersecting);
        },
        { rootMargin: '300px 0px 0px 0px' }
    );

    sentinelObserver.observe(topSentinel);
}

if (scrollTopButton) {
    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion.matches ? 'auto' : 'smooth'
        });
    });
}
