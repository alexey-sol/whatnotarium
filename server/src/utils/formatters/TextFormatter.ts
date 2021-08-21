class TextFormatter {
    constructor (private text: string) {
        this.text = text;
    }

    private hasText (): boolean {
        return this.text.length > 0;
    }

    capitalize (): string {
        if (!this.hasText()) {
            return "";
        }

        const capitilizedFirstLetter = this.text[0].toUpperCase();
        const restText = this.text.slice(1);
        return capitilizedFirstLetter + restText;
    }
}

export default TextFormatter;
