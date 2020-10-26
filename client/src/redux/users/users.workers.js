import { put } from "redux-saga/effects";

import * as actions from "./users.actions";
import * as api from "utils/api/users";

import getErrorFromResponse from "utils/helpers/getErrorFromResponse";

export function * doUpdateUser ({ cb, payload }) {
    try {
        const user = yield api.updateUser(payload);
        yield put(actions.updateUserSuccess(user));
        cb();
    } catch (errorResponse) {
        const error = getErrorFromResponse(errorResponse);
        yield put(actions.updateUserFailure(error));
    }
}
