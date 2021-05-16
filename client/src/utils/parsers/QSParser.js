class QSParser {
    constructor (qs) {
        this.qs = qs;
    }

    parse () {
        const splittedQs = decodeURIComponent(this.qs)
            .split("?")
            .filter(Boolean)[0]
            .split("&");

        const entries = splittedQs.map(rawEntry => rawEntry.split("="));
        return Object.fromEntries(entries);
    }
}

export default QSParser;
