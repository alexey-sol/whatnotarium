import * as types from "./session.types";
import reduce from "utils/redux/reduce";

const INITIAL_STATE = {
    currentUser: null,
    error: null
};

export default reduce(INITIAL_STATE, {
    [types.CHECK_SESSION_FAILURE]: onFailure,
    [types.CHECK_SESSION_SUCCESS]: onSuccess,
    [types.RESET_CURRENT_USER]: onResetCurrentUser,
    [types.RESET_SESSION_ERROR]: onResetSessionError,
    [types.SET_CURRENT_USER]: onSetCurrentUser,
    [types.SIGN_IN_FAILURE]: onFailure,
    [types.SIGN_IN_SUCCESS]: onSuccess,
    [types.SIGN_OUT_FAILURE]: onFailure,
    [types.SIGN_OUT_SUCCESS]: onResetSession,
    [types.SIGN_UP_FAILURE]: onFailure,
    [types.SIGN_UP_SUCCESS]: onSuccess
});

function onFailure (state, { payload }) {
    return {
        ...state,
        error: payload.error
    };
}

function onResetCurrentUser (state) {
    return {
        ...state,
        currentUser: null
    };
}

function onResetSession (state) {
    return {
        ...state,
        currentUser: null,
        error: null
    };
}

function onResetSessionError (state) {
    return {
        ...state,
        error: null
    };
}

function onSetCurrentUser (state, { payload }) {
    return {
        ...state,
        currentUser: payload.item,
        error: null
    };
}

function onSuccess (state) {
    return {
        ...state,
        error: null
    };
}
