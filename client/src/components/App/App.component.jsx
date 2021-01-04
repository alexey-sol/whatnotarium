import { Route, Switch } from "react-router-dom";
import React, { Suspense, lazy, useEffect } from "react";
import { connect } from "react-redux";

import {
    DRAFT,
    EDIT,
    POST,
    PROFILE,
    SIGN_IN,
    UNAPPROVED_POSTS,
    USERS
} from "utils/const/pathnames";

import { AdminRoute, PrivateRoute } from "components/Route";
import ErrorBoundary from "components/ErrorBoundary";
import Footer from "components/Footer";
import Header from "components/Header";
import Main from "components/Main";
import Menu from "components/Menu";
import Spinner from "components/Spinner";
import { checkSessionStart } from "redux/session/session.actions";
import { propTypes } from "./App.props";
import styles from "./App.module.scss";

const Draft = lazy(() => import("pages/Draft"));
const Home = lazy(() => import("pages/Home"));
const Page404 = lazy(() => import("pages/Page404"));
const Post = lazy(() => import("pages/Post"));
const Profile = lazy(() => import("pages/Profile"));
const SignIn = lazy(() => import("pages/SignIn"));
const UnapprovedPosts = lazy(() => import("pages/UnapprovedPosts"));
const Users = lazy(() => import("pages/Users"));

App.propTypes = propTypes;

export function App ({ onCheckSessionStart }) {
    useEffect(() => {
        onCheckSessionStart();
    }, [onCheckSessionStart]);

    return (
        <div className={styles.container}>
            <Header />
            <Menu />

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
                                component={Home}
                                path="/page:number"
                            />

                            <Route
                                component={SignIn}
                                path={`/${SIGN_IN}`}
                            />

                            <PrivateRoute
                                component={Profile}
                                path={`/${PROFILE}`}
                            />

                            <Route
                                component={Post}
                                path={`/${POST}/:id`}
                            />

                            <Route
                                component={Users}
                                path={`/${USERS}`}
                            />

                            <PrivateRoute
                                component={Draft}
                                path={`/${DRAFT}`}
                            />

                            <PrivateRoute
                                component={Draft}
                                path={`/${POST}/:id/${EDIT}`}
                            />

                            <AdminRoute
                                component={UnapprovedPosts}
                                path={`/${UNAPPROVED_POSTS}`}
                            />

                            <AdminRoute
                                component={UnapprovedPosts}
                                path={`/${UNAPPROVED_POSTS}/page:number`}
                            />

                            <Route component={Page404} />
                        </Switch>
                    </Suspense>
                </ErrorBoundary>
            </Main>

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
