function parseQueryString (qs) {
    const splittedQs = decodeURIComponent(qs)
        .split("?")
        .filter(Boolean)[0]
        .split("&");

    const entries = splittedQs.map(rawEntry => rawEntry.split("="));
    return Object.fromEntries(entries);
}

export default parseQueryString;
