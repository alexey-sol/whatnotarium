import { Route, Switch } from "react-router-dom";
import React, { Suspense, lazy, useEffect } from "react";
import { connect } from "react-redux";

import {
    DRAFT,
    EDIT,
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
import { fetchPostsStart } from "redux/posts/posts.actions";
import { propTypes } from "./App.props";
import styles from "./App.module.scss";

const Draft = lazy(() => import("pages/Draft"));
const Home = lazy(() => import("pages/Home"));
const Page404 = lazy(() => import("pages/Page404"));
const Post = lazy(() => import("pages/Post"));
const Profile = lazy(() => import("pages/Profile"));
const SignIn = lazy(() => import("pages/SignIn"));

App.propTypes = propTypes;

export function App ({ onCheckSessionStart, onFetchPostsStart }) {
    useEffect(() => {
        onCheckSessionStart();
        onFetchPostsStart();
    }, [onCheckSessionStart, onFetchPostsStart]);

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
                                path={`/${SIGN_IN}`}
                            />

                            <PrivateRoute
                                component={Profile}
                                path={`/${PROFILE}`}
                            />

                            <PrivateRoute
                                component={Draft}
                                path={`/${DRAFT}`}
                            />

                            <PrivateRoute
                                component={Draft}
                                path={`/${POST}/:id/${EDIT}`}
                            />

                            <Route
                                component={Post}
                                path={`/${POST}/:id`}
                            />

                            <Route component={Page404} />
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
    onCheckSessionStart: () => dispatch(checkSessionStart()),
    onFetchPostsStart: () => dispatch(fetchPostsStart())
});

const ConnectedApp = connect(
    null,
    mapDispatchToProps
)(App);

export default ConnectedApp;
