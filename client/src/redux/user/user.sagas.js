import {
    all,
    call,
    takeLatest
} from "redux-saga/effects";

import {
    CHECK_SESSION_START,
    SIGN_IN_START,
    SIGN_OUT_START,
    SIGN_UP_START,
    UPDATE_PROFILE_START
} from "./user.types";

import {
    doCheckSession,
    doSignIn,
    doSignOut,
    doSignUp,
    doUpdateProfile
} from "./user.workers";

function * onCheckUserSessionStart () {
    yield takeLatest(CHECK_SESSION_START, doCheckSession);
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

function * onUpdateProfileStart () {
    yield takeLatest(UPDATE_PROFILE_START, doUpdateProfile);
}

function * userSagas () {
    yield all([
        call(onCheckUserSessionStart),
        call(onSignInStart),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onUpdateProfileStart)
    ]);
}

export default userSagas;
