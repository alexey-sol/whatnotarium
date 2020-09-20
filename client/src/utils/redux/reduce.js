function reduce (initialState, handlers) {
    if (!initialState || !handlers) {
        return console.log("utils/redux/reduce: no required args provided");
    }

    return (state = initialState, action = {}) => {
        const handler = handlers[action.type];

        return (handler)
            ? handler(state, action)
            : state;
    };
}

export default reduce;
