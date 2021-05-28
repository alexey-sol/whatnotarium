import * as oauthTypes from "redux/oauth/oauth.types";
import * as types from "redux/session/session.types";
import * as supportTypes from "redux/support/support.types";
import * as usersTypes from "redux/users/users.types";
import { setCurrentUser } from "redux/session/session.actions";
import { setUser } from "redux/users/users.actions";

export const mapper = ({ dispatch }) => (next) => (action) => {
    const { payload } = action;
    const shouldIgnoreAction = payload?.error;

    if (shouldIgnoreAction) {
        return next(action);
    }

    if (checkIfShouldSetCurrentUser(action)) {
        dispatch(setCurrentUser(payload));
        dispatch(setUser(payload));
    }

    next(action);
};

function checkIfShouldSetCurrentUser ({ payload, type }) {
    return (
        type === oauthTypes.GET_TOKEN_SUCCESS ||
        type === types.CHECK_SESSION_SUCCESS ||
        type === types.SIGN_IN_SUCCESS ||
        (type === types.SIGN_UP_SUCCESS && payload.item) ||
        type === supportTypes.CONFIRM_EMAIL_SUCCESS ||
        type === usersTypes.UPDATE_USER_PICTURE_SUCCESS ||
        type === usersTypes.UPDATE_USER_SUCCESS
    );
}
