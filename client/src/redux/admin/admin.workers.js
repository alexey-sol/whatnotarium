import { put } from "redux-saga/effects";

import * as actions from "./admin.actions";
import * as api from "utils/api/admin";
import getErrorFromResponse from "utils/helpers/getErrorFromResponse";

export function * doApprovePost ({ cb, payload }) {
    try {
        const item = yield api.approvePost(payload);
        yield put(actions.approvePostSuccess(item));
        if (cb) cb();
    } catch (errorResponse) {
        const error = getErrorFromResponse(errorResponse);
        yield put(actions.approvePostFailure(error));
    }
}

export function * doRejectPost ({ cb, payload }) {
    try {
        const item = yield api.rejectPost(payload);
        yield put(actions.rejectPostSuccess(item));
        if (cb) cb();
    } catch (errorResponse) {
        const error = getErrorFromResponse(errorResponse);
        yield put(actions.rejectPostFailure(error));
    }
}
