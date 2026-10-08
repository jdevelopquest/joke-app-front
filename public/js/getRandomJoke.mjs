import JokeFetchResult from "./JokeFetchResult.mjs";

async function getRandomJoke() {
    const urlApi = 'https://joke-app-api-js43.onrender.com/v1/jokes/random';
    const result = new JokeFetchResult(false, null, null, 'Impossible de récupérer une blague.');

    try {
        const response = await fetch(urlApi);

        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}`);
        }

        const data = await response.json();

        if (
            typeof data?.premise !== 'string' ||
            typeof data?.punchline !== 'string' ||
            !data.premise.trim() ||
            !data.punchline.trim()
        ) {
            throw new Error('Format de réponse API invalide');
        }

        result.setSuccess(true);
        result.setPremise(data.premise.trim());
        result.setPunchline(data.punchline.trim());
    } catch (error) {
        // console.error('Échec de récupération de la blague');
    }

    return result;
}

export default getRandomJoke;