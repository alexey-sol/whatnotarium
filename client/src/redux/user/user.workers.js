import { put } from "redux-saga/effects";

import {
    signInFailure,
    signInSuccess,
    signOutFailure,
    signOutSuccess,
    signUpFailure,
    signUpSuccess
} from "./user.actions";

import {
    checkSession,
    signIn,
    signOut,
    signUp
} from "common/utils/api";

function * doCheckSession () {
    try {
        const currentUser = yield checkSession();
        yield put(signInSuccess(currentUser));
    } catch (error) {
        yield put(signInFailure(error));
    }
}

function * doSignIn ({ payload }) {
    try {
        const currentUser = yield signIn(payload);
        yield put(signInSuccess(currentUser));
    } catch (error) {
        yield put(signInFailure(error));
    }
}

function * doSignOut () {
    try {
        yield signOut();
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailure(error));
    }
}

function * doSignUp ({ payload }) {
    try {
        const currentUser = yield signUp(payload);
        yield put(signUpSuccess(currentUser));
    } catch (error) {
        yield put(signUpFailure(error));
    }
}

export {
    doCheckSession,
    doSignIn,
    doSignOut,
    doSignUp
};
