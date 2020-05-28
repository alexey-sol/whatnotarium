import {
    all,
    call,
    takeLatest
} from "redux-saga/effects";

import {
    CREATE_POST_START,
    DELETE_POST_START,
    GET_POST_START,
    GET_POSTS_START,
    UPDATE_POST_START
} from "./post.types";

import {
    doCreatePost,
    doDeletePost,
    doGetPost,
    doGetPosts,
    doUpdatePost
} from "./post.workers";

function * onCreatePostStart () {
    yield takeLatest(CREATE_POST_START, doCreatePost);
}

function * onDeletePostStart () {
    yield takeLatest(DELETE_POST_START, doDeletePost);
}

function * onGetPostStart () {
    yield takeLatest(GET_POST_START, doGetPost);
}

function * onGetPostsStart () {
    yield takeLatest(GET_POSTS_START, doGetPosts);
}

function * onUpdatePostStart () {
    yield takeLatest(UPDATE_POST_START, doUpdatePost);
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
