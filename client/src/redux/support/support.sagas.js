import { all, call, takeLatest } from "redux-saga/effects";

import * as workers from "./support.workers";
import * as types from "./support.types";

function * onConfirmEmailStart () {
    yield takeLatest(types.CONFIRM_EMAIL_START, workers.doConfirmEmail);
}

function * onRestorePasswordStart () {
    yield takeLatest(types.RESTORE_PASSWORD_START, workers.doRestorePassword);
}

function * onSendConfirmTokenStart () {
    yield takeLatest(types.SEND_CONFIRM_TOKEN_START, workers.doSendConfirmToken);
}

function * supportSagas () {
    yield all([
        call(onConfirmEmailStart),
        call(onRestorePasswordStart),
        call(onSendConfirmTokenStart)
    ]);
}

export default supportSagas;
