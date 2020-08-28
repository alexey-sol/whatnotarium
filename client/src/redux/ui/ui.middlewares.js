import * as sessionTypes from "redux/session/session.types";
import * as usersTypes from "redux/users/users.types";
import { DEFAULT_TIMEOUT_IN_MS, ERROR } from "utils/const/notificationProps";
import { showNotification } from "./ui.actions";
import translateError from "utils/helpers/translateError";

export const uiMapper = ({ dispatch }) => (next) => (action) => {
    const { payload, type } = action;
    const shouldShowError = Boolean(payload?.error);

    if (shouldShowError) {
        const notification = { // TODO: create Notification class
            text: translateError(payload.error),
            timeoutInMs: (checkIfShouldBePersistent(type))
                ? null
                : DEFAULT_TIMEOUT_IN_MS,
            type: ERROR
        };

        dispatch(showNotification(notification));
    }

    next(action);
};

function checkIfShouldBePersistent (type) {
    return ( // TODO: check if is any session type?
        type === sessionTypes.SIGN_IN_FAILURE ||
        type === sessionTypes.SIGN_UP_FAILURE ||
        type === usersTypes.UPDATE_USER_FAILURE
    );
}
