import { ERROR } from "utils/const/notificationTypes";
import { setPendingOff, setPendingOn, showNotification } from "./ui.actions";
import translateError from "utils/helpers/translateError";

export const uiSplitter = ({ dispatch }) => (next) => (action) => {
    const { payload, type } = action;

    const shouldSetPendingOn = type.endsWith("_START");
    const shouldSetPendingOff = type.endsWith("_FAILURE") || type.endsWith("_SUCCESS");
    const shouldShowError = Boolean(payload?.error);

    if (shouldSetPendingOn) {
        dispatch(setPendingOn());
    } else if (shouldSetPendingOff) {
        dispatch(setPendingOff());
    }

    if (shouldShowError) {
        const notification = {
            text: translateError(payload.error),
            type: ERROR
        };

        dispatch(showNotification(notification));
    }

    next(action);
};
