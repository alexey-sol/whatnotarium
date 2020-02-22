import { Route, Switch } from "react-router-dom";
import React, { Suspense, lazy, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Banner from "components/Banner";
import ErrorBoundary from "components/ErrorBoundary";
import Footer from "components/Footer";
import Main from "components/Main";
import Menu from "components/Menu";
import Spinner from "components/Spinner";
import { checkSession } from "redux/user/user.actions";
import { propTypes } from "./App.props";
import { selectCurrentUser } from "redux/user/user.selectors";
import styles from "./App.module.scss";

const Home = lazy(() => import("pages/Home"));

App.propTypes = propTypes;

function App ({ checkSession, currentUser }) {
    useEffect(() => {
        checkSession();
    }, [checkSession]);

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

const mapDispatchToProps = (dispatch) => ({
    checkSession: () => dispatch(checkSession())
});

const ConnectedApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default ConnectedApp;
