import types from "./session.types";

const INITIAL_STATE = {
    currentUser: null,
    error: null,
    isPending: false
};

function userReducer (state = INITIAL_STATE, action = {}) {
    const { payload, type } = action;

    switch (type) {
        case types.SIGN_IN_START:
        case types.SIGN_OUT_START:
        case types.SIGN_UP_START:
            return {
                ...state,
                isPending: true
            };

        case types.CHECK_SESSION_FAILURE:
        case types.SET_ERROR: // TODO: what's that?
        case types.SIGN_IN_FAILURE:
        case types.SIGN_OUT_FAILURE:
        case types.SIGN_UP_FAILURE:
            return {
                ...state,
                error: payload,
                isPending: false
            };

        case types.CHECK_SESSION_SUCCESS:
        case types.SIGN_IN_SUCCESS:
        case types.SIGN_UP_SUCCESS:
            return {
                ...state,
                currentUser: payload,
                error: null,
                isPending: false
            };

        case types.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload,
                error: null
            };

        case types.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                error: null,
                isPending: false
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
