import JokeSection from "./JokeSection.mjs";
import ThemeManager from "./ThemeManager.mjs";

document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.querySelector("[data-theme-toggle]");
    const jokeSection = document.querySelector("[data-joke-section]");
    const themeManager = new ThemeManager(themeToggle);
    const joke = new JokeSection(jokeSection);
});
