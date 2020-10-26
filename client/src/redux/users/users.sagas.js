import { all, call, takeLatest } from "redux-saga/effects";

import * as types from "./users.types";
import * as workers from "./users.workers";

function * onUpdateUserStart () {
    yield takeLatest(types.UPDATE_USER_START, workers.doUpdateUser);
}

function * usersSagas () {
    yield all([
        call(onUpdateUserStart)
    ]);
}

export default usersSagas;
