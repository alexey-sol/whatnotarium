import * as types from "./posts.types";

const INITIAL_STATE = {
    error: null,
    items: new Map(),
    totalCount: 0
}; // TODO: create a new item "postsByUser"? With userIds as keys.

function postReducer (state = INITIAL_STATE, action = {}) {
    const { payload, type } = action;

    switch (type) {
        case types.CREATE_POST_FAILURE:
        case types.DELETE_POST_FAILURE:
        case types.FETCH_POST_FAILURE:
        case types.UPDATE_POST_FAILURE:
            return {
                ...state,
                error: payload.error
            };

        case types.CREATE_POST_SUCCESS:
            return {
                ...state,
                error: null,
                items: payload.items,
                totalCount: payload.totalCount
            };

        case types.DELETE_POST_SUCCESS:
            return {
                ...state,
                error: null,
                items: payload.items,
                totalCount: payload.totalCount
            };

        case types.FETCH_POST_SUCCESS:
            return {
                ...state,
                error: null,
                items: payload.items
            };

        case types.FETCH_POSTS_FAILURE:
            return {
                ...state,
                error: payload.error,
                items: new Map()
            };

        case types.FETCH_POSTS_SUCCESS:
            return {
                ...state,
                error: null,
                items: payload.items
            };

        case types.RESET_POSTS_ERROR:
            return {
                ...state,
                error: null
            };

        case types.UPDATE_POST_SUCCESS:
            return {
                ...state,
                error: null,
                items: payload.items
            };

        default:
            return state;
    }
}

export default postReducer;
