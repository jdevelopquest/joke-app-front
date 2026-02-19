import JokeSection from "./JokeSection.mjs";

document.addEventListener("DOMContentLoaded", (event) => {
    const main = document.querySelector("main");
    const jokeSection = new JokeSection(main);
});
