import { Route, Switch } from "react-router-dom";
import React, { Suspense, lazy, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Aside from "components/Aside";
import ErrorBoundary from "components/ErrorBoundary";
import Footer from "components/Footer";
import Header from "components/Header";
import Main from "components/Main";
import Spinner from "components/Spinner";
import { checkSessionStart } from "redux/user/user.actions";
import { defaultProps, propTypes } from "./App.props";
import { selectCurrentUser } from "redux/user/user.selectors";
import styles from "./App.module.scss";

const Home = lazy(() => import("pages/Home"));
const Profile = lazy(() => import("pages/Profile"));

App.propTypes = propTypes;
App.defaultProps = defaultProps;

function App ({ checkSessionStart, currentUser }) {
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
                                component={Profile}
                                path="/profile"
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

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({
    checkSessionStart: () => dispatch(checkSessionStart())
});

const ConnectedApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default ConnectedApp;
