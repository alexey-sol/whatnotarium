import { withRouter } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { SIGN_IN } from "common/constants/pathnames";
import { User as UserIcon } from "components/common/Icon";
import IconButton from "components/BaseIconButton";
import { defaultProps, propTypes } from "./UserIconButton.props";
import { selectCurrentUser } from "redux/user/user.selectors";

UserIconButton.defaultProps = defaultProps;
UserIconButton.propTypes = propTypes;

function UserIconButton ({
    currentUser,
    location,
    onClick,
    ...rest
}) {
    const username = currentUser?.name;
    const title = username || "Учетная запись";

    const { pathname } = location;
    const isSignInPage = pathname === SIGN_IN;

    return (
        <IconButton
            {...rest}
            disabled={isSignInPage}
            onClick={onClick}
            title={title}
        >
            <UserIcon />
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
