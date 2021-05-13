import { all, call, takeLatest } from "redux-saga/effects";

import * as workers from "./oauth.workers";
import * as types from "./oauth.types";

function * onGetTokenStart () {
    yield takeLatest(types.GET_TOKEN_START, workers.doGetToken);
}

function * oauthSagas () {
    yield all([
        call(onGetTokenStart)
    ]);
}

export default oauthSagas;
