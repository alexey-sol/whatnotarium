import { Route, Switch } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Banner from "components/Banner";
import Footer from "components/Footer";
import Main from "components/Main";
import ErrorBoundary from "components/ErrorBoundary";
import Menu from "components/Menu";
import Spinner from "components/Spinner";
import { propTypes } from "./App.props";
import { selectCurrentUser } from "redux/user/user.selectors";
import styles from "./App.module.scss";

const Home = lazy(() => import("pages/Home"));

App.propTypes = propTypes;

function App ({ checkUserSession, currentUser }) {
    return (
        <div className={styles.container}>
            <Banner />

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

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const ConnectedApp = connect(
    mapStateToProps
)(App);

export default ConnectedApp;
