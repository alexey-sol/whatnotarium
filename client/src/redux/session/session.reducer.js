import * as types from "./session.types";

const INITIAL_STATE = {
    currentUser: null,
    error: null,
    isPending: false
};

function userReducer (state = INITIAL_STATE, action = {}) {
    const { payload, type } = action;

    switch (type) {
        case types.CHECK_SESSION_FAILURE:
        case types.SIGN_IN_FAILURE:
        case types.SIGN_OUT_FAILURE:
        case types.SIGN_UP_FAILURE:
            return {
                ...state,
                error: payload.error,
                isPending: false
            };

        case types.CHECK_SESSION_SUCCESS:
        case types.SIGN_IN_SUCCESS:
        case types.SIGN_UP_SUCCESS:
            return {
                ...state,
                error: null,
                isPending: false
            };

        case types.RESET_CURRENT_USER:
            return {
                ...state,
                currentUser: null
            };

        case types.RESET_SESSION_ERROR:
            return {
                ...state,
                error: null
            };

        case types.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload.item,
                error: null
            };

        case types.SIGN_IN_START:
        case types.SIGN_OUT_START:
        case types.SIGN_UP_START:
            return {
                ...state,
                isPending: true
            };

        case types.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                error: null,
                isPending: false
            };

        default:
            return state;
    }
}

export default userReducer;
