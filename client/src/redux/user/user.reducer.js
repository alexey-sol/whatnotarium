import {
    CHECK_SESSION_FAILURE,
    CHECK_SESSION_SUCCESS,
    SIGN_IN_FAILURE,
    SIGN_IN_SUCCESS,
    SIGN_OUT_FAILURE,
    SIGN_OUT_SUCCESS,
    SIGN_UP_FAILURE,
    SIGN_UP_SUCCESS,
    UPDATE_PROFILE_FAILURE,
    UPDATE_PROFILE_SUCCESS
} from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    error: null
};

function userReducer (state = INITIAL_STATE, action = {}) {
    const { payload, type } = action;

    switch (type) {
        case CHECK_SESSION_FAILURE:
        case SIGN_IN_FAILURE:
        case SIGN_OUT_FAILURE:
        case SIGN_UP_FAILURE:
        case UPDATE_PROFILE_FAILURE:
            return {
                ...state,
                error: payload
            };

        case CHECK_SESSION_SUCCESS:
        case SIGN_IN_SUCCESS:
        case UPDATE_PROFILE_SUCCESS:
        case SIGN_UP_SUCCESS:
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

        default:
            return state;
    }
}

export default userReducer;
