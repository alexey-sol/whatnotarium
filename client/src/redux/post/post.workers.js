import { put } from "redux-saga/effects";

import {
    createPostFailure,
    createPostSuccess,
    deletePostFailure,
    deletePostSuccess,
    getPostFailure,
    getPostSuccess,
    getPostsFailure,
    getPostsSuccess,
    updatePostFailure,
    updatePostSuccess
} from "./post.actions";

import {
    createPost,
    deletePost,
    getPost,
    getPosts,
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

function * doGetPost ({ payload: id }) {
    try {
        const post = yield getPost(id);
        yield put(getPostSuccess(post));
    } catch (errorResponse) {
        const error = getErrorFromResponse(errorResponse);
        yield put(getPostFailure(error));
    }
}

function * doGetPosts ({ payload }) {
    try {
        const posts = yield getPosts(payload);
        yield put(getPostsSuccess(posts));
    } catch (errorResponse) {
        const error = getErrorFromResponse(errorResponse);
        yield put(getPostsFailure(error));
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
    doGetPost,
    doGetPosts,
    doUpdatePost
};
