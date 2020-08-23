import * as types from "./ui.types";

export function hideNotification () {
    return {
        type: types.HIDE_NOTIFICATION
    };
}

export function showNotification (item) {
    return {
        payload: { item },
        type: types.SHOW_NOTIFICATION
    };
}
