import { applyMiddleware, createStore } from "redux";
import { persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";

import { DEVELOPMENT } from "utils/const/nodeEnv";
import { postsEnricher, postsNormalizer } from "./posts/posts.middlewares";
import { uiSplitter } from "./ui/ui.middlewares";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();
const isDevelopment = process.env.NODE_ENV === DEVELOPMENT;

const middlewares = [
    sagaMiddleware,
    uiSplitter,
    postsNormalizer,
    postsEnricher
];

if (isDevelopment) {
    middlewares.push(logger);
}

const appliedMiddlewares = applyMiddleware(...middlewares);

export const store = createStore(rootReducer, appliedMiddlewares);
export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
