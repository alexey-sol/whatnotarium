import * as sessionTypes from "redux/session/session.types";
import * as usersTypes from "redux/users/users.types";
import { DEFAULT_TIMEOUT_IN_MS, ERROR } from "utils/const/notificationProps";
import { FAILURE_POSTFIX, START_POSTFIX, SUCCESS_POSTFIX } from "utils/const/actionTypeAffixes";
import Notification from "utils/objects/Notification";
import { addActionToPendingApi, removeActionFromPendingApi, showNotification } from "./ui.actions";
import removePostfix from "utils/redux/removePostfixFromActionType";
import translateError from "utils/helpers/translateError";

export const uiMapper = ({ dispatch }) => (next) => (action) => {
    const { payload, type } = action;
    const shouldShowError = Boolean(payload?.error);

    if (shouldShowError) {
        const translatedError = translateError(payload.error);
        const timeoutInMs = (checkIfShouldBePersistent(type))
            ? null
            : DEFAULT_TIMEOUT_IN_MS;

        const notification = new Notification(translatedError, ERROR, timeoutInMs);
        dispatch(showNotification(notification));
    }

    const requestStarted = type.endsWith(START_POSTFIX);
    const requestFulfilled = type.endsWith(FAILURE_POSTFIX) || type.endsWith(SUCCESS_POSTFIX);

    if (requestStarted) {
        dispatch(addActionToPendingApi(removePostfix(type), getDataIfAny(payload)));
    } else if (requestFulfilled) {
        dispatch(removeActionFromPendingApi(removePostfix(type)));
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

function getDataIfAny (payload) {
    const id = payload?.id;
    return (id) ? { id } : null;
}
