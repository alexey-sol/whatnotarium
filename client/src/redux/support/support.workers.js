import { put } from "redux-saga/effects";

import * as actions from "./support.actions";
import * as api from "utils/api/support";
import getErrorFromResponse from "utils/helpers/getErrorFromResponse";

export function * doConfirmEmail ({ payload, cb }) {
    try {
        const currentUser = yield api.confirmEmail(payload);
        yield put(actions.confirmEmailSuccess(currentUser));
        if (cb) cb();
    } catch (errorResponse) {
        const error = getErrorFromResponse(errorResponse);
        yield put(actions.confirmEmailFailure(error));
    }
}

export function * doRestorePassword ({ payload, cb }) {
    try {
        yield api.restorePassword(payload);
        yield put(actions.restorePasswordSuccess());
        if (cb) cb();
    } catch (errorResponse) {
        const error = getErrorFromResponse(errorResponse);
        yield put(actions.restorePasswordFailure(error));
    }
}

export function * doSendConfirmToken ({ payload, cb }) {
    try {
        yield api.sendConfirmToken(payload);
        yield put(actions.sendConfirmTokenSuccess());
        if (cb) cb();
    } catch (errorResponse) {
        const error = getErrorFromResponse(errorResponse);
        yield put(actions.sendConfirmTokenFailure(error));
    }
}
