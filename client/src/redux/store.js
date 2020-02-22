import { applyMiddleware, createStore } from "redux";
import { persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";

import { DEVELOPMENT } from "common/constants/nodeEnv";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const isDevelopment = process.env.NODE_ENV === DEVELOPMENT;

if (isDevelopment) {
    middlewares.push(logger);
}

const appliedMiddlewares = applyMiddleware(...middlewares);

export const store = createStore(rootReducer, appliedMiddlewares);
export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
