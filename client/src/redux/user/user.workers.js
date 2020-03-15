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

function * doCheckSession () {
    try {
        const currentUser = yield checkSession();
        yield put(checkSessionSuccess(currentUser));
    } catch (error) {
        yield put(checkSessionFailure(error));
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

function * doUpdateProfile ({ payload }) {
    try {
        const currentUser = yield updateProfile(payload);
        yield put(updateProfileSuccess(currentUser));
    } catch (error) {
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
