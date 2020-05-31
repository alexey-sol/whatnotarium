import types from "./post.types";

export function clearAllErrors (error) {
    return {
        payload: error,
        type: types.CLEAR_ALL_ERRORS
    };
}

export function createPostFailure (error) {
    return {
        payload: error,
        type: types.CREATE_POST_FAILURE
    };
}

export function createPostReset () {
    return {
        type: types.CREATE_POST_RESET
    };
}

export function createPostStart (props) {
    return {
        payload: props,
        type: types.CREATE_POST_START
    };
}

export function createPostSuccess (post) {
    return {
        payload: post,
        type: types.CREATE_POST_SUCCESS
    };
}

export function deletePostFailure (error) {
    return {
        payload: error,
        type: types.DELETE_POST_FAILURE
    };
}

export function deletePostReset () {
    return {
        type: types.DELETE_POST_RESET
    };
}

export function deletePostStart (id) {
    return {
        payload: id,
        type: types.DELETE_POST_START
    };
}

export function deletePostSuccess (id) {
    return {
        payload: id,
        type: types.DELETE_POST_SUCCESS
    };
}

export function getPostFailure (error) {
    return {
        payload: error,
        type: types.GET_POST_FAILURE
    };
}

export function getPostReset () {
    return {
        type: types.GET_POST_RESET
    };
}

export function getPostStart (id) {
    return {
        payload: id,
        type: types.GET_POST_START
    };
}

export function getPostSuccess (post) {
    return {
        payload: post,
        type: types.GET_POST_SUCCESS
    };
}

export function getPostsFailure (error) {
    return {
        payload: error,
        type: types.GET_POSTS_FAILURE
    };
}

export function getPostsReset () {
    return {
        type: types.GET_POSTS_RESET
    };
}

export function getPostsStart (filter) {
    return {
        payload: filter,
        type: types.GET_POSTS_START
    };
}

export function getPostsSuccess (posts) {
    return {
        payload: posts,
        type: types.GET_POSTS_SUCCESS
    };
}

export function updatePostFailure (error) {
    return {
        payload: error,
        type: types.UPDATE_POST_FAILURE
    };
}

export function updatePostReset () {
    return {
        type: types.UPDATE_POST_RESET
    };
}

export function updatePostStart (props) {
    return {
        payload: props,
        type: types.UPDATE_POST_START
    };
}

export function updatePostSuccess (post) {
    return {
        payload: post,
        type: types.UPDATE_POST_SUCCESS
    };
}
