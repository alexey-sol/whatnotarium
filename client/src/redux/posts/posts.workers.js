import { put } from "redux-saga/effects";

import * as actions from "./posts.actions";
import * as api from "utils/api/post";
import getErrorFromResponse from "utils/helpers/getErrorFromResponse";

export function * doCreatePost ({ cb, payload }) {
    try {
        const item = yield api.createPost(payload);
        yield put(actions.createPostSuccess(item));
        cb(item.id);
    } catch (errorResponse) {
        const error = getErrorFromResponse(errorResponse);
        yield put(actions.createPostFailure(error));
    }
}

export function * doDeletePost ({ cb, payload: id }) {
    try {
        const postId = yield api.deletePost(id);
        yield put(actions.deletePostSuccess(postId));
        cb();
    } catch (errorResponse) {
        const error = getErrorFromResponse(errorResponse);
        yield put(actions.deletePostFailure(error));
    }
}

export function * doFetchPost ({ payload: id }) {
    try {
        const item = yield api.fetchPost(id);
        yield put(actions.fetchPostSuccess(item));
    } catch (errorResponse) {
        const error = getErrorFromResponse(errorResponse);
        yield put(actions.fetchPostFailure(error));
    }
}

export function * doFetchPosts ({ payload }) {
    try {
        const itemsWithTotalCount = yield api.fetchPosts(payload);
        yield put(actions.fetchPostsSuccess(itemsWithTotalCount));
    } catch (errorResponse) {
        const error = getErrorFromResponse(errorResponse);
        yield put(actions.fetchPostsFailure(error));
    }
}

export function * doUpdatePost ({ cb, payload }) {
    const { id, ...restProps } = payload;

    try {
        const item = yield api.updatePost(id, restProps);
        yield put(actions.updatePostSuccess(item));
        cb(item.id);
    } catch (errorResponse) {
        const error = getErrorFromResponse(errorResponse);
        yield put(actions.updatePostFailure(error));
    }
}