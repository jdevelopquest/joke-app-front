class JokeFetchResult {
    constructor(success, joke, message) {
        this.success = success;
        this.joke = joke;
        this.message = message;
    }

    isSuccess() {
        return this.success;
    }

    getQuestion() {
        return this.joke ? this.joke.question : null;
    }

    getResponse() {
        return this.joke ? this.joke.response : null;
    }

    getMessage() {
        return this.message;
    }
}

export default JokeFetchResult;