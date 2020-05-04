import { Route, Switch } from "react-router-dom";
import React, { Suspense, lazy, useEffect } from "react";
import { connect } from "react-redux";

import { PROFILE, SIGN_IN } from "utils/const/pathnames";
import { PrivateRoute } from "components/Route";
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

function App ({ onCheckSessionStart }) {
    useEffect(() => {
        onCheckSessionStart();
    }, [onCheckSessionStart]);

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
    onCheckSessionStart: () => dispatch(checkSessionStart())
});

const ConnectedApp = connect(
    null,
    mapDispatchToProps
)(App);

export default ConnectedApp;
