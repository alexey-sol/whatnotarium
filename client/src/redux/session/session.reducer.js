import * as types from "./session.types";
import reduce from "utils/redux/reduce";

const INITIAL_STATE = {
    currentUser: null,
    error: null,
    isPending: false
};

export default reduce(INITIAL_STATE, {
    [types.CHECK_SESSION_FAILURE]: onFailure,
    [types.CHECK_SESSION_SUCCESS]: onSuccess,
    [types.RESET_CURRENT_USER]: onResetCurrentUser,
    [types.RESET_SESSION_ERROR]: onResetSessionError,
    [types.SET_CURRENT_USER]: onSetCurrentUser,
    [types.SIGN_IN_FAILURE]: onFailure,
    [types.SIGN_IN_START]: onStart,
    [types.SIGN_IN_SUCCESS]: onSuccess,
    [types.SIGN_OUT_FAILURE]: onFailure,
    [types.SIGN_OUT_START]: onStart,
    [types.SIGN_OUT_SUCCESS]: onResetSession,
    [types.SIGN_UP_FAILURE]: onFailure,
    [types.SIGN_UP_SUCCESS]: onSuccess,
    [types.SIGN_UP_START]: onStart
});

function onFailure (state, { payload }) {
    return {
        ...state,
        error: payload.error,
        isPending: false
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
        error: null,
        isPending: false
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

function onStart (state) {
    return {
        ...state,
        isPending: true
    };
}

function onSuccess (state) {
    return {
        ...state,
        error: null,
        isPending: false
    };
}
