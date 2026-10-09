class ThemeManager {
    constructor(toggleButton) {
        const savedTheme = localStorage.getItem('theme');
        this.theme = savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : null;
        this.systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
        this.toggleButton = toggleButton;

        this.toggleButton.addEventListener('click', () => {
            this.theme = this.getActiveTheme() === 'dark' ? 'light' : 'dark';
            this.applyTheme();
        });

        this.systemTheme.addEventListener('change', () => {
            if (this.theme === null) {
                this.applyTheme();
            }
        });

        this.applyTheme();
    }

    getActiveTheme() {
        return this.theme ?? (this.systemTheme.matches ? 'dark' : 'light');
    }

    applyTheme() {
        const isDark = this.getActiveTheme() === 'dark';
        if (this.theme === null) {
            delete document.body.dataset.theme;
        } else {
            document.body.dataset.theme = this.theme;
            localStorage.setItem('theme', this.theme);
        }
        this.toggleButton.textContent = isDark ? 'Passer en mode clair' : 'Passer en mode sombre';
    }
}

export default ThemeManager;
