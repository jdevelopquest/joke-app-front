import getRandomJoke from "./getRandomJoke.mjs";

class JokeSection {
    constructor() {
        this.jokeSection = document.querySelector('.joke-section');
        this.jokeButton = this.jokeSection.querySelector('button');
        this.jokeDetails = this.jokeSection.querySelector('details');
        this.jokeQuestion = this.jokeDetails.querySelector('summary');
        this.jokeResponse = this.jokeDetails.querySelector('p');
        this.jokeMessage = this.jokeSection.querySelector(':scope > p');
        this.resetJokeSection();
        this.jokeButton.addEventListener('click', async () => {
            this.jokeButton.disabled = true;
            this.resetJokeSection();
            this.showWaitMessage();
            const jokeFetchResult = await getRandomJoke();
            this.showJoke(jokeFetchResult);
            this.jokeButton.disabled = false;
        });
    }

    resetJokeSection() {
        this.jokeDetails.classList.remove('show');
        this.jokeQuestion.textContent = "";
        this.jokeResponse.textContent = "";
        this.jokeMessage.classList.remove('show');
        this.jokeMessage.textContent = "";
    }

    showWaitMessage() {
        this.jokeMessage.classList.add('show');
        this.jokeMessage.textContent = "Chargement en cours...";
    }

    showJoke(jokeFetchResult) {
        this.resetJokeSection();
        this.jokeDetails.classList.add('show');
        if (jokeFetchResult.isSuccess()) {
            this.jokeQuestion.textContent = jokeFetchResult.getQuestion() ?? 'Il y a eu une erreur';
            this.jokeResponse.textContent = jokeFetchResult.getResponse() ?? 'La blague tombe à l\'eau';
        } else {
            this.jokeQuestion.textContent = "Une erreur est survenue";
            this.jokeResponse.textContent = jokeFetchResult.getMessage();
        }
        this.jokeMessage.classList.remove('show');
        this.jokeMessage.textContent = "";
    }
}

export default JokeSection;