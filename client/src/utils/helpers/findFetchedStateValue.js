function findFetchedStateValue (...stateValues) {
    let responseData = {};

    for (const value of stateValues) {
        if (value?.item || value?.error) {
            responseData = value;
            break;
        }
    }

    return responseData;
}

export default findFetchedStateValue;
