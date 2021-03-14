import { all, call } from "redux-saga/effects";
import adminSagas from "./admin/admin.sagas";
import postsSagas from "./posts/posts.sagas";
import sessionSagas from "./session/session.sagas";
import supportSagas from "./support/support.sagas";
import usersSagas from "./users/users.sagas";

function * rootSaga () {
    yield all([
        call(adminSagas),
        call(postsSagas),
        call(sessionSagas),
        call(supportSagas),
        call(usersSagas)
    ]);
}

export default rootSaga;
