import { put } from "redux-saga/effects";

import {
    checkSessionFailure,
    checkSessionSuccess,
    signInFailure,
    signInSuccess,
    signOutFailure,
    signOutSuccess,
    signUpFailure,
    signUpSuccess,
    updateProfileFailure,
    updateProfileSuccess
} from "./user.actions";

import {
    checkSession,
    signIn,
    signOut,
    signUp,
    updateProfile
} from "common/utils/api";

import getErrorFromResponse from "common/utils/getErrorFromResponse";

function * doCheckSession () {
    try {
        const currentUser = yield checkSession();
        yield put(checkSessionSuccess(currentUser));
    } catch (errorResponse) {
        const error = getErrorFromResponse(errorResponse);
        yield put(checkSessionFailure(error));
    }
}

function * doSignIn ({ payload }) {
    try {
        const currentUser = yield signIn(payload);
        yield put(signInSuccess(currentUser));
    } catch (errorResponse) {
        const error = getErrorFromResponse(errorResponse);
        yield put(signInFailure(error));
    }
}

function * doSignOut () {
    try {
        yield signOut();
        yield put(signOutSuccess());
    } catch (errorResponse) {
        const error = getErrorFromResponse(errorResponse);
        yield put(signOutFailure(error));
    }
}

function * doSignUp ({ payload }) {
    try {
        const currentUser = yield signUp(payload);
        yield put(signUpSuccess(currentUser));
    } catch (errorResponse) {
        const error = getErrorFromResponse(errorResponse);
        yield put(signUpFailure(error));
    }
}

function * doUpdateProfile ({ payload }) {
    const { id, ...props } = payload;

    try {
        const currentUser = yield updateProfile(id, props);
        yield put(updateProfileSuccess(currentUser));
    } catch (errorResponse) {
        const error = getErrorFromResponse(errorResponse);
        yield put(updateProfileFailure(error));
    }
}

export {
    doCheckSession,
    doSignIn,
    doSignOut,
    doSignUp,
    doUpdateProfile
};
