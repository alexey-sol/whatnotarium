import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import pendingReducer from "./pending/pending.reducer";
import postReducer from "./post/post.reducer";
import userReducer from "./user/user.reducer";

const persistConfig = {
    key: "root",
    storage,
    whitelist: [
        "user"
    ]
};

const rootReducer = combineReducers({
    pending: pendingReducer,
    post: postReducer,
    user: userReducer
});

export default persistReducer(persistConfig, rootReducer);
