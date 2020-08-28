import * as types from "./users.types";

const INITIAL_STATE = {
    error: null,
    isPending: false,
    items: new Map(),
    totalCount: 0
};

function usersReducer (state = INITIAL_STATE, action = {}) {
    const { payload, type } = action;

    switch (type) {
        case types.CREATE_USER_START:
        case types.DELETE_USER_START:
        case types.FETCH_USER_START:
        case types.FETCH_USERS_START:
        case types.UPDATE_USER_START:
            return {
                ...state,
                isPending: true
            };

        case types.CREATE_USER_FAILURE:
        case types.DELETE_USER_FAILURE:
        case types.FETCH_USER_FAILURE:
        case types.UPDATE_USER_FAILURE:
            return {
                ...state,
                error: payload.error,
                isPending: false
            };

        case types.CREATE_USER_SUCCESS:
            return {
                ...state,
                error: null,
                isPending: false,
                items: payload.items,
                totalCount: payload.totalCount
            };

        case types.DELETE_USER_SUCCESS:
            return {
                ...state,
                error: null,
                isPending: false,
                items: payload.items,
                totalCount: payload.totalCount
            };

        case types.FETCH_USER_SUCCESS:
            return {
                ...state,
                error: null,
                isPending: false,
                items: payload.items
            };

        case types.FETCH_USERS_FAILURE:
            return {
                ...state,
                error: payload.error,
                isPending: false,
                items: new Map()
            };

        case types.FETCH_USERS_SUCCESS:
            return {
                ...state,
                error: null,
                isPending: false,
                items: payload.items
            };

        case types.RESET_USERS_ERROR:
            return {
                ...state,
                error: null
            };

        case types.UPDATE_USER_SUCCESS:
            return {
                ...state,
                error: null,
                isPending: false,
                items: payload.items
            };

        default:
            return state;
    }
}

export default usersReducer;
