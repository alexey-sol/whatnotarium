import * as types from "./oauth.types";
import reduce from "utils/redux/reduce";

const INITIAL_STATE = {
    error: null
};

export default reduce(INITIAL_STATE, {
    [types.GET_TOKEN_FAILURE]: onFailure,
    [types.GET_TOKEN_SUCCESS]: onSuccess,
    [types.RESET_OAUTH_ERROR]: onResetOauthError
});

function onFailure (state, { payload }) {
    return {
        ...state,
        error: payload.error
    };
}

function onResetOauthError (state) {
    return {
        ...state,
        error: null
    };
}

function onSuccess (state) {
    return {
        ...state,
        error: null
    };
}
