import * as types from "./admin.types";
import reduce from "utils/redux/reduce";

const INITIAL_STATE = {
    error: null
};

export default reduce(INITIAL_STATE, {
    [types.APPROVE_POST_FAILURE]: onFailure,
    [types.APPROVE_POST_SUCCESS]: onSuccess,
    [types.REJECT_POST_FAILURE]: onFailure,
    [types.REJECT_POST_SUCCESS]: onSuccess,
    [types.RESET_ADMIN_ERROR]: onResetError
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

function onSuccess (state) {
    return {
        ...state,
        error: null
    };
}
