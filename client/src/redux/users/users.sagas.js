import { all, call, takeLatest } from "redux-saga/effects";

import * as types from "./users.types";
import * as workers from "./users.workers";

function * onFetchUserStart () {
    yield takeLatest(types.FETCH_USER_START, workers.doFetchUser);
}

function * onFetchUsersStart () {
    yield takeLatest(types.FETCH_USERS_START, workers.doFetchUsers);
}

function * onSearchUsersStart () {
    yield takeLatest(types.SEARCH_USERS_START, workers.doSearchUsers);
}

function * onUpdateUserPictureStart () {
    yield takeLatest(types.UPDATE_USER_PICTURE_START, workers.doUpdateUserPicture);
}

function * onUpdateUserStart () {
    yield takeLatest(types.UPDATE_USER_START, workers.doUpdateUser);
}

function * usersSagas () {
    yield all([
        call(onFetchUserStart),
        call(onFetchUsersStart),
        call(onSearchUsersStart),
        call(onUpdateUserPictureStart),
        call(onUpdateUserStart)
    ]);
}

export default usersSagas;
