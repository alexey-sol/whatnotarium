import { applyMiddleware, createStore } from "redux";
import { persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";

import { DEVELOPMENT } from "utils/const/nodeEnv";
import * as admin from "./admin/admin.middlewares";
import * as posts from "./posts/posts.middlewares";
import * as session from "./session/session.middlewares";
import * as ui from "./ui/ui.middlewares";
import * as users from "./users/users.middlewares";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();
const isDevelopment = process.env.NODE_ENV === DEVELOPMENT;

const middlewares = [
    sagaMiddleware,
    session.mapper,
    ui.mapper,
    users.normalizer,
    users.enricher,
    posts.normalizer,
    posts.enricher,
    posts.mapper,
    admin.mapper
];

if (isDevelopment) {
    middlewares.push(logger);
}

const appliedMiddlewares = applyMiddleware(...middlewares);

export const store = createStore(rootReducer, appliedMiddlewares);
export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
