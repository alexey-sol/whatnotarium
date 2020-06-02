import { put } from "redux-saga/effects";

import {
    createPostFailure,
    createPostSuccess,
    deletePostFailure,
    deletePostSuccess,
    fetchPostFailure,
    fetchPostSuccess,
    fetchPostsFailure,
    fetchPostsSuccess,
    updatePostFailure,
    updatePostSuccess
} from "./post.actions";

import {
    createPost,
    deletePost,
    fetchPost,
    fetchPosts,
    updatePost
} from "utils/api/post";

import getErrorFromResponse from "utils/helpers/getErrorFromResponse";

function * doCreatePost ({ payload }) {
    try {
        const post = yield createPost(payload);
        yield put(createPostSuccess(post));
    } catch (errorResponse) {
        const error = getErrorFromResponse(errorResponse);
        yield put(createPostFailure(error));
    }
}

function * doDeletePost ({ payload: id }) {
    try {
        const postId = yield deletePost(id);
        yield put(deletePostSuccess(postId));
    } catch (errorResponse) {
        const error = getErrorFromResponse(errorResponse);
        yield put(deletePostFailure(error));
    }
}

function * doFetchPost ({ payload: id }) {
    try {
        const post = yield fetchPost(id);
        yield put(fetchPostSuccess(post));
    } catch (errorResponse) {
        const error = getErrorFromResponse(errorResponse);
        yield put(fetchPostFailure(error));
    }
}

function * doFetchPosts ({ payload }) {
    try {
        const posts = yield fetchPosts(payload);
        yield put(fetchPostsSuccess(posts));
    } catch (errorResponse) {
        const error = getErrorFromResponse(errorResponse);
        yield put(fetchPostsFailure(error));
    }
}

function * doUpdatePost ({ payload }) {
    const { id, ...restProps } = payload;

    try {
        const post = yield updatePost(id, restProps);
        yield put(updatePostSuccess(post));
    } catch (errorResponse) {
        const error = getErrorFromResponse(errorResponse);
        yield put(updatePostFailure(error));
    }
}

export {
    doCreatePost,
    doDeletePost,
    doFetchPost,
    doFetchPosts,
    doUpdatePost
};
