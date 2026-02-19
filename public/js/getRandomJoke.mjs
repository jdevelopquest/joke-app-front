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
            if (!data.joke) return returnError();
            if (!data.joke.question || typeof data.joke.question !== 'string') return returnError();
            if (!data.joke.response || typeof data.joke.response !== 'string') return returnError();
        } else {
            if (!data.message || typeof data.message !== 'string') return returnError();
        }
        return new JokeFetchResult(
            response.ok,
            data?.joke,
            data?.message
        );
    } catch (e) {
        return returnError();
    }
}

export default getRandomJoke;