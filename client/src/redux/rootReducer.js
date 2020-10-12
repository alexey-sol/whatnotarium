import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import postsReducer from "./posts/posts.reducer";
import postsPagingReducer from "./postsPaging/postsPaging.reducer";
import sessionReducer from "./session/session.reducer";
import transformStateItemsMap from "utils/redux/transformStateItemsMap";
import uiReducer from "./ui/ui.reducer";
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
    posts: postsReducer,
    postsPaging: postsPagingReducer,
    session: sessionReducer,
    ui: uiReducer,
    users: usersReducer
});

export default persistReducer(persistConfig, rootReducer);
