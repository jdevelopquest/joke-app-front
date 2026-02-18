import JokeFetchResult from "./JokeFetchResult.mjs";

async function getRandomJoke() {
    const urlApi = 'https://joke-app-api-js43.onrender.com/api/v1/jokes/random';
    function returnError() {
        return new JokeFetchResult(false, null, 'Une erreur est survenue');
    }
    try {
        const response = await fetch(urlApi);
        const data = await response.json();
        if (response.ok) {
            if (!data.joke) returnError();
            if (!data.joke.question || typeof data.joke.question !== 'string') returnError();
            if (!data.joke.response || typeof data.joke.response !== 'string') returnError();
        } else {
            if (!data.message || typeof data.message !== 'string') returnError();
        }
        return new JokeFetchResult(
            response.ok,
            data?.joke,
            data?.message
        );
    } catch (e) {
        returnError();
    }
}

function waitJoke() {
    const jokeContainer = document.querySelector('#joke-container');
    jokeContainer.innerHTML = '';
    const messageHtml = document.createElement('p');
    messageHtml.textContent = 'Chargement en cours...';
    jokeContainer?.insertAdjacentElement('afterbegin', messageHtml);
}

function showJoke(jokeFetchResult) {
    const jokeContainer = document.querySelector('#joke-container');
    jokeContainer.innerHTML = "";
    if (jokeFetchResult.isSuccess()) {
        const details = document.createElement('details');
        const summary = document.createElement('summary');
        summary.textContent = jokeFetchResult.getQuestion() ?? 'Il y a eu une erreur';
        const response = document.createElement('div');
        response.textContent = jokeFetchResult.getResponse() ?? 'La blague tombe à l\'eau';
        details.append(summary, response);
        jokeContainer?.insertAdjacentElement('afterbegin', details)
    } else {
        const errorHtml = document.createElement('p');
        errorHtml.textContent = jokeFetchResult.getMessage();
        jokeContainer?.insertAdjacentElement('afterbegin', errorHtml);
    }
}

document.addEventListener("DOMContentLoaded", (event) => {
    const btnJoke = document.querySelector('#btn-joke');
    if (!btnJoke) return;
    btnJoke.addEventListener('click', async () => {
        btnJoke.disabled = true;
        waitJoke();
        const joke = await getRandomJoke();
        showJoke(joke);
        btnJoke.disabled = false;
    })
});
