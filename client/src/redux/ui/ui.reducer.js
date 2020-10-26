import * as types from "./ui.types";
import reduce from "utils/redux/reduce";

const INITIAL_STATE = {
    notification: null,
    pendingApi: {}
};

export default reduce(INITIAL_STATE, {
    [types.ADD_ACTION_TO_PENDING_API]: onAddActionToPendingApi,
    [types.HIDE_NOTIFICATION]: onHideNotification,
    [types.REMOVE_ACTION_FROM_PENDING_API]: onRemoveActionFromPendingApi,
    [types.SHOW_NOTIFICATION]: onShowNotification
});

function onAddActionToPendingApi (state, { payload }) {
    return {
        ...state,
        pendingApi: {
            ...state.pendingApi,
            [payload.actionType]: payload.data
        }
    };
}

function onHideNotification (state) {
    return {
        ...state,
        notification: null
    };
}

function onRemoveActionFromPendingApi (state, { payload }) {
    const {
        [payload.actionType]: _,
        ...newPendingApi
    } = state.pendingApi;

    return {
        ...state,
        pendingApi: newPendingApi
    };
}

function onShowNotification (state, { payload }) {
    return {
        ...state,
        notification: payload.item
    };
}
