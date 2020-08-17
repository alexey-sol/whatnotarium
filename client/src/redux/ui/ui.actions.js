import * as types from "./ui.types";

export function hideNotification () {
    return {
        type: types.HIDE_NOTIFICATION
    };
}

export function setPendingOff () {
    return {
        type: types.SET_PENDING_OFF
    };
}

export function setPendingOn () {
    return {
        type: types.SET_PENDING_ON
    };
}

export function showNotification (item) {
    return {
        payload: { item },
        type: types.SHOW_NOTIFICATION
    };
}
