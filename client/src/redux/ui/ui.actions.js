import * as types from "./ui.types";

export function addActionToPendingApi (actionType, data = null) {
    return {
        payload: { actionType, data },
        type: types.ADD_ACTION_TO_PENDING_API
    };
}

export function hideNotification () {
    return {
        type: types.HIDE_NOTIFICATION
    };
}

export function removeActionFromPendingApi (actionType) {
    return {
        payload: { actionType },
        type: types.REMOVE_ACTION_FROM_PENDING_API
    };
}

export function showNotification (item) {
    return {
        payload: { item },
        type: types.SHOW_NOTIFICATION
    };
}
