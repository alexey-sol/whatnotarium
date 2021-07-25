import { Route, Switch } from "react-router-dom";
import React, { Suspense, lazy, useEffect } from "react";
import { connect } from "react-redux";

import * as p from "utils/const/pathnames";
import { PrivateRoute } from "components/routes/Route";
import ErrorBoundary from "components/layout/ErrorBoundary";
import Footer from "components/layout/Footer";
import Header from "components/layout/Header";
import Loader from "components/ui/Loader";
import Main from "components/layout/Main";
import Menu from "components/layout/Menu";
import { checkSessionStart } from "redux/session/session.actions";
import { propTypes } from "./App.props";
import styles from "./App.module.scss";

const ConfirmEmail = lazy(() => import("pages/ConfirmEmail"));
const ConfirmToken = lazy(() => import("pages/ConfirmToken"));
const Draft = lazy(() => import("pages/Draft"));
const Home = lazy(() => import("pages/Home"));
const OauthCallback = lazy(() => import("pages/OauthCallback"));
const Page404 = lazy(() => import("pages/Page404"));
const Post = lazy(() => import("pages/Post"));
const ProfileMyPosts = lazy(() => import("pages/Profile/MyPosts"));
const ProfileSettings = lazy(() => import("pages/Profile/Settings"));
const ResetToken = lazy(() => import("pages/ResetToken"));
const SignIn = lazy(() => import("pages/SignIn"));
const User = lazy(() => import("pages/User"));
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
                    <Suspense fallback={<Loader />}>
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
                                path={`/${p.SIGN_IN}`}
                            />

                            <PrivateRoute
                                component={ProfileMyPosts}
                                exact
                                path={`/${p.PROFILE}/${p.MY_POSTS}`}
                            />

                            <PrivateRoute
                                component={ProfileMyPosts}
                                path={`/${p.PROFILE}/${p.MY_POSTS}/page:number`}
                            />

                            <PrivateRoute
                                component={ProfileSettings}
                                path={`/${p.PROFILE}/${p.SETTINGS}`}
                            />

                            <PrivateRoute
                                component={Draft}
                                path={`/${p.DRAFT}`}
                            />

                            <PrivateRoute
                                component={Draft}
                                path={`/${p.POST}/:id/${p.EDIT}`}
                            />

                            <Route
                                component={Post}
                                path={`/${p.POST}/:id`}
                            />

                            <Route
                                component={User}
                                path={`/${p.USER}/:id`}
                            />

                            <Route
                                component={Users}
                                exact
                                path={`/${p.USERS}`}
                            />

                            <Route
                                component={Users}
                                path={`/${p.USERS}/page:number`}
                            />

                            <Route
                                component={ConfirmEmail}
                                path={`/${p.SUPPORT}/${p.CONFIRM}/${p.EMAIL}/:email`}
                            />

                            <Route
                                component={ConfirmToken}
                                path={`/${p.SUPPORT}/${p.CONFIRM}/${p.TOKEN}/:token`}
                            />

                            <Route
                                component={ResetToken}
                                path={`/${p.SUPPORT}/${p.RESET}/${p.TOKEN}/:token`}
                            />

                            <Route
                                component={OauthCallback}
                                path={`/${p.SUPPORT}/${p.OAUTH}/:provider`}
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
