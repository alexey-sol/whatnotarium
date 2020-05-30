import { put } from "redux-saga/effects";

import {
    checkSessionSuccess,
    signInFailure,
    signInSuccess,
    signOutFailure,
    signOutSuccess,
    signUpFailure,
    signUpSuccess
} from "./session.actions";

import {
    checkSession,
    signIn,
    signOut,
    signUp
} from "utils/api/session";

import getErrorFromResponse from "utils/helpers/getErrorFromResponse";

export function * doCheckSession () {
    try {
        const currentUser = yield checkSession();
        yield put(checkSessionSuccess(currentUser));
    } catch (errorResponse) {
        console.error(errorResponse);
    }
}

export function * doSignIn ({ payload }) {
    try {
        const currentUser = yield signIn(payload);
        yield put(signInSuccess(currentUser));
    } catch (errorResponse) {
        const error = getErrorFromResponse(errorResponse);
        yield put(signInFailure(error));
    }
}

export function * doSignOut () {
    try {
        yield signOut();
        yield put(signOutSuccess());
    } catch (errorResponse) {
        const error = getErrorFromResponse(errorResponse);
        yield put(signOutFailure(error));
    }
}

export function * doSignUp ({ payload }) {
    try {
        const currentUser = yield signUp(payload);
        yield put(signUpSuccess(currentUser));
    } catch (errorResponse) {
        const error = getErrorFromResponse(errorResponse);
        yield put(signUpFailure(error));
    }
}
