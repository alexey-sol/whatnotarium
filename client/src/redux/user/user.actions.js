import {
    CHECK_SESSION,
    SIGN_IN_FAILURE,
    SIGN_IN_START,
    SIGN_IN_SUCCESS,
    SIGN_OUT_FAILURE,
    SIGN_OUT_START,
    SIGN_OUT_SUCCESS,
    SIGN_UP_FAILURE,
    SIGN_UP_START,
    SIGN_UP_SUCCESS
} from "./user.types";

function checkSession () {
    return {
        type: CHECK_SESSION
    };
}

function signInFailure (error) {
    return {
        payload: error,
        type: SIGN_IN_FAILURE
    };
}

function signInStart (error) {
    return {
        payload: error,
        type: SIGN_IN_START
    };
}

function signInSuccess (currentUser) {
    return {
        payload: currentUser,
        type: SIGN_IN_SUCCESS
    };
}

function signOutFailure (error) {
    return {
        payload: error,
        type: SIGN_OUT_FAILURE
    };
}

function signOutStart () {
    return {
        type: SIGN_OUT_START
    };
}

function signOutSuccess () {
    return {
        type: SIGN_OUT_SUCCESS
    };
}

function signUpFailure (error) {
    return {
        payload: error,
        type: SIGN_UP_FAILURE
    };
}

function signUpStart (userCredentials) {
    return {
        payload: userCredentials,
        type: SIGN_UP_START
    };
}

function signUpSuccess ({ currentUser, additionalData }) {
    return {
        payload: { currentUser, additionalData },
        type: SIGN_UP_SUCCESS
    };
}

export {
    checkSession,
    signInFailure,
    signInStart,
    signInSuccess,
    signOutFailure,
    signOutStart,
    signOutSuccess,
    signUpFailure,
    signUpStart,
    signUpSuccess
};
