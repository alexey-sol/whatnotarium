import * as types from "./posts.types";
import reduce from "utils/redux/reduce";

const INITIAL_STATE = {
    error: null,
    isPending: false,
    items: new Map(),
    totalCount: 0
}; // TODO: create a new item "postsByUser"? With userIds as keys.

export default reduce(INITIAL_STATE, {
    [types.CREATE_POST_FAILURE]: onFail,
    [types.CREATE_POST_START]: onStart,
    [types.CREATE_POST_SUCCESS]: onSuccess,
    [types.DELETE_POST_FAILURE]: onFail,
    [types.DELETE_POST_START]: onStart,
    [types.DELETE_POST_SUCCESS]: onSuccess,
    [types.FETCH_POST_FAILURE]: onFail,
    [types.FETCH_POST_START]: onStart,
    [types.FETCH_POST_SUCCESS]: onSuccess,
    [types.FETCH_POSTS_FAILURE]: onFail,
    [types.FETCH_POSTS_START]: onStart,
    [types.FETCH_POSTS_SUCCESS]: onSuccess,
    [types.RESET_POSTS_ERROR]: onResetError,
    [types.UPDATE_POST_FAILURE]: onFail,
    [types.UPDATE_POST_START]: onStart,
    [types.UPDATE_POST_SUCCESS]: onSuccess
});

function onFail (state, { payload }) {
    return {
        ...state,
        error: payload.error,
        isPending: false
    };
}

function onResetError (state) {
    return {
        ...state,
        error: null
    };
}

function onStart (state) {
    return {
        ...state,
        isPending: true
    };
}

function onSuccess (state, { payload }) {
    return {
        ...state,
        error: null,
        isPending: false,
        items: payload.items,
        totalCount: payload.totalCount
    };
}
