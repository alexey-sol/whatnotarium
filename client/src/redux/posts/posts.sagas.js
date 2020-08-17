import { all, call, takeLatest } from "redux-saga/effects";

import * as types from "./posts.types";
import * as workers from "./posts.workers";

function * onCreatePostStart () {
    yield takeLatest(types.CREATE_POST_START, workers.doCreatePost);
}

function * onDeletePostStart () {
    yield takeLatest(types.DELETE_POST_START, workers.doDeletePost);
}

function * onFetchPostStart () {
    yield takeLatest(types.FETCH_POST_START, workers.doFetchPost);
}

function * onFetchPostsStart () {
    yield takeLatest(types.FETCH_POSTS_START, workers.doFetchPosts);
}

function * onUpdatePostStart () {
    yield takeLatest(types.UPDATE_POST_START, workers.doUpdatePost);
}

function * postSagas () {
    yield all([
        call(onCreatePostStart),
        call(onDeletePostStart),
        call(onFetchPostStart),
        call(onFetchPostsStart),
        call(onUpdatePostStart)
    ]);
}

export default postSagas;
