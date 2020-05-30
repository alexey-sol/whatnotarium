import { Route, Switch } from "react-router-dom";
import React, { Suspense, lazy, useEffect } from "react";
import { connect } from "react-redux";

import {
    DRAFT,
    POST,
    PROFILE,
    SIGN_IN
} from "utils/const/pathnames";

import { PrivateRoute } from "components/Route";
import ErrorBoundary from "components/ErrorBoundary";
import Footer from "components/Footer";
import Header from "components/Header";
import Main from "components/Main";
import Nav from "components/Nav";
import Spinner from "components/Spinner";
import { checkSessionStart } from "redux/session/session.actions";
import { propTypes } from "./App.props";
import styles from "./App.module.scss";

const DraftEditor = lazy(() => import("pages/DraftEditor"));
const Home = lazy(() => import("pages/Home"));
const Post = lazy(() => import("pages/Post"));
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
                <ErrorBoundary>
                    <Suspense fallback={<Spinner />}>
                        <Switch>
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

                            <PrivateRoute
                                component={DraftEditor}
                                path={DRAFT}
                            />

                            <PrivateRoute
                                component={DraftEditor}
                                path={`${POST}/:id/edit`}
                            />

                            <Route
                                component={Post}
                                path={`${POST}/:id`}
                            />
                        </Switch>
                    </Suspense>
                </ErrorBoundary>
            </Main>

            <Nav />
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
