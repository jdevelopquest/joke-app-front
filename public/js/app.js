function getRandomJoke() {
    let joke = {
        success: false,
        message: 'Une erreur est survenue'
    };
    const urlApi = 'https://joke-app-api-js43.onrender.com/api/v1/jokes/random';
    fetch(urlApi, {method: 'GET'})
        .then(response => {
            joke = response.json();
            joke.success = response.status === 200;
            return joke;
        })
        .catch(error => {
        });
    return new Promise(resolve => resolve(joke));
}

function showJoke(joke) {
    const jokeContainer = document.querySelector('#joke-container');
    jokeContainer.innerHTML = "";
    if (joke.success) {
        const jokeHtml = document.createElement('details');
        jokeHtml.innerHTML =
            "<details class='details-joke'>\n" +
            "  <summary class='summary-joke'>${joke.question}</summary>\n" +
            "  ${joke.response}\n" +
            "</details>";
        jokeContainer?.insertAdjacentElement('afterbegin', jokeHtml)
    } else {
        const errorHtml = document.createElement('p');
        errorHtml.innerText = joke.message;
        jokeContainer?.insertAdjacentElement('afterbegin', errorHtml);
    }
}

document.addEventListener("DOMContentLoaded", (event) => {
    document.querySelector('#btn-joke')?.addEventListener('click', () => {
        getRandomJoke().then(joke => showJoke(joke));
    })
});
