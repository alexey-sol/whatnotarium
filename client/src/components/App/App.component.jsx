import { Route, Switch } from "react-router-dom";
import React, { Suspense, lazy, useEffect } from "react";
import { connect } from "react-redux";

import { PrivateRoute } from "components/common/Route";
import { PROFILE, SIGN_IN } from "common/constants/pathnames";
import Aside from "components/Aside";
import ErrorBoundary from "components/ErrorBoundary";
import Footer from "components/Footer";
import Header from "components/Header";
import Main from "components/Main";
import Spinner from "components/Spinner";
import { checkSessionStart } from "redux/user/user.actions";
import { propTypes } from "./App.props";
import styles from "./App.module.scss";

const Home = lazy(() => import("pages/Home"));
const Profile = lazy(() => import("pages/Profile"));
const SignIn = lazy(() => import("pages/SignIn"));

App.propTypes = propTypes;

function App ({ checkSessionStart }) {
    useEffect(() => {
        checkSessionStart();
    }, [checkSessionStart]);

    return (
        <div className={styles.container}>
            <Header />

            <Main>
                <Switch>
                    <ErrorBoundary>
                        <Suspense fallback={<Spinner />}>
                            <Route
                                component={Home}
                                exact
                                path="/"
                            />

                            <Route
                                component={SignIn}
                                path={SIGN_IN}
                            />

                            <PrivateRoute
                                component={Profile}
                                path={PROFILE}
                            />
                        </Suspense>
                    </ErrorBoundary>
                </Switch>
            </Main>

            <Aside />
            <Footer />
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    checkSessionStart: () => dispatch(checkSessionStart())
});

const ConnectedApp = connect(
    null,
    mapDispatchToProps
)(App);

export default ConnectedApp;
