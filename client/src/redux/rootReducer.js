import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import adminReducer from "./admin/admin.reducer";
import postsReducer from "./posts/posts.reducer";
import postsPagingReducer from "./postsPaging/postsPaging.reducer";
import sessionReducer from "./session/session.reducer";
import supportReducer from "./support/support.reducer";
import transformStateItemsMap from "utils/redux/transformStateItemsMap";
import uiReducer from "./ui/ui.reducer";
import usersPagingReducer from "./usersPaging/usersPaging.reducer";
import usersReducer from "./users/users.reducer";

const persistConfig = {
    key: "root",
    storage,
    transforms: [transformStateItemsMap],
    whitelist: [
        // "users" // TODO: what should I persist?
    ]
};

const rootReducer = combineReducers({
    admin: adminReducer,
    posts: postsReducer,
    postsPaging: postsPagingReducer,
    session: sessionReducer,
    support: supportReducer,
    ui: uiReducer,
    users: usersReducer,
    usersPaging: usersPagingReducer
});

export default persistReducer(persistConfig, rootReducer);
