import * as types from "./posts.types";
import reduce from "utils/redux/reduce";

const INITIAL_STATE = {
    error: null,
    items: new Map(),
    totalCount: 0
}; // TODO: create a new item "postsByUser"? With userIds as keys.

export default reduce(INITIAL_STATE, {
    [types.CREATE_POST_FAILURE]: onFailure,
    [types.CREATE_POST_SUCCESS]: onSuccess,
    [types.DELETE_POST_FAILURE]: onFailure,
    [types.DELETE_POST_SUCCESS]: onSuccess,
    [types.FETCH_POST_FAILURE]: onFailure,
    [types.FETCH_POST_SUCCESS]: onSuccess,
    [types.FETCH_POSTS_FAILURE]: onFailure,
    [types.FETCH_POSTS_SUCCESS]: onSuccess,
    [types.RESET_POSTS_ERROR]: onResetError,
    [types.SEARCH_POSTS_FAILURE]: onFailure,
    [types.SEARCH_POSTS_SUCCESS]: onSuccess,
    [types.UPDATE_POST_FAILURE]: onFailure,
    [types.UPDATE_POST_SUCCESS]: onSuccess,
    [types.VOTE_FOR_POST_FAILURE]: onFailure,
    [types.VOTE_FOR_POST_SUCCESS]: onSuccess
});

function onFailure (state, { payload }) {
    return {
        ...state,
        error: payload.error
    };
}

function onResetError (state) {
    return {
        ...state,
        error: null
    };
}

function onSuccess (state, { payload }) {
    return {
        ...state,
        error: null,
        items: payload.items,
        totalCount: payload.totalCount
    };
}
