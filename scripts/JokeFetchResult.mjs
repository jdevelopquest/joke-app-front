class JokeFetchResult {
    constructor(success, premise, punchline, message) {
        this.success = success;
        this.premise = premise;
        this.punchline = punchline;
        this.message = message;
    }

    setSuccess(success) {
        this.success = success;
    }

    setPremise(premise) {
        this.premise = premise;
    }

    setPunchline(punchline) {
        this.punchline = punchline;
    }

    setMessage(message) {
        this.message = message;
    }

    isSuccess() {
        return this.success;
    }

    getPremise() {
        return this.premise;
    }

    getPunchline() {
        return this.punchline;
    }

    getMessage() {
        return this.message;
    }
}

export default JokeFetchResult;
