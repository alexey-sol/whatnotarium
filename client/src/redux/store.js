import { applyMiddleware, createStore } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";

import { DEVELOPMENT } from "common/constants/nodeEnv";
import rootReducer from "./rootReducer";

const middlewares = [];
const isDevelopment = process.env.NODE_ENV === DEVELOPMENT;

if (isDevelopment) {
    middlewares.push(logger);
}

const appliedMiddlewares = applyMiddleware(...middlewares);

export const store = createStore(rootReducer, appliedMiddlewares);
export const persistor = persistStore(store);

// export default { persistor, store };
