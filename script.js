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
