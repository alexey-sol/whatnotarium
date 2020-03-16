import {
    CHECK_SESSION_FAILURE,
    CHECK_SESSION_START,
    CHECK_SESSION_SUCCESS,
    RESET_USER_ERROR,
    SIGN_IN_FAILURE,
    SIGN_IN_START,
    SIGN_IN_SUCCESS,
    SIGN_OUT_FAILURE,
    SIGN_OUT_START,
    SIGN_OUT_SUCCESS,
    SIGN_UP_FAILURE,
    SIGN_UP_START,
    SIGN_UP_SUCCESS,
    UPDATE_PROFILE_FAILURE,
    UPDATE_PROFILE_START,
    UPDATE_PROFILE_SUCCESS
} from "./user.types";

function checkSessionFailure (error) {
    return {
        payload: error,
        type: CHECK_SESSION_FAILURE
    };
}

function checkSessionStart () {
    return {
        type: CHECK_SESSION_START
    };
}

function checkSessionSuccess (currentUser) {
    return {
        payload: currentUser,
        type: CHECK_SESSION_SUCCESS
    };
}

function resetUserError () {
    return {
        type: RESET_USER_ERROR
    };
}

function signInFailure (error) {
    return {
        payload: error,
        type: SIGN_IN_FAILURE
    };
}

function signInStart (credentials) {
    return {
        payload: credentials,
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

function signUpStart (credentials) {
    return {
        payload: credentials,
        type: SIGN_UP_START
    };
}

function signUpSuccess ({ currentUser, additionalData }) {
    return {
        payload: { currentUser, additionalData },
        type: SIGN_UP_SUCCESS
    };
}

function updateProfileFailure (error) {
    return {
        payload: error,
        type: UPDATE_PROFILE_FAILURE
    };
}

function updateProfileStart (params) {
    return {
        payload: params,
        type: UPDATE_PROFILE_START
    };
}

function updateProfileSuccess (currentUser) {
    return {
        payload: currentUser,
        type: UPDATE_PROFILE_SUCCESS
    };
}

export {
    checkSessionFailure,
    checkSessionStart,
    checkSessionSuccess,
    resetUserError,
    signInFailure,
    signInStart,
    signInSuccess,
    signOutFailure,
    signOutStart,
    signOutSuccess,
    signUpFailure,
    signUpStart,
    signUpSuccess,
    updateProfileFailure,
    updateProfileStart,
    updateProfileSuccess
};
