import { put } from "redux-saga/effects";

import {
    updateProfileFailure,
    updateProfileSuccess
} from "./user.actions";

import {
    updateProfile
} from "utils/api/user";

import getErrorFromResponse from "utils/helpers/getErrorFromResponse";

export function * doUpdateProfile ({ payload }) {
    const { id, ...props } = payload;

    try {
        const currentUser = yield updateProfile(id, props);
        yield put(updateProfileSuccess(currentUser));
    } catch (errorResponse) {
        const error = getErrorFromResponse(errorResponse);
        yield put(updateProfileFailure(error));
    }
}
