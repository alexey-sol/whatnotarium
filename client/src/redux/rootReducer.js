import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import postsReducer from "./posts/posts.reducer";
import sessionReducer from "./session/session.reducer";
import transformStateItemsMap from "utils/redux/transformStateItemsMap";
import uiReducer from "./ui/ui.reducer";
import usersReducer from "./users/users.reducer";

const persistConfig = {
    key: "root",
    storage,
    transforms: [transformStateItemsMap],
    whitelist: [
        "users"
    ]
};

const rootReducer = combineReducers({
    posts: postsReducer,
    session: sessionReducer,
    ui: uiReducer,
    users: usersReducer
});

export default persistReducer(persistConfig, rootReducer);
