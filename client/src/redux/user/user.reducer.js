import {
    CHECK_SESSION,
    SIGN_IN_FAILURE,
    SIGN_IN_SUCCESS,
    SIGN_OUT_FAILURE,
    SIGN_OUT_SUCCESS,
    SIGN_UP_FAILURE,
    SIGN_UP_SUCCESS
} from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    error: null
};

function userReducer (state = INITIAL_STATE, action = {}) {
    const { payload, type } = action;

    switch (type) {
        case CHECK_SESSION:
            return {
                ...state,
                currentUser: payload
            };

        case SIGN_IN_FAILURE:
        case SIGN_OUT_FAILURE:
        case SIGN_UP_FAILURE:
            return {
                ...state,
                error: payload
            };

        case SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: payload,
                error: null
            };

        case SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                error: null
            };

        case SIGN_UP_SUCCESS:
            return {
                ...state,
                currentUser: payload,
                error: null
            };

        default:
            return state;
    }
}

export default userReducer;
