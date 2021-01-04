import { put } from "redux-saga/effects";

import * as actions from "./admin.actions";
import * as api from "utils/api/admin";
import getErrorFromResponse from "utils/helpers/getErrorFromResponse";

export function * doApprovePost ({ cb, payload: id }) {
    try {
        const item = yield api.approvePost(id);
        yield put(actions.approvePostSuccess(item));
        if (cb) cb();
    } catch (errorResponse) {
        const error = getErrorFromResponse(errorResponse);
        yield put(actions.approvePostFailure(error));
    }
}

export function * doRejectPost ({ cb, payload: id }) {
    try {
        const item = yield api.rejectPost(id);
        yield put(actions.rejectPostSuccess(item));
        if (cb) cb();
    } catch (errorResponse) {
        const error = getErrorFromResponse(errorResponse);
        yield put(actions.rejectPostFailure(error));
    }
}
