import { all, call, takeLatest } from "redux-saga/effects";

import {
    doUpdateProfile
} from "./user.workers";

import types from "./user.types";

function * onUpdateUserStart () {
    yield takeLatest(types.UPDATE_PROFILE_START, doUpdateProfile);
}

function * userSagas () {
    yield all([
        call(onUpdateUserStart)
    ]);
}

export default userSagas;
