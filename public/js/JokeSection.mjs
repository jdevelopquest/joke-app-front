import getRandomJoke from "./getRandomJoke.mjs";

class JokeSection {
    constructor(jokeSection) {
        this.jokeSection = jokeSection;
        this.jokeButton = jokeSection.querySelector('[data-joke-button]');
        this.jokeDetails = jokeSection.querySelector('[data-joke-details]');
        this.jokePremise = jokeSection.querySelector('[data-joke-premise]');
        this.jokePunchline = jokeSection.querySelector('[data-joke-punchline]');
        this.jokeMessage = jokeSection.querySelector('[data-joke-message]');

        this.jokeButton.addEventListener('click', async () => {
            this.jokeButton.disabled = true;
            this.showWaitMessage();
            const jokeFetchResult = await getRandomJoke();
            this.showJoke(jokeFetchResult);
            this.jokeButton.disabled = false;
        });
    }

    resetJokeSection() {
        this.jokeDetails.classList.remove('show');
        this.jokeDetails.open = false;
        this.jokePremise.textContent = "";
        this.jokePunchline.textContent = "";
        this.jokeMessage.classList.remove('show');
        this.jokeMessage.textContent = "";
    }

    showWaitMessage() {
        this.resetJokeSection();
        this.jokeMessage.classList.add('show');
        this.jokeMessage.textContent = "Chargement en cours...";
    }

    showJoke(jokeFetchResult) {
        this.resetJokeSection();
        if (jokeFetchResult.isSuccess()) {
            this.jokeDetails.classList.add('show');
            this.jokePremise.textContent = jokeFetchResult.getPremise() ?? 'Il y a eu une erreur';
            this.jokePunchline.textContent = jokeFetchResult.getPunchline() ?? 'La blague tombe à l\'eau';
        } else {
            this.jokeMessage.classList.add('show');
            this.jokeMessage.textContent = jokeFetchResult.getMessage();
        }
    }
}

export default JokeSection;
