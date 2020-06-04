class StringFormatter {
    constructor (string = "") {
        this._string = string;
    }

    get string () {
        return this._string;
    }

    set string (newString) {
        this._string = newString;
    }

    removeHtmlTags () {
        const span = document.createElement("span");
        span.innerHTML = this._string;

        const result = span.innerText;
        this._string = result;

        return this;
    }

    removeLineBreaks () {
        const result = this._string.replace(/(\r\n|\n|\r)/gm, "");
        this._string = result;

        return this;
    }
}

export default StringFormatter;
