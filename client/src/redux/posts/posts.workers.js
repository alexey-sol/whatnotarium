import { put } from "redux-saga/effects";

import * as actions from "./posts.actions";
import * as api from "utils/api/post";
import getErrorFromResponse from "utils/helpers/getErrorFromResponse";

export function * doCreatePost ({ cb, payload }) {
    try {
        const item = yield api.createPost(payload);
        yield put(actions.createPostSuccess(item));
        if (cb) cb(item.id);
    } catch (errorResponse) {
        const error = getErrorFromResponse(errorResponse);
        yield put(actions.createPostFailure(error));
    }
}

export function * doDeletePost ({ cb, payload: id }) {
    try {
        const postId = yield api.deletePost(id);
        yield put(actions.deletePostSuccess(postId));
        if (cb) cb();
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

export function * doFetchPosts ({ cb, payload }) {
    try {
        const itemsWithPagingOpts = yield api.fetchPosts(payload);
        yield put(actions.fetchPostsSuccess(itemsWithPagingOpts));
        if (cb) cb();
    } catch (errorResponse) {
        const error = getErrorFromResponse(errorResponse);
        yield put(actions.fetchPostsFailure(error));
    }
}

export function * doIncrementViewCount ({ cb, payload }) {
    try {
        const props = yield api.incrementViewCount(payload);
        yield put(actions.incrementViewCountSuccess(props));
        if (cb) cb();
    } catch (errorResponse) {
        const error = getErrorFromResponse(errorResponse);
        yield put(actions.incrementViewCountFailure(error));
    }
}

export function * doSearchPosts ({ cb, payload }) {
    try {
        const itemsWithPagingOpts = yield api.searchPosts(payload);
        yield put(actions.searchPostsSuccess(itemsWithPagingOpts));
        if (cb) cb();
    } catch (errorResponse) {
        const error = getErrorFromResponse(errorResponse);
        yield put(actions.searchPostsFailure(error));
    }
}

export function * doUpdatePost ({ cb, payload }) {
    try {
        const item = yield api.updatePost(payload);
        yield put(actions.updatePostSuccess(item));
        cb(item.id);
    } catch (errorResponse) {
        const error = getErrorFromResponse(errorResponse);
        yield put(actions.updatePostFailure(error));
    }
}

export function * doVoteForPost ({ cb, payload }) {
    try {
        const postId = yield api.voteForPost(payload);
        yield put(actions.voteForPostSuccess(postId));
        if (cb) cb();
    } catch (errorResponse) {
        const error = getErrorFromResponse(errorResponse);
        yield put(actions.voteForPostFailure(error));
    }
}
