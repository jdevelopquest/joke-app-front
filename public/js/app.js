import JokeSection from "./JokeSection.mjs";
import ThemeManager from "./ThemeManager.mjs";

document.addEventListener("DOMContentLoaded", () => {
    const main = document.querySelector("main");
    const themeManager = new ThemeManager(main);
    const jokeSection = new JokeSection(main);
});
