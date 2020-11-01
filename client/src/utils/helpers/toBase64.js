function toBase64 (array) {
    if (!array) {
        return null;
    }

    return btoa(array.reduce((data, byte) => data + String.fromCharCode(byte), ""));
}

export default toBase64;
