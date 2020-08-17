import * as types from "./ui.types";

const INITIAL_STATE = {
    isPending: false,
    notification: null
    // mainIsActive, SET_MAIN_ACTIVE, SET_MAIN_INACTIVE - if !active, don't show spinner TODO?
};

function postReducer (state = INITIAL_STATE, action = {}) {
    const { payload, type } = action;

    switch (type) {
        case types.HIDE_NOTIFICATION:
            return {
                ...state,
                notification: null
            };

        case types.SET_PENDING_OFF:
            return {
                ...state,
                isPending: false
            };

        case types.SET_PENDING_ON:
            return {
                ...state,
                isPending: true
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
