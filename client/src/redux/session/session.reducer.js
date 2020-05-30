import types from "./session.types";

const INITIAL_STATE = {
    currentUser: null,
    error: null
};

function userReducer (state = INITIAL_STATE, action = {}) {
    const { payload, type } = action;

    switch (type) {
        case types.CHECK_SESSION_FAILURE:
        case types.SET_ERROR:
        case types.SIGN_IN_FAILURE:
        case types.SIGN_OUT_FAILURE:
        case types.SIGN_UP_FAILURE:
            return {
                ...state,
                error: payload
            };

        case types.CHECK_SESSION_SUCCESS:
        case types.SET_CURRENT_USER:
        case types.SIGN_IN_SUCCESS:
        case types.SIGN_UP_SUCCESS:
            return {
                ...state,
                currentUser: payload,
                error: null
            };

        case types.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                error: null
            };

        case types.CLEAR_CURRENT_USER:
            return {
                ...state,
                currentUser: null
            };

        case types.CLEAR_ERROR:
            return {
                ...state,
                error: null
            };

        default:
            return state;
    }
}

export default userReducer;
