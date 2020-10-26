import * as types from "./users.types";
import reduce from "utils/redux/reduce";

const INITIAL_STATE = {
    error: null,
    items: new Map(),
    totalCount: 0
};

export default reduce(INITIAL_STATE, {
    [types.CREATE_USER_FAILURE]: onFailure,
    [types.CREATE_USER_SUCCESS]: onSuccess,
    [types.DELETE_USER_FAILURE]: onFailure,
    [types.DELETE_USER_SUCCESS]: onSuccess,
    [types.FETCH_USER_FAILURE]: onFailure,
    [types.FETCH_USER_SUCCESS]: onSuccess,
    [types.FETCH_USERS_FAILURE]: onFailure,
    [types.FETCH_USERS_SUCCESS]: onSuccess,
    [types.RESET_USERS_ERROR]: onResetError,
    [types.SET_USER]: onSuccess,
    [types.UPDATE_USER_FAILURE]: onFailure,
    [types.UPDATE_USER_SUCCESS]: onSuccess
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
