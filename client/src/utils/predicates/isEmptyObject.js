function isEmptyObject (object = {}) {
    return Object.entries(object).length === 0;
}

export default isEmptyObject;
