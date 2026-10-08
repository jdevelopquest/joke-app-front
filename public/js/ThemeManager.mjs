class ThemeManager {
    constructor(toggleButton) {
        this.theme = localStorage.getItem('theme') || 'light';
        this.toggleButton = toggleButton;

        this.toggleButton.addEventListener('click', () => {
            this.theme = this.theme === 'dark' ? 'light' : 'dark';
            this.applyTheme();
        });

        this.applyTheme();
    }

    applyTheme() {
        const isDark = this.theme === 'dark';
        document.body.dataset.theme = this.theme;
        this.toggleButton.textContent = isDark ? 'Passer en mode clair' : 'Passer en mode sombre';
        localStorage.setItem('theme', this.theme);
    }
}

export default ThemeManager;
