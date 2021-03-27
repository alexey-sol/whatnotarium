import { all, call, takeLatest } from "redux-saga/effects";

import * as workers from "./support.workers";
import * as types from "./support.types";

function * onConfirmEmailStart () {
    yield takeLatest(types.CONFIRM_EMAIL_START, workers.doConfirmEmail);
}

function * onResetPasswordStart () {
    yield takeLatest(types.RESET_PASSWORD_START, workers.doResetPassword);
}

function * onSendConfirmTokenStart () {
    yield takeLatest(types.SEND_CONFIRM_TOKEN_START, workers.doSendConfirmToken);
}

function * onSendResetTokenStart () {
    yield takeLatest(types.SEND_RESET_TOKEN_START, workers.doSendResetToken);
}

function * supportSagas () {
    yield all([
        call(onConfirmEmailStart),
        call(onResetPasswordStart),
        call(onSendConfirmTokenStart),
        call(onSendResetTokenStart)
    ]);
}

export default supportSagas;
