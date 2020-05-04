function deriveNewErrorsState (errors = {}) {
    const newErrorsState = {};

    for (const [key, value] of Object.entries(errors)) {
        newErrorsState[key] = value;
    }

    return newErrorsState;
}

export default deriveNewErrorsState;
