import * as types from "./ui.types";

/**
 * Consider the action "actionType" (API request typically) pending, so the
 * loader is expected to be rendered.
 * "data" may be, say, ID associated with the entity handling via the action.
 */
export function addActionToPendingApi (actionType, data = null) {
    return {
        payload: { actionType, data },
        type: types.ADD_ACTION_TO_PENDING_API
    };
}

/**
 * It's basically a high-level wrapper for "removeActionFromPendingApi" action, that
 * is supposed to be called in presentational components to hide the loader rendered
 * via "showLoader".
 */
export function hideLoader () {
    return removeActionFromPendingApi(types.LOADING);
}

/**
 * Hides any currently rendered popup notification.
 */
export function hideNotification () {
    return {
        type: types.HIDE_NOTIFICATION
    };
}

/**
 * Consider the action "actionType" done (API request just succeeded/failed).
 */
export function removeActionFromPendingApi (actionType) {
    return {
        payload: { actionType },
        type: types.REMOVE_ACTION_FROM_PENDING_API
    };
}

/**
 * It's basically a high-level wrapper for "addActionToPendingApi" action, that
 * is supposed to be called in presentational components when the loader is expected.
 */
export function showLoader () {
    return addActionToPendingApi(types.LOADING);
}

/**
 * Shows a popup notification with the passed data.
 */
export function showNotification (item) {
    return {
        payload: { item },
        type: types.SHOW_NOTIFICATION
    };
}
