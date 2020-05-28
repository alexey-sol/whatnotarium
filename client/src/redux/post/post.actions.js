import {
    CREATE_POST_FAILURE,
    CREATE_POST_START,
    CREATE_POST_SUCCESS,
    DELETE_POST_FAILURE,
    DELETE_POST_START,
    DELETE_POST_SUCCESS,
    GET_POST_FAILURE,
    GET_POST_START,
    GET_POST_SUCCESS,
    GET_POSTS_FAILURE,
    GET_POSTS_START,
    GET_POSTS_SUCCESS,
    RESET_POST_ERROR,
    UPDATE_POST_FAILURE,
    UPDATE_POST_START,
    UPDATE_POST_SUCCESS
} from "./post.types";

function createPostFailure (error) {
    return {
        payload: error,
        type: CREATE_POST_FAILURE
    };
}

function createPostStart (props) {
    return {
        payload: props,
        type: CREATE_POST_START
    };
}

function createPostSuccess (post) {
    return {
        payload: post,
        type: CREATE_POST_SUCCESS
    };
}

function deletePostFailure (error) {
    return {
        payload: error,
        type: DELETE_POST_FAILURE
    };
}

function deletePostStart (id) {
    return {
        payload: id,
        type: DELETE_POST_START
    };
}

function deletePostSuccess (id) {
    return {
        payload: id,
        type: DELETE_POST_SUCCESS
    };
}

function getPostFailure (error) {
    return {
        payload: error,
        type: GET_POST_FAILURE
    };
}

function getPostStart (id) {
    return {
        payload: id,
        type: GET_POST_START
    };
}

function getPostSuccess (post) {
    return {
        payload: post,
        type: GET_POST_SUCCESS
    };
}

function getPostsFailure (error) {
    return {
        payload: error,
        type: GET_POSTS_FAILURE
    };
}

function getPostsStart (filter) {
    return {
        payload: filter,
        type: GET_POSTS_START
    };
}

function getPostsSuccess (posts) {
    return {
        payload: posts,
        type: GET_POSTS_SUCCESS
    };
}

function resetPostError () {
    return {
        type: RESET_POST_ERROR
    };
}

function updatePostFailure (error) {
    return {
        payload: error,
        type: UPDATE_POST_FAILURE
    };
}

function updatePostStart (props) {
    return {
        payload: props,
        type: UPDATE_POST_START
    };
}

function updatePostSuccess (post) {
    return {
        payload: post,
        type: UPDATE_POST_SUCCESS
    };
}

export {
    createPostFailure,
    createPostStart,
    createPostSuccess,
    deletePostFailure,
    deletePostStart,
    deletePostSuccess,
    getPostFailure,
    getPostStart,
    getPostSuccess,
    getPostsFailure,
    getPostsStart,
    getPostsSuccess,
    resetPostError,
    updatePostFailure,
    updatePostStart,
    updatePostSuccess
};
