import * as types from "./posts.types";

export function createPostFailure (error) {
    return {
        payload: { error },
        type: types.CREATE_POST_FAILURE
    };
}

export function createPostStart (props, cb) {
    return {
        cb,
        payload: props,
        type: types.CREATE_POST_START
    };
}

export function createPostSuccess (item) {
    return {
        payload: { item },
        type: types.CREATE_POST_SUCCESS
    };
}

export function deletePostFailure (error) {
    return {
        payload: { error },
        type: types.DELETE_POST_FAILURE
    };
}

export function deletePostStart (id, cb) {
    return {
        cb,
        payload: { id },
        type: types.DELETE_POST_START
    };
}

export function deletePostSuccess (id) {
    return {
        payload: { item: id },
        type: types.DELETE_POST_SUCCESS
    };
}

export function fetchPostFailure (error) {
    return {
        payload: { error },
        type: types.FETCH_POST_FAILURE
    };
}

export function fetchPostStart (id) {
    return {
        payload: { id },
        type: types.FETCH_POST_START
    };
}

export function fetchPostSuccess (item) {
    return {
        payload: { item },
        type: types.FETCH_POST_SUCCESS
    };
}

export function fetchPostsFailure (error) {
    return {
        payload: { error },
        type: types.FETCH_POSTS_FAILURE
    };
}

export function fetchPostsStart (filter, cb) {
    return {
        cb,
        payload: filter,
        type: types.FETCH_POSTS_START
    };
}

export function fetchPostsSuccess (payload) {
    return {
        payload,
        type: types.FETCH_POSTS_SUCCESS
    };
}

export function resetPostsError () {
    return {
        type: types.RESET_POSTS_ERROR
    };
}

export function searchPostsFailure (error) {
    return {
        payload: { error },
        type: types.SEARCH_POSTS_FAILURE
    };
}

export function searchPostsStart (searchTerm) {
    return {
        payload: searchTerm,
        type: types.SEARCH_POSTS_START
    };
}

export function searchPostsSuccess (payload) {
    return {
        payload,
        type: types.SEARCH_POSTS_SUCCESS
    };
}

export function updatePostFailure (error) {
    return {
        payload: { error },
        type: types.UPDATE_POST_FAILURE
    };
}

export function updatePostStart (props, cb) {
    return {
        cb,
        payload: props,
        type: types.UPDATE_POST_START
    };
}

export function updatePostSuccess (item) {
    return {
        payload: { item },
        type: types.UPDATE_POST_SUCCESS
    };
}
