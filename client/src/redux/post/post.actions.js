import types from "./post.types";

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

export function fetchPostFailure (error) {
    return {
        payload: error,
        type: types.FETCH_POST_FAILURE
    };
}

export function fetchPostReset () {
    return {
        type: types.FETCH_POST_RESET
    };
}

export function fetchPostStart (id) {
    return {
        payload: id,
        type: types.FETCH_POST_START
    };
}

export function fetchPostSuccess (post) {
    return {
        payload: post,
        type: types.FETCH_POST_SUCCESS
    };
}

export function fetchPostsFailure (error) {
    return {
        payload: error,
        type: types.FETCH_POSTS_FAILURE
    };
}

export function fetchPostsReset () {
    return {
        type: types.FETCH_POSTS_RESET
    };
}

export function fetchPostsStart (filter) {
    return {
        payload: filter,
        type: types.FETCH_POSTS_START
    };
}

export function fetchPostsSuccess (posts) {
    return {
        payload: posts,
        type: types.FETCH_POSTS_SUCCESS
    };
}

export function getPost (id) {
    return {
        payload: id,
        type: types.GET_POST
    };
}

export function getPosts () { // TODO: filter?
    return {
        type: types.GET_POSTS
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
