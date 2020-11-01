import { put } from "redux-saga/effects";

import * as actions from "./users.actions";
import * as api from "utils/api/users";

import getErrorFromResponse from "utils/helpers/getErrorFromResponse";

export function * doUpdateUser ({ cb, payload }) {
    try {
        const user = yield api.updateUser(payload);
        yield put(actions.updateUserSuccess(user));
        if (cb) cb();
    } catch (errorResponse) {
        const error = getErrorFromResponse(errorResponse);
        yield put(actions.updateUserFailure(error));
    }
}

export function * doUpdateUserPicture ({ cb, payload }) {
    try {
        const user = yield api.updateUserPicture(payload);
        yield put(actions.updateUserPictureSuccess(user));
        if (cb) cb();
    } catch (errorResponse) {
        const error = getErrorFromResponse(errorResponse);
        yield put(actions.updateUserPictureFailure(error));
    }
}
