import {
    all,
    call,
    takeLatest
} from "redux-saga/effects";

import {
    doCreatePost,
    doDeletePost,
    doFetchPost,
    doFetchPosts,
    doUpdatePost
} from "./post.workers";

import types from "./post.types";

function * onCreatePostStart () {
    yield takeLatest(types.CREATE_POST_START, doCreatePost);
}

function * onDeletePostStart () {
    yield takeLatest(types.DELETE_POST_START, doDeletePost);
}

function * onFetchPostStart () {
    yield takeLatest(types.FETCH_POST_START, doFetchPost);
}

function * onFetchPostsStart () {
    yield takeLatest(types.FETCH_POSTS_START, doFetchPosts);
}

function * onUpdatePostStart () {
    yield takeLatest(types.UPDATE_POST_START, doUpdatePost);
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
