import { all, call, takeLatest } from "redux-saga/effects";

import {
    doCheckSession,
    doSignIn,
    doSignOut,
    doSignUp
} from "./session.workers";

import * as types from "./session.types";

function * onCheckUserSessionStart () {
    yield takeLatest(types.CHECK_SESSION_START, doCheckSession);
}

function * onSignInStart () {
    yield takeLatest(types.SIGN_IN_START, doSignIn);
}

function * onSignOutStart () {
    yield takeLatest(types.SIGN_OUT_START, doSignOut);
}

function * onSignUpStart () {
    yield takeLatest(types.SIGN_UP_START, doSignUp);
}

function * sessionSagas () {
    yield all([
        call(onCheckUserSessionStart),
        call(onSignInStart),
        call(onSignOutStart),
        call(onSignUpStart)
    ]);
}

export default sessionSagas;
