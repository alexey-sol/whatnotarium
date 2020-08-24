import * as types from "./session.types";

export function checkSessionFailure (error) {
    return {
        payload: { error },
        type: types.CHECK_SESSION_FAILURE
    };
}

export function checkSessionStart () {
    return {
        type: types.CHECK_SESSION_START
    };
}

export function checkSessionSuccess (item) {
    return {
        payload: { item },
        type: types.CHECK_SESSION_SUCCESS
    };
}

export function resetCurrentUser () {
    return {
        type: types.RESET_CURRENT_USER
    };
}

export function resetSessionError () {
    return {
        type: types.RESET_SESSION_ERROR
    };
}

export function setCurrentUser (payload) {
    return {
        payload,
        type: types.SET_CURRENT_USER
    };
}

export function signInFailure (error) {
    return {
        payload: { error },
        type: types.SIGN_IN_FAILURE
    };
}

export function signInStart (credentials) {
    return {
        payload: credentials,
        type: types.SIGN_IN_START
    };
}

export function signInSuccess (item) {
    return {
        payload: { item },
        type: types.SIGN_IN_SUCCESS
    };
}

export function signOutFailure (error) {
    return {
        payload: { error },
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
        payload: { error },
        type: types.SIGN_UP_FAILURE
    };
}

export function signUpStart (credentials) {
    return {
        payload: credentials,
        type: types.SIGN_UP_START
    };
}

export function signUpSuccess (item) {
    return {
        payload: { item },
        type: types.SIGN_UP_SUCCESS
    };
}
