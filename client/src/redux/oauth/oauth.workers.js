import { put } from "redux-saga/effects";

import * as actions from "./oauth.actions";
import * as api from "utils/api/oauth";
import getErrorFromResponse from "utils/helpers/getErrorFromResponse";

export function * doGetToken ({ payload, cb }) {
    try {
        const user = yield api.getToken(payload);
        yield put(actions.getTokenSuccess(user));
        if (cb) cb();
    } catch (errorResponse) {
        const error = getErrorFromResponse(errorResponse);
        yield put(actions.getTokenFailure(error));
    }
}
