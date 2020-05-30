import types from "./user.types";

export function updateProfileFailure (error) {
    return {
        payload: error,
        type: types.UPDATE_PROFILE_FAILURE
    };
}

export function updateProfileReset () {
    return {
        type: types.UPDATE_PROFILE_RESET
    };
}

export function updateProfileStart (params) {
    return {
        payload: params,
        type: types.UPDATE_PROFILE_START
    };
}

export function updateProfileSuccess (user) {
    return {
        payload: user,
        type: types.UPDATE_PROFILE_SUCCESS
    };
}
