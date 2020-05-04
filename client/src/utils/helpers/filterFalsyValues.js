function filterFalsyValues (object = {}) {
    const result = {};

    for (const [key, value] of Object.entries(object)) {
        if (value) {
            result[key] = value;
        }
    }

    return result;
}

export default filterFalsyValues;
