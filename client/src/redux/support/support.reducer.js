import * as types from "./support.types";
import reduce from "utils/redux/reduce";

const INITIAL_STATE = {
    error: null
};

export default reduce(INITIAL_STATE, {
    [types.CONFIRM_EMAIL_FAILURE]: onFailure,
    [types.CONFIRM_EMAIL_SUCCESS]: onSuccess,
    [types.RESET_SUPPORT_ERROR]: onResetSupportError,
    [types.RESTORE_PASSWORD_SUCCESS]: onSuccess,
    [types.SEND_CONFIRM_TOKEN_FAILURE]: onFailure,
    [types.SEND_CONFIRM_TOKEN_SUCCESS]: onSuccess
});

function onFailure (state, { payload }) {
    return {
        ...state,
        error: payload.error
    };
}

function onResetSupportError (state) {
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
