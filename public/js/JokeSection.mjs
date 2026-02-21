import getRandomJoke from "./getRandomJoke.mjs";

class JokeSection {
    constructor(container = document.body) {
        this.jokeSection = document.createElement('section');
        this.jokeButton = document.createElement('button');
        this.jokeDetails = document.createElement('details');
        this.jokePremise = document.createElement('summary');
        this.jokePunchline = document.createElement('p');
        this.jokeMessage = document.createElement('p');
        this.jokeSection.classList.add('joke-section');
        this.jokeSection.ariaLive = "polite";
        this.jokeSection.ariaAtomic = "true";
        this.jokeButton.textContent = "Afficher une blague";
        this.jokeButton.type = "button";
        this.jokeSection.appendChild(this.jokeButton);
        this.jokeSection.appendChild(this.jokeDetails);
        this.jokeDetails.appendChild(this.jokePremise);
        this.jokeDetails.appendChild(this.jokePunchline);
        this.jokeSection.appendChild(this.jokeMessage);
        container.appendChild(this.jokeSection);
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
