import {
    all,
    call,
    takeLatest
} from "redux-saga/effects";

import {
    doCreatePost,
    doDeletePost,
    doGetPost,
    doGetPosts,
    doUpdatePost
} from "./post.workers";

import types from "./post.types";

function * onCreatePostStart () {
    yield takeLatest(types.CREATE_POST_START, doCreatePost);
}

function * onDeletePostStart () {
    yield takeLatest(types.DELETE_POST_START, doDeletePost);
}

function * onGetPostStart () {
    yield takeLatest(types.GET_POST_START, doGetPost);
}

function * onGetPostsStart () {
    yield takeLatest(types.GET_POSTS_START, doGetPosts);
}

function * onUpdatePostStart () {
    yield takeLatest(types.UPDATE_POST_START, doUpdatePost);
}

function * postSagas () {
    yield all([
        call(onCreatePostStart),
        call(onDeletePostStart),
        call(onGetPostStart),
        call(onGetPostsStart),
        call(onUpdatePostStart)
    ]);
}

export default postSagas;
