import * as types from "./ui.types";

const INITIAL_STATE = {
    notification: null
};

function postReducer (state = INITIAL_STATE, action = {}) {
    const { payload, type } = action;

    switch (type) {
        case types.HIDE_NOTIFICATION:
            return {
                ...state,
                notification: null
            };

        case types.SHOW_NOTIFICATION:
            return {
                ...state,
                notification: payload.item
            };

        default:
            return state;
    }
}

export default postReducer;
