import types from "./session.types";

export function checkSessionFailure (error) {
    return {
        payload: error,
        type: types.CHECK_SESSION_FAILURE
    };
}

export function checkSessionStart () {
    return {
        type: types.CHECK_SESSION_START
    };
}

export function checkSessionSuccess (currentUser) {
    return {
        payload: currentUser,
        type: types.CHECK_SESSION_SUCCESS
    };
}

export function clearCurrentUser () {
    return {
        type: types.CLEAR_CURRENT_USER
    };
}

export function clearError () {
    return {
        type: types.CLEAR_ERROR
    };
}

export function setCurrentUser (payload) {
    return {
        payload,
        type: types.SET_CURRENT_USER
    };
}

export function setError (error) {
    return {
        payload: error,
        type: types.SET_ERROR
    };
}

export function signInFailure (error) {
    return {
        payload: error,
        type: types.SIGN_IN_FAILURE
    };
}

export function signInStart (credentials) {
    return {
        payload: credentials,
        type: types.SIGN_IN_START
    };
}

export function signInSuccess (currentUser) {
    return {
        payload: currentUser,
        type: types.SIGN_IN_SUCCESS
    };
}

export function signOutFailure (error) {
    return {
        payload: error,
        type: types.SIGN_OUT_FAILURE
    };
}

export function signOutStart () {
    return {
        type: types.SIGN_OUT_START
    };
}

export function signOutSuccess () {
    return {
        type: types.SIGN_OUT_SUCCESS
    };
}

export function signUpFailure (error) {
    return {
        payload: error,
        type: types.SIGN_UP_FAILURE
    };
}

export function signUpStart (credentials) {
    return {
        payload: credentials,
        type: types.SIGN_UP_START
    };
}

export function signUpSuccess (currentUser) {
    return {
        payload: currentUser,
        type: types.SIGN_UP_SUCCESS
    };
}
