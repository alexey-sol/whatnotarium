import * as types from "./users.types";

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
