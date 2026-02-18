async function getRandomJoke() {
    const urlApi = 'https://joke-app-api-js43.onrender.com/api/v1/jokes/random';
    try {
        const response = await fetch(urlApi);
        const data = await response.json();
        data.success = response.status === 200;
        return data;
    } catch (e) {
        return {
            success: false,
            message: 'Une erreur est survenue'
        };
    }
}

function waitJoke() {
    const jokeContainer = document.querySelector('#joke-container');
    jokeContainer.innerHTML = '';
    const messageHtml = document.createElement('p');
    messageHtml.textContent = 'Chargement en cours...';
    jokeContainer?.insertAdjacentElement('afterbegin', messageHtml);
}

function showJoke(data) {
    const jokeContainer = document.querySelector('#joke-container');
    jokeContainer.innerHTML = "";
    if (data.success) {
        const details = document.createElement('details');
        const summary = document.createElement('summary');
        summary.textContent = data?.joke?.question ?? 'Il y a eu une erreur';
        const response = document.createElement('div');
        response.textContent = data?.joke?.response ?? 'La blague tombe à l\'eau';
        details.append(summary, response);
        jokeContainer?.insertAdjacentElement('afterbegin', details)
    } else {
        const errorHtml = document.createElement('p');
        errorHtml.textContent = data.message;
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
