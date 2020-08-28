import { put } from "redux-saga/effects";

import * as actions from "./users.actions";
import * as api from "utils/api/users";

import getErrorFromResponse from "utils/helpers/getErrorFromResponse";

export function * doUpdateProfile ({ payload }) {
    const { id, ...props } = payload;

    try {
        const user = yield api.updateProfile(id, props);
        yield put(actions.updateUserSuccess(user));
    } catch (errorResponse) {
        const error = getErrorFromResponse(errorResponse);
        yield put(actions.updateUserFailure(error));
    }
}
