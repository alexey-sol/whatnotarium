import {
    all,
    call,
    takeLatest
} from "redux-saga/effects";

import {
    CHECK_SESSION,
    SIGN_IN_START,
    SIGN_OUT_START,
    SIGN_UP_START
} from "./user.types";

import {
    doCheckSession,
    doSignIn,
    doSignOut,
    doSignUp
} from "./user.workers";

function * onCheckUserSession () {
    yield takeLatest(CHECK_SESSION, doCheckSession);
}

function * onSignInStart () {
    yield takeLatest(SIGN_IN_START, doSignIn);
}

function * onSignOutStart () {
    yield takeLatest(SIGN_OUT_START, doSignOut);
}

function * onSignUpStart () {
    yield takeLatest(SIGN_UP_START, doSignUp);
}

function * userSagas () {
    yield all([
        call(onCheckUserSession),
        call(onSignInStart),
        call(onSignOutStart),
        call(onSignUpStart)
    ]);
}

export default userSagas;
