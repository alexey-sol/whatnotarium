import { Redirect, Route, Switch } from "react-router-dom";
import React, { Suspense, lazy } from "react";

import Footer from "components/Footer";
import Main from "components/Main";
import ErrorBoundary from "components/ErrorBoundary";
import Logo from "components/Logo";
import Menu from "components/Menu";
import Spinner from "components/Spinner";
import { defaultProps, propTypes } from "./App.props";
import styles from "./App.module.scss";

const Home = lazy(() => import("pages/Home"));

App.propTypes = propTypes;
App.defaultProps = defaultProps;

function App ({ checkUserSession, currentUser }) {
    return (
        <div className={styles.container}>
            <Logo />

            <Main>
                <Switch>
                    <ErrorBoundary>
                        <Suspense fallback={<Spinner />}>
                            <Route
                                component={Home}
                                exact
                                path="/"
                            />
                        </Suspense>
                    </ErrorBoundary>
                </Switch>
            </Main>

            <Menu />
            <Footer />
        </div>
    );
}

export default App;
