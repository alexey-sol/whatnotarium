import * as types from "./oauth.types";

export function getTokenFailure (error) {
    return {
        payload: { error },
        type: types.GET_TOKEN_FAILURE
    };
}

export function getTokenStart (token, cb) {
    return {
        cb,
        payload: token,
        type: types.GET_TOKEN_START
    };
}

export function getTokenSuccess (item) {
    return {
        payload: { item },
        type: types.GET_TOKEN_SUCCESS
    };
}

export function resetOauthError () {
    return {
        type: types.RESET_OAUTH_ERROR
    };
}
