import { all, call } from "redux-saga/effects";
import postsSagas from "./posts/posts.sagas";
import sessionSagas from "./session/session.sagas";
import usersSagas from "./users/users.sagas";

function * rootSaga () {
    yield all([
        call(postsSagas),
        call(sessionSagas),
        call(usersSagas)
    ]);
}

export default rootSaga;
