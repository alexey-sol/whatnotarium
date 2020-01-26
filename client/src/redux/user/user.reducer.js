const INITIAL_STATE = {
    currentUser: null,
    error: null
};

function userReducer (state = INITIAL_STATE, action = {}) {
    const { payload, type } = action;

    switch (type) {
        default:
            return state;
    }
}

export default userReducer;
