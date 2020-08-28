import * as types from "./users.types";

export function updateUserFailure (error) {
    return {
        payload: { error },
        type: types.UPDATE_USER_FAILURE
    };
}

export function updateUserStart (params) {
    return {
        payload: params,
        type: types.UPDATE_USER_START
    };
}

export function updateUserSuccess (item) {
    return {
        payload: { item },
        type: types.UPDATE_USER_SUCCESS
    };
}
