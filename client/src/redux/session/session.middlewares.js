import * as types from "redux/session/session.types";
import * as usersTypes from "redux/users/users.types";
import { setCurrentUser } from "redux/session/session.actions";

export const sessionMapper = ({ dispatch }) => (next) => (action) => {
    const { payload, type } = action;
    const shouldIgnoreAction = payload?.error;

    if (shouldIgnoreAction) {
        return next(action);
    }

    if (checkIfShouldSetCurrentUser(type)) {
        dispatch(setCurrentUser(payload));
    }

    next(action);
};

function checkIfShouldSetCurrentUser (type) {
    return (
        type === types.CHECK_SESSION_SUCCESS ||
        type === types.SIGN_IN_SUCCESS ||
        type === types.SIGN_UP_SUCCESS ||
        type === usersTypes.UPDATE_USER_SUCCESS
    );
}
