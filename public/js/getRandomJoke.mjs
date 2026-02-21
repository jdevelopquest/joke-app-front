import JokeFetchResult from "./JokeFetchResult.mjs";

async function getRandomJoke() {
    const urlApi = 'https://joke-app-api-js43.onrender.com/v1/jokes/random';
    let jokeFetchResult = new JokeFetchResult(false, null, null, 'Une erreur est survenue');
    try {
        const response = await fetch(urlApi);
        const data = await response.json();
        if (response.ok) {
            if ('premise' in data && 'punchline' in data && typeof data.premise === 'string' && typeof data.punchline === 'string') {
                const premise = data.premise.trim();
                const punchline = data.punchline.trim();
                if (premise.length > 0 && punchline.length > 0) {
                    jokeFetchResult.setSuccess(true);
                    jokeFetchResult.setPremise(premise);
                    jokeFetchResult.setPunchline(punchline);
                }
            }
        }
    } catch (error) {

    }
    return jokeFetchResult;
}

export default getRandomJoke;
