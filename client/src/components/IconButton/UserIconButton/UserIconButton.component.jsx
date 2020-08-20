import { withRouter } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { SIGN_IN } from "utils/const/pathnames";
import { User as UserIcon } from "components/Icon";
import IconButton from "components/BaseIconButton";
import { defaultProps, propTypes } from "./UserIconButton.props";
import { selectCurrentUser } from "redux/session/session.selectors";

UserIconButton.defaultProps = defaultProps;
UserIconButton.propTypes = propTypes;

function UserIconButton ({
    currentUser,
    location,
    onClick,
    size,
    ...rest
}) {
    const username = currentUser?.name;
    const title = username || "Учетная запись";

    const { pathname } = location;
    const isSignInPage = pathname === `/${SIGN_IN}`;
    // TODO: should this component be aware of sign in?

    return (
        <IconButton
            {...rest}
            disabled={isSignInPage}
            onClick={onClick}
            size={size}
            title={title}
        >
            <UserIcon size={size} />
        </IconButton>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const ConnectedUserIconButton = connect(
    mapStateToProps
)(UserIconButton);

export default withRouter(ConnectedUserIconButton);
