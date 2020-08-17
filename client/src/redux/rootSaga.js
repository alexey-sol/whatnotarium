import { all, call } from "redux-saga/effects";
import postsSagas from "./posts/posts.sagas";
import sessionSagas from "./session/session.sagas";
import userSagas from "./user/user.sagas";

function * rootSaga () {
    yield all([
        call(postsSagas),
        call(sessionSagas),
        call(userSagas)
    ]);
}

export default rootSaga;
