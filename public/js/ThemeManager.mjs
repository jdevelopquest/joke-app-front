class ThemeManager {
    constructor(container = document.body) {
        this.container = container;
        this.theme = localStorage.getItem('theme') || 'light';
        this.controls = document.createElement('div');
        this.toggleButton = document.createElement('button');

        this.controls.classList.add('theme-controls');

        this.toggleButton.type = 'button';
        this.toggleButton.classList.add('theme-toggle');

        this.controls.appendChild(this.toggleButton);

        this.toggleButton.addEventListener('click', () => {
            this.theme = this.theme === 'dark' ? 'light' : 'dark';
            this.applyTheme();
        });

        this.applyTheme();
        this.container.appendChild(this.controls);
    }

    applyTheme() {
        const isDark = this.theme === 'dark';
        document.body.dataset.theme = this.theme;
        this.toggleButton.textContent = isDark ? 'Passer en mode clair' : 'Passer en mode sombre';
        localStorage.setItem('theme', this.theme);
    }
}

export default ThemeManager;
