function deriveNewErrorsState (errors = {}, previousErrorsState = {}) {
    const newErrorsState = {
        ...previousErrorsState
    };

    for (const [key, value] of Object.entries(errors)) {
        newErrorsState[key] = value;
    }

    return newErrorsState;
}

export default deriveNewErrorsState;
