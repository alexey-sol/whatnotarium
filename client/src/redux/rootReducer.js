import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import postsReducer from "./posts/posts.reducer";
import sessionReducer from "./session/session.reducer";
import uiReducer from "./ui/ui.reducer";
import userReducer from "./user/user.reducer";

const persistConfig = {
    key: "root",
    storage,
    whitelist: [
        "user"
    ]
};

const rootReducer = combineReducers({
    posts: postsReducer,
    session: sessionReducer,
    ui: uiReducer,
    user: userReducer
});

export default persistReducer(persistConfig, rootReducer);
