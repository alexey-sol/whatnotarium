import * as types from "./users.types";

export function deleteUserFailure (error) {
    return {
        payload: { error },
        type: types.DELETE_USER_FAILURE
    };
}

export function deleteUserStart (id, cb) {
    return {
        cb,
        payload: { id },
        type: types.DELETE_USER_START
    };
}

export function deleteUserSuccess (item) {
    return {
        payload: { item },
        type: types.DELETE_USER_SUCCESS
    };
}

export function fetchUserFailure (error) {
    return {
        payload: { error },
        type: types.FETCH_USER_FAILURE
    };
}

export function fetchUserStart (id) {
    return {
        payload: { id },
        type: types.FETCH_USER_START
    };
}

export function fetchUserSuccess (item) {
    return {
        payload: { item },
        type: types.FETCH_USER_SUCCESS
    };
}

export function fetchUsersFailure (error) {
    return {
        payload: { error },
        type: types.FETCH_USERS_FAILURE
    };
}

export function fetchUsersStart (filter, cb) {
    return {
        cb,
        payload: filter,
        type: types.FETCH_USERS_START
    };
}

export function fetchUsersSuccess (payload) {
    return {
        payload,
        type: types.FETCH_USERS_SUCCESS
    };
}

export function searchUsersFailure (error) {
    return {
        payload: { error },
        type: types.SEARCH_USERS_FAILURE
    };
}

export function searchUsersStart (payload, cb) {
    return {
        cb,
        payload,
        type: types.SEARCH_USERS_START
    };
}

export function searchUsersSuccess (payload) {
    return {
        payload,
        type: types.SEARCH_USERS_SUCCESS
    };
}

export function setUser (payload) {
    return {
        payload,
        type: types.SET_USER
    };
}

export function updateUserPictureFailure (error) {
    return {
        payload: { error },
        type: types.UPDATE_USER_PICTURE_FAILURE
    };
}

export function updateUserPictureStart (props, cb) {
    return {
        cb,
        payload: props,
        type: types.UPDATE_USER_PICTURE_START
    };
}

export function updateUserPictureSuccess (item) {
    return {
        payload: { item },
        type: types.UPDATE_USER_PICTURE_SUCCESS
    };
}

export function updateUserFailure (error) {
    return {
        payload: { error },
        type: types.UPDATE_USER_FAILURE
    };
}

export function updateUserStart (props, cb) {
    return {
        cb,
        payload: props,
        type: types.UPDATE_USER_START
    };
}

export function updateUserSuccess (item) {
    return {
        payload: { item },
        type: types.UPDATE_USER_SUCCESS
    };
}
