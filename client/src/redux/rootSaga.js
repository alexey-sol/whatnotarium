import { all, call } from "redux-saga/effects";
import postSagas from "./post/post.sagas";
import userSagas from "./user/user.sagas";

function * rootSaga () {
    yield all([
        call(postSagas),
        call(userSagas)
    ]);
}

export default rootSaga;
