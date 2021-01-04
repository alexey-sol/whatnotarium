import { all, call, takeLatest } from "redux-saga/effects";

import * as types from "./admin.types";
import * as workers from "./admin.workers";

function * onApprovePostStart () {
    yield takeLatest(types.APPROVE_POST_START, workers.doApprovePost);
}

function * onRejectPostStart () {
    yield takeLatest(types.REJECT_POST_START, workers.doRejectPost);
}

function * adminSagas () {
    yield all([
        call(onApprovePostStart),
        call(onRejectPostStart)
    ]);
}

export default adminSagas;
