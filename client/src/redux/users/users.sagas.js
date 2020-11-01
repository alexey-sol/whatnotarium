import { all, call, takeLatest } from "redux-saga/effects";

import * as types from "./users.types";
import * as workers from "./users.workers";

function * onUpdateUserPictureStart () {
    yield takeLatest(types.UPDATE_USER_PICTURE_START, workers.doUpdateUserPicture);
}

function * onUpdateUserStart () {
    yield takeLatest(types.UPDATE_USER_START, workers.doUpdateUser);
}

function * usersSagas () {
    yield all([
        call(onUpdateUserPictureStart),
        call(onUpdateUserStart)
    ]);
}

export default usersSagas;
