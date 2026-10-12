import getRandomJoke from "./getRandomJoke.mjs";

class JokeSection {
    constructor(jokeSection) {
        this.jokeSection = jokeSection;
        this.jokeButton = jokeSection.querySelector('.joke-button');
        this.jokeDialogue = jokeSection.querySelector('.joke-dialogue');
        this.jokeDialoguePremise = jokeSection.querySelector('.joke-dialogue-premise');
        this.jokeDialoguePunchline = jokeSection.querySelector('.joke-dialogue-punchline');
        this.jokeDialogueReveal = jokeSection.querySelector('.joke-dialogue-reveal');
        this.jokeMessage = jokeSection.querySelector('.joke-message');

        this.jokeDialogueReveal.addEventListener('click', () => this.togglePunchline());
        this.jokeButton.addEventListener('click', () => this.loadJoke());
        this.loadJoke();
    }

    async loadJoke() {
        this.jokeButton.disabled = true;
        this.showWaitMessage();
        const jokeFetchResult = await getRandomJoke();
        this.showJoke(jokeFetchResult);
        this.jokeButton.disabled = false;
    }

    resetJokeSection() {
        this.jokeDialogue.classList.remove('show');
        this.jokeDialoguePremise.textContent = "";
        this.jokeDialoguePunchline.textContent = "";
        this.jokeDialoguePunchline.classList.remove('is-revealed');
        this.jokeDialoguePunchline.setAttribute('aria-hidden', 'true');
        this.jokeDialogueReveal.setAttribute('aria-expanded', 'false');
        this.jokeDialogueReveal.setAttribute('aria-label', 'Révéler la chute');
        this.jokeDialogueReveal.setAttribute('title', 'Révéler la chute');
        this.jokeMessage.classList.remove('show');
        this.jokeMessage.classList.remove('error');
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
            this.jokeDialogue.classList.add('show');
            this.jokeDialoguePremise.textContent = jokeFetchResult.getPremise() ?? 'Il y a eu une erreur';
            this.jokeDialoguePunchline.textContent = jokeFetchResult.getPunchline() ?? 'La blague tombe à l\'eau';
        } else {
            this.jokeMessage.classList.add('show');
            this.jokeMessage.classList.add('error');
            this.jokeMessage.textContent = jokeFetchResult.getMessage();
        }
    }

    togglePunchline() {
        const isRevealed = this.jokeDialoguePunchline.classList.toggle('is-revealed');
        this.jokeDialoguePunchline.setAttribute('aria-hidden', String(!isRevealed));
        this.jokeDialogueReveal.setAttribute('aria-expanded', String(isRevealed));
        const label = isRevealed ? 'Masquer la chute' : 'Révéler la chute';
        this.jokeDialogueReveal.setAttribute('aria-label', label);
        this.jokeDialogueReveal.setAttribute('title', label);
    }
}

export default JokeSection;
