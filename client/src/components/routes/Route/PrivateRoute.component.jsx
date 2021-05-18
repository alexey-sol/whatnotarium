import { Redirect, Route } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { SIGN_IN } from "utils/const/pathnames";
import { defaultProps, propTypes } from "./Route.props";
import { selectCurrentUser, selectError } from "redux/session/session.selectors";

PrivateRoute.defaultProps = defaultProps;
PrivateRoute.propTypes = propTypes;

function PrivateRoute ({
    component: Component,
    currentUser,
    sessionError,
    ...rest
}) {
    const shouldRenderComponent = !sessionError || currentUser;

    const renderComponent = (props) => (shouldRenderComponent)
        ? <Component {...props} />
        : <Redirect to={`/${SIGN_IN}`} />;

    return (
        <Route
            {...rest}
            render={renderComponent}
        />
    );
}

const mapStateToProps = () => createStructuredSelector({
    currentUser: selectCurrentUser,
    sessionError: selectError
});

const ConnectedPrivateRoute = connect(
    mapStateToProps
)(PrivateRoute);

export default ConnectedPrivateRoute;
