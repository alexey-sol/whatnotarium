import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import { persistor, store } from "redux/store";

import App from "components/layout/App";

const WrappedApp = (
    <Provider store={store}>
        <BrowserRouter>
            <PersistGate persistor={persistor}>
                <App />
            </PersistGate>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(
    WrappedApp,
    document.getElementById("root")
);
